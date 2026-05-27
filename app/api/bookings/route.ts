// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { sendClientConfirmation, sendOwnerNotification } from "@/lib/email";
import { createMeetLink, localToUTC } from "@/lib/google-meet";

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    day:     "numeric",
    month:   "long",
    year:    "numeric",
  });
}

function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(":").map(Number);
  const period  = h >= 12 ? "PM" : "AM";
  const hour12  = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, date, timeSlot, timezone, details } = body;

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name || !email || !date || !timeSlot || !timezone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ── Convert booking local time → UTC ──────────────────────────────────────
    // Used for the cron's time-window query and for the Calendar event
    const utcStart = localToUTC(date, timeSlot, timezone);

    // ── Generate Google Meet link ─────────────────────────────────────────────
    // We generate it at booking time so it's ready for both reminder emails.
    // If Google Calendar fails we still confirm the booking (meet_link = "").
    let meetLink = "";
    try {
      const bookingRef = `${date}-${timeSlot.replace(":", "")}`;
      meetLink = await createMeetLink(name, utcStart, bookingRef);
    } catch (meetErr) {
      console.error("Google Meet creation failed (booking will still be saved):", meetErr);
    }

    // ── Persist to database ───────────────────────────────────────────────────
    // The UNIQUE constraint on (date, time_slot) prevents double-booking.
    await pool.query(
      `INSERT INTO bookings
         (name, email, date, time_slot, timezone, details, utc_datetime, meet_link)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, email, date, timeSlot, timezone, details ?? "", utcStart, meetLink]
    );

    // ── Send confirmation emails ──────────────────────────────────────────────
    const emailData = {
      name,
      email,
      date:     formatDate(date),
      time:     formatTime(timeSlot),
      timezone,
      details:  details ?? "",
    };

    await Promise.all([
      sendClientConfirmation(emailData),
      sendOwnerNotification(emailData),
    ]);

    return NextResponse.json({ success: true });

  } catch (err: any) {
    // Unique violation → slot already taken
    if (err.code === "23505") {
      return NextResponse.json(
        { error: "This slot was just booked. Please choose another time." },
        { status: 409 }
      );
    }
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}