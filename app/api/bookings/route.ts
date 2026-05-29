import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { sendClientConfirmation, sendOwnerNotification } from "@/lib/email";

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

    // Basic validation
    if (!name || !email || !date || !timeSlot || !timezone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // FIX: Insert into DB with explicit status = 'confirmed'
    await pool.query(
      `INSERT INTO bookings (name, email, date, time_slot, timezone, details, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'confirmed')`,
      [name, email, date, timeSlot, timezone, details ?? ""]
    );

    const emailData = {
      name,
      email,
      date:     formatDate(date),
      time:     formatTime(timeSlot),
      timezone,
      details:  details ?? "",
    };

    // FIX: Send emails in background (don't block response)
    // Catch email errors separately so booking still succeeds
    Promise.all([
      sendClientConfirmation(emailData).catch((err) => {
        console.error("Client confirmation email failed:", err);
      }),
      sendOwnerNotification(emailData).catch((err) => {
        console.error("Owner notification email failed:", err);
      }),
    ]).catch((err) => {
      console.error("Email sending error:", err);
    });

    // FIX: Return success immediately (before emails complete)
    return NextResponse.json({ success: true });

  } catch (err: any) {
    // Unique violation = slot already taken
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