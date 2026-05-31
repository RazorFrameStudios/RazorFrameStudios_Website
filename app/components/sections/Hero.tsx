"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { useRef, useState, useEffect, useCallback } from "react";

const BTN_GREEN  = "#1B5E34";
const GLOW_WHITE = "0 0 30px rgba(3,192,74,0.15)";

const BG_SRC      = "https://thzrymlstodkdybfzovu.supabase.co/storage/v1/object/public/Landing%20page%20videos/Website%20background%20COMPRESSED.mp4";
const REEL_SRC    = "https://thzrymlstodkdybfzovu.supabase.co/storage/v1/object/public/Landing%20page%20videos/SaaS%20RFS%20COMPRESSED.mp4";

// ---------------------------------------------------------------------------
// MuteButton
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Shared video props helper — single source of truth for all video attributes
// ---------------------------------------------------------------------------
function getVideoProps(preload: "none" | "metadata" | "auto") {
  return {
    autoPlay: true,
    loop: true,
    muted: true,          // must be true in JSX so React sets the property
    playsInline: true,    // critical for iOS inline playback
    preload,
    // iOS Safari legacy attribute — kept as a data attribute to avoid TS errors
    "data-webkit-playsinline": "true",
  } as const;
}

// ---------------------------------------------------------------------------
// useVideoSetup — handles muted sync + gentle stall recovery (no el.load())
// ---------------------------------------------------------------------------
function useVideoSetup(
  refs: React.RefObject<HTMLVideoElement | null>[],
  isMuted: boolean
) {
  // Sync muted/volume whenever isMuted changes
  useEffect(() => {
    refs.forEach((r) => {
      const el = r.current;
      if (!el) return;
      el.muted  = isMuted;
      el.volume = isMuted ? 0 : 1;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted]);

  // Gentle stall recovery — NO el.load(), just el.play()
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    refs.forEach((r) => {
      const el = r.current;
      if (!el) return;

      let timer: ReturnType<typeof setTimeout> | null = null;

      const scheduleRetry = () => {
        if (timer) return; // already waiting
        timer = setTimeout(() => {
          timer = null;
          if (!el || el.readyState >= 3 || !el.paused) return;
          el.play().catch(() => {});
        }, 2000);
      };

      const cancelRetry = () => {
        if (timer) { clearTimeout(timer); timer = null; }
      };

      el.addEventListener("stalled", scheduleRetry);
      el.addEventListener("waiting", scheduleRetry);
      el.addEventListener("playing", cancelRetry);
      el.addEventListener("canplay", cancelRetry);

      cleanups.push(() => {
        cancelRetry();
        el.removeEventListener("stalled", scheduleRetry);
        el.removeEventListener("waiting", scheduleRetry);
        el.removeEventListener("playing", cancelRetry);
        el.removeEventListener("canplay", cancelRetry);
      });
    });

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ---------------------------------------------------------------------------
// usePageVisibility — pause/resume all videos when tab is hidden/shown
// (prevents battery drain & state desync on mobile)
// ---------------------------------------------------------------------------
function usePageVisibility(refs: React.RefObject<HTMLVideoElement | null>[]) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      refs.forEach((r) => {
        const el = r.current;
        if (!el) return;
        if (document.hidden) {
          el.pause();
        } else {
          el.play().catch(() => {});
        }
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export default function Hero() {
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  const bgVideoRef          = useRef<HTMLVideoElement>(null);
  const showreelRef         = useRef<HTMLVideoElement>(null);
  const showreelMobileRef   = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted]               = useState(true);
  const [isHoveringReel, setIsHoveringReel] = useState(false);
  const [isTouchDevice, setIsTouchDevice]   = useState(false);

  // Detect touch device once on mount
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  // Mute toggle — clean, no setAttribute needed (property is enough)
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Wire up all video refs
  const allRefs    = [bgVideoRef, showreelRef, showreelMobileRef];
  const reelRefs   = [showreelRef, showreelMobileRef];

  useVideoSetup(reelRefs, isMuted);
  usePageVisibility(allRefs);

  // ── Background video: lower priority so showreel decoder gets priority ──
  // On mobile we use preload="none" for the bg video and "metadata" for the
  // showreel. Both still autoPlay — this just staggers the initial network
  // burst so the browser doesn't throttle both decoders simultaneously.
  const bgPreload    = isMobile ? "none"     : "auto";
  const reelPreload  = isMobile ? "metadata" : "auto";

  // ── Layout ──────────────────────────────────────────────────────────────
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
    ? "2rem"    : isLaptop
    ? "2rem"    : isDesktop
    ? "2.5rem"  : is2K
    ? "1.5rem"  : "0.75rem";

  const paddingTop = isMobile
    ? "1.5rem"  : isTablet
    ? "1.5rem"  : isLaptop
    ? "6.5rem"  : isDesktop
    ? "7rem"    : is2K
    ? "8rem"    : "9rem";

  const paddingBottom = isMobile
    ? "0.5rem"  : isTablet
    ? "1.5rem"  : isLaptop
    ? "4rem"    : isDesktop
    ? "5rem"    : is2K
    ? "6rem"    : "7.5rem";

  const gridCols = isMobile || isTablet ? "1fr" : "0.72fr 1.28fr";

  const gap = isMobile
    ? "2rem"    : isTablet
    ? "4.5rem"  : isLaptop
    ? "3rem"    : isDesktop
    ? "4rem"    : is2K
    ? "5rem"    : "6rem";

  // ── Typography ─────────────────────────────────────────────────────────
  const topperFont = isMobile
    ? "0.68rem" : isTablet
    ? "0.72rem" : isLaptop
    ? "0.78rem" : isDesktop
    ? "0.9rem"  : is2K
    ? "1.05rem" : "1.3rem";

  const topperMB = isMobile
    ? "1rem"    : isTablet
    ? "1.1rem"  : isLaptop
    ? "1.25rem" : isDesktop
    ? "1.5rem"  : is2K
    ? "1.75rem" : "2.25rem";

  const h1Size = isMobile
    ? "clamp(2.5rem, 10vw, 3.5rem)"
    : isTablet
    ? "clamp(2.8rem, 6vw, 4.2rem)"
    : isLaptop
    ? "clamp(3.8rem, 3.5vw, 5.5rem)"
    : isDesktop
    ? "clamp(4.5rem, 4vw, 6.5rem)"
    : is2K
    ? "clamp(5.5rem, 4vw, 8rem)"
    : "clamp(7rem, 4vw, 10rem)";

  const h1MB = isMobile
    ? "1.25rem" : isTablet
    ? "1.4rem"  : isLaptop
    ? "1.75rem" : isDesktop
    ? "2rem"    : is2K
    ? "2.5rem"  : "3rem";

  const bodyFont = isMobile
    ? "0.95rem" : isTablet
    ? "1rem"    : isLaptop
    ? "1.05rem" : isDesktop
    ? "1.2rem"  : is2K
    ? "1.4rem"  : "1.75rem";

  const bodyMaxW = isMobile
    ? "100%"  : isTablet
    ? "480px" : isLaptop
    ? "440px" : isDesktop
    ? "520px" : is2K
    ? "620px" : "780px";

  const bodyMB = isMobile
    ? "2rem"    : isTablet
    ? "2.25rem" : isLaptop
    ? "2.5rem"  : isDesktop
    ? "3rem"    : is2K
    ? "3.5rem"  : "4.5rem";

  // ── Buttons ────────────────────────────────────────────────────────────
  const btnPad = isMobile
    ? "0.75rem 1.75rem" : isTablet
    ? "0.85rem 2rem"    : isLaptop
    ? "0.95rem 2rem"    : isDesktop
    ? "1.05rem 2.5rem"  : is2K
    ? "1.2rem 3rem"     : "1.5rem 3.75rem";

  const btnFont = isMobile
    ? "0.78rem" : isTablet
    ? "0.85rem" : isLaptop
    ? "0.88rem" : isDesktop
    ? "1rem"    : is2K
    ? "1.15rem" : "1.4rem";

  const btnGap = isMobile
    ? "0.75rem" : isTablet
    ? "0.85rem" : isLaptop
    ? "1rem"    : isDesktop
    ? "1.1rem"  : is2K
    ? "1.25rem" : "1.5rem";

  // ── Showreel ───────────────────────────────────────────────────────────
  const reelRadius = isMobile
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

  // Mute button: always visible on touch devices, hover-gated on desktop
  const muteVisible = isTouchDevice ? true : isHoveringReel;

  // Shared video container style
  const reelContainerStyle = (border: string): React.CSSProperties => ({
    borderRadius: reelRadius,
    overflow: "hidden",
    border,
    aspectRatio: "16/9",
    background: "#111111",
    position: "relative",
    // GPU compositing layer — prevents freeze during scroll on mobile
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
    willChange: "transform",
  });

  // Shared video inline style
  const reelVideoStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#000000", minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      {/* ── Background video ── */}
      {/*
        FIX: preload="none" on mobile so the bg decoder doesn't compete with
        the showreel decoder at startup. autoPlay still fires after first
        interaction / when the browser is ready.
      */}
      <video
        ref={bgVideoRef}
        {...getVideoProps(bgPreload)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 1,
          zIndex: 0,
          // GPU layer for background too — avoids composite-layer thrash on scroll
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <source src={BG_SRC} type="video/mp4" />
      </video>

      {/* ── Content grid ── */}
      <div
        className="relative w-full"
        style={{
          maxWidth,
          margin: "0 auto",
          paddingTop,
          paddingBottom,
          paddingLeft:  paddingH,
          paddingRight: paddingH,
          display: "grid",
          gridTemplateColumns: gridCols,
          gap,
          alignItems: "center",
          zIndex: 3,
        }}
      >
        {/* ── Left: Text ── */}
        <div style={{ textAlign: isMobile ? "center" : "left" }}>

          {/* Topper */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              color: "white",
              textShadow: GLOW_WHITE,
              fontSize: topperFont,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 400,
              marginBottom: topperMB,
            }}
          >
            Digital Content Agency
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: h1Size,
              fontFamily: "'Coolvetica', sans-serif",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "0.01em",
              wordSpacing: "0.05em",
              color: "white",
              textShadow: "0 0 40px rgba(3,192,74,0.15), 0 0 100px rgba(3,192,74,0.08)",
              marginBottom: h1MB,
            }}
          >
            We Create<br />
            Engaging<br />
            Content
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            style={{
              fontSize: bodyFont,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 400,
              color: "rgba(255,255,255,0.8)",
              maxWidth: bodyMaxW,
              margin: isMobile ? `0 auto ${bodyMB}` : `0 0 ${bodyMB}`,
              lineHeight: 1.7,
            }}
          >
            High-quality video production for creators and brands that demand to stand out.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            style={{
              display: "flex",
              gap: btnGap,
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <a
              href="#booking"
              className="btn-shimmer"
              style={{
                background: BTN_GREEN,
                color: "#fff",
                padding: btnPad,
                borderRadius: "9999px",
                fontWeight: 600,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: btnFont,
                letterSpacing: "0.02em",
                textDecoration: "none",
                transition: "opacity 0.2s",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Book a Call
            </a>

            <a
              href="#portfolio"
              className="btn-shimmer btn-shimmer-outline"
              style={{
                background: "transparent",
                color: "white",
                padding: btnPad,
                borderRadius: "9999px",
                fontWeight: 600,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: btnFont,
                border: "1px solid rgba(255,255,255,0.25)",
                textDecoration: "none",
                transition: "border-color 0.2s",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#03C04A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
            >
              View Our Work
            </a>
          </motion.div>
        </div>

        {/* ── Right: Showreel — tablet + desktop ── */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            {/* Glow halo */}
            <div
              style={{
                position: "absolute",
                inset: is2K ? "-32px" : isDesktop ? "-28px" : "-20px",
                borderRadius: "24px",
                background: "radial-gradient(ellipse, rgba(3,192,74,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              onMouseEnter={() => setIsHoveringReel(true)}
              onMouseLeave={() => setIsHoveringReel(false)}
              style={reelContainerStyle("1px solid black")}
            >
              <video
                ref={showreelRef}
                {...getVideoProps(reelPreload)}
                style={reelVideoStyle}
              >
                <source src={REEL_SRC} type="video/mp4" />
              </video>
              <MuteButton isMuted={isMuted} isVisible={muteVisible} onToggle={toggleMute} size={muteSize} />
            </div>
          </motion.div>
        )}

        {/* ── Mobile: showreel below text ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
          >
            <div
              onMouseEnter={() => setIsHoveringReel(true)}
              onMouseLeave={() => setIsHoveringReel(false)}
              style={reelContainerStyle("1px solid rgba(3,192,74,0.2)")}
            >
              <video
                ref={showreelMobileRef}
                {...getVideoProps(reelPreload)}
                style={reelVideoStyle}
              >
                <source src={REEL_SRC} type="video/mp4" />
              </video>
              <MuteButton isMuted={isMuted} isVisible={muteVisible} onToggle={toggleMute} size={muteSize} />
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Bottom fade ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: is4K ? "200px" : is2K ? "160px" : isDesktop ? "140px" : "120px",
          background: "linear-gradient(to bottom, transparent 0%, transparent 40%, #000000 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}