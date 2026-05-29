"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "../components/hooks/useBreakpoint";

const BTN_GREEN = "#1B5E34";

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

function getEmbedUrl(url: string) {
  const id = getYouTubeId(url);
  const isShort = url.includes("/shorts/");
  return `https://www.youtube.com/embed/${id}?autoplay=1&controls=0&loop=1&playlist=${id}&rel=0&modestbranding=0&showinfo=0${isShort ? "&vq=hd720" : ""}`;
}

const services = [
  {
    id: "scripting",
    title: "Scripting",
    tagline: "Ideas That Hold Attention.",
    description:
      "We turn rough ideas into structured scripts built to hold attention. Every part of the script is carefully written from the opening hook to the final CTA to improve clarity, pacing, and viewer retention while still feeling natural, authentic, and easy to watch.",
    features: ["Hook Writing", "Retention Flow", "CTA Structure", "Audience Psychology"],
    icon: "♣",
    cards: [
      { image: "/services/Scripting Card 2.png" },
      { image: "/services/Scripting Card 1.png" },
      { image: "/services/Scripting Card 3.png" },
    ],
  },
  {
    id: "short",
    title: "Short Form Content",
    tagline: "Fast Hooks. Clean Edits.",
    description:
      "We create short videos built to grab attention instantly and keep it. It's all about strong openings, clean editing, and keeping the energy high without feeling overwhelming. From reels to shorts and TikToks, we help you stay consistent and stand out in a crowded feed.",
    features: ["Sharp Hooks", "Fast Pacing", "Clean Captions", "Trend Ready"],
    icon: "✦",
    cards: [
      { image: "/services/Short2.png",  videoUrl: "https://youtube.com/shorts/2tT-PO0y9Mc?feature=share" },
      { image: "/services/Short1.png",  videoUrl: "https://www.youtube.com/shorts/fJAlrXwwfoQ" },
      { image: "/services/Short3.jpeg", videoUrl: "https://youtube.com/shorts/JZ-SzBfEzXw" },
    ],
  },
  {
    id: "long",
    title: "Long Form Content",
    tagline: "Story Focused. Smooth Pacing.",
    description:
      "We turn your raw footage into structured, engaging videos that people actually stick around for. The focus is on pacing, clarity, and storytelling, so nothing feels dragged or boring. Whether it's YouTube content, podcasts, or deep-dive videos, we make sure your message lands and keeps viewers watching till the end.",
    features: ["Storytelling", "Pacing & Structure", "Sound Design", "Colour Grading"],
    icon: "◈",
    cards: [
      { image: "/services/Long3.png", videoUrl: "https://www.youtube.com/watch?v=rW7yzVeOCZI" },
      { image: "/services/Long6.png", videoUrl: "https://www.youtube.com/watch?v=yILNnRbIP8o" },
      { image: "/services/Long1.png", videoUrl: "https://www.youtube.com/watch?v=zqbyIXxXtQE" },
    ],
  },
  {
    id: "ads",
    title: "Ad Creatives",
    tagline: "Clear Messaging. High Conversions.",
    description:
      "We produce ad content designed to do one thing; GET RESULTS. The focus is on clear messaging, strong visuals, and making sure the right audience pays attention. Whether you're selling a product or building a brand, we create ads that feel natural and drive real action.",
    features: ["Ad Strategy", "Hook & Messaging", "Conversion Focus", "Brand Alignment"],
    icon: "◉",
    cards: [
      { image: "/services/ads1.png", videoUrl: "https://www.youtube.com/watch?v=2XiiI_GJtRE" },
      { image: "/services/ads2.png", videoUrl: "https://youtu.be/5RdRNtwQ8ig" },
    ],
  },
  {
    id: "thumbnails",
    title: "Thumbnails",
    tagline: "Click-Worthy. Every Time.",
    description:
      "We create thumbnails designed to make people stop and pay attention instantly. Every design is carefully built around clarity, emotion, contrast, and visual hierarchy so the viewer immediately understands where to look and feels curious enough to click. Instead of relying on clutter or cheap clickbait tactics, the focus is on creating clean, high-performing thumbnails that match your brand while maximizing CTR and overall viewer interest.",
    features: ["High CTR Design", "Visual Hierarchy", "Curiosity Driven", "Click Psychology"],
    icon: "▣",
    cards: [
      { image: "/services/Thumb 1.png" },
      { image: "/services/Thumb 3.png" },
      { image: "/services/Thumb 2.png" },
    ],
  },
  {
    id: "growth",
    title: "Growth Strategy",
    tagline: "Data Driven. Results Focused.",
    description:
      "We analyze your content to figure out what's working, what's losing attention, and where growth is being limited. From retention patterns to hooks and content structure, we help you make better creative decisions backed by real performance insights.",
    features: ["Content Analysis", "Viewer Psychology", "Audience Insights", "Scaling Strategy"],
    icon: "▲",
    cards: [
      { image: "/services/Growth 1.png" },
      { image: "/services/Growth 2.png" },
      { image: "/services/Growth 3.png" },
    ],
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
}

function ImageCard({
  image, width, height, category,
}: {
  image: string; width: number; height: number; category: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/work?category=${encodeURIComponent(category)}`}
      style={{ textDecoration: "none", display: "block", width, height }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          width, height,
          borderRadius: "12px", overflow: "hidden", position: "relative",
          border: `0.5px solid ${hovered ? "rgba(3,192,74,0.5)" : "rgba(255,255,255,0.1)"}`,
          background: "#111", cursor: "pointer",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <img
          src={image} alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)", zIndex: 1,
          }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(3,192,74,0.18) 0%, transparent 60%)",
            pointerEvents: "none", zIndex: 2,
          }} />
        )}
      </motion.div>
    </Link>
  );
}

function VideoCard({
  image, videoUrl, width, height, category,
}: {
  image: string; videoUrl: string; width: number; height: number; category: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/work?category=${encodeURIComponent(category)}`}
      style={{ textDecoration: "none", display: "block", width, height }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          width, height,
          borderRadius: "12px", overflow: "hidden", position: "relative",
          border: `0.5px solid ${hovered ? "rgba(3,192,74,0.5)" : "rgba(255,255,255,0.1)"}`,
          background: "#111", cursor: "pointer",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <img
          src={image} alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s", zIndex: 1,
          }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
        {hovered && (
          <iframe
            src={getEmbedUrl(videoUrl)}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              border: "none", zIndex: 2, pointerEvents: "none",
            }}
          />
        )}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(3,192,74,0.18) 0%, transparent 60%)",
            pointerEvents: "none", zIndex: 3,
          }} />
        )}
      </motion.div>
    </Link>
  );
}

