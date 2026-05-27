// app/api/cron/reminders/route.ts
//
// This endpoint is called every 30 minutes by Vercel Cron (or cron-job.org).
// It handles two jobs in a single pass:
//
//  Job A — Day-of reminder
//    Finds all confirmed bookings for today (UTC date) that haven't had
//    a day reminder sent yet, and emails both parties.
//
//  Job B — 30-minute pre-call reminder
//    Finds all confirmed bookings whose UTC start time falls within the
//    next 25–35 minute window (10-min window accounts for cron timing drift),
//    and emails both parties with the Google Meet link.
//
// Security: the endpoint checks for CRON_SECRET in the Authorization header.
// Vercel injects this automatically; for cron-job.org, add it as a custom header.

import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { sendDayReminder, sendPreCallReminder, BookingEmailData } from "@/lib/email";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(raw: Date | string): string {
  const d = typeof raw === "string" ? new Date(raw + "T00:00:00Z") : raw;
  return d.toLocaleDateString("en-US", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function formatTime(raw: string): string {
  // raw is "HH:MM:SS" or "HH:MM" from Postgres TIME column
  const [h, m] = raw.slice(0, 5).split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function rowToEmailData(row: any): BookingEmailData {
  return {
    name:     row.name,
    email:    row.email,
    date:     formatDate(row.date),
    time:     formatTime(row.time_slot),
    timezone: row.timezone,
    details:  row.details ?? "",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const results = { dayReminders: 0, preCallReminders: 0, errors: [] as string[] };

  // ── Job A: Day-of reminders ─────────────────────────────────────────────────
  // We use the UTC calendar date for "today". Bookings are stored as DATE (no tz),
  // so this matches correctly for most cases. If your clients are in radically
  // different timezones and same-day accuracy matters, extend this to also check
  // (UTC date - 1) and filter by timezone offset.
  const todayUTC = now.toISOString().slice(0, 10); // "YYYY-MM-DD"

  const dayRows = await pool.query(
    `SELECT * FROM bookings
     WHERE date = $1
       AND status = 'confirmed'
       AND day_reminder_sent = false`,
    [todayUTC]
  );

  for (const row of dayRows.rows) {
    try {
      await sendDayReminder(rowToEmailData(row), row.meet_link ?? "");
      await pool.query(
        `UPDATE bookings SET day_reminder_sent = true WHERE id = $1`,
        [row.id]
      );
      results.dayReminders++;
    } catch (err: any) {
      const msg = `Day reminder failed (id=${row.id}): ${err.message}`;
      console.error(msg);
      results.errors.push(msg);
    }
  }

  // ── Job B: 30-min pre-call reminders ────────────────────────────────────────
  // Window: bookings whose UTC start time is between now+25min and now+35min.
  // The 10-minute window ensures we don't miss a booking if the cron fires
  // slightly early or late.
  const windowStart = new Date(now.getTime() + 25 * 60 * 1000);
  const windowEnd   = new Date(now.getTime() + 35 * 60 * 1000);

  const slotRows = await pool.query(
    `SELECT * FROM bookings
     WHERE utc_datetime BETWEEN $1 AND $2
       AND status = 'confirmed'
       AND slot_reminder_sent = false`,
    [windowStart.toISOString(), windowEnd.toISOString()]
  );

  for (const row of slotRows.rows) {
    try {
      await sendPreCallReminder(rowToEmailData(row), row.meet_link ?? "");
      await pool.query(
        `UPDATE bookings SET slot_reminder_sent = true WHERE id = $1`,
        [row.id]
      );
      results.preCallReminders++;
    } catch (err: any) {
      const msg = `Pre-call reminder failed (id=${row.id}): ${err.message}`;
      console.error(msg);
      results.errors.push(msg);
    }
  }

  // ── Done ────────────────────────────────────────────────────────────────────
  console.log(
    `[cron/reminders] dayReminders=${results.dayReminders} ` +
    `preCallReminders=${results.preCallReminders} errors=${results.errors.length}`
  );

  return NextResponse.json({
    ok:               true,
    ran:              now.toISOString(),
    dayReminders:     results.dayReminders,
    preCallReminders: results.preCallReminders,
    ...(results.errors.length > 0 && { errors: results.errors }),
  });
}