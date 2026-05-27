"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useBreakpoint } from "../components/hooks/useBreakpoint";

const GREEN     = "#03C04A";
const BTN_GREEN = "#1B5E34";
const GLOW      = "0 0 20px rgba(3,192,74,0.5), 0 0 40px rgba(3,192,74,0.2)";
const DAYS      = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS    = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function toISO(d: Date) {
  const y  = d.getFullYear();
  const m  = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function fmt12(t: string) {
  const [h, m] = t.split(":").map(Number);
  const p = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${p}`;
}

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let i = 1; i <= days; i++) cells.push(i);
  return cells;
}

const slide = {
  initial:    { opacity: 0, x: 40 },
  animate:    { opacity: 1, x: 0 },
  exit:       { opacity: 0, x: -40 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
};

function StepDot({ n, active, done, size }: { n: number; active: boolean; done: boolean; size: number }) {
  return (
    <div style={{
      width: `${size}px`, height: `${size}px`, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: `${size * 0.32}px`, fontWeight: 700,
      fontFamily: "Arial, Helvetica, sans-serif",
      background: done ? BTN_GREEN : active ? "rgba(3,192,74,0.15)" : "rgba(255,255,255,0.05)",
      border: `1.5px solid ${done || active ? GREEN : "rgba(255,255,255,0.1)"}`,
      color: done ? "#fff" : active ? GREEN : "rgba(255,255,255,0.3)",
      boxShadow: active || done ? GLOW : "none",
      transition: "all 0.3s",
      flexShrink: 0,
    }}>{done ? "✓" : n}</div>
  );
}

export default function BookingPage() {
  const { isMobile, isTablet, isLarge } = useBreakpoint();
  const xl = isLarge;

  const containerPadTop  = isMobile ? "5.5rem"  : xl ? "9rem"  : "7.5rem";
  const containerPadBot  = isMobile ? "3rem"     : xl ? "6rem"  : "4rem";
  const containerPadH    = isMobile ? "1rem"     : isTablet ? "1.75rem" : xl ? "4rem" : "2.5rem";
  const containerMaxW    = xl ? "min(1560px, 92vw)" : isTablet ? "min(960px, 94vw)" : "100%";

  const headingSize      = isMobile ? "clamp(1.8rem,7vw,2.4rem)" : xl ? "clamp(3rem,3.5vw,4rem)" : "clamp(2rem,4vw,3rem)";
  const labelSize        = isMobile ? "0.68rem" : xl ? "0.9rem"  : "0.75rem";
  const bodySize         = isMobile ? "0.88rem" : xl ? "1.05rem" : "0.95rem";

  const cardPad          = isMobile ? "1.1rem"  : xl ? "2.75rem" : "2rem";
  const cardRadius       = isMobile ? "12px"    : xl ? "20px"    : "16px";

  const dotSize          = isMobile ? 26        : xl ? 38        : 30;
  const connectorW       = isMobile ? "18px"    : xl ? "56px"    : "40px";
  const stepLabelSize    = isMobile ? "0.75rem" : xl ? "1rem"    : "0.82rem";

  const calCellPadV      = isMobile ? "0.38rem" : xl ? "0.85rem" : "0.55rem";
  const calCellFontSize  = isMobile ? "0.78rem" : xl ? "1rem"    : "0.86rem";
  const calHeaderFont    = isMobile ? "0.62rem" : xl ? "0.82rem" : "0.7rem";
  const calTitleFont     = isMobile ? "0.9rem"  : xl ? "1.15rem" : "1rem";
  const calGap           = isMobile ? "3px"     : xl ? "7px"     : "5px";
  const calNavFont       = isMobile ? "1rem"    : xl ? "1.5rem"  : "1.2rem";

  const slotCols         = xl ? "1fr 1fr 1fr" : "1fr 1fr";
  const slotGap          = isMobile ? "0.4rem" : xl ? "0.7rem"  : "0.5rem";
  const slotFontSize     = isMobile ? "0.82rem": xl ? "1rem"    : "0.88rem";
  const slotPad          = isMobile ? "0.55rem 0.7rem" : xl ? "0.85rem 1.2rem" : "0.65rem 0.9rem";
  const slotMaxH         = isMobile ? "280px"  : xl ? "480px"   : "360px";

  const formMaxW         = xl ? "min(860px,100%)" : isTablet ? "min(640px,100%)" : "100%";
  const inputPad         = isMobile ? "0.75rem 0.9rem" : xl ? "1.1rem 1.25rem" : "0.9rem 1rem";
  const inputFontSize    = isMobile ? "0.9rem"  : xl ? "1.05rem" : "0.95rem";
  const inputRadius      = xl ? "12px" : "10px";
  const textareaMinH     = isMobile ? "100px"   : xl ? "160px"   : "120px";

  const confirmMaxW      = xl ? "min(720px,100%)" : "min(560px,100%)";
  const summaryFontSize  = xl ? "1.3rem" : "1.1rem";

  const step1Cols        = isMobile || isTablet ? "1fr" : "1fr 1fr";
  const step1Gap         = isMobile ? "1.25rem"   : xl ? "2.5rem" : "1.75rem";

  const ctaPad           = isMobile ? "0.75rem 2rem" : xl ? "1.1rem 3.5rem" : "0.9rem 2.5rem";
  const ctaFontSize      = isMobile ? "0.9rem" : xl ? "1.1rem" : "0.95rem";
  const ctaRadius        = "9999px";
  const backBtnPad       = isMobile ? "0.75rem 1.5rem" : xl ? "1.1rem 2.5rem" : "0.9rem 2rem";

  const [step, setStep]             = useState(1);
  const [viewYear, setViewYear]     = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth]   = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots]           = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [timezone, setTimezone]     = useState("UTC");
  const [form, setForm]             = useState({ name: "", email: "", details: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    setSlots([]);
    setSelectedTime(null);
    fetch(`/api/bookings/availability?date=${selectedDate}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setSlots(d.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cells = buildCalendar(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const isDisabled = (day: number) => {
    const d   = new Date(viewYear, viewMonth, day);
    const dow = d.getDay();
    return d < today || dow === 0 || dow === 6;
  };

  async function handleSubmit() {
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Invalid email."); return; }
    setError("");
    setSubmitting(true);
    let res: Response;
    try {
      res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate, timeSlot: selectedTime, timezone }),
      });
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
      return;
    }
    let data: { error?: string } = {};
    try { data = await res.json(); } catch {
      setError("Unexpected server response. Please try again.");
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
    setStep(4);
  }

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: cardRadius,
    padding: cardPad,
  };

  const slotBtn = (active: boolean): React.CSSProperties => ({
    background: active ? BTN_GREEN : "rgba(255,255,255,0.04)",
    color: active ? "#fff" : "rgba(255,255,255,0.75)",
    border: `1px solid ${active ? GREEN : "rgba(255,255,255,0.1)"}`,
    borderRadius: "8px",
    padding: slotPad,
    fontSize: slotFontSize,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: active ? 700 : 400,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: active ? GLOW : "none",
    textAlign: "center" as const,
  });

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: inputRadius,
    padding: inputPad,
    color: "white",
    fontSize: inputFontSize,
    fontFamily: "Arial, Helvetica, sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const ctaActive: React.CSSProperties = {
    background: BTN_GREEN,
    color: "#fff",
    border: "none",
    borderRadius: ctaRadius,
    padding: ctaPad,
    fontWeight: 700,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: ctaFontSize,
    cursor: "pointer",
    boxShadow: GLOW,
    transition: "all 0.25s",
    minWidth: xl ? "190px" : "160px",
    overflow: "hidden",
    position: "relative" as const,
  };

  const ctaDisabled: React.CSSProperties = {
    ...ctaActive,
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.25)",
    boxShadow: "none",
    cursor: "not-allowed",
  };

  const backBtn: React.CSSProperties = {
    background: "none",
    border: "0.5px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.5)",
    borderRadius: ctaRadius,
    padding: backBtnPad,
    cursor: "pointer",
    fontSize: ctaFontSize,
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "white", overflowX: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1, maxWidth: containerMaxW, margin: "0 auto", padding: `${containerPadTop} ${containerPadH} ${containerPadBot}` }}>

        {/* Back link — Arial */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.35)", fontSize: isMobile ? "0.8rem" : xl ? "0.95rem" : "0.85rem", fontFamily: "Arial, Helvetica, sans-serif", textDecoration: "none", marginBottom: isMobile ? "1.75rem" : xl ? "3rem" : "2.5rem" }}>
          ← Back to Home
        </Link>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? "1.75rem" : xl ? "3rem" : "2.5rem" }}>
          {/* Topper — Arial */}
          <p style={{ fontSize: labelSize, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "white", marginBottom: isMobile ? "0.4rem" : "0.6rem" }}>
            Free 30-min Call
          </p>
          {/* Heading — Coolvetica */}
          <h1 style={{ fontSize: headingSize, fontFamily: "'Coolvetica', sans-serif", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, color: "white" }}>
            Book a Strategy Call
          </h1>
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: isMobile ? "1.75rem" : xl ? "3rem" : "2.5rem", flexWrap: "wrap" }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <StepDot n={n} active={step === n} done={step > n} size={dotSize} />
              {n < 3 && <div style={{ width: connectorW, height: "1px", background: step > n ? GREEN : "rgba(255,255,255,0.1)", transition: "background 0.4s" }} />}
            </div>
          ))}
          <span style={{ marginLeft: "0.75rem", fontSize: stepLabelSize, fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
            {step === 1 ? "Pick a date & time" : step === 2 ? "Your details" : step === 3 ? "Confirm" : "Confirmed!"}
          </span>
        </div>

        <AnimatePresence mode="wait">

          {/* Step 1 */}
          {step === 1 && (
            <motion.div key="step1" {...slide}>
              <div style={{ display: "grid", gridTemplateColumns: step1Cols, gap: step1Gap, alignItems: "start" }}>

                {/* Calendar */}
                <div style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: xl ? "1.75rem" : "1.25rem" }}>
                    <button onClick={prevMonth} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: calNavFont, cursor: "pointer", padding: "0.25rem 0.5rem", lineHeight: 1 }}>‹</button>
                    <span style={{ fontWeight: 700, fontSize: calTitleFont, fontFamily: "Arial, Helvetica, sans-serif" }}>{MONTHS[viewMonth]} {viewYear}</span>
                    <button onClick={nextMonth} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: calNavFont, cursor: "pointer", padding: "0.25rem 0.5rem", lineHeight: 1 }}>›</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: calGap, marginBottom: isMobile ? "6px" : xl ? "10px" : "8px" }}>
                    {DAYS.map(d => (
                      <div key={d} style={{ textAlign: "center", fontSize: calHeaderFont, fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.3)", padding: "4px 0" }}>
                        {isMobile ? d[0] : d}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: calGap }}>
                    {cells.map((day, i) => {
                      if (!day) return <div key={i} />;
                      const iso      = toISO(new Date(viewYear, viewMonth, day));
                      const disabled = isDisabled(day);
                      const selected = selectedDate === iso;
                      return (
                        <button key={i} disabled={disabled} onClick={() => setSelectedDate(iso)}
                          style={{ background: selected ? BTN_GREEN : "transparent", color: disabled ? "rgba(255,255,255,0.15)" : selected ? "#fff" : "rgba(255,255,255,0.8)", border: selected ? `1px solid ${GREEN}` : "1px solid transparent", borderRadius: xl ? "10px" : "8px", padding: `${calCellPadV} 0`, fontSize: calCellFontSize, fontFamily: "Arial, Helvetica, sans-serif", fontWeight: selected ? 700 : 400, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.15s", boxShadow: selected ? GLOW : "none", width: "100%" }}
                          onMouseEnter={e => { if (!disabled && !selected) e.currentTarget.style.background = "rgba(3,192,74,0.1)"; }}
                          onMouseLeave={e => { if (!disabled && !selected) e.currentTarget.style.background = "transparent"; }}
                        >{day}</button>
                      );
                    })}
                  </div>
                  <p style={{ fontSize: isMobile ? "0.65rem" : xl ? "0.82rem" : "0.72rem", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.25)", marginTop: xl ? "1.5rem" : "1rem", textAlign: "center" }}>
                    Your timezone: {timezone}
                  </p>
                </div>

                {/* Time slots */}
                <div style={card}>
                  <p style={{ fontSize: labelSize, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", marginBottom: xl ? "1.5rem" : "1rem" }}>
                    {selectedDate ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "Select a date first"}
                  </p>
                  {!selectedDate && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: xl ? "280px" : "200px" }}>
                      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: bodySize, fontFamily: "Arial, Helvetica, sans-serif" }}>← Pick a date to see availability</p>
                    </div>
                  )}
                  {loadingSlots && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: xl ? "280px" : "200px" }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: xl ? "32px" : "24px", height: xl ? "32px" : "24px", border: "2px solid rgba(3,192,74,0.3)", borderTop: `2px solid ${GREEN}`, borderRadius: "50%" }} />
                    </div>
                  )}
                  {!loadingSlots && selectedDate && slots.length === 0 && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: xl ? "280px" : "200px" }}>
                      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: bodySize, fontFamily: "Arial, Helvetica, sans-serif" }}>No slots available on this day</p>
                    </div>
                  )}
                  {!loadingSlots && slots.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: slotCols, gap: slotGap, maxHeight: slotMaxH, overflowY: "auto", paddingRight: "4px" }}>
                      {slots.map(slot => (
                        <button key={slot} onClick={() => setSelectedTime(slot)} style={slotBtn(selectedTime === slot)}
                          onMouseEnter={e => { if (selectedTime !== slot) e.currentTarget.style.borderColor = GREEN; }}
                          onMouseLeave={e => { if (selectedTime !== slot) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                          {fmt12(slot)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginTop: xl ? "2rem" : "1.5rem", display: "flex", justifyContent: "flex-end" }}>
                <button disabled={!selectedDate || !selectedTime} onClick={() => setStep(2)}
                  className={selectedDate && selectedTime ? "btn-shimmer" : ""}
                  style={selectedDate && selectedTime ? ctaActive : ctaDisabled}>
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div key="step2" {...slide}>
              <div style={{ ...card, maxWidth: formMaxW }}>
                <p style={{ fontSize: labelSize, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", marginBottom: xl ? "2rem" : "1.5rem" }}>Your Details</p>
                <div style={{ display: "flex", flexDirection: "column", gap: xl ? "1.4rem" : "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: xl && !isMobile ? "1fr 1fr" : "1fr", gap: xl ? "1.25rem" : "1rem" }}>
                    <div>
                      <label style={{ fontSize: isMobile ? "0.76rem" : xl ? "0.9rem" : "0.82rem", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.4rem" }}>Full Name *</label>
                      <input style={inputStyle} placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: isMobile ? "0.76rem" : xl ? "0.9rem" : "0.82rem", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.4rem" }}>Email Address *</label>
                      <input style={inputStyle} placeholder="john@example.com" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: isMobile ? "0.76rem" : xl ? "0.9rem" : "0.82rem", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.4rem" }}>Tell us about your project</label>
                    <textarea style={{ ...inputStyle, minHeight: textareaMinH, resize: "vertical" }} placeholder="What kind of content do you need? Brand video, social reels, product shoot...?" value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: xl ? "2rem" : "1.5rem", display: "flex", gap: "1rem", justifyContent: "flex-end", maxWidth: formMaxW }}>
                <button onClick={() => setStep(1)} style={backBtn}>← Back</button>
                <button disabled={!form.name || !form.email} onClick={() => setStep(3)}
                  className={form.name && form.email ? "btn-shimmer" : ""}
                  style={form.name && form.email ? ctaActive : ctaDisabled}>
                  Review Booking →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <motion.div key="step3" {...slide}>
              <div style={{ ...card, maxWidth: confirmMaxW }}>
                <p style={{ fontSize: labelSize, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", marginBottom: xl ? "2rem" : "1.5rem" }}>Confirm Booking</p>
                <div style={{ background: "rgba(3,192,74,0.06)", border: "0.5px solid rgba(3,192,74,0.2)", borderRadius: xl ? "14px" : "10px", padding: xl ? "1.75rem 2rem" : "1.25rem 1.5rem", marginBottom: xl ? "2rem" : "1.5rem" }}>
                  <p style={{ fontSize: summaryFontSize, fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, marginBottom: "0.35rem" }}>
                    {selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  <p style={{ color: GREEN, fontSize: xl ? "1.15rem" : "1rem", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 600, marginBottom: "0.35rem" }}>
                    {selectedTime && fmt12(selectedTime)}
                  </p>
                  <p style={{ fontSize: isMobile ? "0.75rem" : xl ? "0.9rem" : "0.8rem", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)" }}>{timezone}</p>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: xl ? "1rem" : "0.9rem" }}>
                  <tbody>
                    {([ ["Name", form.name], ["Email", form.email], form.details ? ["Project", form.details] : null ]
                      .filter((row): row is string[] => row !== null)
                      .map(([k, v]) => (
                        <tr key={k}>
                          <td style={{ padding: xl ? "8px 0" : "6px 0", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", width: xl ? "90px" : "80px", verticalAlign: "top" }}>{k}</td>
                          <td style={{ padding: xl ? "8px 0" : "6px 0", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{v}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {error && (
                  <p style={{ color: "#ff5555", fontSize: isMobile ? "0.8rem" : xl ? "0.95rem" : "0.85rem", fontFamily: "Arial, Helvetica, sans-serif", marginTop: "1rem", background: "rgba(255,85,85,0.08)", padding: xl ? "1rem 1.25rem" : "0.75rem 1rem", borderRadius: "8px", border: "0.5px solid rgba(255,85,85,0.3)" }}>
                    {error}
                  </p>
                )}
              </div>
              <div style={{ marginTop: xl ? "2rem" : "1.5rem", display: "flex", gap: "1rem", justifyContent: "flex-end", maxWidth: confirmMaxW }}>
                <button onClick={() => setStep(2)} style={backBtn}>← Back</button>
                <button disabled={submitting} onClick={handleSubmit}
                  className={!submitting ? "btn-shimmer" : ""}
                  style={{ ...ctaActive, background: submitting ? "rgba(3,192,74,0.5)" : BTN_GREEN, cursor: submitting ? "not-allowed" : "pointer", minWidth: xl ? "200px" : "160px" }}>
                  {submitting ? "Confirming..." : "Confirm Booking ✓"}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Success */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}>
              <div style={{ ...card, maxWidth: xl ? "560px" : "480px", textAlign: "center", padding: xl ? "4rem 3rem" : "3rem 2rem" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  style={{ width: xl ? "88px" : "72px", height: xl ? "88px" : "72px", borderRadius: "50%", background: "rgba(3,192,74,0.12)", border: `2px solid ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", marginBottom: xl ? "2rem" : "1.5rem", boxShadow: GLOW, fontSize: xl ? "2.4rem" : "2rem", color: GREEN }}>✓</motion.div>
                {/* Success heading — Coolvetica */}
                <h2 style={{ fontSize: xl ? "2rem" : "1.6rem", fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                  You're <span style={{ color: GREEN }}>Booked!</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: xl ? "1.05rem" : "0.95rem", fontFamily: "Arial, Helvetica, sans-serif", marginBottom: xl ? "2.5rem" : "2rem" }}>
                  A confirmation has been sent to <strong style={{ color: "white" }}>{form.email}</strong>. We'll send a meeting link before the call.
                </p>
                <div style={{ background: "rgba(3,192,74,0.06)", border: "0.5px solid rgba(3,192,74,0.15)", borderRadius: xl ? "14px" : "10px", padding: xl ? "1.25rem 1.75rem" : "1rem 1.25rem", marginBottom: xl ? "2.5rem" : "2rem" }}>
                  <p style={{ fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, marginBottom: "0.25rem", fontSize: xl ? "1.05rem" : "0.95rem" }}>
                    {selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </p>
                  <p style={{ color: GREEN, fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 600, fontSize: xl ? "1rem" : "0.9rem" }}>
                    {selectedTime && fmt12(selectedTime)} · {timezone}
                  </p>
                </div>
                <Link href="/" className="btn-shimmer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: BTN_GREEN, color: "#fff", padding: xl ? "1rem 2.5rem" : "0.85rem 2rem", borderRadius: "9999px", fontWeight: 700, fontFamily: "Arial, Helvetica, sans-serif", fontSize: xl ? "1rem" : "0.9rem", textDecoration: "none", boxShadow: GLOW, overflow: "hidden" }}>
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}