function ScriptingStack({ cards, scale = 1 }: { cards: typeof services[0]["cards"]; scale?: number }) {
  const W = Math.round(260 * scale);
  const H = Math.round(146 * scale);
  const containerW = W + Math.round(80 * scale);
  const containerH = H + Math.round(80 * scale);
  const configs = [
    { top: Math.round(80 * scale), left: 0,                       rotate: -8, zIndex: 1, opacity: 0.5 },
    { top: Math.round(40 * scale), left: Math.round(60 * scale),  rotate:  0, zIndex: 2, opacity: 1   },
    { top: Math.round(80 * scale), left: Math.round(120 * scale), rotate:  8, zIndex: 1, opacity: 0.5 },
  ];
  return (
    <div style={{ position: "relative", width: containerW, height: containerH }}>
      {configs.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -16, scale: 1.3, opacity: 1, rotate: 0, zIndex: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ position: "absolute", top: c.top, left: c.left, rotate: c.rotate, zIndex: c.zIndex, opacity: c.opacity, transformOrigin: "bottom center" }}
        >
          <ImageCard image={cards[i]?.image ?? ""} width={W} height={H} category="Scripting" />
        </motion.div>
      ))}
    </div>
  );
}

function ShortFormStack({ cards, scale = 1 }: { cards: typeof services[0]["cards"]; scale?: number }) {
  const W = Math.round(120 * scale);
  const H = Math.round(213 * scale);
  const containerW = Math.round(320 * scale);
  const configs = [
    { left: Math.round(30  * scale), top: 0, rotate: -12, zIndex: 1 },
    { left: Math.round(100 * scale), top: 0, rotate:   0, zIndex: 2 },
    { left: Math.round(170 * scale), top: 0, rotate:  12, zIndex: 1 },
  ];
  return (
    <div style={{ position: "relative", width: containerW, height: H + Math.round(30 * scale) }}>
      {configs.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -18, scale: 1.45, rotate: 0, zIndex: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ position: "absolute", left: c.left, top: c.top, zIndex: c.zIndex, rotate: c.rotate, transformOrigin: "bottom center" }}
        >
          <VideoCard
            image={cards[i].image}
            videoUrl={(cards[i] as any).videoUrl ?? ""}
            width={W} height={H}
            category="Short Form"
          />
        </motion.div>
      ))}
    </div>
  );
}

