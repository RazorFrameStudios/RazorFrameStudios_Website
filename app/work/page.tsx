"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useBreakpoint } from "../components/hooks/useBreakpoint";

const BTN_GREEN = "#1B5E34";

const works = [
  { title: "AI Tools Worth Using",                            category: "Long Form", videoUrl: "https://www.youtube.com/watch?v=yILNnRbIP8o", description: "Breakdown of AI Work Flow.", thumbnail: "/work/Thumb 1.png" },
  { title: "Problem With Fitness Tier Lists",                 category: "Long Form", videoUrl: "https://www.youtube.com/watch?v=rW7yzVeOCZI", description: "Why Exercise Tier Lists Fail?", thumbnail: "/work/Thumb 2.png" },
  { title: "How Modern Creators Make Money",                  category: "Long Form", videoUrl: "https://www.youtube.com/watch?v=zqbyIXxXtQE", description: "Modern Creator Economy Systems Built For Digital Leverage.", thumbnail: "/work/Thumb 4.png" },
  { title: "Why Most Digital Products Fail",                  category: "Long Form", videoUrl: "https://youtu.be/gF6EKgkIrCg", description: "Actionable Insights For Building Digital Products That Actually Sell.", thumbnail: "/work/Thumb 3.png" },
  { title: "The Retention Editing Formula",                   category: "Short Form", videoUrl: "https://www.youtube.com/shorts/fJAlrXwwfoQ", description: "Quick Breakdown Of Retention-Focused Editing Fundamentals.", thumbnail: "/work/Short1.png" },
  { title: "Consistency Over Motivation",                     category: "Short Form", videoUrl: "https://youtube.com/shorts/JZ-SzBfEzXw?feature=share", description: "Why Consistency Is Prioritized Over Motivation.", thumbnail: "/work/Short3.png" },
  { title: "Benefits Of Being A UGC Creator",                 category: "Short Form", videoUrl: "https://youtube.com/shorts/mJ7RtWiTjuQ?feature=share", description: "Breakdown Of Today's Advertisement Market.", thumbnail: "/work/Short4.png" },
  { title: "Day-Trading Is Dead",                             category: "Short Form", videoUrl: "https://youtube.com/shorts/UalSCFvdRzk?feature=share", description: "Truth Behind Day-Trading Courses.", thumbnail: "/work/Short5.png" },
  { title: "The REAL Reason You're Not Achieving Your Goals", category: "Short Form", videoUrl: "https://youtube.com/shorts/bdAE1V-zlUI?feature=share", description: "Reason Behind Your Failures.", thumbnail: "/work/Short6.png" },
  { title: "Stretching Before Training; Myth or Real",        category: "Short Form", videoUrl: "https://youtube.com/shorts/2tT-PO0y9Mc?feature=share", description: "Why Static Stretching Is Making You Weaker.", thumbnail: "/work/Short7.png" },
  { title: "Sarvam AI - India's AI Mission",                  category: "Short Form", videoUrl: "https://www.youtube.com/shorts/TP_1h33F33A", description: "Why Sarvam AI Is Such A Big Deal.", thumbnail: "/work/Short2.png" },
  { title: "Welcome To Loomia",                               category: "Ads", videoUrl: "https://www.youtube.com/watch?v=2XiiI_GJtRE", description: "High-Converting SaaS Ad Edit With Clean Transitions & Fast-Pacing.", thumbnail: "/work/ads1.png" },
  { title: "Welcome To RazorFrameStudios",                    category: "Ads", videoUrl: "https://youtu.be/5RdRNtwQ8ig", description: "High-Converting SaaS Ad Edit With Clean Transitions & Fast-Pacing.", thumbnail: "/work/ads2.png" },
  { title: "Thumbnail 1",                                     category: "Thumbnails", videoUrl: "", thumbnail: "/work/Thumb 1.png" },
  { title: "Thumbnail 2",                                     category: "Thumbnails", videoUrl: "", thumbnail: "/work/Thumb 2.png" },
  { title: "Thumbnail 3",                                     category: "Thumbnails", videoUrl: "", thumbnail: "/work/Thumb 3.png" },
  { title: "Thumbnail 4",                                     category: "Thumbnails",videoUrl: "", thumbnail: "/work/Thumb 4.png" },
];

const categories = ["All", "Long Form", "Short Form", "Ads", "Thumbnails"];

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

