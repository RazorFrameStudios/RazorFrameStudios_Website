"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const prev = useRef({ x: 0, y: 0 });
  const { isMobile, isTablet, isLaptop, isDesktop, is2K, is4K } = useBreakpoint();

  // ── Responsive cursor sizing ────────────────────────────────────────────────
  const cursorSize = isMobile
    ? 28
    : isTablet
    ? 32
    : isLaptop
    ? 36
    : isDesktop
    ? 42
    : is2K
    ? 52
    : 66;

  const dotSize = isMobile
    ? 6
    : isTablet
    ? 7
    : isLaptop
    ? 8
    : isDesktop
    ? 9
    : is2K
    ? 11
    : 14;

  const borderWidth = isMobile
    ? 1.2
    : isTablet
    ? 1.35
    : isLaptop
    ? 1.5
    : isDesktop
    ? 1.75
    : is2K
    ? 2
    : 2.5;

  const glowIntensity = isMobile
    ? "0 0 4px rgba(3,192,74,0.4)"
    : isTablet
    ? "0 0 6px rgba(3,192,74,0.5)"
    : isLaptop
    ? "0 0 8px rgba(3,192,74,0.5)"
    : isDesktop
    ? "0 0 10px rgba(3,192,74,0.6)"
    : is2K
    ? "0 0 12px rgba(3,192,74,0.7)"
    : "0 0 16px rgba(3,192,74,0.8)";

  const dotGlow = isMobile
    ? "0 0 4px rgba(3,192,74,0.8)"
    : isTablet
    ? "0 0 5px rgba(3,192,74,0.85)"
    : isLaptop
    ? "0 0 6px rgba(3,192,74,0.9)"
    : isDesktop
    ? "0 0 8px rgba(3,192,74,0.95)"
    : is2K
    ? "0 0 10px rgba(3,192,74,1)"
    : "0 0 14px rgba(3,192,74,1)";

  // Calculate half size for centering
  const halfSize = cursorSize / 2;

  const x = useSpring(0, { stiffness: 180, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 180, damping: 20, mass: 0.5 });
  const rotate = useSpring(0, { stiffness: 80, damping: 15 });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  const opacity = useMotionValue(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - prev.current.x;
      const dy = e.clientY - prev.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const lean = Math.min(speed * 1.2, 25);
        rotate.set(angle * 0.1 + (dx > 0 ? lean * 0.1 : -lean * 0.1));
      } else {
        rotate.set(0);
      }

      x.set(e.clientX - halfSize);
      y.set(e.clientY - halfSize);
      prev.current = { x: e.clientX, y: e.clientY };

      if (!visible) {
        setVisible(true);
        opacity.set(1);
      }
    };

    const onLeave = () => opacity.set(0);
    const onEnter = () => opacity.set(1);
    const onDown = () => scale.set(0.65);
    const onUp = () => scale.set(1);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y, rotate, scale, opacity, halfSize, visible]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x,
          y,
          rotate,
          scale,
          opacity,
          pointerEvents: "none",
          zIndex: 99999,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
        }}
      >
        {/* Ping ring: starts at scale(0) = dot size, grows to scale(1) = full cursor ring */}
        <motion.div
          animate={{
            scale: [0, 1],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeOut",
            repeatDelay: 0.1,
          }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `${borderWidth}px solid #03C04A`,
            boxShadow: glowIntensity,
            transformOrigin: "center",
          }}
        />

        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: "50%",
            background: "#03C04A",
            boxShadow: dotGlow,
          }}
        />
      </motion.div>
    </>
  );
}