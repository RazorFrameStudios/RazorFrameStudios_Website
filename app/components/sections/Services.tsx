"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../../data/services";
import ScrollReveal from "../ui/ScrollReveal";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { g } from "framer-motion/client";

const BTN_GREEN = "#1B5E34";
const GLOW_WHITE = "0 0 30px rgba(3,192,74,0.15)";
const icons: Record<string, string> = {
  "Scripting": "♣",
  "Short-Form Content": "✦",
  "Long-Form Content": "◈",
  "Ad Creatives": "◉",
  "Thumbnails": "▣",
  "Growth Strategy": "▲"
};

const images: Record<string, string> = {
  "Scripting": "/services/script.png",
  "Short-Form Content": "/services/short.png",
  "Long-Form Content": "/services/long.png",
  "Ad Creatives": "/services/ad.png",
  "Thumbnails": "/services/thumb.png",
  "Growth Strategy": "/services/growth.png",
};

export default function Services() {
  const [active, setActive] = useState(services[0].title);
  const activeService = services.find((s) => s.title === active)!;
  const { isMobile, isTablet } = useBreakpoint();
  const isLargeDesktop = typeof window !== "undefined" && window.innerWidth >= 1600;

  const showImage = !isMobile && !isTablet;

  const paddingY = isMobile ? "3rem" : isTablet ? "4rem" : isLargeDesktop ? "9rem" : "6rem";
  const paddingH = isMobile ? "1.25rem" : isTablet ? "2rem" : "4rem";

  const panelMinHeight = isMobile ? "260px" : isTablet ? "360px" : isLargeDesktop ? "600px" : "480px";

  return (
    <section
      id="services"
      style={{
        background: "#000000", color: "#ffffff", position: "relative",
        paddingTop: paddingY, paddingBottom: paddingY,
        paddingLeft: paddingH, paddingRight: paddingH,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "400px", pointerEvents: "none", zIndex: 1, background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }} />

      <div style={{ maxWidth: "min(100rem, 96vw)", margin: "0 auto", position: "relative", zIndex: 2 }}>

        <ScrollReveal variant="fadeLeft">
          {/* Topper — Arial Regular */}
          <p style={{
            fontSize: isLargeDesktop ? "0.9rem" : "0.75rem",
            letterSpacing: "0.3em", textTransform: "uppercase",
            fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
            color: "white", textShadow: GLOW_WHITE,
            marginBottom: "0.75rem", textAlign: isMobile ? "center" : "left",
          }}>
            What We Do
          </p>
          {/* Major heading — Coolvetica */}
          <h2 style={{
            fontSize: isLargeDesktop
              ? "clamp(3.5rem, 5vw, 5rem)"
              : "clamp(2.2rem, 5vw, 3.5rem)",
            fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
            letterSpacing: "-0.02em", lineHeight: 1.1,
            marginBottom: isTablet ? "2.5rem" : isLargeDesktop ? "5rem" : "3.5rem",
            color: "#ffffff", textAlign: isMobile ? "center" : "left",
          }}>
            Explore Our, Services
          </h2>
        </ScrollReveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: showImage ? "1fr 1.7fr 1fr" : "1fr 1.5fr",
          gap: "0",
          minHeight: panelMinHeight,
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: isLargeDesktop ? "20px" : "16px",
          overflow: "hidden",
        }}>
          {/* ── Left: Service List ── */}
          <div style={{
            padding: isMobile ? "0.5rem 0" : "1rem 0",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            {services.map((s) => (
              <button
                key={s.title}
                onClick={() => setActive(s.title)}
                style={{
                  display: "flex", alignItems: "center",
                  gap: isMobile ? "0.4rem" : isLargeDesktop ? "1rem" : "0.75rem",
                  padding: isMobile
                    ? "0.7rem 0.85rem"
                    : isTablet
                    ? "1rem 1.5rem"
                    : isLargeDesktop
                    ? "1.75rem 2.5rem"
                    : "1.25rem 2rem",
                  background: "transparent", border: "none", cursor: "pointer",
                  textAlign: "left", transition: "all 0.3s ease",
                  borderLeft: active === s.title ? "3px solid #1B5E34" : "3px solid transparent",
                }}
              >
                <span style={{
                  fontSize: isMobile ? "0.7rem" : isLargeDesktop ? "1rem" : "0.85rem",
                  color: active === s.title ? BTN_GREEN : "rgba(255,255,255,0.3)",
                  transition: "color 0.3s", flexShrink: 0,
                }}>
                  {icons[s.title] || "◆"}
                </span>
                <span style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: active === s.title
                    ? (isMobile ? "0.85rem" : isTablet ? "1rem" : isLargeDesktop ? "1.5rem" : "1.2rem")
                    : (isMobile ? "0.75rem" : isTablet ? "0.9rem" : isLargeDesktop ? "1.2rem" : "1rem"),
                  fontWeight: active === s.title ? 700 : 400,
                  color: active === s.title ? "#ffffff" : "rgba(255,255,255,0.35)",
                  transition: "all 0.3s ease", letterSpacing: "-0.01em", lineHeight: 1.3,
                }}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* ── Center: Image — desktop only ── */}
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
              <div style={{ position: "absolute", inset: 0, }} />
              <motion.div
                key={active + "-label"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  bottom: isLargeDesktop ? "2rem" : "1.5rem",
                  left: isLargeDesktop ? "2rem" : "1.5rem",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: isLargeDesktop ? "0.8rem" : "0.7rem",
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
            padding: isMobile
              ? "1rem 1.1rem"
              : isTablet
              ? "1.75rem 2rem"
              : isLargeDesktop
              ? "3.5rem"
              : "2.5rem",
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
                {/* Sub-label — Arial */}
                <p style={{
                  fontSize: isLargeDesktop ? "0.85rem" : "0.7rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                  color: "white", textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
                  marginBottom: isMobile ? "0.5rem" : isLargeDesktop ? "1rem" : "0.75rem",
                }}>What We Offer</p>

                {/* Service title — Coolvetica */}
                <h3 style={{
                  fontSize: isMobile ? "1rem" : isTablet ? "1.25rem" : isLargeDesktop ? "2rem" : "1.5rem",
                  fontFamily: "'Coolvetica', sans-serif", fontWeight: 400,
                  letterSpacing: "-0.02em",
                  marginBottom: isMobile ? "0.5rem" : isLargeDesktop ? "1.5rem" : "1rem",
                  color: "#ffffff",
                }}>{activeService.title}</h3>

                {/* Description — Arial */}
                <p style={{
                  fontSize: isMobile ? "0.78rem" : isLargeDesktop ? "1.1rem" : "0.95rem",
                  fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                  lineHeight: 1.7, color: "rgba(255,255,255,0.8)",
                  marginBottom: isMobile ? "1rem" : isLargeDesktop ? "2.5rem" : "2rem",
                  display: isMobile ? "-webkit-box" : undefined,
                  WebkitLineClamp: isMobile ? 4 : undefined,
                  WebkitBoxOrient: isMobile ? "vertical" : undefined,
                  overflow: isMobile ? "hidden" : undefined,
                }}>
                  {activeService.description}
                </p>

                {/* CTA link — Arial Bold */}
                <a
                  href="/services"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    color: BTN_GREEN, textShadow: "0 0 20px rgba(3,192,74,0.7)",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: isMobile ? "0.78rem" : isLargeDesktop ? "1rem" : "0.85rem",
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