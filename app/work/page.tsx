"use client";

export const dynamic = "force-dynamic";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useBreakpoint } from "../components/hooks/useBreakpoint";

const BTN_GREEN = "#1B5E34";

const works = [
  { title: "AI Tools Worth Using", category: "Long Form", videoUrl: "https://www.youtube.com/watch?v=yILNnRbIP8o", description: "Breakdown of AI Work Flow.", thumbnail: "/work/Thumb 1.png" },
  { title: "Problem With Fitness Tier Lists", category: "Long Form", videoUrl: "https://www.youtube.com/watch?v=rW7yzVeOCZI", description: "Why Exercise Tier Lists Fail?", thumbnail: "/work/Thumb 2.png" },
  { title: "How Modern Creators Make Money", category: "Long Form", videoUrl: "https://www.youtube.com/watch?v=zqbyIXxXtQE", description: "Modern Creator Economy Systems Built For Digital Leverage.", thumbnail: "/work/Thumb 4.png" },
  { title: "Why Most Digital Products Fail", category: "Long Form", videoUrl: "https://youtu.be/gF6EKgkIrCg", description: "Actionable Insights For Building Digital Products That Actually Sell.", thumbnail: "/work/Thumb 3.png" },
  { title: "The Retention Editing Formula", category: "Short Form", videoUrl: "https://www.youtube.com/shorts/fJAlrXwwfoQ", description: "Quick Breakdown Of Retention-Focused Editing Fundamentals.", thumbnail: "/work/Short1.png" },
  { title: "Consistency Over Motivation", category: "Short Form", videoUrl: "https://youtube.com/shorts/JZ-SzBfEzXw?feature=share", description: "Why Consistency Is Prioritized Over Motivation.", thumbnail: "/work/Short3.png" },
  { title: "Benefits Of Being A UGC Creator", category: "Short Form", videoUrl: "https://youtube.com/shorts/mJ7RtWiTjuQ?feature=share", description: "Breakdown Of Today's Advertisement Market.", thumbnail: "/work/Short4.png" },
  { title: "Day-Trading Is Dead", category: "Short Form", videoUrl: "https://youtube.com/shorts/UalSCFvdRzk?feature=share", description: "Truth Behind Day-Trading Courses.", thumbnail: "/work/Short5.png" },
  { title: "The REAL Reason You're Not Achieving Your Goals", category: "Short Form", videoUrl: "https://youtube.com/shorts/bdAE1V-zlUI?feature=share", description: "Reason Behind Your Failures.", thumbnail: "/work/Short6.png" },
  { title: "Stretching Before Training; Myth or Real", category: "Short Form", videoUrl: "https://youtube.com/shorts/2tT-PO0y9Mc?feature=share", description: "Why Static Stretching Is Making You Weaker.", thumbnail: "/work/Short7.png" },
  { title: "Sarvam AI - India's AI Mission", category: "Short Form", videoUrl: "https://www.youtube.com/shorts/TP_1h33F33A", description: "Why Sarvam AI Is Such A Big Deal.", thumbnail: "/work/Short2.png" },
  { title: "Welcome To Loomia", category: "Ads", videoUrl: "https://www.youtube.com/watch?v=2XiiI_GJtRE", description: "High-Converting SaaS Ad Edit With Clean Transitions & Fast-Pacing.", thumbnail: "/work/ads1.png" },
  { title: "Welcome To RazorFrameStudios", category: "Ads", videoUrl: "https://youtu.be/5RdRNtwQ8ig", description: "High-Converting SaaS Ad Edit With Clean Transitions & Fast-Pacing.", thumbnail: "/work/ads2.png" },
  { title: "Thumbnail 1", category: "Thumbnails", videoUrl: "", description: "", thumbnail: "/work/Thumb 1.png" },
  { title: "Thumbnail 2", category: "Thumbnails", videoUrl: "", description: "", thumbnail: "/work/Thumb 2.png" },
  { title: "Thumbnail 3", category: "Thumbnails", videoUrl: "", description: "", thumbnail: "/work/Thumb 3.png" },
  { title: "Thumbnail 4", category: "Thumbnails", videoUrl: "", description: "", thumbnail: "/work/Thumb 4.png" },
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

function WorkThumbnail({
  item,
}: {
  item: typeof works[0];
}) {
  const hasVideo = !!item.videoUrl;
  const youtubeId = hasVideo ? getYouTubeId(item.videoUrl) : "";
  const youtubeFallback = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : "";

  const [src, setSrc] = useState(item.thumbnail);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;

    if (
      img &&
      img.complete &&
      img.naturalWidth === 0 &&
      youtubeFallback
    ) {
      setSrc(youtubeFallback);
    }
  }, [youtubeFallback]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={item.title}
      onError={() => {
        if (youtubeFallback && src !== youtubeFallback) {
          setSrc(youtubeFallback);
        }
      }}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        transition: "transform 0.5s ease",
      }}
    />
  );
}

