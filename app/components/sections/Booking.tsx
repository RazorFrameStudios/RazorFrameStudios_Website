"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "../ui/ScrollReveal";
import { useBreakpoint } from "../hooks/useBreakpoint";

const BTN_GREEN = "#1B5E34";

export default function Booking() {
  const { isMobile, isTablet } = useBreakpoint();
  const isLargeDesktop = typeof window !== "undefined" && window.innerWidth >= 1600;

  const paddingY = isMobile ? "3rem" : isTablet ? "4rem" : isLargeDesktop ? "9rem" : "6rem";
  const paddingH = isMobile ? "1.25rem" : isTablet ? "2rem" : "4rem";

  return (
    <section
      id="booking"
      style={{
        background: "#000000", color: "white", position: "relative",
        paddingTop: paddingY, paddingBottom: paddingY,
        paddingLeft: paddingH, paddingRight: paddingH,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "300px", pointerEvents: "none", zIndex: 1, background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }} />

      <div style={{
        maxWidth: isLargeDesktop ? "min(72rem, 96vw)" : "min(56rem, 92vw)",
        margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2,
      }}>
        <ScrollReveal variant="scaleUp">
          {/* Topper — Arial */}
          <p style={{
            fontSize: isLargeDesktop ? "0.9rem" : "0.75rem",
            letterSpacing: "0.3em", textTransform: "uppercase",
            fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
            color: "white", textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
            marginBottom: "1rem",
          }}>
            Let's Talk
          </p>

          {/* Heading — Coolvetica */}
          <h2 style={{
            fontSize: isMobile
              ? "clamp(2rem, 8vw, 3rem)"
              : isLargeDesktop
              ? "clamp(3.5rem, 5vw, 5.5rem)"
              : "clamp(2.5rem, 5vw, 4rem)",
            fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
            letterSpacing: "-0.02em", lineHeight: 1.05,
            color: "white",
            marginBottom: isLargeDesktop ? "1.75rem" : "1.25rem",
          }}>
            Ready to Create Something That Performs?
          </h2>

          {/* Description — Arial */}
          <p style={{
            fontSize: isLargeDesktop ? "1.25rem" : "1.05rem",
            fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
            color: "rgba(255,255,255,0.8)",
            maxWidth: isLargeDesktop ? "600px" : "480px",
            margin: isLargeDesktop ? "0 auto 4rem" : "0 auto 3rem",
            lineHeight: 1.7,
          }}>
            Book a free 30-minute strategy call. Tell us about your content or brand and let's build something powerful together.
          </p>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "inline-block" }}
          >
            <Link
              href="/booking"
              className="btn-shimmer"
              style={{
                display: "inline-flex", alignItems: "center",
                gap: isLargeDesktop ? "0.75rem" : "0.6rem",
                background: BTN_GREEN, color: "#fff",
                padding: isLargeDesktop ? "1.25rem 3.25rem" : "1rem 2.5rem",
                borderRadius: "9999px", fontWeight: 700,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: isLargeDesktop ? "1.2rem" : "1rem",
                letterSpacing: "0.02em", textDecoration: "none",
                overflow: "hidden",
              }}
            >
              Book a Free Call
              <svg width={isLargeDesktop ? "20" : "16"} height={isLargeDesktop ? "20" : "16"} viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          <p style={{
            marginTop: isLargeDesktop ? "2rem" : "1.5rem",
            fontSize: isLargeDesktop ? "1rem" : "0.85rem",
            fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
            color: "#03C04A",
          }}>
            Prefer email?{" "}
            <a
              onClick={() => { window.open("https://mail.google.com/mail/?view=cm&to=razorframestudios@gmail.com", "_blank"); }}
              style={{ color: "#03C04A", textDecoration: "none", cursor: "pointer", fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              razorframestudios@gmail.com
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}