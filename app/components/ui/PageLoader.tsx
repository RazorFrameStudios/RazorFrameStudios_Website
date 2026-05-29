"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

const GLOW_GREEN = "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)";
const GLOW_WHITE = "0 0 40px rgba(3,192,74,0.2), 0 0 100px rgba(3,192,74,0.1)";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [cacheBust, setCacheBust] = useState<number | null>(null);
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  // ── Responsive spacing ──────────────────────────────────────────────────────
  const taglineMarginTop = isMobile
    ? "0.75rem"  : isTablet
    ? "0.85rem"  : isLaptop
    ? "1rem"     : isDesktop
    ? "1.25rem"  : is2K
    ? "1.5rem"   : "2rem";

  const progressBarBottom = isMobile
    ? "-2rem"    : isTablet
    ? "-2.25rem" : isLaptop
    ? "-2.5rem"  : isDesktop
    ? "-2.75rem" : is2K
    ? "-3.25rem" : "-4rem";

  const progressBarHeight = isMobile
    ? "1px"      : isTablet
    ? "1.25px"   : isLaptop
    ? "1.5px"    : isDesktop
    ? "1.75px"   : is2K
    ? "2px"      : "2.5px";

  const containerGap = isMobile
    ? "0" : isTablet
    ? "0.25rem" : isLaptop
    ? "0.5rem" : isDesktop
    ? "0.75rem" : is2K
    ? "1rem" : "1.25rem";

  useEffect(() => {
    setCacheBust(Date.now());
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 1, zIndex: 0 }}
          >
            <source
              src={cacheBust ? `https://thzrymlstodkdybfzovu.supabase.co/storage/v1/object/public/Landing%20page%20videos/Loading%20Page%20COMPRESSED.mp4?v=${cacheBust}` : `https://thzrymlstodkdybfzovu.supabase.co/storage/v1/object/public/Landing%20page%20videos/Loading%20Page%20COMPRESSED.mp4`}
              type="video/mp4"
            />
          </video>

          {/* Content container */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: containerGap,
            }}
          >
            {/* Brand name */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "white",
                whiteSpace: "nowrap",
                textShadow: GLOW_WHITE,
              }}
            >
              RazorFrame Studios
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                marginTop: taglineMarginTop,
              }}
            >
              Digital Content Agency
            </motion.p>

            {/* Progress bar — green glow */}
            <motion.div
              style={{
                position: "absolute",
                bottom: progressBarBottom,
                left: 0,
                height: progressBarHeight,
                background: "white",
                width: "0%",
                borderRadius: "9999px",
                boxShadow: "0 0 8px rgba(3,192,74,0.8), 0 0 20px rgba(3,192,74,0.4)",
              }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}