"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import ScrollReveal from "../ui/ScrollReveal";
import FadeIn from "../ui/FadeIn";
import { useBreakpoint } from "../hooks/useBreakpoint";

const BTN_GREEN = "#1B5E34";
const ACCENT    = "#03C04A";

const REEL_SRC = "https://thzrymlstodkdybfzovu.supabase.co/storage/v1/object/public/Landing%20page%20videos/SaaS%20RFS%20COMPRESSED.mp4";

// ── MuteButton ───────────────────────────────────────────────────────────────
function MuteButton({
  isMuted,
  isVisible,
  onToggle,
  size = 36,
}: {
  isMuted: boolean;
  isVisible: boolean;
  onToggle: () => void;
  size?: number;
}) {
  const iconSize = Math.round(size * 0.44);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      style={{
        position: "absolute",
        bottom: "12px",
        right: "12px",
        zIndex: 10,
        width:  `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.55)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.85)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        pointerEvents: "auto",
      }}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}

export default function About() {
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  const videoRef                            = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted]               = useState(true);
  const [isHovering, setIsHovering]         = useState(false);
  const [isTouchDevice, setIsTouchDevice]   = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted  = isMuted;
    el.volume = isMuted ? 0 : 1;
  }, [isMuted]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const scheduleRetry = () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        if (!el || el.readyState >= 3 || !el.paused) return;
        el.play().catch(() => {});
      }, 2000);
    };
    const cancelRetry = () => { if (timer) { clearTimeout(timer); timer = null; } };
    el.addEventListener("stalled", scheduleRetry);
    el.addEventListener("waiting", scheduleRetry);
    el.addEventListener("playing", cancelRetry);
    el.addEventListener("canplay", cancelRetry);
    return () => {
      cancelRetry();
      el.removeEventListener("stalled", scheduleRetry);
      el.removeEventListener("waiting", scheduleRetry);
      el.removeEventListener("playing", cancelRetry);
      el.removeEventListener("canplay", cancelRetry);
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const handle = () => {
      if (document.hidden) el.pause();
      else el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  const toggleMute = useCallback(() => setIsMuted(prev => !prev), []);
  const muteVisible = isTouchDevice ? true : isHovering;

  // ── Container ──────────────────────────────────────────────────────────────
  const maxWidth = isMobile
    ? "100%"
    : isTablet
    ? "100%"
    : isLaptop
    ? "min(100rem, 96vw)"
    : isDesktop
    ? "min(110rem, 94vw)"
    : is2K
    ? "min(130rem, 93vw)"
    : "min(160rem, 95vw)";

  const paddingH = isMobile
    ? "1.25rem" : isTablet
    ? "1.75rem" : isLaptop
    ? "2rem"    : isDesktop
    ? "2.5rem"  : is2K
    ? "1.5rem"  : "0.75rem";

  const paddingY = isMobile
    ? "3rem"  : isTablet
    ? "4rem"  : isLaptop
    ? "6rem"  : isDesktop
    ? "7.5rem": is2K
    ? "9rem"  : "11rem";

  // ── Section header ─────────────────────────────────────────────────────────
  const topperFont = isMobile
    ? "0.68rem" : isTablet
    ? "0.72rem" : isLaptop
    ? "0.78rem" : isDesktop
    ? "0.9rem"  : is2K
    ? "1rem"    : "1.25rem";

  const h2Size = isMobile
    ? "clamp(2rem, 8vw, 3rem)"
    : isTablet
    ? "clamp(2.2rem, 5vw, 3.2rem)"
    : isLaptop
    ? "clamp(2.8rem, 4vw, 4rem)"
    : isDesktop
    ? "clamp(3.5rem, 4vw, 5rem)"
    : is2K
    ? "clamp(4.5rem, 4vw, 6rem)"
    : "clamp(5.5rem, 4vw, 7.5rem)";

  const headerMB = isMobile
    ? "2.5rem"  : isTablet
    ? "3rem"    : isLaptop
    ? "4rem"    : isDesktop
    ? "5rem"    : is2K
    ? "6rem"    : "7.5rem";

  // ── Two-column split ───────────────────────────────────────────────────────
  const splitCols = isMobile || isTablet ? "1fr" : "1fr 1fr";

  const splitGap = isMobile
    ? "2.5rem"  : isTablet
    ? "3rem"    : isLaptop
    ? "5rem"    : isDesktop
    ? "7rem"    : is2K
    ? "8rem"    : "10rem";

  // ── Left copy ──────────────────────────────────────────────────────────────
  const bodyFont = isMobile
    ? "0.92rem" : isTablet
    ? "0.98rem" : isLaptop
    ? "1.05rem" : isDesktop
    ? "1.2rem"  : is2K
    ? "1.5rem"  : "1.9rem";

  const bodyMB = isMobile
    ? "1.25rem" : isTablet
    ? "1.4rem"  : isLaptop
    ? "1.6rem"  : isDesktop
    ? "1.85rem" : is2K
    ? "2.25rem" : "2.75rem";

  const learnMoreFont = isMobile
    ? "0.78rem" : isTablet
    ? "0.85rem" : isLaptop
    ? "0.9rem"  : isDesktop
    ? "1rem"    : is2K
    ? "1.25rem" : "1.55rem";

  const learnMoreMT = isMobile
    ? "1.75rem" : isTablet
    ? "2rem"    : isLaptop
    ? "2.5rem"  : isDesktop
    ? "3rem"    : is2K
    ? "3.75rem" : "4.75rem";

  // ── Video ──────────────────────────────────────────────────────────────────
  const videoRadius = isMobile
    ? "12px"  : isTablet
    ? "14px"  : isLaptop
    ? "16px"  : isDesktop
    ? "20px"  : is2K
    ? "24px"  : "28px";

  const muteSize = isMobile
    ? 32  : isTablet
    ? 36  : isLaptop
    ? 38  : isDesktop
    ? 42  : is2K
    ? 50  : 62;

  return (
    <section
      id="about"
      style={{
        background: "#000000",
        color: "#ffffff",
        position: "relative",
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: paddingH,
        paddingRight: paddingH,
      }}
    >
      {/* Top fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "300px",
        pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "300px",
        pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      }} />

      <div style={{ maxWidth, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* ── Section header ── */}
        <ScrollReveal variant="fadeLeft">
          <p style={{
            fontSize: topperFont,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 400,
            color: "white",
            textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
            marginBottom: "0.75rem",
            textAlign: isMobile ? "center" : "left",
          }}>
            Who We Are
          </p>
          <h2 style={{
            fontSize: h2Size,
            fontFamily: "'Coolvetica', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.01em",
            lineHeight: 1.08,
            marginBottom: headerMB,
            color: "#ffffff",
            textAlign: isMobile ? "center" : "left",
          }}>
            Built by Creators,<br />for Creators
          </h2>
        </ScrollReveal>

        {/* ── Two-column split: copy + video ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: splitCols,
          gap: splitGap,
          alignItems: "center",
        }}>

          {/* ── Left: copy ── */}
          <ScrollReveal variant="fadeLeft">
            <p style={{
              fontSize: bodyFont,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
              marginBottom: bodyMB,
            }}>
                We understand how much effort goes into creating content because we've been on the creative side ourselves.</p>
            <p style={{
              fontSize: bodyFont,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
              marginBottom: bodyMB,
            }}>
                RazorFrame Studios was built to help creators and brands focus on what they do best while we handle the editing, production, and creative execution behind the scenes.</p>
            <p style={{
              fontSize: bodyFont,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
            }}>
              Our goal is simple: create content that looks great, feels authentic, and keeps people watching.
            </p>

            <motion.div
              style={{ marginTop: learnMoreMT }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: BTN_GREEN,
                  textShadow: "0 0 20px rgba(3,192,74,0.7)",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: learnMoreFont,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  transition: "gap 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.gap = "0.85rem"; }}
                onMouseLeave={e => { e.currentTarget.style.gap = "0.5rem"; }}
              >
                Learn More About Us <span>→</span>
              </Link>
            </motion.div>
          </ScrollReveal>

          {/* ── Right: video ── */}
          <ScrollReveal variant="fadeRight">
            <motion.div
              style={{ position: "relative" }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glow halo */}
              <div style={{
                position: "absolute",
                inset: is2K ? "-32px" : isDesktop ? "-28px" : "-16px",
                borderRadius: "28px",
                background: "radial-gradient(ellipse, rgba(3,192,74,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                  borderRadius: videoRadius,
                  overflow: "hidden",
                  border: "0.5px solid rgba(3,192,74,0.2)",
                  aspectRatio: "16/9",
                  background: "#111111",
                  position: "relative",
                  transform: "translateZ(0)",
                  WebkitTransform: "translateZ(0)",
                  willChange: "transform",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload={isMobile ? "metadata" : "auto"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                >
                  <source src={REEL_SRC} type="video/mp4" />
                </video>
                <MuteButton
                  isMuted={isMuted}
                  isVisible={muteVisible}
                  onToggle={toggleMute}
                  size={muteSize}
                />
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}