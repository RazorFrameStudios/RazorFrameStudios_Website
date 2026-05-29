"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../../data/services";
import ScrollReveal from "../ui/ScrollReveal";
import { useBreakpoint } from "../hooks/useBreakpoint";

const BTN_GREEN  = "#1B5E34";
const GLOW_WHITE = "0 0 30px rgba(3,192,74,0.15)";

const icons: Record<string, string> = {
  "Scripting":          "♣",
  "Short-Form Content": "✦",
  "Long-Form Content":  "◈",
  "Ad Creatives":       "◉",
  "Thumbnails":         "▣",
  "Growth Strategy":    "▲",
};

const images: Record<string, string> = {
  "Scripting":          "/services/script.png",
  "Short-Form Content": "/services/short.png",
  "Long-Form Content":  "/services/long.png",
  "Ad Creatives":       "/services/ad.png",
  "Thumbnails":         "/services/thumb.png",
  "Growth Strategy":    "/services/growth.png",
};

export default function Services() {
  const [active, setActive] = useState(services[0].title);
  const activeService = services.find((s) => s.title === active)!;
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  // Center image column only on laptop+
  const showImage = !isMobile && !isTablet;

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

  const h2MB = isMobile
    ? "2rem"    : isTablet
    ? "2.5rem"  : isLaptop
    ? "3.5rem"  : isDesktop
    ? "4.5rem"  : is2K
    ? "5.5rem"  : "7rem";

  // ── Panel ──────────────────────────────────────────────────────────────────
  const panelMinH = isMobile
    ? "260px" : isTablet
    ? "360px" : isLaptop
    ? "480px" : isDesktop
    ? "560px" : is2K
    ? "680px" : "840px";

  const panelRadius = isMobile
    ? "12px"  : isTablet
    ? "14px"  : isLaptop
    ? "16px"  : isDesktop
    ? "20px"  : is2K
    ? "24px"  : "28px";

  const gridCols = showImage ? "1fr 1.7fr 1fr" : "1fr 1.5fr";

  // ── Service list (left column) ────────────────────────────────────────────
  const listPadV = isMobile
    ? "0.5rem"  : isTablet
    ? "1rem"    : isLaptop
    ? "1.25rem" : isDesktop
    ? "1.5rem"  : is2K
    ? "2rem"    : "2rem";

  const itemPad = isMobile
    ? "0.7rem 0.85rem"
    : isTablet
    ? "1rem 1.5rem"
    : isLaptop
    ? "1.7rem 2rem"
    : isDesktop
    ? "2.5rem 2.5rem"
    : is2K
    ? "3rem 3rem"
    : "4rem 3.75rem";

  const itemGap = isMobile
    ? "0.4rem"  : isTablet
    ? "0.6rem"  : isLaptop
    ? "0.75rem" : isDesktop
    ? "0.85rem" : is2K
    ? "1rem"    : "1.25rem";

  const iconFont = isMobile
    ? "0.7rem"  : isTablet
    ? "0.82rem" : isLaptop
    ? "0.9rem"  : isDesktop
    ? "1rem"    : is2K
    ? "1.7rem"  : "3rem";

  const labelFontActive = isMobile
    ? "0.85rem" : isTablet
    ? "1rem"    : isLaptop
    ? "1.15rem" : isDesktop
    ? "1.35rem" : is2K
    ? "2rem"  : "3rem";

  const labelFontIdle = isMobile
    ? "0.75rem" : isTablet
    ? "0.9rem"  : isLaptop
    ? "1rem"    : isDesktop
    ? "1.15rem" : is2K
    ? "1.5rem"  : "2rem";

  // ── Image label (center column) ───────────────────────────────────────────
  const imgLabelFont = isLaptop
    ? "0.7rem"  : isDesktop
    ? "0.78rem" : is2K
    ? "0.9rem"  : is4K
    ? "1.1rem"  : "0.7rem";

  const imgLabelOffset = isLaptop
    ? "1.5rem"  : isDesktop
    ? "1.75rem" : is2K
    ? "2.25rem" : is4K
    ? "2.75rem" : "1.5rem";

  // ── Description panel (right column) ─────────────────────────────────────
  const descPad = isMobile
    ? "1rem 1.1rem"
    : isTablet
    ? "1.75rem 2rem"
    : isLaptop
    ? "2.5rem"
    : isDesktop
    ? "3rem"
    : is2K
    ? "3.75rem"
    : "3.75rem";

  const offerTagFont = isMobile
    ? "0.62rem" : isTablet
    ? "0.68rem" : isLaptop
    ? "0.72rem" : isDesktop
    ? "0.82rem" : is2K
    ? "1rem" : "1.5rem";

  const offerTagMB = isMobile
    ? "0.5rem"  : isTablet
    ? "0.65rem" : isLaptop
    ? "0.75rem" : isDesktop
    ? "0.9rem"  : is2K
    ? "0.8rem"  : "1.4rem";

  const descTitleFont = isMobile
    ? "1rem"    : isTablet
    ? "1.2rem"  : isLaptop
    ? "1.5rem"  : isDesktop
    ? "1.85rem" : is2K
    ? "5rem" : "7rem";

  const descTitleMB = isMobile
    ? "0.5rem"  : isTablet
    ? "0.65rem" : isLaptop
    ? "0.85rem" : isDesktop
    ? "1.1rem"  : is2K
    ? "1.4rem"  : "1.75rem";

  const descBodyFont = isMobile
    ? "0.78rem" : isTablet
    ? "0.9rem"  : isLaptop
    ? "0.95rem" : isDesktop
    ? "1.05rem" : is2K
    ? "2rem"  : "3rem";

  const descBodyMB = isMobile
    ? "1rem"    : isTablet
    ? "1.25rem" : isLaptop
    ? "1.75rem" : isDesktop
    ? "2.25rem" : is2K
    ? "2.75rem" : "3.5rem";

  const exploreLinkFont = isMobile
    ? "0.78rem" : isTablet
    ? "0.85rem" : isLaptop
    ? "0.9rem"  : isDesktop
    ? "1rem"    : is2K
    ? "1.5rem" : "2rem";

  return (
    <section
      id="services"
      style={{
        background: "#000000", color: "#ffffff", position: "relative",
        paddingTop: paddingY, paddingBottom: paddingY,
        paddingLeft: paddingH, paddingRight: paddingH,
      }}
    >
      {/* Top gradient bleed from hero */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "400px",
        pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      }} />

      <div style={{ maxWidth, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* ── Section header ── */}
        <ScrollReveal variant="fadeLeft">
          <p style={{
            fontSize: topperFont,
            letterSpacing: "0.3em", textTransform: "uppercase",
            fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
            color: "white", textShadow: GLOW_WHITE,
            marginBottom: "0.75rem",
            textAlign: isMobile ? "center" : "left",
          }}>
            What We Do
          </p>
          {/* FIX: letterSpacing changed from "-0.02em" → "0.01em", lineHeight nudged to 1.08 */}
          <h2 style={{
            fontSize: h2Size,
            fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
            letterSpacing: "0.01em", lineHeight: 1.08,
            marginBottom: h2MB,
            color: "#ffffff",
            textAlign: isMobile ? "center" : "left",
          }}>
            Explore Our Services
          </h2>
        </ScrollReveal>

        {/* ── Panel grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: "0",
          minHeight: panelMinH,
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: panelRadius,
          overflow: "hidden",
        }}>

          {/* ── Left: Service list ── */}
          <div style={{
            padding: `${listPadV} 0`,
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            {services.map((s) => (
              <button
                key={s.title}
                onClick={() => setActive(s.title)}
                style={{
                  display: "flex", alignItems: "center",
                  gap: itemGap,
                  padding: itemPad,
                  background: "transparent", border: "none", cursor: "pointer",
                  textAlign: "left", transition: "all 0.3s ease",
                  borderLeft: active === s.title
                    ? "3px solid #1B5E34"
                    : "3px solid transparent",
                }}
              >
                <span style={{
                  fontSize: iconFont,
                  color: active === s.title ? BTN_GREEN : "rgba(255,255,255,0.3)",
                  transition: "color 0.3s", flexShrink: 0,
                }}>
                  {icons[s.title] || "◆"}
                </span>
                <span style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: active === s.title ? labelFontActive : labelFontIdle,
                  fontWeight: active === s.title ? 700 : 400,
                  color: active === s.title ? "#ffffff" : "rgba(255,255,255,0.35)",
                  transition: "all 0.3s ease",
                  letterSpacing: "-0.01em", lineHeight: 1.3,
                }}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* ── Center: Image — laptop+ only ── */}
          {showImage && (
            <div style={{ position: "relative", overflow: "hidden", background: "white" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={images[active]} alt={active}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </AnimatePresence>
              <div style={{ position: "absolute", inset: 0 }} />
              <motion.div
                key={active + "-label"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  bottom: imgLabelOffset,
                  left:   imgLabelOffset,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: imgLabelFont,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "rgba(255,255,255,1)",
                }}
              >
                {active}
              </motion.div>
            </div>
          )}

          {/* ── Right: Description ── */}
          <div style={{
            borderLeft: "0.5px solid rgba(255,255,255,0.08)",
            padding: descPad,
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active + "-desc"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Offer tag */}
                <p style={{
                  fontSize: offerTagFont,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                  color: "white",
                  textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
                  marginBottom: offerTagMB,
                }}>
                  What We Offer
                </p>

                {/* FIX: letterSpacing changed from "-0.02em" → "0.01em", lineHeight added */}
                <h3 style={{
                  fontSize: descTitleFont,
                  fontFamily: "'Coolvetica', sans-serif", fontWeight: 400,
                  letterSpacing: "0.01em", lineHeight: 1.08,
                  marginBottom: descTitleMB,
                  color: "#ffffff",
                }}>
                  {activeService.title}
                </h3>

                {/* Description body */}
                <p style={{
                  fontSize: descBodyFont,
                  fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                  lineHeight: 1.7, color: "rgba(255,255,255,0.8)",
                  marginBottom: descBodyMB,
                  display: isMobile ? "-webkit-box" : undefined,
                  WebkitLineClamp: isMobile ? 4 : undefined,
                  WebkitBoxOrient: isMobile ? "vertical" as const : undefined,
                  overflow: isMobile ? "hidden" : undefined,
                }}>
                  {activeService.description}
                </p>

                {/* Explore link */}
                <a href="/services"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    color: BTN_GREEN,
                    textShadow: "0 0 20px rgba(3,192,74,0.7)",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: exploreLinkFont,
                    fontWeight: 700, letterSpacing: "0.05em",
                    textDecoration: "none", transition: "gap 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.gap = "0.85rem"; }}
                  onMouseLeave={e => { e.currentTarget.style.gap = "0.5rem"; }}
                >
                  Explore More <span>→</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}