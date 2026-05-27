"use client";

import FadeIn from "../ui/FadeIn";
import StaggerContainer from "../ui/StaggerContainer";
import ScrollReveal from "../ui/ScrollReveal";
import { whyChooseUs } from "../../data/whyChooseUs";
import { useBreakpoint } from "../hooks/useBreakpoint";

const icons = ["◈", "◉", "✦"];

export default function WhyChooseUs() {
  const { isMobile, isTablet } = useBreakpoint();
  const isLargeDesktop = typeof window !== "undefined" && window.innerWidth >= 1600;

  const paddingY = isMobile ? "3rem" : isTablet ? "4rem" : isLargeDesktop ? "9rem" : "6rem";
  const paddingH = isMobile ? "1.25rem" : isTablet ? "2rem" : "4rem";

  return (
    <section
      id="why-us"
      style={{
        background: "#000000", color: "white", position: "relative",
        paddingTop: paddingY, paddingBottom: paddingY,
        paddingLeft: paddingH, paddingRight: paddingH,
      }}
    >
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "300px", pointerEvents: "none", zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }} />

      <div style={{ maxWidth: "min(100rem, 96vw)", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <ScrollReveal variant="fadeDown">
          <div style={{ textAlign: "center", marginBottom: isTablet ? "2.5rem" : isLargeDesktop ? "6rem" : "4rem" }}>
            {/* Topper — Arial */}
            <p style={{
              fontSize: isLargeDesktop ? "0.9rem" : "0.75rem",
              letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "white", textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
              marginBottom: "0.75rem",
            }}>Our Edge</p>
            {/* Heading — Coolvetica */}
            <h2 style={{
              fontSize: isLargeDesktop
                ? "clamp(3.5rem, 5vw, 5rem)"
                : "clamp(2.2rem, 5vw, 3.5rem)",
              fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
              letterSpacing: "-0.02em", lineHeight: 1.1, color: "white",
            }}>
              Why Choose Us
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "0",
            border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: isLargeDesktop ? "20px" : "16px",
            overflow: "hidden",
          }}>
            {whyChooseUs.map((item, i) => (
              <FadeIn key={i}>
                <div
                  style={{
                    padding: isMobile ? "1.75rem" : isTablet ? "2rem" : isLargeDesktop ? "3.5rem" : "2.5rem",
                    borderRight: !isMobile && i < whyChooseUs.length - 1 ? "0.5px solid rgba(255,255,255,0.08)" : "none",
                    borderBottom: isMobile && i < whyChooseUs.length - 1 ? "0.5px solid rgba(255,255,255,0.08)" : "none",
                    borderLeft: "3px solid transparent",
                    transition: "border-left-color 0.3s, background 0.3s",
                    height: "100%",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderLeftColor = "#1B5E34"; e.currentTarget.style.background = "rgba(3,192,74,0.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{
                    width: isLargeDesktop ? "58px" : "44px",
                    height: isLargeDesktop ? "58px" : "44px",
                    borderRadius: "50%", border: "1px solid rgba(3,192,74,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: isLargeDesktop ? "2rem" : "1.5rem",
                    color: "#1B5E34", textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
                    fontSize: isLargeDesktop ? "1.25rem" : "1rem",
                  }}>
                    {icons[i] || "✦"}
                  </div>
                  {/* Card title — Coolvetica */}
                  <h3 style={{
                    fontSize: isLargeDesktop ? "1.5rem" : "1.15rem",
                    fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: isLargeDesktop ? "1rem" : "0.75rem",
                    color: "white",
                  }}>{item.title}</h3>
                  {/* Description — Arial */}
                  <p style={{
                    fontSize: isLargeDesktop ? "1.05rem" : "0.9rem",
                    fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                    lineHeight: 1.7, color: "rgba(255,255,255,0.8)",
                  }}>{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}