function getEmbedUrl(url: string) {
  const id = getYouTubeId(url);
  const isShort = url.includes("/shorts/");
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1${isShort ? "&loop=1" : ""}`;
}

function WorkThumbnail({ item, isLargeDesktop }: { item: typeof works[0]; isLargeDesktop: boolean }) {
  const hasVideo = !!item.videoUrl;
  const youtubeId = hasVideo ? getYouTubeId(item.videoUrl) : "";
  const youtubeFallback = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : "";
  const [src, setSrc] = useState(item.thumbnail);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0 && youtubeFallback) setSrc(youtubeFallback);
  }, [youtubeFallback]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={item.title}
      onError={() => { if (youtubeFallback && src !== youtubeFallback) setSrc(youtubeFallback); }}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
    />
  );
}

function VideoModal({ item, onClose }: { item: typeof works[0]; onClose: () => void }) {
  const isShortForm = item.category === "Short Form";
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 0.9 }} exit={{ opacity: 0, scale: 0.92 }}
        style={{
          position: "fixed", zIndex: 101, top: "50%", left: "50%", x: "-50%", y: "-50%",
          borderRadius: "16px", overflow: "hidden", background: "#000",
          border: "0.5px solid rgba(3,192,74,0.3)",
          height: isShortForm ? "min(85vh, 720px)" : undefined,
          width: isShortForm ? "auto" : "min(90vw, 1100px)",
          aspectRatio: isShortForm ? "9/16" : "16/9",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <iframe
          src={getEmbedUrl(item.videoUrl)}
          title={item.title}
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

function SharePopup({ url, onClose }: { url: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const shareOptions = [
    { label: "WhatsApp", onClick: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, "_blank") },
    { label: "Facebook", onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank") },
    { label: "X",        onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank") },
    { label: "Email",    onClick: () => window.open(`https://mail.google.com/mail/?view=cm&body=${encodeURIComponent(url)}`, "_blank") },
    { label: "Reddit",   onClick: () => window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(url)}`, "_blank") },
  ];
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.6)" }} />
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 51, background: "white", borderRadius: "16px 16px 0 0", padding: "1.5rem 1rem 2rem", maxWidth: "480px", margin: "0 auto" }}
      >
        <p style={{ fontWeight: 700, fontSize: "1.1rem", fontFamily: "Arial, Helvetica, sans-serif", color: "#000", marginBottom: "1.25rem" }}>Share</p>
        <button
          onClick={handleCopy}
          style={{ display: "block", width: "100%", textAlign: "left", background: "#f0f0f0", border: "none", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "0.5rem", fontSize: "0.9rem", fontFamily: "Arial, Helvetica, sans-serif", color: copied ? "#03C04A" : "#1a73e8", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {copied ? "✓ Copied!" : url}
        </button>
        {shareOptions.map(opt => (
          <button key={opt.label} onClick={opt.onClick} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "0.85rem 0.25rem", fontSize: "1rem", fontFamily: "Arial, Helvetica, sans-serif", color: "#000", cursor: "pointer", borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}>{opt.label}</button>
        ))}
        <button onClick={onClose} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "0.85rem 0.25rem", fontSize: "1rem", fontFamily: "Arial, Helvetica, sans-serif", color: "#000", cursor: "pointer" }}>Cancel</button>
      </motion.div>
    </>
  );
}

function SlideButton({ isLarge }: { isLarge?: boolean }) {
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

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
}

export default function WorkPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsLargeDesktop(window.innerWidth >= 1600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(() => {
    const cat = searchParams.get("category");
    return categories.includes(cat ?? "") ? cat! : "All";
  });
  const [expandedItem, setExpandedItem] = useState<typeof works[0] | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const filtered = activeCategory === "All" ? works : works.filter(w => w.category === activeCategory);
  const maxWidth = "min(100rem, 96vw)";
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const heroPaddingTop = isMobile ? "8rem" : isTablet ? "9rem" : isLargeDesktop ? "14rem" : "11rem";
  const sectionPaddingH = isMobile ? "1.25rem" : isTablet ? "2rem" : "4rem";

  const isThumbnail = (item: typeof works[0]) => item.category === "Thumbnails";

  return (
    <main style={{ background: "#000000", color: "white", minHeight: "100vh", overflowX: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Hero ── */}
        <section style={{ paddingTop: heroPaddingTop, paddingBottom: isMobile ? "3rem" : isLargeDesktop ? "6rem" : "4rem", paddingLeft: sectionPaddingH, paddingRight: sectionPaddingH, maxWidth, margin: "0 auto" }}>
          <FadeUp>
            <p style={{ fontSize: isLargeDesktop ? "0.9rem" : "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "white", marginBottom: "1rem" }}>Featured Projects</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
              <h1 style={{ fontSize: isMobile ? "clamp(3rem, 10vw, 4rem)" : isLargeDesktop ? "clamp(5rem, 7vw, 8rem)" : "clamp(3rem, 7vw, 6rem)", fontFamily: "'Coolvetica', sans-serif", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, color: "white" }}>
                Our Work
              </h1>
              <p style={{ fontSize: isLargeDesktop ? "1.2rem" : "1rem", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.8)", maxWidth: isLargeDesktop ? "460px" : "360px", lineHeight: 1.7, paddingBottom: "0.5rem" }}>
                A selection of projects we're proud of. Real work, real results.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── Category Filter ── */}
        <div style={{ paddingLeft: sectionPaddingH, paddingRight: sectionPaddingH, paddingBottom: isMobile ? "2rem" : isLargeDesktop ? "4rem" : "3rem", maxWidth, margin: "0 auto" }}>
          <FadeUp delay={0.1}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: isLargeDesktop ? "0.55rem 1.4rem" : "0.45rem 1.1rem",
                    borderRadius: "9999px",
                    fontSize: isLargeDesktop ? "0.95rem" : "0.82rem",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                    border: activeCategory === cat ? "1px solid #03C04A" : "1px solid rgba(255,255,255,0.12)",
                    background: activeCategory === cat ? "rgba(3,192,74,0.12)" : "transparent",
                    color: activeCategory === cat ? "#03C04A" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* ── Grid ── */}
        <div style={{ paddingLeft: sectionPaddingH, paddingRight: sectionPaddingH, paddingBottom: isMobile ? "5rem" : isLargeDesktop ? "12rem" : "8rem", maxWidth, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{ display: "grid", gridTemplateColumns: gridCols, gap: isLargeDesktop ? "2.5rem" : isMobile ? "2rem" : "1.5rem" }}
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <motion.div
                    onClick={() => !isThumbnail(item) && setExpandedItem(item)}
                    style={{
                      borderRadius: isLargeDesktop ? "16px" : "12px",
                      overflow: "hidden",
                      position: "relative",
                      aspectRatio: "16/9",
                      background: "#111111",
                      border: "0.5px solid rgba(255,255,255,0.07)",
                      marginBottom: isLargeDesktop ? "1.25rem" : "1rem",
                      cursor: isThumbnail(item) ? "default" : "pointer",
                    }}
                    onMouseEnter={e => {
                      if (isThumbnail(item)) return;
                      const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                      const ov = e.currentTarget.querySelector(".overlay") as HTMLElement;
                      if (img) img.style.transform = "scale(1.06)";
                      if (ov) ov.style.background = "rgba(0,0,0,0.6)";
                    }}
                    onMouseLeave={e => {
                      if (isThumbnail(item)) return;
                      const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                      const ov = e.currentTarget.querySelector(".overlay") as HTMLElement;
                      if (img) img.style.transform = "scale(1)";
                      if (ov) ov.style.background = "rgba(0,0,0,0.3)";
                    }}
                  >
                    <WorkThumbnail item={item} isLargeDesktop={isLargeDesktop} />
                    {!isThumbnail(item) && (
                      <div
                        className="overlay"
                        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <div style={{ width: isLargeDesktop ? "64px" : "48px", height: isLargeDesktop ? "64px" : "48px", borderRadius: "50%", background: BTN_GREEN, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(3,192,74,0.5)" }}>
                          <svg width={isLargeDesktop ? "22" : "16"} height={isLargeDesktop ? "22" : "16"} viewBox="0 0 16 16" fill="none">
                            <path d="M4 3L13 8L4 13V3Z" fill="#fff" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: isLargeDesktop ? "0.8rem" : "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "#03C04A", marginBottom: "0.25rem" }}>{item.category}</p>
                      <h3 style={{ fontSize: isLargeDesktop ? "1.2rem" : "1.05rem", fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, color: "white", letterSpacing: "-0.01em", marginBottom: "0.3rem" }}>{item.title}</h3>
                      <p style={{ fontSize: isLargeDesktop ? "0.95rem" : "0.82rem", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{item.description}</p>
                    </div>
                    {!isThumbnail(item) && (
                      <button
                        onClick={e => { e.stopPropagation(); setShareUrl(item.videoUrl); }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", marginLeft: "1rem", marginTop: "1rem", flexShrink: 0, padding: 0, transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#03C04A")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                      >
                        <svg width={isLargeDesktop ? "22" : "18"} height={isLargeDesktop ? "22" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CTA ── */}
        <section style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)", padding: isMobile ? "4rem 1.25rem" : isLargeDesktop ? "9rem 4rem" : "5rem 2rem", textAlign: "center" }}>
          <FadeUp>
            <p style={{ fontSize: isLargeDesktop ? "0.9rem" : "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "white", marginBottom: "1rem" }}>Your Brand Could Be Here</p>
            <h2 style={{ fontSize: isLargeDesktop ? "clamp(3rem, 5vw, 5rem)" : "clamp(2rem, 4vw, 3.5rem)", fontFamily: "'Coolvetica', sans-serif", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, color: "white", marginBottom: "1.25rem" }}>
              Ready to Be Our Next Project?
            </h2>
            <p style={{ fontSize: isLargeDesktop ? "1.2rem" : "1rem", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.4)", maxWidth: isLargeDesktop ? "520px" : "420px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>Let's turn content into growth.</p>
            <SlideButton isLarge={isLargeDesktop} />
          </FadeUp>
        </section>

      </div>

      <AnimatePresence>
        {expandedItem && <VideoModal item={expandedItem} onClose={() => setExpandedItem(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {shareUrl && <SharePopup url={shareUrl} onClose={() => setShareUrl(null)} />}
      </AnimatePresence>
    </main>
  );
}