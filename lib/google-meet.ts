// lib/google-meet.ts
// Generates a real Google Meet link by creating a Calendar event via a service account.
// The event lives on the service account's primary calendar — only the Meet link is used.

import { google } from "googleapis";

/**
 * Converts a local date+time+timezone into a UTC Date.
 *
 * Works by:
 *  1. Treating the input as UTC to get a starting point
 *  2. Formatting that UTC time in the target timezone (gives us the local offset)
 *  3. Computing the difference and applying it
 */
export function localToUTC(dateStr: string, timeStr: string, timezone: string): Date {
  // Step 1 — naive UTC anchor
  const naiveUTC = new Date(`${dateStr}T${timeStr}:00Z`);

  // Step 2 — what does this UTC instant look like in the target timezone?
  // "sv-SE" locale reliably gives "YYYY-MM-DD HH:MM:SS" regardless of server locale
  const localStr = naiveUTC.toLocaleString("sv-SE", { timeZone: timezone });

  // Step 3 — parse that local string as if it were UTC to isolate the offset
  const asUTC = new Date(localStr.replace(" ", "T") + "Z");

  // Step 4 — apply the offset to the naive anchor to get the true UTC time
  return new Date(naiveUTC.getTime() + (naiveUTC.getTime() - asUTC.getTime()));
}

/**
 * Creates a Google Calendar event with a Meet conference and returns the Meet link.
 *
 * Requires env vars:
 *   GOOGLE_CLIENT_EMAIL  — service account email
 *   GOOGLE_PRIVATE_KEY   — service account private key (with literal \n)
 *   GOOGLE_CALENDAR_ID   — calendar to create events on (default: "primary")
 *
 * sendUpdates is set to "none" so Google does NOT send its own invite emails —
 * all email communication is handled by Nodemailer.
 */
export async function createMeetLink(
  name:      string,
  utcStart:  Date,
  bookingRef: string, // unique reference (e.g. "2025-06-10-1000") for idempotency
): Promise<string> {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  const utcEnd = new Date(utcStart.getTime() + 30 * 60 * 1000); // 30-min slot

  const { data } = await calendar.events.insert({
    calendarId:            process.env.GOOGLE_CALENDAR_ID ?? "primary",
    conferenceDataVersion: 1,
    sendUpdates:           "none", // suppress Google's own emails
    requestBody: {
      summary: `Strategy Call — ${name}`,
      start:   { dateTime: utcStart.toISOString(), timeZone: "UTC" },
      end:     { dateTime: utcEnd.toISOString(),   timeZone: "UTC" },
      conferenceData: {
        createRequest: {
          requestId: `rf-${bookingRef}`, // must be unique per event
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  // hangoutLink is the canonical Meet URL
  return (
    data.hangoutLink ??
    data.conferenceData?.entryPoints?.find(e => e.entryPointType === "video")?.uri ??
    ""
  );
}