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
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  // ── Layout / container ──────────────────────────────────────────────────────
  const maxWidth = isMobile
    ? "100%"
    : isTablet
    ? "min(960px, 94vw)"
    : isLaptop
    ? "min(100rem, 96vw)"
    : isDesktop
    ? "min(110rem, 94vw)"
    : is2K
    ? "min(130rem, 93vw)"
    : "min(160rem, 95vw)";

  const containerPadTop = isMobile ? "5.5rem" : isTablet ? "7.5rem" : isLaptop ? "9rem" : isDesktop ? "10rem" : is2K ? "12rem" : "14rem";
  const containerPadBot = isMobile ? "3rem"   : isTablet ? "4rem"   : isLaptop ? "5rem" : isDesktop ? "6rem"  : is2K ? "8rem"  : "10rem";
  const containerPadH   = isMobile ? "1.25rem": isTablet ? "1.75rem": isLaptop ? "2rem" : isDesktop ? "2.5rem": is2K ? "1.5rem": "0.75rem";

  // ── Typography ──────────────────────────────────────────────────────────────
  const headingSize = isMobile
    ? "clamp(1.8rem, 7vw, 2.4rem)"
    : isTablet
    ? "clamp(2.2rem, 5vw, 3rem)"
    : isLaptop
    ? "clamp(2.8rem, 3.5vw, 4rem)"
    : isDesktop
    ? "clamp(3.5rem, 3vw, 5rem)"
    : is2K
    ? "clamp(4.5rem, 3vw, 6rem)"
    : "clamp(6rem, 3vw, 8rem)";

  const labelSize = isMobile ? "0.68rem" : isTablet ? "0.75rem" : isLaptop ? "0.85rem" : isDesktop ? "0.9rem" : is2K ? "1rem" : "1.3rem";
  const bodySize  = isMobile ? "0.88rem" : isTablet ? "0.95rem" : isLaptop ? "1rem"    : isDesktop ? "1.1rem" : is2K ? "1.25rem" : "1.6rem";

  // ── Cards ───────────────────────────────────────────────────────────────────
  const cardPad    = isMobile ? "1.1rem" : isTablet ? "1.5rem" : isLaptop ? "2rem" : isDesktop ? "2.5rem" : is2K ? "3rem" : "4rem";
  const cardRadius = isMobile ? "12px"   : isTablet ? "14px"   : isLaptop ? "16px" : isDesktop ? "20px"   : is2K ? "24px" : "28px";

  // ── Step indicator ─────────────────────────────────────────────────────────
  const dotSize      = isMobile ? 26 : isTablet ? 30 : isLaptop ? 36 : isDesktop ? 42 : is2K ? 52 : 64;
  const connectorW   = isMobile ? "18px" : isTablet ? "32px" : isLaptop ? "48px" : isDesktop ? "64px" : is2K ? "80px" : "100px";
  const stepLabelSize= isMobile ? "0.75rem" : isTablet ? "0.82rem" : isLaptop ? "0.9rem" : isDesktop ? "1rem" : is2K ? "1.2rem" : "1.5rem";

  // ── Calendar ────────────────────────────────────────────────────────────────
  const calCellPadV    = isMobile ? "0.38rem" : isTablet ? "0.5rem"  : isLaptop ? "0.65rem" : isDesktop ? "0.8rem"  : is2K ? "1rem"   : "1.3rem";
  const calCellFont    = isMobile ? "0.78rem" : isTablet ? "0.86rem" : isLaptop ? "0.95rem" : isDesktop ? "1.05rem" : is2K ? "1.2rem" : "1.5rem";
  const calHeaderFont  = isMobile ? "0.62rem" : isTablet ? "0.68rem" : isLaptop ? "0.75rem" : isDesktop ? "0.82rem" : is2K ? "0.95rem": "1.2rem";
  const calTitleFont   = isMobile ? "0.9rem"  : isTablet ? "1rem"    : isLaptop ? "1.1rem"  : isDesktop ? "1.25rem" : is2K ? "1.5rem" : "1.9rem";
  const calGap         = isMobile ? "3px"     : isTablet ? "4px"     : isLaptop ? "5px"     : isDesktop ? "6px"     : is2K ? "8px"    : "10px";
  const calNavFont     = isMobile ? "1rem"    : isTablet ? "1.2rem"  : isLaptop ? "1.4rem"  : isDesktop ? "1.6rem"  : is2K ? "2rem"   : "2.5rem";
  const calCellRadius  = isMobile ? "8px"     : isTablet ? "9px"     : isLaptop ? "10px"    : isDesktop ? "12px"    : is2K ? "14px"   : "16px";

  // ── Time slots ──────────────────────────────────────────────────────────────
  const slotCols    = isLaptop || isDesktop || is2K || is4K ? "1fr 1fr 1fr" : "1fr 1fr";
  const slotGap     = isMobile ? "0.4rem" : isTablet ? "0.5rem" : isLaptop ? "0.6rem" : isDesktop ? "0.7rem" : is2K ? "0.9rem" : "1.1rem";
  const slotFont    = isMobile ? "0.82rem" : isTablet ? "0.9rem" : isLaptop ? "0.95rem" : isDesktop ? "1.05rem" : is2K ? "1.2rem" : "1.5rem";
  const slotPad     = isMobile ? "0.55rem 0.7rem" : isTablet ? "0.65rem 0.85rem" : isLaptop ? "0.75rem 1rem" : isDesktop ? "0.9rem 1.2rem" : is2K ? "1.1rem 1.5rem" : "1.4rem 1.8rem";
  const slotMaxH    = isMobile ? "280px" : isTablet ? "340px" : isLaptop ? "400px" : isDesktop ? "480px" : is2K ? "560px" : "680px";

  // ── Form / confirm ──────────────────────────────────────────────────────────
  const formMaxW      = isMobile ? "100%" : isTablet ? "min(640px,100%)" : isLaptop ? "min(800px,100%)" : isDesktop ? "min(960px,100%)" : is2K ? "min(1100px,100%)" : "min(1300px,100%)";
  const confirmMaxW   = isMobile ? "100%" : isTablet ? "min(560px,100%)" : isLaptop ? "min(680px,100%)" : isDesktop ? "min(800px,100%)" : is2K ? "min(960px,100%)" : "min(1100px,100%)";
  const inputPad      = isMobile ? "0.75rem 0.9rem" : isTablet ? "0.85rem 1rem" : isLaptop ? "0.95rem 1.1rem" : isDesktop ? "1.1rem 1.25rem" : is2K ? "1.3rem 1.5rem" : "1.6rem 1.8rem";
  const inputFont     = isMobile ? "0.9rem" : isTablet ? "0.95rem" : isLaptop ? "1rem" : isDesktop ? "1.05rem" : is2K ? "1.2rem" : "1.5rem";
  const inputRadius   = isMobile ? "10px" : isTablet ? "10px" : isLaptop ? "12px" : isDesktop ? "12px" : is2K ? "14px" : "16px";
  const textareaMinH  = isMobile ? "100px" : isTablet ? "110px" : isLaptop ? "130px" : isDesktop ? "160px" : is2K ? "190px" : "220px";
  const summaryFont   = isMobile ? "1rem" : isTablet ? "1.1rem" : isLaptop ? "1.2rem" : isDesktop ? "1.4rem" : is2K ? "1.7rem" : "2.1rem";

  // ── CTA / buttons ───────────────────────────────────────────────────────────
  const ctaPad    = isMobile ? "0.75rem 2rem" : isTablet ? "0.85rem 2.25rem" : isLaptop ? "0.95rem 2.5rem" : isDesktop ? "1.1rem 3rem" : is2K ? "1.3rem 3.5rem" : "1.6rem 4.5rem";
  const ctaFont   = isMobile ? "0.9rem" : isTablet ? "0.95rem" : isLaptop ? "1rem" : isDesktop ? "1.1rem" : is2K ? "1.3rem" : "1.6rem";
  const ctaMinW   = isMobile ? "140px" : isTablet ? "160px" : isLaptop ? "180px" : isDesktop ? "200px" : is2K ? "230px" : "280px";
  const ctaRadius = "9999px";
  const backBtnPad= isMobile ? "0.75rem 1.5rem" : isTablet ? "0.85rem 1.75rem" : isLaptop ? "0.95rem 2rem" : isDesktop ? "1.1rem 2.5rem" : is2K ? "1.3rem 3rem" : "1.6rem 3.5rem";

  // ── Step 1 grid ─────────────────────────────────────────────────────────────
  const step1Cols  = isMobile || isTablet ? "1fr" : "1fr 1fr";
  const step1Gap   = isMobile ? "1.25rem" : isTablet ? "1.5rem" : isLaptop ? "2rem" : isDesktop ? "2.5rem" : is2K ? "3rem" : "4rem";

  // ── Section header margins ───────────────────────────────────────────────────
  const headerMB   = isMobile ? "1.75rem" : isTablet ? "2rem" : isLaptop ? "2.5rem" : isDesktop ? "3rem" : is2K ? "3.5rem" : "4.5rem";
  const stepsMB    = isMobile ? "1.75rem" : isTablet ? "2rem" : isLaptop ? "2.5rem" : isDesktop ? "3rem" : is2K ? "3.5rem" : "4.5rem";
  const navMB      = isMobile ? "1.75rem" : isTablet ? "2rem" : isLaptop ? "2.5rem" : isDesktop ? "3rem" : is2K ? "3.5rem" : "4.5rem";
  const ctaMT      = isMobile ? "1.5rem"  : isTablet ? "1.75rem" : isLaptop ? "2rem" : isDesktop ? "2.25rem" : is2K ? "2.75rem" : "3.5rem";

  // Success card sizing
  const successCheckSize = isMobile ? "72px" : isTablet ? "80px" : isLaptop ? "90px" : isDesktop ? "100px" : is2K ? "120px" : "150px";
  const successCheckFont = isMobile ? "2rem" : isTablet ? "2.2rem" : isLaptop ? "2.5rem" : isDesktop ? "2.8rem" : is2K ? "3.5rem" : "4.5rem";
  const successH2Font    = isMobile ? "1.6rem" : isTablet ? "1.8rem" : isLaptop ? "2rem" : isDesktop ? "2.4rem" : is2K ? "3rem" : "3.8rem";
  const successCardMaxW  = isMobile ? "100%" : isTablet ? "480px" : isLaptop ? "560px" : isDesktop ? "660px" : is2K ? "800px" : "1000px";
  const successCardPad   = isMobile ? "2rem 1.5rem" : isTablet ? "2.5rem 2rem" : isLaptop ? "3rem 2.5rem" : isDesktop ? "3.5rem 3rem" : is2K ? "4rem 3.5rem" : "5rem 4rem";

  // ── State ──────────────────────────────────────────────────────────────────
  const [step, setStep]                 = useState(1);
  const [viewYear, setViewYear]         = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth]       = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots]               = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [timezone, setTimezone]         = useState("UTC");
  const [form, setForm]                 = useState({ name: "", email: "", details: "" });
  const [submitting, setSubmitting]     = useState(false);
  const [error, setError]               = useState("");

  useEffect(() => { setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone); }, []);

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true); setSlots([]); setSelectedTime(null);
    fetch(`/api/bookings/availability?date=${selectedDate}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setSlots(d.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const today = new Date(); today.setHours(0,0,0,0);
  const cells = buildCalendar(viewYear, viewMonth);

  const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y-1); setViewMonth(11); } else setViewMonth(m => m-1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y+1); setViewMonth(0); } else setViewMonth(m => m+1); };
  const isDisabled = (day: number) => { const d = new Date(viewYear, viewMonth, day); return d < today || d.getDay() === 0 || d.getDay() === 6; };

  async function handleSubmit() {
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Invalid email."); return; }
    setError(""); setSubmitting(true);
    let res: Response;
    try {
      res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, date: selectedDate, timeSlot: selectedTime, timezone }) });
    } catch { setError("Network error. Please check your connection and try again."); setSubmitting(false); return; }
    let data: { error?: string } = {};
    try { data = await res.json(); } catch { setError("Unexpected server response. Please try again."); setSubmitting(false); return; }
    setSubmitting(false);
    if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
    setStep(4);
  }

  // ── Shared style objects ──────────────────────────────────────────────────
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
    fontSize: slotFont,
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
    fontSize: inputFont,
    fontFamily: "Arial, Helvetica, sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const ctaActive: React.CSSProperties = {
    background: BTN_GREEN, color: "#fff", border: "none",
    borderRadius: ctaRadius, padding: ctaPad,
    fontWeight: 700, fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: ctaFont, cursor: "pointer", boxShadow: GLOW,
    transition: "all 0.25s", minWidth: ctaMinW,
    overflow: "hidden", position: "relative" as const,
  };

  const ctaDisabled: React.CSSProperties = {
    ...ctaActive,
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.25)",
    boxShadow: "none", cursor: "not-allowed",
  };

  const backBtn: React.CSSProperties = {
    background: "none", border: "0.5px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.5)", borderRadius: ctaRadius,
    padding: backBtnPad, cursor: "pointer",
    fontSize: ctaFont, fontFamily: "Arial, Helvetica, sans-serif",
  };

  const labelRowStyle: React.CSSProperties = {
    fontSize: isMobile ? "0.76rem" : isTablet ? "0.82rem" : isLaptop ? "0.88rem" : isDesktop ? "0.95rem" : is2K ? "1.1rem" : "1.4rem",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.4rem",
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "white", overflowX: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1, maxWidth, margin: "0 auto", padding: `${containerPadTop} ${containerPadH} ${containerPadBot}` }}>

        {/* Back link */}
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          color: "rgba(255,255,255,0.35)",
          fontSize: isMobile ? "0.8rem" : isTablet ? "0.85rem" : isLaptop ? "0.9rem" : isDesktop ? "0.95rem" : is2K ? "1.1rem" : "1.4rem",
          fontFamily: "Arial, Helvetica, sans-serif", textDecoration: "none",
          marginBottom: navMB,
        }}>← Back to Home</Link>

        {/* Header */}
        <div style={{ marginBottom: headerMB }}>
          <p style={{ fontSize: labelSize, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "white", marginBottom: isMobile ? "0.4rem" : "0.6rem" }}>
            Free 30-min Call
          </p>
          {/* FIX: letterSpacing "-0.02em" → "0.01em", lineHeight 1.1 → 1.08 */}
          <h1 style={{ fontSize: headingSize, fontFamily: "'Coolvetica', sans-serif", fontWeight: 600, letterSpacing: "0.01em", lineHeight: 1.08, color: "white" }}>
            Book a Strategy Call
          </h1>
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: stepsMB, flexWrap: "wrap" }}>
          {[1,2,3].map(n => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <StepDot n={n} active={step===n} done={step>n} size={dotSize} />
              {n < 3 && <div style={{ width: connectorW, height: "1px", background: step > n ? GREEN : "rgba(255,255,255,0.1)", transition: "background 0.4s" }} />}
            </div>
          ))}
          <span style={{ marginLeft: "0.75rem", fontSize: stepLabelSize, fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
            {step===1 ? "Pick a date & time" : step===2 ? "Your details" : step===3 ? "Confirm" : "Confirmed!"}
          </span>
        </div>

        <AnimatePresence mode="wait">

          {/* ── Step 1 ── */}
          {step === 1 && (
            <motion.div key="step1" {...slide}>
              <div style={{ display: "grid", gridTemplateColumns: step1Cols, gap: step1Gap, alignItems: "start" }}>

                {/* Calendar */}
                <div style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? "1rem" : isTablet ? "1.25rem" : isLaptop ? "1.5rem" : isDesktop ? "1.75rem" : is2K ? "2.25rem" : "3rem" }}>
                    <button onClick={prevMonth} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: calNavFont, cursor: "pointer", padding: "0.25rem 0.5rem", lineHeight: 1 }}>‹</button>
                    <span style={{ fontWeight: 700, fontSize: calTitleFont, fontFamily: "Arial, Helvetica, sans-serif" }}>{MONTHS[viewMonth]} {viewYear}</span>
                    <button onClick={nextMonth} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: calNavFont, cursor: "pointer", padding: "0.25rem 0.5rem", lineHeight: 1 }}>›</button>
                  </div>

                  {/* Day headers */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: calGap, marginBottom: isMobile ? "6px" : isTablet ? "7px" : isLaptop ? "8px" : "10px" }}>
                    {DAYS.map(d => (
                      <div key={d} style={{ textAlign: "center", fontSize: calHeaderFont, fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.3)", padding: "4px 0" }}>
                        {isMobile ? d[0] : d}
                      </div>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: calGap }}>
                    {cells.map((day, i) => {
                      if (!day) return <div key={i} />;
                      const iso      = toISO(new Date(viewYear, viewMonth, day));
                      const disabled = isDisabled(day);
                      const selected = selectedDate === iso;
                      return (
                        <button key={i} disabled={disabled} onClick={() => setSelectedDate(iso)}
                          style={{
                            background: selected ? BTN_GREEN : "transparent",
                            color: disabled ? "rgba(255,255,255,0.15)" : selected ? "#fff" : "rgba(255,255,255,0.8)",
                            border: selected ? `1px solid ${GREEN}` : "1px solid transparent",
                            borderRadius: calCellRadius,
                            padding: `${calCellPadV} 0`,
                            fontSize: calCellFont,
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontWeight: selected ? 700 : 400,
                            cursor: disabled ? "not-allowed" : "pointer",
                            transition: "all 0.15s",
                            boxShadow: selected ? GLOW : "none",
                            width: "100%",
                          }}
                          onMouseEnter={e => { if (!disabled && !selected) e.currentTarget.style.background = "rgba(3,192,74,0.1)"; }}
                          onMouseLeave={e => { if (!disabled && !selected) e.currentTarget.style.background = "transparent"; }}
                        >{day}</button>
                      );
                    })}
                  </div>

                  <p style={{
                    fontSize: isMobile ? "0.65rem" : isTablet ? "0.7rem" : isLaptop ? "0.75rem" : isDesktop ? "0.82rem" : is2K ? "0.95rem" : "1.2rem",
                    fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.25)",
                    marginTop: isMobile ? "1rem" : isTablet ? "1.25rem" : isLaptop ? "1.5rem" : isDesktop ? "1.75rem" : is2K ? "2rem" : "2.5rem",
                    textAlign: "center",
                  }}>Your timezone: {timezone}</p>
                </div>

                {/* Time slots */}
                <div style={card}>
                  <p style={{ fontSize: labelSize, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", marginBottom: isMobile ? "1rem" : isTablet ? "1.25rem" : "1.5rem" }}>
                    {selectedDate
                      ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                      : "Select a date first"}
                  </p>

                  {!selectedDate && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: isMobile ? "160px" : isTablet ? "200px" : isLaptop ? "250px" : isDesktop ? "300px" : is2K ? "360px" : "440px" }}>
                      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: bodySize, fontFamily: "Arial, Helvetica, sans-serif" }}>← Pick a date to see availability</p>
                    </div>
                  )}
                  {loadingSlots && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: isMobile ? "160px" : isTablet ? "200px" : isLaptop ? "250px" : isDesktop ? "300px" : is2K ? "360px" : "440px" }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: isMobile ? "24px" : isTablet ? "28px" : isLaptop ? "30px" : "36px", height: isMobile ? "24px" : isTablet ? "28px" : isLaptop ? "30px" : "36px", border: "2px solid rgba(3,192,74,0.3)", borderTop: `2px solid ${GREEN}`, borderRadius: "50%" }}
                      />
                    </div>
                  )}
                  {!loadingSlots && selectedDate && slots.length === 0 && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: isMobile ? "160px" : isTablet ? "200px" : isLaptop ? "250px" : isDesktop ? "300px" : is2K ? "360px" : "440px" }}>
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

              <div style={{ marginTop: ctaMT, display: "flex", justifyContent: "flex-end" }}>
                <button disabled={!selectedDate || !selectedTime} onClick={() => setStep(2)}
                  className={selectedDate && selectedTime ? "btn-shimmer" : ""}
                  style={selectedDate && selectedTime ? ctaActive : ctaDisabled}>
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <motion.div key="step2" {...slide}>
              <div style={{ ...card, maxWidth: formMaxW }}>
                <p style={{ fontSize: labelSize, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", marginBottom: isMobile ? "1.25rem" : isTablet ? "1.5rem" : isLaptop ? "1.75rem" : isDesktop ? "2rem" : is2K ? "2.5rem" : "3rem" }}>
                  Your Details
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "1rem" : isTablet ? "1.1rem" : isLaptop ? "1.25rem" : isDesktop ? "1.4rem" : is2K ? "1.7rem" : "2.2rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "1rem" : isTablet ? "1.1rem" : isLaptop ? "1.2rem" : isDesktop ? "1.4rem" : is2K ? "1.7rem" : "2.2rem" }}>
                    <div>
                      <label style={labelRowStyle}>Full Name *</label>
                      <input style={inputStyle} placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label style={labelRowStyle}>Email Address *</label>
                      <input style={inputStyle} placeholder="john@example.com" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label style={labelRowStyle}>Tell us about your project</label>
                    <textarea style={{ ...inputStyle, minHeight: textareaMinH, resize: "vertical" }} placeholder="What kind of content do you need? Brand video, social reels, product shoot...?" value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: ctaMT, display: "flex", gap: "1rem", justifyContent: "flex-end", maxWidth: formMaxW }}>
                <button onClick={() => setStep(1)} style={backBtn}>← Back</button>
                <button disabled={!form.name || !form.email} onClick={() => setStep(3)}
                  className={form.name && form.email ? "btn-shimmer" : ""}
                  style={form.name && form.email ? ctaActive : ctaDisabled}>
                  Review Booking →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <motion.div key="step3" {...slide}>
              <div style={{ ...card, maxWidth: confirmMaxW }}>
                <p style={{ fontSize: labelSize, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", marginBottom: isMobile ? "1.25rem" : isTablet ? "1.5rem" : isLaptop ? "1.75rem" : isDesktop ? "2rem" : is2K ? "2.5rem" : "3rem" }}>
                  Confirm Booking
                </p>
                <div style={{
                  background: "rgba(3,192,74,0.06)", border: "0.5px solid rgba(3,192,74,0.2)",
                  borderRadius: isMobile ? "10px" : isTablet ? "11px" : isLaptop ? "13px" : isDesktop ? "14px" : is2K ? "16px" : "20px",
                  padding: isMobile ? "1.1rem 1.4rem" : isTablet ? "1.25rem 1.5rem" : isLaptop ? "1.4rem 1.75rem" : isDesktop ? "1.75rem 2rem" : is2K ? "2.1rem 2.4rem" : "2.6rem 3rem",
                  marginBottom: isMobile ? "1.25rem" : isTablet ? "1.5rem" : isLaptop ? "1.75rem" : isDesktop ? "2rem" : is2K ? "2.5rem" : "3rem",
                }}>
                  {/* FIX: letterSpacing "-0.02em" → "0.01em", lineHeight added as 1.08 */}
                  <p style={{ fontSize: summaryFont, fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.08, marginBottom: "0.35rem" }}>
                    {selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  <p style={{ color: GREEN, fontSize: isMobile ? "1rem" : isTablet ? "1.05rem" : isLaptop ? "1.1rem" : isDesktop ? "1.2rem" : is2K ? "1.4rem" : "1.8rem", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 600, marginBottom: "0.35rem" }}>
                    {selectedTime && fmt12(selectedTime)}
                  </p>
                  <p style={{ fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : isLaptop ? "0.85rem" : isDesktop ? "0.9rem" : is2K ? "1rem" : "1.3rem", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)" }}>
                    {timezone}
                  </p>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: isMobile ? "0.88rem" : isTablet ? "0.9rem" : isLaptop ? "0.95rem" : isDesktop ? "1rem" : is2K ? "1.15rem" : "1.4rem" }}>
                  <tbody>
                    {([["Name", form.name],["Email", form.email], form.details ? ["Project", form.details] : null]
                      .filter((row): row is string[] => row !== null)
                      .map(([k, v]) => (
                        <tr key={k}>
                          <td style={{ padding: isMobile ? "6px 0" : isTablet ? "7px 0" : "8px 0", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.35)", width: isMobile ? "70px" : isTablet ? "80px" : isLaptop ? "90px" : isDesktop ? "100px" : is2K ? "120px" : "150px", verticalAlign: "top" }}>{k}</td>
                          <td style={{ padding: isMobile ? "6px 0" : isTablet ? "7px 0" : "8px 0", fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{v}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {error && (
                  <p style={{ color: "#ff5555", fontSize: isMobile ? "0.8rem" : isTablet ? "0.84rem" : isLaptop ? "0.88rem" : isDesktop ? "0.95rem" : is2K ? "1.1rem" : "1.4rem", fontFamily: "Arial, Helvetica, sans-serif", marginTop: "1rem", background: "rgba(255,85,85,0.08)", padding: isMobile ? "0.75rem 1rem" : "1rem 1.25rem", borderRadius: "8px", border: "0.5px solid rgba(255,85,85,0.3)" }}>
                    {error}
                  </p>
                )}
              </div>

              <div style={{ marginTop: ctaMT, display: "flex", gap: "1rem", justifyContent: "flex-end", maxWidth: confirmMaxW }}>
                <button onClick={() => setStep(2)} style={backBtn}>← Back</button>
                <button disabled={submitting} onClick={handleSubmit}
                  className={!submitting ? "btn-shimmer" : ""}
                  style={{ ...ctaActive, background: submitting ? "rgba(3,192,74,0.5)" : BTN_GREEN, cursor: submitting ? "not-allowed" : "pointer" }}>
                  {submitting ? "Confirming..." : "Confirm Booking ✓"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 4 — Success ── */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}>
              <div style={{ ...card, maxWidth: successCardMaxW, textAlign: "center", padding: successCardPad }}>
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  style={{ width: successCheckSize, height: successCheckSize, borderRadius: "50%", background: "rgba(3,192,74,0.12)", border: `2px solid ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", marginBottom: isMobile ? "1.5rem" : isTablet ? "1.75rem" : isLaptop ? "2rem" : isDesktop ? "2.25rem" : is2K ? "2.75rem" : "3.5rem", boxShadow: GLOW, fontSize: successCheckFont, color: GREEN }}
                >✓</motion.div>

                {/* FIX: letterSpacing "-0.02em" → "0.01em", lineHeight added as 1.08 */}
                <h2 style={{ fontSize: successH2Font, fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.08, marginBottom: "0.5rem" }}>
                  You're <span style={{ color: GREEN }}>Booked!</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: bodySize, fontFamily: "Arial, Helvetica, sans-serif", marginBottom: isMobile ? "1.75rem" : isTablet ? "2rem" : isLaptop ? "2.25rem" : isDesktop ? "2.5rem" : is2K ? "3rem" : "3.75rem" }}>
                  A confirmation has been sent to <strong style={{ color: "white" }}>{form.email}</strong>. We'll send a meeting link before the call.
                </p>

                <div style={{ background: "rgba(3,192,74,0.06)", border: "0.5px solid rgba(3,192,74,0.15)", borderRadius: isMobile ? "10px" : isTablet ? "11px" : isLaptop ? "12px" : isDesktop ? "14px" : is2K ? "16px" : "20px", padding: isMobile ? "1rem 1.25rem" : isTablet ? "1.1rem 1.4rem" : isLaptop ? "1.2rem 1.5rem" : isDesktop ? "1.4rem 1.75rem" : is2K ? "1.7rem 2.1rem" : "2.1rem 2.6rem", marginBottom: isMobile ? "1.75rem" : isTablet ? "2rem" : isLaptop ? "2.25rem" : isDesktop ? "2.5rem" : is2K ? "3rem" : "3.75rem" }}>
                  {/* FIX: letterSpacing "-0.02em" → "0.01em", lineHeight added as 1.08 */}
                  <p style={{ fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.08, marginBottom: "0.25rem", fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : isLaptop ? "1.05rem" : isDesktop ? "1.15rem" : is2K ? "1.35rem" : "1.7rem" }}>
                    {selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </p>
                  <p style={{ color: GREEN, fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 600, fontSize: isMobile ? "0.9rem" : isTablet ? "0.95rem" : isLaptop ? "1rem" : isDesktop ? "1.1rem" : is2K ? "1.3rem" : "1.6rem" }}>
                    {selectedTime && fmt12(selectedTime)} · {timezone}
                  </p>
                </div>

                <Link href="/" className="btn-shimmer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: BTN_GREEN, color: "#fff", padding: ctaPad, borderRadius: "9999px", fontWeight: 700, fontFamily: "Arial, Helvetica, sans-serif", fontSize: ctaFont, textDecoration: "none", boxShadow: GLOW, overflow: "hidden" }}>
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