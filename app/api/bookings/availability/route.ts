import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// Working hours config — edit these to change availability
const WORK_DAYS   = [1, 2, 3, 4, 5]; // Mon–Fri (0=Sun, 6=Sat)
const START_HOUR  = 11;               // 11:00 AM
const END_HOUR    = 18;               // 6:00 PM
const SLOT_MINS   = 30;               // 30-minute slots

function generateSlots(): string[] {
  const slots: string[] = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINS) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date"); // "YYYY-MM-DD"

  if (!date) {
    return NextResponse.json({ error: "date param required" }, { status: 400 });
  }

  // Check if the date is a working day
  const dayOfWeek = new Date(date + "T00:00:00").getDay();
  if (!WORK_DAYS.includes(dayOfWeek)) {
    return NextResponse.json({ slots: [] });
  }

  // Don't allow past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, mo, d] = date.split("-").map(Number);
  const parsed = new Date(y, mo - 1, d);
  if (parsed < today) {
    return NextResponse.json({ slots: [] });
  }

  // Fetch already-booked slots for this date
  const result = await pool.query(
    `SELECT time_slot::text FROM bookings WHERE date = $1 AND status = 'confirmed'`,
    [date]
  );

  const booked = new Set(
    result.rows.map((r) => r.time_slot.slice(0, 5)) // "HH:MM"
  );

  let allSlots = generateSlots();

  // FIX: If the selected date is TODAY, filter out past times
  const now = new Date();
  const isToday = parsed.getTime() === today.getTime();
  
  if (isToday) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    allSlots = allSlots.filter((slot) => {
      const [slotHour, slotMinute] = slot.split(":").map(Number);
      const slotTime = slotHour * 60 + slotMinute;
      const currentTime = currentHour * 60 + currentMinute;
      
      // Only show slots that are at least 30 minutes in the future
      return slotTime > currentTime + 30;
    });
  }

  const available = allSlots.filter((s) => !booked.has(s));

  return NextResponse.json({ slots: available });
}