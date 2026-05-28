"use client";

import Link from "next/link";
import { useBreakpoint } from "../hooks/useBreakpoint";

const GLOW_GREEN = "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)";
const GLOW_WHITE = "0 0 30px rgba(3,192,74,0.15)";

export default function Footer() {
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  // ── Layout tokens ──────────────────────────────────────────────────────────
  const maxWidth = isMobile
    ? "100%"     : isTablet
    ? "100%"     : isLaptop
    ? "min(100rem, 96vw)"  : isDesktop
    ? "min(110rem, 94vw)"  : is2K
    ? "min(130rem, 93vw)"  : "min(160rem, 95vw)";

  const paddingH = isMobile
    ? "1.25rem" : isTablet
    ? "1.75rem" : isLaptop
    ? "2rem"    : isDesktop
    ? "2.5rem"  : is2K
    ? "1.5rem"  : "0.75rem";

  const paddingTop = isMobile
    ? "3rem"  : isTablet
    ? "3.5rem": isLaptop
    ? "4.5rem": isDesktop
    ? "5.5rem": is2K
    ? "7rem"  : "9rem";

  const paddingBottom = isMobile
    ? "1.5rem": isTablet
    ? "2rem"  : isLaptop
    ? "2.5rem": isDesktop
    ? "3rem"  : is2K
    ? "4rem"  : "5rem";

  const gridCols = isMobile
    ? "1fr"
    : isTablet
    ? "repeat(2, 1fr)"
    : "repeat(3, 1fr)";

  const gridGap = isMobile
    ? "2rem"   : isTablet
    ? "2.5rem" : isLaptop
    ? "3rem"   : isDesktop
    ? "4rem"   : is2K
    ? "5rem"   : "6.5rem";

  // ── Typography tokens ──────────────────────────────────────────────────────
  const brandFont = isMobile
    ? "1.25rem" : isTablet
    ? "1.35rem" : isLaptop
    ? "1.5rem"  : isDesktop
    ? "1.75rem" : is2K
    ? "2.1rem"  : "2.6rem";

  const bodyFont = isMobile
    ? "0.88rem" : isTablet
    ? "0.9rem"  : isLaptop
    ? "0.95rem" : isDesktop
    ? "1.05rem" : is2K
    ? "1.2rem"  : "1.5rem";

  const labelFont = isMobile
    ? "0.7rem"  : isTablet
    ? "0.75rem" : isLaptop
    ? "0.8rem"  : isDesktop
    ? "0.9rem"  : is2K
    ? "1rem"    : "1.25rem";

  const linkFont = isMobile
    ? "0.88rem" : isTablet
    ? "0.92rem" : isLaptop
    ? "0.95rem" : isDesktop
    ? "1.05rem" : is2K
    ? "1.2rem"  : "1.5rem";

  const bottomBarFont = isMobile
    ? "0.75rem" : isTablet
    ? "0.8rem"  : isLaptop
    ? "0.84rem" : isDesktop
    ? "0.9rem"  : is2K
    ? "1rem"    : "1.25rem";

  // ── Spacing tokens ─────────────────────────────────────────────────────────
  const brandMB = isMobile
    ? "0.6rem"  : isTablet
    ? "0.75rem" : isLaptop
    ? "0.85rem" : isDesktop
    ? "1rem"    : is2K
    ? "1.2rem"  : "1.5rem";

  const headingMB = isMobile
    ? "1rem"    : isTablet
    ? "1.1rem"  : isLaptop
    ? "1.2rem"  : isDesktop
    ? "1.4rem"  : is2K
    ? "1.75rem" : "2.25rem";

  const linkGap = isMobile
    ? "0.55rem" : isTablet
    ? "0.6rem"  : isLaptop
    ? "0.7rem"  : isDesktop
    ? "0.85rem" : is2K
    ? "1rem"    : "1.3rem";

  const emailMB = isMobile
    ? "0.4rem"  : isTablet
    ? "0.45rem" : isLaptop
    ? "0.5rem"  : isDesktop
    ? "0.6rem"  : is2K
    ? "0.75rem" : "1rem";

  const dividerMT = isMobile
    ? "2.5rem"  : isTablet
    ? "3rem"    : isLaptop
    ? "3.5rem"  : isDesktop
    ? "4rem"    : is2K
    ? "5rem"    : "6.5rem";

  const dividerPT = isMobile
    ? "1.25rem" : isTablet
    ? "1.5rem"  : isLaptop
    ? "1.75rem" : isDesktop
    ? "2rem"    : is2K
    ? "2.5rem"  : "3rem";

  return (
    <footer style={{
      background: "#000000",
      color: "white",
      paddingTop,
      paddingBottom,
      paddingLeft: paddingH,
      paddingRight: paddingH,
      borderTop: "0.5px solid rgba(3,192,74,0.15)",
      boxShadow: "0 -1px 40px rgba(3,192,74,0.06)",
    }}>
      <div style={{
        maxWidth,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: gridCols,
        gap: gridGap,
      }}>

        {/* ── Brand ── */}
        <div>
          <h3 style={{
            fontSize: brandFont,
            fontWeight: 600,
            fontFamily: "'Coolvetica', sans-serif",
            marginBottom: brandMB,
            color: "white",
            textShadow: GLOW_WHITE,
            letterSpacing: "-0.02em",
          }}>
            RazorFrame Studios
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: bodyFont,
            lineHeight: 1.6,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 400,
          }}>
            Creating high-performing content for creators and brands.
          </p>
        </div>

        {/* ── Navigation ── */}
        <div>
          <h4 style={{
            fontSize: labelFont,
            fontWeight: 700,
            fontFamily: "Arial, Helvetica, sans-serif",
            marginBottom: headingMB,
            color: "#03C04A",
            textShadow: GLOW_GREEN,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Navigation
          </h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: linkGap }}>
            {[
              { label: "Home",     href: "/" },
              { label: "Services", href: "/services" },
              { label: "Work",     href: "/work" },
              { label: "Contact",  href: "/booking" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: linkFont,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontWeight: 400,
                    transition: "color 0.2s, text-shadow 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#03C04A";
                    e.currentTarget.style.textShadow = GLOW_GREEN;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <h4 style={{
            fontSize: labelFont,
            fontWeight: 700,
            fontFamily: "Arial, Helvetica, sans-serif",
            marginBottom: headingMB,
            color: "#03C04A",
            textShadow: GLOW_GREEN,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Contact
          </h4>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: bodyFont,
            fontFamily: "Arial, Helvetica, sans-serif",
            marginBottom: emailMB,
          }}>
            <a
              onClick={() => {
                window.open("https://mail.google.com/mail/?view=cm&to=razorframestudios@gmail.com", "_blank");
              }}
              style={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: linkFont,
                fontFamily: "Arial, Helvetica, sans-serif",
                transition: "color 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#03C04A"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              razorframestudios@gmail.com
            </a>
          </p>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: bodyFont,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}>
            Based in India
          </p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        maxWidth,
        margin: `${dividerMT} auto 0`,
        paddingTop: dividerPT,
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        textAlign: "center",
        color: "rgba(255,255,255,0.2)",
        fontSize: bottomBarFont,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}>
        © {new Date().getFullYear()} RazorFrame Studios. All rights reserved.
      </div>
    </footer>
  );
}