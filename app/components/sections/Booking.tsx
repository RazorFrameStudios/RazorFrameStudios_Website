"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "../ui/ScrollReveal";
import { useBreakpoint } from "../hooks/useBreakpoint";

const BTN_GREEN = "#1B5E34";

export default function Booking() {
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

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
    ? "0.72rem" : isTablet
    ? "0.78rem" : isLaptop
    ? "0.88rem" : isDesktop
    ? "1.05rem" : is2K
    ? "1.25rem" : "1.6rem";

  const h2Size = isMobile
    ? "clamp(2.4rem, 8vw, 3.4rem)"
    : isTablet
    ? "clamp(2.8rem, 5vw, 3.8rem)"
    : isLaptop
    ? "clamp(3.4rem, 4vw, 4.8rem)"
    : isDesktop
    ? "clamp(4.2rem, 4vw, 5.8rem)"
    : is2K
    ? "clamp(5.2rem, 4vw, 7rem)"
    : "clamp(6.5rem, 4vw, 9rem)";

  const headerMB = isMobile
    ? "1.25rem"  : isTablet
    ? "1.5rem"   : isLaptop
    ? "2rem"     : isDesktop
    ? "2.5rem"   : is2K
    ? "3.25rem"  : "4.25rem";

  // ── Body paragraph ─────────────────────────────────────────────────────────
  const bodyFont = isMobile
    ? "0.92rem" : isTablet
    ? "0.98rem" : isLaptop
    ? "1.05rem" : isDesktop
    ? "1.2rem"  : is2K
    ? "1.55rem" : "2rem";

  const bodyMaxWidth = isMobile
    ? "100%"
    : isTablet
    ? "480px"
    : isLaptop
    ? "550px"
    : isDesktop
    ? "600px"
    : is2K
    ? "750px"
    : "900px";

  const bodyMB = isMobile
    ? "2rem"    : isTablet
    ? "2.5rem"  : isLaptop
    ? "3rem"    : isDesktop
    ? "3.5rem"  : is2K
    ? "4.5rem"  : "5.5rem";

  // ── Button ──────────────────────────────────────────────────────────────────
  const btnPadding = isMobile
    ? "0.9rem 2rem"     : isTablet
    ? "1rem 2.25rem"    : isLaptop
    ? "1.1rem 2.75rem"  : isDesktop
    ? "1.25rem 3rem"    : is2K
    ? "1.5rem 3.75rem"  : "1.75rem 4.5rem";

  const btnFont = isMobile
    ? "0.9rem"  : isTablet
    ? "0.95rem" : isLaptop
    ? "1rem"    : isDesktop
    ? "1.15rem" : is2K
    ? "1.45rem" : "1.85rem";

  const btnGap = isMobile
    ? "0.4rem"  : isTablet
    ? "0.5rem"  : isLaptop
    ? "0.55rem" : isDesktop
    ? "0.75rem" : is2K
    ? "0.95rem" : "1.25rem";

  const btnIconSize = isMobile
    ? "14"  : isTablet
    ? "15"  : isLaptop
    ? "16"  : isDesktop
    ? "18"  : is2K
    ? "22"  : "28";

  const btnMT = isMobile
    ? "1.5rem"  : isTablet
    ? "1.75rem" : isLaptop
    ? "2rem"    : isDesktop
    ? "2.5rem"  : is2K
    ? "3.25rem" : "4.25rem";

  // ── Email text ──────────────────────────────────────────────────────────────
  const emailFont = isMobile
    ? "0.8rem"  : isTablet
    ? "0.85rem" : isLaptop
    ? "0.9rem"  : isDesktop
    ? "1rem"    : is2K
    ? "1.25rem" : "1.6rem";

  const emailMT = isMobile
    ? "1.25rem" : isTablet
    ? "1.5rem"  : isLaptop
    ? "1.75rem" : isDesktop
    ? "2rem"    : is2K
    ? "2.5rem"  : "3.25rem";

  return (
    <section
      id="booking"
      style={{
        background: "#000000",
        color: "white",
        position: "relative",
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: paddingH,
        paddingRight: paddingH,
      }}
    >
      {/* Top fade */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "300px",
        pointerEvents: "none",
        zIndex: 1,
        background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      }} />

      <div style={{
        maxWidth,
        margin: "0 auto",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}>
        <ScrollReveal variant="scaleUp">
          {/* Topper text */}
          <p style={{
            fontSize: topperFont,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 400,
            color: "white",
            textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
            marginBottom: "0.75rem",
          }}>
            Let's Talk
          </p>

          {/* FIX: letterSpacing changed from "-0.02em" → "0.01em", lineHeight nudged to 1.08 */}
          <h2 style={{
            fontSize: h2Size,
            fontFamily: "'Coolvetica', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.01em",
            lineHeight: 1.08,
            color: "white",
            marginBottom: headerMB,
          }}>
            Ready to Create Something That Performs?
          </h2>

          {/* Body paragraph */}
          <p style={{
            fontSize: bodyFont,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)",
            maxWidth: bodyMaxWidth,
            margin: `0 auto ${bodyMB}`,
            lineHeight: 1.7,
          }}>
            Book a free 30-minute strategy call. Tell us about your content or brand and let's build something powerful together.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "inline-block", marginTop: btnMT }}
          >
            <Link
              href="/booking"
              className="btn-shimmer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: btnGap,
                background: BTN_GREEN,
                color: "#fff",
                padding: btnPadding,
                borderRadius: "9999px",
                fontWeight: 700,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: btnFont,
                letterSpacing: "0.02em",
                textDecoration: "none",
                overflow: "hidden",
              }}
            >
              Book a Free Call
              <svg
                width={btnIconSize}
                height={btnIconSize}
                viewBox="0 0 16 16"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Email fallback */}
          <p style={{
            marginTop: emailMT,
            fontSize: emailFont,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 400,
            color: "#03C04A",
          }}>
            Prefer email?{" "}
            <a
              onClick={() => {
                window.open(
                  "https://mail.google.com/mail/?view=cm&to=razorframestudios@gmail.com",
                  "_blank"
                );
              }}
              style={{
                color: "#03C04A",
                textDecoration: "none",
                cursor: "pointer",
                fontFamily: "Arial, Helvetica, sans-serif",
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              razorframestudios@gmail.com
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}