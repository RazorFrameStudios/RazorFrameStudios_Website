"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { useBreakpoint } from "../components/hooks/useBreakpoint";

const BTN_GREEN = "#1B5E34";
const ACCENT    = "#03C04A";

const REEL_SRC = "https://thzrymlstodkdybfzovu.supabase.co/storage/v1/object/public/Landing%20page%20videos/ABOUT%20US%20compressed.mp4";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
}

// ── MuteButton ───────────────────────────────────────────────────────────────
function MuteButton({
  isMuted, isVisible, onToggle, size = 36,
}: {
  isMuted: boolean; isVisible: boolean; onToggle: () => void; size?: number;
}) {
  const iconSize = Math.round(size * 0.44);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      style={{
        position: "absolute", bottom: "12px", right: "12px", zIndex: 10,
        width: `${size}px`, height: `${size}px`, borderRadius: "50%",
        background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
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

const values = [
  {
    icon: "◈",
    title: "Quality Over Quantity",
    description: "We believe great content is remembered, not rushed. Every project is approached with care, creativity, and attention to detail because quality should never be compromised.",
  },
  {
    icon: "▲",
    title: "Built On Trust",
    description: "Strong relationships are built through honesty, communication, and reliability. We value our clients' trust and work hard to earn it with every project we take on.",
  },
  {
    icon: "✦",
    title: "Story Comes First",
    description: "Great content is more than visuals and effects. We focus on creating content that connects with audiences, communicates clearly, and keeps people engaged from start to finish.",
  },
  {
    icon: "◉",
    title: "Growth Through Collaboration",
    description: "The best results come from working together. We work closely with our clients, combining their vision with our creative expertise to create content that supports long-term growth.",
  },
];

// ── Team data — swap imageSrc paths to your actual images ────────────────────
const team = [
  {
    name: "Kunal Dhouni",
    role: "Co-Founder",
    areaHandled: "Client Relations · Content Strategy · Growth",
    bio: "Kunal works closely with clients to understand their goals, content direction, and long-term vision. His focus is building strong partnerships and ensuring every project creates value beyond just great-looking content.",
    imageSrc: "/team/kunal.png",
  },
  {
    name: "Abhyuday Pandey",
    role: "Co-Founder",
    areaHandled: "Editing · Creative Execution · Quality Control",
    bio: "Abhyuday leads the creative side of Razor Frame, transforming raw footage into engaging content that feels polished, purposeful, and true to each client's brand. His focus is creating content people genuinely enjoy watching.",
    imageSrc: "/team/abhyuday.png",
  },
];

// ── ValueCard ─────────────────────────────────────────────────────────────────
function ValueCard({
  value, delay,
  isMobile, isTablet, isLaptop, isDesktop, is2K, is4K,
}: {
  value: typeof values[0]; delay: number;
  isMobile?: boolean; isTablet?: boolean; isLaptop?: boolean;
  isDesktop?: boolean; is2K?: boolean; is4K?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const iconSize  = is4K ? "2.5rem" : is2K ? "2rem"   : isDesktop ? "1.5rem"  : "1.25rem";
  const titleSize = is4K ? "2.5rem" : is2K ? "2rem"   : isDesktop ? "1.5rem"  : isLaptop ? "1.25rem" : "1.1rem";
  const bodySize  = is4K ? "1.4rem" : is2K ? "1.1rem" : isDesktop ? "0.95rem" : "0.875rem";
  const padding   = is4K ? "3rem"   : is2K ? "2.5rem" : isDesktop ? "2rem"    : "1.5rem";

  return (
    <FadeUp delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          padding, borderRadius: "16px",
          background: hovered ? "rgba(3,192,74,0.05)" : "rgba(255,255,255,0.03)",
          border: `0.5px solid ${hovered ? "rgba(3,192,74,0.25)" : "rgba(255,255,255,0.08)"}`,
          transition: "all 0.35s ease",
          height: "100%", boxSizing: "border-box" as const,
          position: "relative" as const, overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "radial-gradient(ellipse at 0% 0%, rgba(3,192,74,0.08) 0%, transparent 60%)" : "transparent",
          transition: "all 0.35s ease", pointerEvents: "none",
        }} />
        <div style={{ fontSize: iconSize, color: ACCENT, marginBottom: is4K ? "1.5rem" : is2K ? "1.25rem" : "1rem" }}>
          {value.icon}
        </div>
        <h3 style={{
          fontSize: titleSize, fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
          color: "white", marginBottom: is4K ? "1rem" : "0.75rem",
          letterSpacing: "0.01em", lineHeight: 1.1,
        }}>
          {value.title}
        </h3>
        <p style={{
          fontSize: bodySize, fontFamily: "Arial, Helvetica, sans-serif",
          color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0,
        }}>
          {value.description}
        </p>
      </motion.div>
    </FadeUp>
  );
}

// ── TeamCard ──────────────────────────────────────────────────────────────────
function TeamCard({
  member, delay,
  isMobile, isTablet, isLaptop, isDesktop, is2K, is4K,
}: {
  member: typeof team[0]; delay: number;
  isMobile?: boolean; isTablet?: boolean; isLaptop?: boolean;
  isDesktop?: boolean; is2K?: boolean; is4K?: boolean;
}) {
  const [hovered, setHovered]   = useState(false);
  const [imgError, setImgError] = useState(false);

  // Circle avatar diameter
  const avatarDiameter = is4K
    ? "280px" : is2K
    ? "260px" : isDesktop
    ? "220px" : isLaptop
    ? "200px" : isTablet
    ? "150px" : "140px";

  const nameFontSize = is4K
    ? "3.1rem" : is2K
    ? "2.7rem"   : isDesktop
    ? "2.3rem" : isLaptop
    ? "1.8rem": "1.15rem";

  const roleFontSize = is4K
    ? "1.7rem" : is2K
    ? "1.3rem"   : isDesktop
    ? "1rem": "0.78rem";

  const areaFontSize = is4K
    ? "1.7rem" : is2K
    ? "1.3rem": isDesktop
    ? "1rem" : "0.72rem";

  const bioFontSize = is4K
    ? "1.7rem": is2K
    ? "1.3rem" : isDesktop
    ? "1.1rem": "0.875rem";

  const padding = is4K
    ? "2.5rem" : is2K
    ? "2rem"   : isDesktop
    ? "1.75rem": "1.5rem";

  const nameMB = is4K ? "0.6rem" : "0.35rem";
  const roleMB = is4K ? "0.4rem" : "0.2rem";
  const areaMB = is4K ? "1.25rem": "1rem";

  return (
    <FadeUp delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          borderRadius: "20px",
          background: hovered ? "rgba(3,192,74,0.04)" : "rgba(255,255,255,0.03)",
          border: `0.5px solid ${hovered ? "rgba(3,192,74,0.25)" : "rgba(255,255,255,0.08)"}`,
          transition: "all 0.35s ease",
          display: "flex",
          flexDirection: "column" as const,
          height: "100%",
          boxSizing: "border-box" as const,
          position: "relative" as const,
        }}
      >
        {/* Subtle glow on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "radial-gradient(ellipse at 50% 0%, rgba(3,192,74,0.06) 0%, transparent 60%)"
            : "transparent",
          transition: "all 0.35s ease", pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── Circle photo ── */}
        <div style={{
          width: "100%",
          paddingTop: is4K ? "3rem" : is2K ? "2.5rem" : "2rem",
          paddingBottom: is4K ? "1.5rem" : "1.25rem",
          display: "flex",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
        }}>

          {/* Circle container */}
          <div style={{
            width: avatarDiameter,
            height: avatarDiameter,
            borderRadius: "100%",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
            border: `0.5px solid black`,
            boxShadow: hovered
              ? "0 0 0 5px rgba(3,192,74,0.08), 0 12px 40px rgba(3,192,74,0.18)"
              : "0 0 0 5px rgba(255,255,255,0.03)",
            transition: "border-color 0.35s ease, box-shadow 0.35s ease",
            background: "linear-gradient(135deg, rgba(3,192,74,0.12) 0%, rgba(27,94,52,0.25) 100%)",
          }}>
            {!imgError ? (
              <img
                src={member.imageSrc}
                alt={member.name}
                onError={() => setImgError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                  transition: "transform 0.5s ease",
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                }}
              />
            ) : (
              // Initials fallback
              <div style={{
                width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontSize: is4K ? "4rem" : is2K ? "3.25rem" : isDesktop ? "2.75rem" : "2.25rem",
                  fontFamily: "'Coolvetica', sans-serif",
                  color: ACCENT, fontWeight: 600,
                  letterSpacing: "0.02em",
                }}>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Text body — centered to match reference ── */}
        <div style={{
          padding, flexGrow: 1,
          display: "flex", flexDirection: "column" as const,
          alignItems: "center", textAlign: "center" as const,
          position: "relative", zIndex: 1,
        }}>
          {/* Name */}
          <h3 style={{
            fontSize: nameFontSize,
            fontFamily: "'Coolvetica', sans-serif",
            fontWeight: 600,
            color: "white",
            marginBottom: nameMB,
            letterSpacing: "0.04em",
            lineHeight: 1.1,
          }}>
            {member.name}
          </h3>

          {/* Role */}
          <p style={{
            fontSize: roleFontSize,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: ACCENT,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            marginBottom: roleMB,
          }}>
            {member.role}
          </p>

          {/* Area handled */}
          <p style={{
            fontSize: areaFontSize,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: areaMB,
            lineHeight: 1.5,
          }}>
            {member.areaHandled}
          </p>

          {/* Divider */}
          <div style={{
            height: "0.5px",
            background: hovered ? "rgba(3,192,74,0.2)" : "rgba(255,255,255,0.07)",
            marginBottom: areaMB,
            transition: "background 0.35s ease",
          }} />

          {/* Bio */}
          <p style={{
            fontSize: bioFontSize,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
            margin: 0,
            flexGrow: 1,
          }}>
            {member.bio}
          </p>
        </div>
      </motion.div>
    </FadeUp>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  const videoRef                          = useRef<HTMLVideoElement>(null);
  const scrubberRef                       = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted]             = useState(true);
  const [isHovering, setIsHovering]       = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [progress, setProgress]           = useState(0);
  const [isDragging, setIsDragging]       = useState(false);

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
    el.addEventListener("stalled",  scheduleRetry);
    el.addEventListener("waiting",  scheduleRetry);
    el.addEventListener("playing",  cancelRetry);
    el.addEventListener("canplay",  cancelRetry);
    return () => {
      cancelRetry();
      el.removeEventListener("stalled",  scheduleRetry);
      el.removeEventListener("waiting",  scheduleRetry);
      el.removeEventListener("playing",  cancelRetry);
      el.removeEventListener("canplay",  cancelRetry);
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const handle = () => { if (document.hidden) el.pause(); else el.play().catch(() => {}); };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const update = () => { if (el.duration) setProgress(el.currentTime / el.duration); };
    el.addEventListener("timeupdate", update);
    return () => el.removeEventListener("timeupdate", update);
  }, []);

  const seekToFraction = useCallback((clientX: number) => {
    const bar = scrubberRef.current;
    const el  = videoRef.current;
    if (!bar || !el || !el.duration) return;
    const { left, width } = bar.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (clientX - left) / width));
    el.currentTime = fraction * el.duration;
    setProgress(fraction);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging) seekToFraction(e.clientX); };
    const onMouseUp   = () => setIsDragging(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
    };
  }, [isDragging, seekToFraction]);

  const toggleMute  = useCallback(() => setIsMuted(prev => !prev), []);
  const muteVisible = isTouchDevice ? true : isHovering;

  // ── Layout tokens ─────────────────────────────────────────────────────────
  const maxWidth = isMobile
    ? "100%" : isTablet
    ? "100%" : isLaptop
    ? "min(100rem, 96vw)" : isDesktop
    ? "min(110rem, 94vw)" : is2K
    ? "min(130rem, 93vw)" : "min(160rem, 95vw)";

  const sectionPaddingH = isMobile
    ? "1.25rem" : isTablet
    ? "1.75rem" : isLaptop
    ? "2rem"    : isDesktop
    ? "2.5rem"  : is2K
    ? "1.5rem"  : "0.75rem";

  const sectionPaddingV = isMobile
    ? "4rem"  : isTablet
    ? "5rem"  : isLaptop
    ? "6rem"  : isDesktop
    ? "7rem"  : is2K
    ? "8.5rem": "10rem";

  const heroPaddingTop = isMobile
    ? "8rem"  : isTablet
    ? "9rem"  : isLaptop
    ? "10rem" : isDesktop
    ? "12rem" : is2K
    ? "10rem" : "11rem";

  const heroH1Size = isMobile
    ? "clamp(2.5rem, 10vw, 3.5rem)"
    : isTablet
    ? "clamp(2.5rem, 7vw, 4.5rem)"
    : isLaptop
    ? "clamp(3rem, 6vw, 5rem)"
    : isDesktop
    ? "clamp(4rem, 6vw, 6.5rem)"
    : is2K
    ? "clamp(5rem, 5.5vw, 7.5rem)"
    : "clamp(6rem, 5vw, 8.5rem)";

  const heroBodySize = isMobile
    ? "0.95rem" : isTablet
    ? "1rem"    : isLaptop
    ? "1.15rem" : isDesktop
    ? "1.25rem" : is2K
    ? "1.5rem"  : "2rem";

  const eyebrowSize = isMobile
    ? "0.7rem"  : isTablet
    ? "0.75rem" : isLaptop
    ? "0.8rem"  : isDesktop
    ? "0.85rem" : is2K
    ? "0.9rem"  : "2rem";

  const sectionH2Size = is4K
    ? "clamp(8rem, 3.2vw, 4.5rem)"
    : is2K
    ? "clamp(2.8rem, 3vw, 4rem)"
    : isDesktop
    ? "clamp(2.5rem, 2.8vw, 3.8rem)"
    : isLaptop
    ? "clamp(2.5rem, 2.8vw, 3.8rem)"
    : "clamp(2rem, 3.5vw, 3rem)";

  const valuesGridCols = isMobile
    ? "1fr" : isTablet
    ? "repeat(2, 1fr)" : isLaptop
    ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  // 2 team cards — side by side on tablet+, full width stacked on mobile
  const teamGridCols = isMobile ? "1fr" : "repeat(2, 1fr)";

  const gridGap = isMobile
    ? "1rem"    : isTablet
    ? "1.25rem" : isLaptop
    ? "1.5rem"  : isDesktop
    ? "1.75rem" : is2K
    ? "2.25rem" : "2.75rem";

  const missionBodySize = is4K
    ? "2rem"   : is2K
    ? "1.5rem" : isDesktop
    ? "1.2rem" : isLaptop
    ? "1.1rem" : "0.95rem";

  const missionBodyMB = is4K ? "2rem" : is2K ? "1.75rem" : "1.5rem";

  const missionGridCols = isMobile || isTablet ? "1fr" : "1fr 1fr";

  const missionGap = isMobile
    ? "2rem"  : isTablet
    ? "2.5rem": isLaptop
    ? "5rem"  : isDesktop
    ? "7rem"  : is2K
    ? "8rem"  : "10rem";

  const dividerStyle = {
    height: "1px",
    background: "rgba(255,255,255,0.07)",
    maxWidth,
    margin: "0 auto",
  };

  const buttonFontSize = is4K ? "1.7rem" : is2K ? "1.2rem" : isLaptop ? "1rem" : "0.9rem";
  const buttonPadding  = is4K ? "1.25rem 3rem" : is2K ? "1.15rem 2.5rem" : isLaptop ? "1rem 2.25rem" : "0.8rem 1.75rem";

  const videoMaxWidth = isMobile
    ? "100%" : isTablet
    ? "100%" : isLaptop
    ? "60rem" : isDesktop
    ? "72rem" : is2K
    ? "90rem" : "110rem";

  const videoRadius = isMobile
    ? "12px" : isTablet
    ? "14px" : isLaptop
    ? "16px" : isDesktop
    ? "20px" : is2K
    ? "24px" : "28px";

  const muteSize = isMobile
    ? 32 : isTablet
    ? 36 : isLaptop
    ? 38 : isDesktop
    ? 42 : is2K
    ? 50 : 62;

  return (
    <main style={{ background: "#000000", color: "white", overflowX: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Hero ── */}
        <section style={{
          paddingTop: heroPaddingTop,
          paddingBottom: isMobile ? "3rem" : isTablet ? "4rem" : isLaptop ? "5rem" : isDesktop ? "6rem" : is2K ? "7rem" : "8rem",
          paddingLeft: sectionPaddingH, paddingRight: sectionPaddingH,
          maxWidth, margin: "0 auto",
        }}>
          <FadeUp>
            <p style={{
              fontSize: eyebrowSize, letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "white", marginBottom: "1rem",
            }}>Who We Are</p>
            <h1 style={{
              fontSize: heroH1Size, fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
              letterSpacing: "0.01em", lineHeight: 1.08, color: "white", marginBottom: "1.5rem",
              maxWidth: is4K ? "2200px" : is2K ? "1600px" : isDesktop ? "1000px" : isLaptop ? "600px" : "700px",
            }}>
              Built by Creators,<br />for Creators
            </h1>
            <p style={{
              fontSize: heroBodySize, fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              maxWidth: is4K ? "1400px" : is2K ? "1000px" : isDesktop ? "700px" : isLaptop ? "500px" : "600px",
              lineHeight: 1.75,
            }}>
              Razor Frame is a creative content agency built to help creators and brands scale their content without sacrificing quality. We combine strategy, storytelling, and editing to create content that connects with audiences and supports long-term growth.
            </p>
          </FadeUp>
        </section>

        <div style={dividerStyle}><div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} /></div>

        {/* ── Video Player ── */}
        <section style={{ padding: `${sectionPaddingV} ${sectionPaddingH}`, maxWidth, margin: "0 auto" }}>
          <div style={{ maxWidth: videoMaxWidth, margin: "0 auto" }}>
            <FadeUp delay={0.1}>
              <div style={{ position: "relative" }}>
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
                    borderRadius: videoRadius, overflow: "hidden",
                    border: "0.5px solid rgba(3,192,74,0.2)",
                    aspectRatio: "16/9", background: "#111111",
                    position: "relative",
                    transform: "translateZ(0)", WebkitTransform: "translateZ(0)", willChange: "transform",
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay loop muted playsInline
                    preload={isMobile ? "metadata" : "auto"}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  >
                    <source src={REEL_SRC} type="video/mp4" />
                  </video>
                  <MuteButton isMuted={isMuted} isVisible={muteVisible} onToggle={toggleMute} size={muteSize} />

                  {/* Scrubber */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "0 14px 12px",
                    opacity: isHovering ? 1 : 0,
                    transition: "opacity 0.2s ease", zIndex: 10,
                  }}>
                    <div
                      ref={scrubberRef}
                      onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); seekToFraction(e.clientX); }}
                      onClick={(e) => seekToFraction(e.clientX)}
                      style={{
                        position: "relative", height: "3px", borderRadius: "9999px",
                        background: "rgba(255,255,255,0.2)", cursor: "pointer",
                        transition: "height 0.15s ease",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.height = "5px"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.height = "3px"; }}
                    >
                      <div style={{
                        position: "absolute", left: 0, top: 0, bottom: 0,
                        width: `${progress * 100}%`,
                        background: "#03C04A", borderRadius: "9999px", pointerEvents: "none",
                      }} />
                      <div style={{
                        position: "absolute", top: "50%",
                        left: `${progress * 100}%`,
                        transform: "translate(-50%, -50%)",
                        width: "11px", height: "11px", borderRadius: "50%",
                        background: "#03C04A", boxShadow: "0 0 6px rgba(3,192,74,0.8)",
                        pointerEvents: "none",
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <div style={dividerStyle}><div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} /></div>

        {/* ── Mission ── */}
        <section style={{ padding: `${sectionPaddingV} ${sectionPaddingH}`, maxWidth, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: missionGridCols, gap: missionGap, alignItems: "center" }}>
            <FadeUp delay={0.1}>
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "rgba(3,192,74,0.08)", border: "0.5px solid rgba(3,192,74,0.2)",
                  borderRadius: "9999px",
                  padding: is4K ? "0.5rem 1.4rem" : is2K ? "0.45rem 1.2rem" : "0.4rem 1.1rem",
                  marginBottom: is4K ? "2.25rem" : is2K ? "2rem" : "1.75rem",
                }}>
                  <span style={{ color: ACCENT, fontSize: is4K ? "1.5rem" : is2K ? "1.3rem" : "0.95rem" }}>◈</span>
                  <span style={{
                    color: ACCENT, fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                    fontSize: is4K ? "1.5rem" : is2K ? "1.3rem" : "0.95rem",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                  }}>Our Mission</span>
                </div>
                <h2 style={{
                  fontSize: sectionH2Size, fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
                  letterSpacing: "0.01em", lineHeight: 1.08, color: "white",
                  marginBottom: is4K ? "1.5rem" : "1.25rem",
                }}>
                  Make Every<br />Frame Count
                </h2>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div>
                <p style={{ fontSize: missionBodySize, fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: missionBodyMB }}>
                  We help creators and brands bring their ideas to life through content that feels polished, engaging, and true to their vision. Every project is approached with care, creativity, and a commitment to quality that reflects the standards of our clients.
                </p>
                <p style={{ fontSize: missionBodySize, fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: missionBodyMB }}>
                  By handling the editing, production, and creative workload behind the scenes, we give our clients more time to focus on creating and growing. Our goal is to make the content process smoother, more efficient, and far less overwhelming.
                </p>
                <p style={{ fontSize: missionBodySize, fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,0.6)", lineHeight: 1.85 }}>
                  We believe great content is built through consistency, collaboration, and attention to detail. That's why we focus on creating work we're proud of and partnerships that last.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        <div style={dividerStyle}><div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} /></div>

        {/* ── Values ── */}
        <section style={{ padding: `${sectionPaddingV} ${sectionPaddingH}`, maxWidth, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ marginBottom: is4K ? "4rem" : is2K ? "3.5rem" : isDesktop ? "3rem" : "2.5rem" }}>
              <p style={{
                fontSize: eyebrowSize, letterSpacing: "0.3em", textTransform: "uppercase",
                fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                color: "white", marginBottom: "1rem",
              }}>What Drives Us</p>
              <h2 style={{
                fontSize: sectionH2Size, fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
                letterSpacing: "0.01em", lineHeight: 1.08, color: "white",
              }}>Our Core Values</h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: valuesGridCols, gap: gridGap }}>
            {values.map((v, i) => (
              <ValueCard
                key={v.title} value={v} delay={i * 0.08}
                isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
                isDesktop={isDesktop} is2K={is2K} is4K={is4K}
              />
            ))}
          </div>
        </section>

        <div style={dividerStyle}><div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} /></div>

        {/* ── Team ── */}
        <section style={{ padding: `${sectionPaddingV} ${sectionPaddingH}`, maxWidth, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ marginBottom: is4K ? "4rem" : is2K ? "3.5rem" : isDesktop ? "3rem" : "2.5rem" }}>
              <p style={{
                fontSize: eyebrowSize, letterSpacing: "0.3em", textTransform: "uppercase",
                fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                color: "white", marginBottom: "1rem",
              }}>The People Behind It</p>
              <h2 style={{
                fontSize: sectionH2Size, fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
                letterSpacing: "0.01em", lineHeight: 1.08, color: "white",
              }}>Meet the Team</h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: teamGridCols, gap: gridGap }}>
            {team.map((member, i) => (
              <TeamCard
                key={member.name} member={member} delay={i * 0.12}
                isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
                isDesktop={isDesktop} is2K={is2K} is4K={is4K}
              />
            ))}
          </div>
        </section>

        <div style={dividerStyle}><div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} /></div>

        {/* ── CTA ── */}
        <section style={{
          background: "linear-gradient(to bottom, #000000 0%, #111111 50%, #000000 100%)",
          padding: `${sectionPaddingV} ${sectionPaddingH}`,
          textAlign: "center",
        }}>
          <FadeUp>
            <p style={{
              fontSize: eyebrowSize, letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "white", marginBottom: "1rem",
            }}>Ready to Build Together?</p>
            <h2 style={{
              fontSize: sectionH2Size, fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
              letterSpacing: "0.01em", lineHeight: 1.08, color: "white", marginBottom: "1.25rem",
            }}>
              Let's Create Something<br />Extraordinary
            </h2>
            <p style={{
              fontSize: heroBodySize, fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              maxWidth: is4K ? "1000px" : isDesktop ? "600px" : isLaptop ? "520px" : "440px",
              margin: "0 auto 2.5rem", lineHeight: 1.7,
            }}>
              Book a free 30-minute strategy call. Tell us about your content or brand and let's build something powerful together.
            </p>
            <Link
              href="/booking"
              className="btn-shimmer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: BTN_GREEN, color: "#fff", padding: buttonPadding,
                borderRadius: "9999px", fontWeight: 700,
                fontFamily: "Arial, Helvetica, sans-serif", fontSize: buttonFontSize,
                textDecoration: "none", transition: "opacity 0.2s", overflow: "hidden",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Get Started →
            </Link>
          </FadeUp>
        </section>

      </div>
    </main>
  );
}