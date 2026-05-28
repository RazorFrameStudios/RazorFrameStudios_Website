"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio } from "../../data/portfolio";
import ScrollReveal from "../ui/ScrollReveal";
import { useBreakpoint } from "../hooks/useBreakpoint";

function getYouTubeId(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

function getEmbedUrl(url: string): string {
  const id = getYouTubeId(url);
  const isShort = url.includes("/shorts/");
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1${isShort ? "&loop=1" : ""}`;
}

function VideoModal({ item, onClose }: { item: (typeof portfolio)[0]; onClose: () => void }) {
  const isShortForm = item.videoUrl.includes("/shorts/");
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 0.87 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
        style={{
          position: "fixed", zIndex: 101,
          top: "50%", left: "50%",
          x: "-50%", y: "-50%",
          borderRadius: "16px", overflow: "hidden",
          background: "#000", border: "0.5px solid rgba(3,192,74,0.3)",
          height: isShortForm ? "min(85vh, 720px)" : undefined,
          width: isShortForm ? "auto" : "min(90vw, 1100px)",
          aspectRatio: isShortForm ? "9/16" : "16/9",
        }}
      >
        <iframe
          src={getEmbedUrl(item.videoUrl)} title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "0.75rem", right: "0.75rem",
            background: "rgba(0,0,0,0.6)", border: "0.5px solid rgba(255,255,255,0.2)",
            borderRadius: "50%", width: "32px", height: "32px",
            color: "white", fontSize: "1rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
          }}
        >✕</button>
      </motion.div>
    </>
  );
}

export default function Portfolio() {
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  // ── Container (mirrors Services) ─────────────────────────────────────────
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

  // ── Section padding (mirrors Services exactly) ────────────────────────────
  const paddingY = isMobile
    ? "3rem"    : isTablet
    ? "4rem"    : isLaptop
    ? "rem"    : isDesktop
    ? "7.5rem"  : is2K
    ? "9rem"    : "11rem";

  const paddingH = isMobile
    ? "1.25rem" : isTablet
    ? "1.75rem" : isLaptop
    ? "3rem"    : isDesktop
    ? "2.5rem"  : is2K
    ? "1.5rem"  : "0.75rem";

  // ── Header typography (mirrors Services exactly) ──────────────────────────
  const topperFont = isMobile
    ? "0.68rem" : isTablet
    ? "0.72rem" : isLaptop
    ? "0.78rem" : isDesktop
    ? "0.9rem"  : is2K
    ? "1.05rem" : "1.3rem";

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
    ? "3rem"    : isDesktop
    ? "4rem"    : is2K
    ? "5rem"    : "6rem";

  const viewAllFont = isMobile
    ? "0.78rem" : isTablet
    ? "0.82rem" : isLaptop
    ? "0.85rem" : isDesktop
    ? "1rem"    : is2K
    ? "1.25rem" : "1.55rem";

  // ── Side gradient fade width ──────────────────────────────────────────────
  const sideGradientW = isMobile
    ? "60px"    : isTablet
    ? "100px"   : isLaptop
    ? "140px"   : isDesktop
    ? "200px"   : is2K
    ? "300px"   : "400px";

  // ── Carousel card sizing ──────────────────────────────────────────────────
  const cardWidth = isMobile
    ? 240  : isTablet
    ? 300  : isLaptop
    ? 360  : isDesktop
    ? 420  : is2K
    ? 580  : 780;

  const cardGap = isMobile
    ? 14   : isTablet
    ? 16   : isLaptop
    ? 20   : isDesktop
    ? 24   : is2K
    ? 32   : 44;

  const cardRadius = isMobile
    ? "10px" : isTablet
    ? "12px" : isLaptop
    ? "14px" : isDesktop
    ? "16px" : is2K
    ? "20px" : "26px";

  // ── Card label typography ─────────────────────────────────────────────────
  const cardTitleFont = isMobile
    ? "0.78rem" : isTablet
    ? "0.85rem" : isLaptop
    ? "0.92rem" : isDesktop
    ? "1.05rem" : is2K
    ? "1.4rem"  : "1.8rem";

  const cardArrowFont = isMobile
    ? "0.65rem" : isTablet
    ? "0.72rem" : isLaptop
    ? "0.78rem" : isDesktop
    ? "0.9rem"  : is2K
    ? "1.15rem" : "1.45rem";

  const cardPadH = isMobile
    ? "0.7rem 0.85rem"  : isTablet
    ? "0.8rem 1rem"     : isLaptop
    ? "0.9rem 1.1rem"   : isDesktop
    ? "1rem 1.25rem"    : is2K
    ? "1.4rem 1.75rem"  : "1.8rem 2.25rem";

  // ── Play button in card overlay ───────────────────────────────────────────
  const playBtnSize = isMobile
    ? 40   : isTablet
    ? 46   : isLaptop
    ? 52   : isDesktop
    ? 58   : is2K
    ? 80   : 104;

  const playIconSize = isMobile
    ? 14   : isTablet
    ? 16   : isLaptop
    ? 18   : isDesktop
    ? 20   : is2K
    ? 28   : 36;

  // ── Carousel top padding & scroll speed ──────────────────────────────────
  const carouselPT = isMobile
    ? 28   : isTablet
    ? 36   : isLaptop
    ? 48   : isDesktop
    ? 58   : is2K
    ? 80   : 110;

  const animDuration = isMobile
    ? 22   : isTablet
    ? 26   : isLaptop
    ? 30   : isDesktop
    ? 34   : is2K
    ? 42   : 54;

  const totalWidth = portfolio.length * (cardWidth + cardGap);

  const [paused, setPaused] = useState(false);
  const [expandedItem, setExpandedItem] = useState<(typeof portfolio)[0] | null>(null);

  const loopedItems = [...portfolio, ...portfolio, ...portfolio];

  return (
    <>
      <section
        id="portfolio"
        style={{
          background: "#000000",
          color: "#ffffff",
          position: "relative",
          paddingTop: paddingY,
          paddingBottom: paddingY,
          // Horizontal padding on the section — same as Services
          paddingLeft: paddingH,
          paddingRight: paddingH,
          overflow: "hidden",
        }}
      >
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "300px",
          pointerEvents: "none", zIndex: 1,
          background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }} />

        {/* Left fade — positioned relative to viewport edge, not padded container */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: sideGradientW, height: "100%",
          background: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none", zIndex: 3,
        }} />

        {/* Right fade */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: sideGradientW, height: "100%",
          background: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none", zIndex: 3,
        }} />

        {/* ── Header — maxWidth container mirrors Services ── */}
        <div style={{ maxWidth, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <ScrollReveal variant="fadeRight">
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: h2MB,
              flexWrap: "wrap",
              gap: "1rem",
            }}>
              <div>
                <p style={{
                  fontSize: topperFont,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 400,
                  color: "white",
                  textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
                  marginBottom: "0.5rem",
                }}>
                  Selected Projects
                </p>
                <h2 style={{
                  fontSize: h2Size,
                  fontFamily: "'Coolvetica', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "#ffffff",
                }}>
                  Our Work
                </h2>
              </div>

              <a
                href="/work"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  color: "#1B5E34",
                  textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: viewAllFont,
                  fontWeight: 700, letterSpacing: "0.05em",
                  textDecoration: "none", paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(3,192,74,0.4)",
                  transition: "border-color 0.2s",
                }}
              >
                View All Work →
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Carousel — breaks out of padded container to fill full width ── */}
        <div style={{
          position: "relative",
          zIndex: 2,
          paddingTop: `${carouselPT}px`,
          // Pull carousel to viewport edges, overcoming the section's horizontal padding
          marginLeft: `-${paddingH}`,
          marginRight: `-${paddingH}`,
        }}>
          <style>{`
            @keyframes carousel-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-${totalWidth}px); }
            }
            .carousel-track {
              display: flex;
              gap: ${cardGap}px;
              width: max-content;
              animation: carousel-scroll ${animDuration}s linear infinite;
              will-change: transform;
            }
            .carousel-track.paused { animation-play-state: paused; }
            .carousel-card {
              flex-shrink: 0;
              width: ${cardWidth}px;
              border-radius: ${cardRadius};
              overflow: hidden;
              cursor: pointer;
              transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease;
              background: none;
              border: none;
              padding: 0;
              text-align: left;
            }
            .carousel-card:hover {
              transform: scale(1.06);
              box-shadow: 0 20px 60px rgba(3,192,74,0.25), 0 8px 24px rgba(0,0,0,0.6);
            }
            .carousel-card .thumb-img { transition: transform 0.5s ease; }
            .carousel-card:hover .thumb-img { transform: scale(1.04); }
            .play-btn { transition: opacity 0.3s, transform 0.3s; opacity: 0.85; }
            .carousel-card:hover .play-btn { opacity: 1; transform: scale(1.1); }
            .card-overlay { transition: background 0.3s; background: rgba(0,0,0,0.3); }
            .carousel-card:hover .card-overlay { background: rgba(0,0,0,0.5); }
          `}</style>

          <div
            className={`carousel-track${paused ? " paused" : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {loopedItems.map((item, i) => {
              const id = getYouTubeId(item.videoUrl);
              return (
                <button key={i} className="carousel-card" onClick={() => setExpandedItem(item)}>
                  <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                    <img
                      src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                      alt={item.title}
                      className="thumb-img"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div
                      className="card-overlay"
                      style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <div
                        className="play-btn"
                        style={{
                          width: `${playBtnSize}px`, height: `${playBtnSize}px`,
                          borderRadius: "50%", background: "#1B5E34",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <svg width={playIconSize} height={playIconSize} viewBox="0 0 18 18" fill="none">
                          <path d="M5 3L15 9L5 15V3Z" fill="#fff" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: cardPadH,
                    background: "rgba(10,10,10,0.6)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{
                      fontSize: cardTitleFont,
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontWeight: 600, color: "#ffffff",
                      letterSpacing: "-0.01em",
                    }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: cardArrowFont, color: "#03C04A" }}>▶</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {expandedItem && (
          <VideoModal item={expandedItem} onClose={() => setExpandedItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}