function LongFormStack({ cards, scale = 1 }: { cards: typeof services[0]["cards"]; scale?: number }) {
  const W = Math.round(300 * scale);
  const H = Math.round(169 * scale);
  const offset = Math.round(20 * scale);
  const configs = [
    { top: 0,          left: +100, opacity: 0.8, zIndex: 1 },
    { top: offset,     left:  +30, opacity: 0.9,  zIndex: 2 },
    { top: offset * 2, left:  -40, opacity: 1,    zIndex: 3 },
  ];
  return (
    <div style={{ position: "relative", width: W + offset * 2, height: H + Math.round(56 * scale) }}>
      {configs.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -20, scale: 1.3, opacity: 1, zIndex: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ position: "absolute", top: c.top, left: c.left, zIndex: c.zIndex, opacity: c.opacity }}
        >
          <VideoCard
            image={cards[i].image}
            videoUrl={(cards[i] as any).videoUrl ?? ""}
            width={W} height={H}
            category="Long Form"
          />
        </motion.div>
      ))}
    </div>
  );
}

function AdsStack({ cards, scale = 1 }: { cards: typeof services[0]["cards"]; scale?: number }) {
  const W = Math.round(300 * scale);
  const H = Math.round(169 * scale);
  const verticalSpacing = Math.round(30 * scale);
  const containerH = H * 2 + verticalSpacing + Math.round(20 * scale);
  const containerW = W + Math.round(40 * scale);

  const configs = [
    { top: 0,                   left: Math.round(40 * scale), rotate: -4, zIndex: 1, opacity: 0.85 },
    { top: H + verticalSpacing, left: 0,                      rotate:  4, zIndex: 2, opacity: 1    },
  ];

  return (
    <div style={{ position: "relative", width: containerW, height: containerH }}>
      {configs.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -20, scale: 1.1, opacity: 1, zIndex: 10, rotate: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ position: "absolute", top: c.top, left: c.left, opacity: c.opacity, rotate: c.rotate, zIndex: c.zIndex }}
        >
          <VideoCard
            image={cards[i].image}
            videoUrl={(cards[i] as any).videoUrl ?? ""}
            width={W} height={H}
            category="Ads"
          />
        </motion.div>
      ))}
    </div>
  );
}

function GrowthStrategyStack({ cards, scale = 1 }: { cards: typeof services[0]["cards"]; scale?: number }) {
  const W = Math.round(280 * scale);
  const H = Math.round(158 * scale);
  const vGap  = Math.round(22 * scale);
  const hStep = Math.round(32 * scale);
  const configs = [
    { top: 0,        left: hStep * 2, opacity: 0.4, zIndex: 1, rotate:  2 },
    { top: vGap,     left: hStep,     opacity: 0.7, zIndex: 2, rotate:  0 },
    { top: vGap * 2, left: 0,         opacity: 1,   zIndex: 3, rotate: -2 },
  ];
  const containerW = W + hStep * 2 + Math.round(8 * scale);
  const containerH = H + vGap * 2  + Math.round(24 * scale);
  return (
    <div style={{ position: "relative", width: containerW, height: containerH }}>
      {configs.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -18, scale: 1.07, opacity: 1, rotate: 0, zIndex: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ position: "absolute", top: c.top, left: c.left, rotate: c.rotate, zIndex: c.zIndex, opacity: c.opacity, transformOrigin: "center center" }}
        >
          <ImageCard image={cards[i]?.image ?? ""} width={W} height={H} category="Growth Strategy" />
        </motion.div>
      ))}
    </div>
  );
}

