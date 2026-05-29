import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

const WORK_DAYS  = [1, 2, 3, 4, 5];
const START_HOUR = 11;
const END_HOUR   = 18;
const SLOT_MINS  = 30;

function generateSlots(): string[] {
  const slots: string[] = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINS) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date        = searchParams.get("date");
  const localHour   = searchParams.get("localHour");
  const localMinute = searchParams.get("localMinute");

  if (!date) {
    return NextResponse.json({ error: "date param required" }, { status: 400 });
  }

  const dayOfWeek = new Date(date + "T00:00:00").getDay();
  if (!WORK_DAYS.includes(dayOfWeek)) {
    return NextResponse.json({ slots: [] });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, mo, d] = date.split("-").map(Number);
  const parsed = new Date(y, mo - 1, d);

  if (parsed < today) {
    return NextResponse.json({ slots: [] });
  }

  const result = await pool.query(
    `SELECT time_slot::text FROM bookings WHERE date = $1 AND status = 'confirmed'`,
    [date]
  );
  const booked = new Set(result.rows.map((r) => r.time_slot.slice(0, 5)));

  let allSlots = generateSlots();

  const isToday = parsed.getTime() === today.getTime();

  if (isToday) {
    // Use client's local time if provided, otherwise fall back to server time
    const currentHour   = localHour   !== null ? Number(localHour)   : new Date().getHours();
    const currentMinute = localMinute !== null ? Number(localMinute) : new Date().getMinutes();
    const currentTime   = currentHour * 60 + currentMinute;

    allSlots = allSlots.filter((slot) => {
      const [slotHour, slotMinute] = slot.split(":").map(Number);
      return (slotHour * 60 + slotMinute) > currentTime + 30;
    });
  }

  const available = allSlots.filter((s) => !booked.has(s));
  return NextResponse.json({ slots: available });
}