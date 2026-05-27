"use client";

import FadeIn from "../ui/FadeIn";
import StaggerContainer from "../ui/StaggerContainer";
import ScrollReveal from "../ui/ScrollReveal";
import { testimonials } from "../../data/testimonials";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint();
  const isLargeDesktop = typeof window !== "undefined" && window.innerWidth >= 1600;

  const paddingY = isMobile ? "3rem" : isTablet ? "4rem" : isLargeDesktop ? "9rem" : "6rem";
  const paddingH = isMobile ? "1.25rem" : isTablet ? "2rem" : "4rem";

  return (
    <section
      id="testimonials"
      style={{
        background: "#000000", color: "#ffffff", position: "relative",
        paddingTop: paddingY, paddingBottom: paddingY,
        paddingLeft: paddingH, paddingRight: paddingH,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "300px", pointerEvents: "none", zIndex: 1, background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "300px", pointerEvents: "none", zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }} />

      <div style={{ maxWidth: "min(100rem, 96vw)", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <ScrollReveal variant="scaleUp">
          <div style={{ textAlign: "center", marginBottom: isTablet ? "2.5rem" : isLargeDesktop ? "6rem" : "4rem" }}>
            {/* Topper — Arial */}
            <p style={{
              fontSize: isLargeDesktop ? "0.9rem" : "0.75rem",
              letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "white", textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
              marginBottom: "0.75rem",
            }}>Client Stories</p>
            {/* Heading — Coolvetica */}
            <h2 style={{
              fontSize: isLargeDesktop
                ? "clamp(3.5rem, 5vw, 5rem)"
                : "clamp(2.2rem, 5vw, 3.5rem)",
              fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
              letterSpacing: "-0.02em", lineHeight: 1.1, color: "#ffffff",
            }}>
              What Our Clients Say
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isLargeDesktop
              ? "repeat(auto-fit, minmax(360px, 1fr))"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? "1rem" : isLargeDesktop ? "2rem" : "1.25rem",
          }}>
            {testimonials.map((t, i) => (
              <FadeIn key={i}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)", borderRadius: isLargeDesktop ? "20px" : "16px",
                    padding: isMobile ? "1.5rem" : isTablet ? "1.75rem" : isLargeDesktop ? "2.75rem" : "2rem",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    minHeight: isMobile ? "220px" : isLargeDesktop ? "340px" : "260px",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <p style={{
                    fontSize: isLargeDesktop ? "0.75rem" : "0.65rem",
                    fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem",
                  }}>Client</p>
                  <div style={{
                    fontSize: isLargeDesktop ? "4rem" : "3rem",
                    lineHeight: 1, color: "rgba(3,192,74,0.5)",
                    marginBottom: "0.5rem", fontFamily: "Georgia, serif",
                  }}>"</div>
                  {/* Feedback — Arial */}
                  <p style={{
                    fontSize: isLargeDesktop ? "1.1rem" : "0.95rem",
                    fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                    lineHeight: 1.75, color: "rgba(255,255,255,0.8)",
                    flexGrow: 1, marginBottom: "1.75rem",
                  }}>{t.feedback}</p>
                  <div style={{
                    display: "flex", alignItems: "center",
                    gap: "0.75rem",
                    paddingTop: isLargeDesktop ? "1.5rem" : "1.25rem",
                    borderTop: "0.5px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{
                      width: isLargeDesktop ? "46px" : "36px",
                      height: isLargeDesktop ? "46px" : "36px",
                      borderRadius: "50%", background: "rgba(3,192,74,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: isLargeDesktop ? "0.9rem" : "0.75rem",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontWeight: 700, color: "#03C04A",
                      textShadow: "0 0 20px rgba(3,192,74,0.7)", flexShrink: 0,
                    }}>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p style={{ fontSize: isLargeDesktop ? "1.05rem" : "0.9rem", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700, color: "#ffffff", marginBottom: "0.1rem" }}>{t.name}</p>
                      <p style={{ fontSize: isLargeDesktop ? "0.88rem" : "0.75rem", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.35)" }}>{(t as any).role || "Client"}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}