// ─── FIXED: ThumbnailsStack ───────────────────────────────────────────────────
// Removed overflow:hidden from outer wrapper (was clipping hover).
// Replaced with horizontal padding so cards don't bleed out of the screen.
// Reduced base card sizes so containerW at scale=0.82 fits within ~290px.

function ThumbnailsStack({ cards, scale = 1 }: { cards: typeof services[0]["cards"]; scale?: number }) {
  // Smaller base sizes so the stack fits on mobile without overflow:hidden
  const CW = Math.round(150 * scale);
  const CH = Math.round(85  * scale);
  const SW = Math.round(118 * scale);
  const SH = Math.round(67  * scale);
  const overlap = Math.round(18 * scale);
  const containerW = SW * 2 + CW - overlap * 2 + Math.round(8 * scale);
  const containerH = CH + Math.round(28 * scale);
  const sideTop = Math.round(18 * scale);
  const configs = [
    { top: sideTop, left: 0,                           width: SW, height: SH, rotate: -5, opacity: 1, zIndex: 1 },
    { top: 0,       left: SW - overlap,                width: CW, height: CH, rotate:  0, opacity: 1, zIndex: 3 },
    { top: sideTop, left: SW - overlap + CW - overlap, width: SW, height: SH, rotate:  5, opacity: 1, zIndex: 1 },
  ];
  return (
    // Padding absorbs the natural card bleed; no overflow:hidden needed so hover is never clipped
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      boxSizing: "border-box",
    }}>
      <div style={{ position: "relative", width: containerW, height: containerH, flexShrink: 0 }}>
        {configs.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -16, scale: 1.5, opacity: 1, rotate: 0, zIndex: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ position: "absolute", top: c.top, left: c.left, rotate: c.rotate, zIndex: c.zIndex, opacity: c.opacity, transformOrigin: "bottom center" }}
          >
            <ImageCard image={cards[i]?.image ?? ""} width={c.width} height={c.height} category="Thumbnails" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ServiceVisual({ service, scale }: { service: typeof services[0]; scale?: number }) {
  if (service.id === "scripting")  return <ScriptingStack      cards={service.cards} scale={scale} />;
  if (service.id === "short")      return <ShortFormStack       cards={service.cards} scale={scale} />;
  if (service.id === "long")       return <LongFormStack        cards={service.cards} scale={scale} />;
  if (service.id === "ads")        return <AdsStack             cards={service.cards} scale={scale} />;
  if (service.id === "growth")     return <GrowthStrategyStack  cards={service.cards} scale={scale} />;
  if (service.id === "thumbnails") return <ThumbnailsStack      cards={service.cards} scale={scale} />;
  return null;
}