function VideoModal({
  item,
  onClose,
}: {
  item: typeof works[0];
  onClose: () => void;
}) {
  const isShortForm = item.category === "Short Form";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 0.9 }}
        exit={{ opacity: 0, scale: 0.92 }}
        style={{
          position: "fixed",
          zIndex: 101,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#000",
          border: "0.5px solid rgba(3,192,74,0.3)",
          height: isShortForm ? "min(85vh, 720px)" : undefined,
          width: isShortForm ? "auto" : "min(90vw, 1100px)",
          aspectRatio: isShortForm ? "9/16" : "16/9",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <iframe
          src={getEmbedUrl(item.videoUrl)}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            background: "rgba(0,0,0,0.6)",
            border: "0.5px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          ✕
        </button>
      </motion.div>
    </>
  );
}

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function WorkPageContent() {
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(() => {
    const cat = searchParams.get("category");
    return categories.includes(cat ?? "") ? cat! : "All";
  });

  const [expandedItem, setExpandedItem] =
    useState<typeof works[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? works
      : works.filter((w) => w.category === activeCategory);

  const maxWidth = isMobile ? "100%" : isTablet ? "100%" : isLaptop ? "min(100rem, 96vw)" : isDesktop ? "min(110rem, 94vw)" : is2K ? "min(130rem, 93vw)" : "min(160rem, 95vw)";

  // Responsive grid columns: 1 mobile, 2 tablet, 3 laptop, 4 desktop, 5 2K, 6 4K
  const gridCols = isMobile
    ? "1fr"
    : isTablet
    ? "repeat(2, 1fr)"
    : isLaptop
    ? "repeat(3, 1fr)"
    : isDesktop
    ? "repeat(4, 1fr)"
    : is2K
    ? "repeat(5, 1fr)"
    : "repeat(6, 1fr)";

  // Responsive hero padding
  const heroPaddingTop = isMobile
    ? "6rem"
    : isTablet
    ? "8rem"
    : isLaptop
    ? "10rem"
    : isDesktop
    ? "12rem"
    : is2K
    ? "14rem"
    : "16rem";

  const heroPaddingBottom = isMobile ? "2rem" : isTablet ? "3rem" : isDesktop ? "4rem" : "5rem";

  // Responsive horizontal padding: minimal for 4K to maximize content area
  const sectionPaddingH = isMobile
    ? "1.25rem"
    : isTablet
    ? "1.75rem"
    : isLaptop
    ? "2rem"
    : isDesktop
    ? "1.5rem"
    : is2K
    ? "0.75rem"
    : "0.5rem";

  // Responsive heading size: scales from 2.5rem to 6.5rem
  const heroFontSize = isMobile
    ? "2.5rem"
    : isTablet
    ? "3.5rem"
    : isLaptop
    ? "4rem"
    : isDesktop
    ? "5rem"
    : is2K
    ? "6rem"
    : "8rem";

  // Responsive gap between grid items - scales with content
  const gridGap = isMobile ? "1rem" : isTablet ? "1.25rem" : isLaptop ? "1.5rem" : isDesktop ? "1.75rem" : is2K ? "2.25rem" : "2.75rem";

  // Responsive bottom padding - scales with content size
  const sectionPaddingBottom = isMobile ? "5rem" : isTablet ? "6rem" : isLaptop ? "7rem" : isDesktop ? "8rem" : is2K ? "10rem" : "12rem";

  const isThumbnail = (item: typeof works[0]) =>
    item.category === "Thumbnails";

  return (
    <main
      style={{
        background: "#000000",
        color: "white",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            paddingTop: heroPaddingTop,
            paddingBottom: heroPaddingBottom,
            paddingLeft: sectionPaddingH,
            paddingRight: sectionPaddingH,
            maxWidth,
            margin: "0 auto",
          }}
        >
          <FadeUp>
            <h1
              style={{
                fontSize: heroFontSize,
                fontFamily: "'Coolvetica', sans-serif",
                margin: 0,
              }}
            >
              Our Work
            </h1>
          </FadeUp>
        </section>

        {/* Category Filter */}
        <div
          style={{
            paddingLeft: sectionPaddingH,
            paddingRight: sectionPaddingH,
            paddingBottom: isMobile ? "2rem" : "3rem",
            maxWidth,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  border:
                    activeCategory === cat
                      ? "1px solid #03C04A"
                      : "1px solid rgba(255,255,255,0.12)",
                  background:
                    activeCategory === cat
                      ? "rgba(3,192,74,0.12)"
                      : "transparent",
                  color:
                    activeCategory === cat
                      ? "#03C04A"
                      : "rgba(255,255,255,0.45)",
                  fontSize: is4K ? "2rem" : is2K ? "1.5rem" : isLaptop ? "1.2rem" : isMobile ? "0.875rem" : "1rem",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Works Grid */}
        <div
          style={{
            paddingLeft: sectionPaddingH,
            paddingRight: sectionPaddingH,
            paddingBottom: sectionPaddingBottom,
            maxWidth,
            margin: "0 auto",
          }}
        >
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              gap: gridGap,
            }}
          >
            {filtered.map((item) => (
              <div key={item.title}>
                <motion.div
                  onClick={() =>
                    !isThumbnail(item) && setExpandedItem(item)
                  }
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "16/9",
                    background: "#111111",
                    cursor: isThumbnail(item) ? "default" : "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  whileHover={!isThumbnail(item) ? { scale: 1.02 } : {}}
                >
                  <WorkThumbnail item={item} />
                </motion.div>

                <div style={{ marginTop: isMobile ? "0.75rem" : "1rem" }}>
                  <p
                    style={{
                      color: "#03C04A",
                      fontSize: is4K ? "1.3rem" : isMobile ? "0.875rem" : "1rem",
                      margin: "0 0 0.25rem 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.category}
                  </p>

                  <h3
                    style={{
                      fontSize: is4K ? "1.7rem": is2K ? "1.4rem" : isMobile ? "0.875rem" : "1rem",
                      margin: "0.5rem 0",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: is4K ? "1.2rem": is2K ? "1.1rem" : isMobile ? "0.875rem" : "1rem",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expandedItem && (
          <VideoModal
            item={expandedItem}
            onClose={() => setExpandedItem(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkPageContent />
    </Suspense>
  );
}