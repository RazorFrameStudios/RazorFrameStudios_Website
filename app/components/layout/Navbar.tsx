"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useBreakpoint } from "../hooks/useBreakpoint";

const GLOW_GREEN = "0 0 5px rgba(3,192,74,0.7), 0 0 10px rgba(3,192,74,0.3)";
const GLOW_WHITE = "0 0 30px rgba(3,192,74,0.15)";
const TRANSITION = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };
const BTN_GREEN  = "#1B5E34";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work",     href: "/work" },
  { label: "About Us",    href: "/about" },
  { label: "Contact",  href: "/booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  // Only phones + tablets get the hamburger
  const showMobileMenu = isMobile || isTablet;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Sizing tokens ──────────────────────────────────────────────────────────
  const navPadH = isMobile
    ? "1.25rem" : isTablet
    ? "1.75rem" : isLaptop
    ? "2rem"    : isDesktop
    ? "2.5rem"  : is2K
    ? "3rem"    : "4rem";

  const navPadV = isMobile
    ? "1rem"  : isTablet
    ? "1.1rem": isLaptop
    ? "1.25rem": isDesktop
    ? "1.4rem" : is2K
    ? "1.6rem" : "2rem";

  const logoHeightExpanded = isMobile
    ? 28  : isTablet
    ? 32  : isLaptop
    ? 36  : isDesktop
    ? 42  : is2K
    ? 52  : 64;

  const logoHeightScrolled = isMobile
    ? 52  : isTablet
    ? 58  : isLaptop
    ? 68  : isDesktop
    ? 80  : is2K
    ? 96  : 120;

  const brandFontSize = isMobile
    ? "1.1rem"  : isTablet
    ? "1.2rem"  : isLaptop
    ? "1.35rem" : isDesktop
    ? "1.5rem"  : is2K
    ? "1.8rem"  : "2.2rem";

  const linkFontSize = isLaptop
    ? "0.9rem"  : isDesktop
    ? "1rem"    : is2K
    ? "1.15rem" : is4K
    ? "1.4rem"  : "0.9rem";

  const linkGap = isLaptop
    ? "1.6rem"  : isDesktop
    ? "2rem"    : is2K
    ? "2.5rem"  : is4K
    ? "3.25rem" : "1.6rem";

  const ctaPad = isLaptop
    ? "0.55rem 1.4rem"  : isDesktop
    ? "0.65rem 1.6rem"  : is2K
    ? "0.8rem 2rem"     : is4K
    ? "1rem 2.5rem"     : "0.55rem 1.4rem";

  const ctaFontSize = isLaptop
    ? "0.85rem" : isDesktop
    ? "0.9rem"  : is2K
    ? "1.05rem" : is4K
    ? "1.3rem"  : "0.85rem";

  // Drawer sizing (mobile/tablet only)
  const drawerPadH   = isTablet ? "3rem"   : "1.75rem";
  const drawerPadBot = isTablet ? "2.5rem" : "2rem";
  const drawerLinkFont  = isTablet ? "1.25rem" : "1.1rem";
  const drawerLinkPadV  = isTablet ? "1.1rem"  : "0.95rem";
  const drawerCtaPad    = isTablet ? "1rem 2.5rem" : "0.85rem 2rem";
  const drawerCtaFont   = isTablet ? "1.05rem"     : "0.95rem";
  const drawerCtaMT     = isTablet ? "2rem"         : "1.5rem";
  const hamburgerSize   = isMobile ? "22px" : "26px";

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
          padding: `${navPadV} ${navPadH}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "background 0.5s, backdrop-filter 0.5s, border 0.5s",
          background: scrolled || menuOpen ? "rgba(0,0,0,0.9)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled ? "0.5px solid rgba(3,192,74,0.12)" : "none",
          boxSizing: "border-box",
        }}
      >
        {/* Brand */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <motion.img
            src="/logo.png"
            animate={{ height: scrolled ? logoHeightScrolled : logoHeightExpanded }}
            transition={TRANSITION}
            style={{ width: "auto", objectFit: "contain", display: "block" }}
          />
          <motion.h1
            animate={{ opacity: scrolled ? 0 : 1, x: scrolled ? -12 : 0, width: scrolled ? 0 : "auto" }}
            transition={TRANSITION}
            style={{
              fontSize: brandFontSize,
              fontFamily: "'Coolvetica', sans-serif",
              fontWeight: 500,
              color: "white",
              letterSpacing: "0.01em",
              lineHeight: 1.08,
              textShadow: GLOW_WHITE,
              margin: 0, overflow: "hidden", whiteSpace: "nowrap",
              pointerEvents: scrolled ? "none" : "auto",
            }}
          >
            RazorFrameStudios
          </motion.h1>
        </Link>

        {/* Desktop nav links */}
        {!showMobileMenu && (
          <div style={{ display: "flex", gap: linkGap }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href}
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: linkFontSize,
                  fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                  textDecoration: "none", transition: "color 0.2s, text-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#03C04A"; e.currentTarget.style.textShadow = GLOW_GREEN; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.textShadow = "none"; }}
              >{label}</Link>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!showMobileMenu && (
          <Link href="/booking"
            className="btn-shimmer"
            style={{
              background: BTN_GREEN, color: "#fff",
              padding: ctaPad,
              borderRadius: "9999px", fontWeight: 600,
              fontSize: ctaFontSize,
              fontFamily: "Arial, Helvetica, sans-serif",
              textDecoration: "none",
              boxShadow: "0 0 16px rgba(3,192,74,0.35)",
              transition: "opacity 0.2s",
              overflow: "hidden",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >Book a Call</Link>
        )}

        {/* Hamburger */}
        {showMobileMenu && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px" }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45,  y: 7 }
                    : i === 1 ? { opacity: 0 }
                    :           { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                style={{
                  display: "block", width: hamburgerSize, height: "2px",
                  background: "#03C04A", borderRadius: "2px", transformOrigin: "center",
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        )}
      </motion.nav>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {menuOpen && showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", top: "72px", left: 0, right: 0, zIndex: 49,
              background: "rgba(0,0,0,0.95)", backdropFilter: "blur(16px)",
              borderBottom: "0.5px solid rgba(3,192,74,0.15)",
              padding: `1.5rem ${drawerPadH} ${drawerPadBot}`,
              display: "flex", flexDirection: "column",
            }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: `${drawerLinkPadV} 0`,
                    color: "rgba(255,255,255,0.75)",
                    fontSize: drawerLinkFont,
                    fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 600,
                    textDecoration: "none",
                    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#03C04A")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                >{label}</Link>
              </motion.div>
            ))}
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="btn-shimmer"
              style={{
                display: "inline-block",
                marginTop: drawerCtaMT,
                background: BTN_GREEN, color: "#fff",
                padding: drawerCtaPad,
                borderRadius: "9999px", fontWeight: 700,
                fontSize: drawerCtaFont,
                fontFamily: "Arial, Helvetica, sans-serif",
                textDecoration: "none", textAlign: "center",
                boxShadow: "0 0 20px rgba(3,192,74,0.35)",
                overflow: "hidden",
              }}
            >Book a Call</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}