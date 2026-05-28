"use client";

import FadeIn from "../ui/FadeIn";
import StaggerContainer from "../ui/StaggerContainer";
import ScrollReveal from "../ui/ScrollReveal";
import { whyChooseUs } from "../../data/whyChooseUs";
import { useBreakpoint } from "../hooks/useBreakpoint";

const icons = ["◈", "◉", "✦"];

export default function WhyChooseUs() {
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
    ? "2rem"    : isTablet
    ? "2.5rem"  : isLaptop
    ? "3.5rem"  : isDesktop
    ? "4.5rem"  : is2K
    ? "5.5rem"  : "7rem";

  // ── Grid ───────────────────────────────────────────────────────────────────
  const gridCols = isMobile
    ? "1fr"
    : isTablet
    ? "1fr 1fr"
    : "repeat(3, 1fr)";

  const borderRadius = isMobile
    ? "12px"  : isTablet
    ? "14px"  : isLaptop
    ? "16px"  : isDesktop
    ? "20px"  : is2K
    ? "24px"  : "28px";

  // ── Card padding ───────────────────────────────────────────────────────────
  const cardPad = isMobile
    ? "1.5rem"  : isTablet
    ? "2rem"    : isLaptop
    ? "2.5rem"  : isDesktop
    ? "3rem"    : is2K
    ? "3.75rem" : "4.75rem";

  // ── Icon circle ────────────────────────────────────────────────────────────
  const iconSize = isMobile
    ? "40px"  : isTablet
    ? "46px"  : isLaptop
    ? "52px"  : isDesktop
    ? "60px"  : is2K
    ? "76px"  : "96px";

  const iconFont = isMobile
    ? "1rem"    : isTablet
    ? "1.15rem" : isLaptop
    ? "1.3rem"  : isDesktop
    ? "1.55rem" : is2K
    ? "2rem"    : "2.5rem";

  const iconMB = isMobile
    ? "1.25rem" : isTablet
    ? "1.5rem"  : isLaptop
    ? "1.75rem" : isDesktop
    ? "2rem"    : is2K
    ? "2.5rem"  : "3.25rem";

  // ── Card title ─────────────────────────────────────────────────────────────
  const cardTitleFont = isMobile
    ? "1.1rem"  : isTablet
    ? "1.25rem" : isLaptop
    ? "1.45rem" : isDesktop
    ? "1.75rem" : is2K
    ? "2.35rem" : "3rem";

  const cardTitleMB = isMobile
    ? "0.6rem"  : isTablet
    ? "0.7rem"  : isLaptop
    ? "0.85rem" : isDesktop
    ? "1rem"    : is2K
    ? "1.3rem"  : "1.75rem";

  // ── Card body ──────────────────────────────────────────────────────────────
  const cardBodyFont = isMobile
    ? "0.92rem" : isTablet
    ? "1rem"    : isLaptop
    ? "1.08rem" : isDesktop
    ? "1.2rem"  : is2K
    ? "1.6rem"  : "2rem";

  return (
    <section
      id="why-us"
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
      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "300px",
        pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      }} />

      <div style={{ maxWidth, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* ── Section header ── */}
        <ScrollReveal variant="fadeDown">
          <div style={{ textAlign: "center", marginBottom: headerMB }}>
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
              Our Edge
            </p>
            <h2 style={{
              fontSize: h2Size,
              fontFamily: "'Coolvetica', sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "white",
            }}>
              Why Choose Us
            </h2>
          </div>
        </ScrollReveal>

        {/* ── Cards grid ── */}
        <StaggerContainer>
          <div style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: "0",
            border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius,
            overflow: "hidden",
          }}>
            {whyChooseUs.map((item, i) => (
              <FadeIn key={i}>
                <div
                  style={{
                    padding: cardPad,
                    borderRight: !isMobile && i < whyChooseUs.length - 1
                      ? "0.5px solid rgba(255,255,255,0.08)"
                      : "none",
                    borderBottom: isTablet && i < 2
                      ? "0.5px solid rgba(255,255,255,0.08)"
                      : isMobile && i < whyChooseUs.length - 1
                      ? "0.5px solid rgba(255,255,255,0.08)"
                      : "none",
                    borderLeft: "3px solid transparent",
                    transition: "border-left-color 0.3s, background 0.3s",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderLeftColor = "#1B5E34";
                    e.currentTarget.style.background = "rgba(3,192,74,0.04)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderLeftColor = "transparent";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: iconSize,
                    height: iconSize,
                    borderRadius: "50%",
                    border: "1px solid rgba(3,192,74,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: iconMB,
                    color: "#1B5E34",
                    textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
                    fontSize: iconFont,
                    flexShrink: 0,
                  }}>
                    {icons[i] || "✦"}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: cardTitleFont,
                    fontFamily: "'Coolvetica', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: cardTitleMB,
                    color: "white",
                    lineHeight: 1.2,
                  }}>
                    {item.title}
                  </h3>

                  {/* Body */}
                  <p style={{
                    fontSize: cardBodyFont,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.8)",
                  }}>
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </StaggerContainer>

      </div>
    </section>
  );
}