function ServiceText({
  service, isLarge, isMobile, isTablet, isLaptop, isDesktop, is2K, is4K,
}: {
  service: typeof services[0]; isLarge?: boolean; isMobile?: boolean; isTablet?: boolean;
  isLaptop?: boolean; isDesktop?: boolean; is2K?: boolean; is4K?: boolean;
}) {
  const taglineFontSize = isLarge ? (is4K ? "1.5rem" : is2K ? "1.3rem" : "0.95rem") : "0.8rem";
  const taglinePadding  = isLarge ? (is4K ? "0.5rem 1.4rem" : is2K ? "0.45rem 1.2rem" : "0.4rem 1.1rem") : "0.3rem 0.85rem";
  const taglineMarginBottom = isLarge ? (is4K ? "2.25rem" : is2K ? "2rem" : "1.75rem") : "1.25rem";

  const h2FontSize    = isLarge ? (is4K ? "clamp(8rem, 3.2vw, 4.5rem)" : is2K ? "clamp(5rem, 3vw, 4rem)" : "clamp(2.5rem, 2.8vw, 3.8rem)") : "clamp(2rem, 3.5vw, 3rem)";
  const h2MarginBottom = isLarge ? (is4K ? "1.5rem" : is2K ? "1.35rem" : "1.25rem") : "1rem";

  const pFontSize     = isLarge ? (is4K ? "2rem" : is2K ? "1.5rem" : "1.1rem") : "0.95rem";
  const pMarginBottom = isLarge ? (is4K ? "3rem" : is2K ? "2.75rem" : "2.5rem") : "2rem";
  const pMaxWidth     = isLarge ? (is4K ? "1000px" : is2K ? "800px" : "520px") : undefined;

  const featureFontSize = isLarge ? (is4K ? "2rem" : is2K ? "1.5rem" : "0.85rem") : "0.75rem";
  const featurePadding  = isLarge ? (is4K ? "0.6rem 1.4rem" : is2K ? "0.5rem 1.2rem" : "0.45rem 1.1rem") : "0.35rem 0.85rem";
  const featuresMarginBottom = isLarge ? (is4K ? "3.5rem" : is2K ? "3.25rem" : "3rem") : "2.5rem";

  const buttonFontSize = isLarge ? (is4K ? "1.7rem" : is2K ? "1.2rem" : "1rem") : "0.9rem";
  const buttonPadding  = isLarge ? (is4K ? "1.25rem 3rem" : is2K ? "1.15rem 2.5rem" : "1rem 2.25rem") : "0.8rem 1.75rem";

  return (
    <div style={{ textAlign: "center", width: "100%", boxSizing: "border-box" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        background: "rgba(3,192,74,0.08)", border: "0.5px solid rgba(3,192,74,0.2)",
        borderRadius: "9999px",
        padding: taglinePadding,
        marginBottom: taglineMarginBottom,
        maxWidth: "100%",
        wordBreak: "break-word",
        boxSizing: "border-box",
      }}>
        <span style={{ color: "#03C04A", fontSize: taglineFontSize, flexShrink: 0 }}>{service.icon}</span>
        <span style={{
          color: "#03C04A", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
          fontSize: taglineFontSize, letterSpacing: "0.2em", textTransform: "uppercase",
          whiteSpace: isMobile ? "normal" : "nowrap",
          wordBreak: "break-word",
        }}>{service.tagline}</span>
      </div>

      <h2 style={{
        fontSize: h2FontSize,
        fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
        letterSpacing: "0.01em", lineHeight: 1.08,
        color: "white", marginBottom: h2MarginBottom,
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}>{service.title}</h2>

      <p style={{
        fontSize: pFontSize,
        fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
        color: "rgba(255,255,255,0.55)", lineHeight: 1.8,
        marginBottom: pMarginBottom,
        maxWidth: pMaxWidth,
        margin: "0 auto " + pMarginBottom,
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}>{service.description}</p>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: "0.5rem",
        marginBottom: featuresMarginBottom,
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
      }}>
        {service.features.map(f => (
          <span key={f} style={{
            fontSize: featureFontSize,
            fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
            padding: featurePadding,
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em",
            maxWidth: "100%",
            wordBreak: "break-word",
            boxSizing: "border-box",
          }}>{f}</span>
        ))}
      </div>

      <Link href="/booking"
        className="btn-shimmer"
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: BTN_GREEN, color: "#fff",
          padding: buttonPadding,
          borderRadius: "9999px", fontWeight: 700,
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: buttonFontSize,
          textDecoration: "none", transition: "opacity 0.2s",
          overflow: "hidden",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        Get Started →
      </Link>
    </div>
  );
}

