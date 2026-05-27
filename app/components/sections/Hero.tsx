"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

const BTN_GREEN = "#1B5E34";
const GLOW_WHITE = "0 0 30px rgba(3,192,74,0.15)";

export default function Hero() {
  const { isMobile, isTablet, isLarge } = useBreakpoint();

  const paddingTop    = isMobile ? "1.5rem" : isTablet ? "1.5rem" : isLarge ? "1rem" : "6.5rem";
  const paddingBottom = isMobile ? "0.5rem" : isTablet ? "1.5rem" : isLarge ? "1rem" : "4rem";
  const gap           = isMobile ? "2rem" : isTablet ? "4.5rem" : isLarge ? "5rem" : "3rem";

  return (
      <section
        className="relative overflow-hidden"
        style={{
          background: "#000000",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1, zIndex: 0 }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        

        <div
          className="relative w-full"
          style={{
            maxWidth: "min(100rem, 96vw)",
            margin: "0 auto",
            paddingTop,
            paddingBottom,
            paddingLeft:  isMobile ? "1.25rem" : isTablet ? "2rem" : isLarge ? "1rem" : "4rem",
            paddingRight: isMobile ? "1.25rem" : isTablet ? "2rem" : isLarge ? "1rem" : "4rem",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "0.72fr 1.28fr",
            gap,
            alignItems: "center",
            zIndex: 3,
          }}
        >
          {/* ── Left: Text ── */}
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            {/* Label / topper — Arial Regular */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                color: "white",
                textShadow: GLOW_WHITE,
                fontSize: isLarge ? "0.9rem" : "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: 400,
                marginBottom: isLarge ? "1.75rem" : "1.25rem",
              }}
            >
              Digital Content Agency
            </motion.p>

            {/* Major heading — Coolvetica */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: isMobile
                  ? "clamp(2.5rem, 10vw, 3.5rem)"
                  : isTablet
                  ? "clamp(2rem, 5vw, 3.5rem)"
                  : isLarge
                  ? "clamp(4rem, 5vw, 6.5rem)"
                  : "clamp(3.8rem, 3.5vw, 19rem)",
                fontFamily: "'Coolvetica', sans-serif",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                wordSpacing: "0.2rem",
                color: "white",
                textShadow: "0 0 40px rgba(3,192,74,0.15), 0 0 100px rgba(3,192,74,0.08)",
                marginBottom: isLarge ? "2rem" : "1.5rem",
              }}
            >
              We Create<br></br>
              Engaging<br></br>
              Content
            </motion.h1>

            {/* Description — Arial Regular */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              style={{
                fontSize: isMobile ? "0.95rem" : isLarge ? "1.25rem" : "1.05rem",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: 400,
                color: "rgba(255,255,255,0.8)",
                maxWidth: isMobile ? "100%" : isLarge ? "540px" : "440px",
                margin: isMobile ? "0 auto 2rem" : isLarge ? "0 0 3rem" : "0 0 2.5rem",
                lineHeight: 1.7,
              }}
            >
              High-quality video production for creators and brands that demand to stand out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              {/* Primary CTA — dark green, shimmer */}
              <a
                href="#booking"
                className="btn-shimmer"
                style={{
                  background: BTN_GREEN, color: "#fff",
                  padding: isMobile ? "0.75rem 1.75rem" : isLarge ? "1.1rem 2.75rem" : "0.95rem 2rem",
                  borderRadius: "9999px", fontWeight: 600,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: isMobile ? "0.75rem" : isLarge ? "1.1rem" : "0.85rem",
                  letterSpacing: "0.02em", textDecoration: "none",
                  transition: "opacity 0.2s",
                  overflow: "hidden",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Book a Call
              </a>

              {/* Secondary CTA — outline, shimmer */}
              <a
                href="#portfolio"
                className="btn-shimmer btn-shimmer-outline"
                style={{
                  background: "transparent", color: "white",
                  padding: isMobile ? "0.75rem 1.75rem" : isLarge ? "1.1rem 2.75rem" : "0.85rem 2rem",
                  borderRadius: "9999px", fontWeight: 600,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: isMobile ? "0.75rem" : isLarge ? "1.1rem" : "0.85rem",
                  border: "1px solid rgba(255,255,255,0.25)",
                  textDecoration: "none", transition: "border-color 0.2s",
                  overflow: "hidden",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#03C04A")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
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
              <div
                style={{
                  position: "absolute", inset: "-20px", borderRadius: "24px",
                  background: "radial-gradient(ellipse, rgba(3,192,74,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  borderRadius: isTablet ? "12px" : isLarge ? "20px" : "16px",
                  overflow: "hidden",
                  border: `1px solid black`,
                  aspectRatio: "16/9",
                  background: "whitesmoke", position: "relative",
                }}
              >
                <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
                  <source src="/showreel.mp4" type="video/mp4" />
                </video>
                <div
                  style={{
                    position: "absolute", inset: 0, display: "flex",
                    flexDirection: "column", alignItems: "center", justifyContent: "center",
                    gap: "0.75rem", pointerEvents: "none",
                  }}
                >
                 
                </div>
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
                style={{
                  borderRadius: "12px", overflow: "hidden",
                  border: "1px solid rgba(3,192,74,0.2)", aspectRatio: "16/9",
                  background: "#111111", position: "relative",
                }}
              >
                <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
                  <source src="/showreel.mp4" type="video/mp4" />
                </video>
                <div
                  style={{
                    position: "absolute", inset: 0, display: "flex",
                    flexDirection: "column", alignItems: "center", justifyContent: "center",
                    gap: "0.6rem", pointerEvents: "none",
                  }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: BTN_GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M6 4L16 10L6 16V4Z" fill="#fff" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "0.65rem", fontFamily: "Arial, Helvetica, sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                    Showreel 2025
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        {/* Bottom fade — blends into Services */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",  // much shorter
            background: "linear-gradient(to bottom, transparent 0%, transparent 40%,  #000000 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      </section>
  );
}