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
          style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "rgba(0,0,0,0.6)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "32px", height: "32px", color: "white", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
        >✕</button>
      </motion.div>
    </>
  );
}

export default function Portfolio() {
  const { isMobile, isTablet } = useBreakpoint();
  const isLargeDesktop = typeof window !== "undefined" && window.innerWidth >= 1600;

  const paddingY = isMobile ? "3rem" : isTablet ? "4rem" : isLargeDesktop ? "9rem" : "6rem";
  const paddingH = isMobile ? "1.25rem" : isTablet ? "2rem" : "4rem";

  const [paused, setPaused] = useState(false);
  const [expandedItem, setExpandedItem] = useState<(typeof portfolio)[0] | null>(null);

  const loopedItems = [...portfolio, ...portfolio, ...portfolio];

  const cardWidth  = isMobile ? 280 : isTablet ? 320 : isLargeDesktop ? 480 : 380;
  const cardGap    = isLargeDesktop ? 28 : 20;
  const totalWidth = portfolio.length * (cardWidth + cardGap);

  return (
    <>
      <section
        id="portfolio"
        style={{
          background: "#000000", color: "#ffffff", position: "relative",
          paddingTop: paddingY, paddingBottom: paddingY,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "300px", pointerEvents: "none", zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: isLargeDesktop ? "200px" : "120px", height: "100%", background: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)", pointerEvents: "none", zIndex: 3 }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: isLargeDesktop ? "200px" : "120px", height: "100%", background: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)", pointerEvents: "none", zIndex: 3 }} />

        {/* Header */}
        <div style={{ maxWidth: "min(100rem, 96vw)", margin: "0 auto", position: "relative", zIndex: 2, paddingLeft: paddingH, paddingRight: paddingH }}>
          <ScrollReveal variant="fadeRight">
            <div style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: isTablet ? "2rem" : isLargeDesktop ? "4rem" : "3rem",
              flexWrap: "wrap", gap: "1rem",
            }}>
              <div>
                {/* Topper — Arial */}
                <p style={{
                  fontSize: isLargeDesktop ? "0.9rem" : "0.75rem",
                  letterSpacing: "0.3em", textTransform: "uppercase",
                  fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
                  color: "white", textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
                  marginBottom: "0.5rem",
                }}>
                  Selected Projects
                </p>
                {/* Heading — Coolvetica */}
                <h2 style={{
                  fontSize: isLargeDesktop
                    ? "clamp(3.5rem, 5vw, 5rem)"
                    : "clamp(2.2rem, 5vw, 3.5rem)",
                  fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
                  letterSpacing: "-0.02em", lineHeight: 1.1, color: "#ffffff",
                }}>
                  Our Work
                </h2>
              </div>
              {/* Link — Arial Bold */}
              <a
                href="/work"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  color: "#1B5E34", textShadow: "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: isLargeDesktop ? "1rem" : "0.85rem",
                  fontWeight: 700, letterSpacing: "0.05em",
                  textDecoration: "none", paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(3,192,74,0.4)", transition: "border-color 0.2s",
                }}
              >
                View All Work →
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Carousel */}
        <div style={{ position: "relative", zIndex: 2, paddingTop: isLargeDesktop ? 70 : 50 }}>
          <style>{`
            @keyframes carousel-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-${totalWidth}px); }
            }
            .carousel-track {
              display: flex;
              gap: ${cardGap}px;
              width: max-content;
              animation: carousel-scroll 30s linear infinite;
              will-change: transform;
            }
            .carousel-track.paused { animation-play-state: paused; }
            .carousel-card {
              flex-shrink: 0;
              width: ${cardWidth}px;
              border-radius: ${isLargeDesktop ? "16px" : "12px"};
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
                    <div className="card-overlay" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div className="play-btn" style={{ width: isLargeDesktop ? "64px" : "52px", height: isLargeDesktop ? "64px" : "52px", borderRadius: "50%", background: "#1B5E34", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width={isLargeDesktop ? "22" : "18"} height={isLargeDesktop ? "22" : "18"} viewBox="0 0 18 18" fill="none">
                          <path d="M5 3L15 9L5 15V3Z" fill="#fff" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: isLargeDesktop ? "1.1rem 1.35rem" : "0.85rem 1rem", background: "rgba(10,10,10,0.6)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: isLargeDesktop ? "1.1rem" : "0.9rem", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.01em" }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: isLargeDesktop ? "0.9rem" : "0.75rem", color: "#03C04A" }}>▶</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {expandedItem && <VideoModal item={expandedItem} onClose={() => setExpandedItem(null)} />}
      </AnimatePresence>
    </>
  );
}