function SlideButton() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "9999px", padding: "1px", backdropFilter: "blur(10px)", cursor: "pointer" }}>
      <motion.div
        animate={clicked ? { x: 140, opacity: 0, y: 3.7 } : { x: 0, opacity: 1, y: 3.7 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
        onClick={() => { setClicked(true); setTimeout(() => router.push("/booking"), 500); }}
      >
        <span className="btn-shimmer" style={{ background: BTN_GREEN, color: "white", padding: "0.65rem 1.4rem", borderRadius: "9999px", fontWeight: 500, fontFamily: "Arial, Helvetica, sans-serif", fontSize: "0.95rem", whiteSpace: "nowrap", boxShadow: "0 0 20px rgba(3,192,74,0.5), 0 0 60px rgba(3,192,74,0.25)", display: "inline-block", overflow: "hidden" }}>
          Now →
        </span>
      </motion.div>
      <motion.div
        animate={clicked ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
      >
        <span style={{ color: "rgba(255,255,255,0.7)", padding: "0.65rem 1.4rem", fontWeight: 500, fontFamily: "Arial, Helvetica, sans-serif", fontSize: "0.95rem", whiteSpace: "nowrap" }}>
          Connect and Start
        </span>
      </motion.div>
    </div>
  );
}

export default function ServicesPage() {
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  const sectionPadding = isMobile
    ? "3rem 1.25rem"
    : isTablet
    ? "4rem 1.75rem"
    : isLaptop
    ? "6rem 2rem"
    : isDesktop
    ? "7rem 2.5rem"
    : is2K
    ? "8.5rem 1.5rem"
    : "10rem 0.75rem";

  const visualScale = isMobile ? 0.82 : isTablet ? 0.9 : isLaptop ? 1.3 : isDesktop ? 1.7 : is2K ? 2 : 3;

  const maxWidth = isMobile ? "100%" : isTablet ? "100%" : isLaptop ? "min(100rem, 96vw)" : isDesktop ? "min(110rem, 94vw)" : is2K ? "min(130rem, 93vw)" : "min(160rem, 95vw)";

  return (
    <main style={{ background: "#000000", color: "white", overflowX: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Hero ── */}
        <section style={{
          paddingTop:    isMobile ? "8rem"    : isTablet ? "9rem"    : isLaptop ? "10rem" : isDesktop ? "12rem" : is2K ? "14rem" : "16rem",
          paddingBottom: isMobile ? "3rem"    : isTablet ? "4rem"    : isLaptop ? "5rem"  : isDesktop ? "6rem"  : is2K ? "7rem"  : "8rem",
          paddingLeft:   isMobile ? "1.25rem" : isTablet ? "1.75rem" : isLaptop ? "2rem"  : isDesktop ? "2.5rem" : is2K ? "1.5rem" : "0.75rem",
          paddingRight:  isMobile ? "1.25rem" : isTablet ? "1.75rem" : isLaptop ? "2rem"  : isDesktop ? "2.5rem" : is2K ? "1.5rem" : "0.75rem",
          maxWidth, margin: "0 auto",
        }}>
          <FadeUp>
            <p style={{
              fontSize: isMobile ? "0.7rem" : isTablet ? "0.75rem" : isLaptop ? "0.8rem" : isDesktop ? "0.85rem" : is2K ? "0.9rem" : "0.95rem",
              letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "white", marginBottom: "1rem",
            }}>What We Offer</p>
            <h1 style={{
              fontSize: isMobile
                ? "clamp(2.5rem, 10vw, 3.5rem)"
                : isTablet
                ? "clamp(2.5rem, 7vw, 4.5rem)"
                : isLaptop
                ? "clamp(3rem, 6vw, 5rem)"
                : isDesktop
                ? "clamp(4rem, 6vw, 6.5rem)"
                : is2K
                ? "clamp(5rem, 5.5vw, 7.5rem)"
                : "clamp(6rem, 5vw, 8.5rem)",
              fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
              letterSpacing: "0.01em", lineHeight: 1.08,
              color: "white", marginBottom: "1.5rem",
              maxWidth: isDesktop ? "1400px" : isLaptop ? "500px" : is2K ? "2560px" : is4K ? "3840px" : "700px",
            }}>
              Services Built for Impact
            </h1>
            <p style={{
              fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : isLaptop ? "1.15rem" : isDesktop ? "1.25rem" : is2K ? "1.5rem" : "2rem",
              fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.8)",
              maxWidth: isDesktop ? "1400px" : isLaptop ? "500px" : is2K ? "2560px" : is4K ? "3840px" : "700px",
              lineHeight: 1.75,
            }}>
              Everything you need to build a brand presence that commands attention — from raw footage to finished film.
            </p>
          </FadeUp>
        </section>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", maxWidth, margin: "0 auto 0 auto", padding: "0 1.25rem" }}>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* ── Service Sections ── */}
        {services.map((service, i) => {
          const isEven = i % 2 === 0;
          const gridGap  = isMobile ? "2rem"   : isTablet ? "2.5rem" : isLaptop ? "4rem"  : isDesktop ? "5rem"  : is2K ? "6rem"  : "7.5rem";
          const minHeight = isMobile ? "240px" : isTablet ? "300px"  : isLaptop ? "350px" : isDesktop ? "420px" : is2K ? "520px" : "620px";

          return (
            <section key={service.title} style={{ padding: sectionPadding, maxWidth, margin: "0 auto" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: gridGap,
                alignItems: "center",
              }}>
                {isMobile ? (
                  <>
                    <FadeUp delay={0.1}>
                      <ServiceText
                        service={service} isLarge={false}
                        isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
                        isDesktop={isDesktop} is2K={is2K} is4K={is4K}
                      />
                    </FadeUp>
                    <FadeUp delay={0.2}>
                      {/* overflow:visible so hover scale isn't clipped by this wrapper */}
                      <div style={{ display: "flex", justifyContent: "center", transformOrigin: "center top", marginBottom: "-2rem", overflow: "visible" }}>
                        <ServiceVisual service={service} scale={visualScale} />
                      </div>
                    </FadeUp>
                  </>
                ) : isEven ? (
                  <>
                    <FadeUp delay={0.1}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight, position: "relative", overflow: "visible" }}>
                        <div style={{ position: "absolute", inset: 0, borderRadius: "24px", background: "radial-gradient(ellipse, rgba(3,192,74,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                        <ServiceVisual service={service} scale={visualScale} />
                      </div>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                      <ServiceText
                        service={service} isLarge={!isMobile && !isTablet}
                        isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
                        isDesktop={isDesktop} is2K={is2K} is4K={is4K}
                      />
                    </FadeUp>
                  </>
                ) : (
                  <>
                    <FadeUp delay={0.2}>
                      <ServiceText
                        service={service} isLarge={!isMobile && !isTablet}
                        isMobile={isMobile} isTablet={isTablet} isLaptop={isLaptop}
                        isDesktop={isDesktop} is2K={is2K} is4K={is4K}
                      />
                    </FadeUp>
                    <FadeUp delay={0.1}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight, position: "relative", overflow: "visible" }}>
                        <div style={{ position: "absolute", inset: 0, borderRadius: "24px", background: "radial-gradient(ellipse, rgba(3,192,74,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                        <ServiceVisual service={service} scale={visualScale} />
                      </div>
                    </FadeUp>
                  </>
                )}
              </div>

              {i < services.length - 1 && (
                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginTop: isMobile ? "3rem" : isTablet ? "4rem" : isLaptop ? "6rem" : isDesktop ? "7rem" : is2K ? "8.5rem" : "10rem" }} />
              )}
            </section>
          );
        })}

        {/* ── CTA ── */}
        <section style={{
          background: "linear-gradient(to bottom, #000000 0%, #111111 50%, #000000 100%)",
          padding: sectionPadding, textAlign: "center",
        }}>
          <FadeUp>
            <p style={{
              fontSize: isMobile ? "0.7rem" : isTablet ? "0.75rem" : isLaptop ? "0.8rem" : isDesktop ? "0.85rem" : is2K ? "0.9rem" : "2rem",
              letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "white", marginBottom: "1rem",
            }}>Ready to Start?</p>
            <h2 style={{
              fontSize: is4K ? "clamp(8rem, 3.2vw, 4.5rem)" : is2K ? "clamp(2.8rem, 3vw, 4rem)" : isDesktop ? "clamp(2.5rem, 2.8vw, 3.8rem)" : isLaptop ? "clamp(2.5rem, 2.8vw, 3.8rem)" : "clamp(2rem, 3.5vw, 3rem)",
              fontFamily: "'Coolvetica', sans-serif", fontWeight: 600,
              letterSpacing: "0.01em", lineHeight: 1.08,
              color: "white", marginBottom: "1.25rem",
            }}>
              Let's Create Something<br />Extraordinary
            </h2>
            <p style={{
              fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : isLaptop ? "1.1rem" : isDesktop ? "1.2rem" : is2K ? "1.35rem" : "2rem",
              fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              maxWidth: is4K ? "1000px" : isDesktop ? "600px" : isLaptop ? "520px" : "440px",
              margin: "0 auto 2.5rem", lineHeight: 1.7,
            }}>
              Book a free 30-minute strategy call. Tell us about your content or brand and let's build something powerful together.
            </p>
            <SlideButton />
          </FadeUp>
        </section>

      </div>
    </main>
  );
}