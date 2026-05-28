"use client";

import FadeIn from "../ui/FadeIn";
import StaggerContainer from "../ui/StaggerContainer";
import ScrollReveal from "../ui/ScrollReveal";
import { testimonials } from "../../data/testimonials";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function Testimonials() {
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
    : isLaptop
    ? "repeat(auto-fit, minmax(300px, 1fr))"
    : isDesktop
    ? "repeat(auto-fit, minmax(360px, 1fr))"
    : is2K
    ? "repeat(auto-fit, minmax(480px, 1fr))"
    : "repeat(auto-fit, minmax(600px, 1fr))";

  const gridGap = isMobile
    ? "1rem"    : isTablet
    ? "1.25rem" : isLaptop
    ? "1.5rem"  : isDesktop
    ? "2rem"    : is2K
    ? "2.5rem"  : "3rem";

  // ── Card ───────────────────────────────────────────────────────────────────
  const cardRadius = isMobile
    ? "12px"  : isTablet
    ? "14px"  : isLaptop
    ? "16px"  : isDesktop
    ? "20px"  : is2K
    ? "24px"  : "28px";

  const cardPad = isMobile
    ? "1.5rem"  : isTablet
    ? "1.75rem" : isLaptop
    ? "2rem"    : isDesktop
    ? "2.75rem" : is2K
    ? "3.5rem"  : "4.5rem";

  const cardMinH = isMobile
    ? "220px" : isTablet
    ? "250px" : isLaptop
    ? "280px" : isDesktop
    ? "340px" : is2K
    ? "440px" : "560px";

  // ── "Client" label ─────────────────────────────────────────────────────────
  const clientLabelFont = isMobile
    ? "0.62rem" : isTablet
    ? "0.68rem" : isLaptop
    ? "0.72rem" : isDesktop
    ? "0.82rem" : is2K
    ? "1rem"    : "1.3rem";

  const clientLabelMB = isMobile
    ? "1rem"    : isTablet
    ? "1.1rem"  : isLaptop
    ? "1.25rem" : isDesktop
    ? "1.5rem"  : is2K
    ? "1.75rem" : "2.25rem";

  // ── Quote mark ─────────────────────────────────────────────────────────────
  const quoteFont = isMobile
    ? "2.75rem" : isTablet
    ? "3rem"    : isLaptop
    ? "3.5rem"  : isDesktop
    ? "4.5rem"  : is2K
    ? "5.5rem"  : "7rem";

  const quoteMB = isMobile
    ? "0.25rem" : isTablet
    ? "0.35rem" : isLaptop
    ? "0.4rem"  : isDesktop
    ? "0.5rem"  : is2K
    ? "0.6rem"  : "0.75rem";

  // ── Feedback body ──────────────────────────────────────────────────────────
  const feedbackFont = isMobile
    ? "0.92rem" : isTablet
    ? "1rem"    : isLaptop
    ? "1.05rem" : isDesktop
    ? "1.2rem"  : is2K
    ? "1.55rem" : "2rem";

  const feedbackMB = isMobile
    ? "1.5rem"  : isTablet
    ? "1.6rem"  : isLaptop
    ? "1.75rem" : isDesktop
    ? "2rem"    : is2K
    ? "2.5rem"  : "3.25rem";

  // ── Author row ─────────────────────────────────────────────────────────────
  const authorPT = isMobile
    ? "1rem"    : isTablet
    ? "1.1rem"  : isLaptop
    ? "1.25rem" : isDesktop
    ? "1.5rem"  : is2K
    ? "2rem"    : "2.5rem";

  const authorGap = isMobile
    ? "0.6rem"  : isTablet
    ? "0.7rem"  : isLaptop
    ? "0.75rem" : isDesktop
    ? "0.9rem"  : is2K
    ? "1.15rem" : "1.5rem";

  const avatarSize = isMobile
    ? "34px"  : isTablet
    ? "38px"  : isLaptop
    ? "42px"  : isDesktop
    ? "50px"  : is2K
    ? "64px"  : "82px";

  const avatarFont = isMobile
    ? "0.7rem"  : isTablet
    ? "0.78rem" : isLaptop
    ? "0.85rem" : isDesktop
    ? "1rem"    : is2K
    ? "1.3rem"  : "1.65rem";

  const authorNameFont = isMobile
    ? "0.88rem" : isTablet
    ? "0.95rem" : isLaptop
    ? "1rem"    : isDesktop
    ? "1.15rem" : is2K
    ? "1.5rem"  : "1.9rem";

  const authorRoleFont = isMobile
    ? "0.72rem" : isTablet
    ? "0.78rem" : isLaptop
    ? "0.82rem" : isDesktop
    ? "0.92rem" : is2K
    ? "1.15rem" : "1.45rem";

  return (
    <section
      id="testimonials"
      style={{
        background: "#000000",
        color: "#ffffff",
        position: "relative",
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: paddingH,
        paddingRight: paddingH,
      }}
    >
      {/* Top fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "300px",
        pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "300px",
        pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      }} />

      <div style={{ maxWidth, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* ── Section header ── */}
        <ScrollReveal variant="scaleUp">
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
              Client Stories
            </p>
            <h2 style={{
              fontSize: h2Size,
              fontFamily: "'Coolvetica', sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#ffffff",
            }}>
              What Our Clients Say
            </h2>
          </div>
        </ScrollReveal>

        {/* ── Cards grid ── */}
        <StaggerContainer>
          <div style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: gridGap,
          }}>
            {testimonials.map((t, i) => (
              <FadeIn key={i}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: cardRadius,
                    padding: cardPad,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: cardMinH,
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* "Client" label */}
                  <p style={{
                    fontSize: clientLabelFont,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: clientLabelMB,
                  }}>
                    Client
                  </p>

                  {/* Quote mark */}
                  <div style={{
                    fontSize: quoteFont,
                    lineHeight: 1,
                    color: "rgba(3,192,74,0.5)",
                    marginBottom: quoteMB,
                    fontFamily: "Georgia, serif",
                  }}>
                    "
                  </div>

                  {/* Feedback */}
                  <p style={{
                    fontSize: feedbackFont,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.8)",
                    flexGrow: 1,
                    marginBottom: feedbackMB,
                  }}>
                    {t.feedback}
                  </p>

                  {/* Author row */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: authorGap,
                    paddingTop: authorPT,
                    borderTop: "0.5px solid rgba(255,255,255,0.06)",
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: avatarSize,
                      height: avatarSize,
                      borderRadius: "50%",
                      background: "rgba(3,192,74,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: avatarFont,
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontWeight: 700,
                      color: "#03C04A",
                      textShadow: "0 0 20px rgba(3,192,74,0.7)",
                      flexShrink: 0,
                    }}>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>

                    {/* Name + role */}
                    <div>
                      <p style={{
                        fontSize: authorNameFont,
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "0.15rem",
                      }}>
                        {t.name}
                      </p>
                      <p style={{
                        fontSize: authorRoleFont,
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.35)",
                      }}>
                        {(t as any).role || "Client"}
                      </p>
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