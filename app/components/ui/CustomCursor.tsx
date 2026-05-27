"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const prev = useRef({ x: 0, y: 0 });

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

      x.set(e.clientX - 18);
      y.set(e.clientY - 18);
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
  }, []);
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
          width: "36px",
          height: "36px",
        }}
      >
        {/*
          Ping ring: starts at scale(0) = dot size, grows to scale(1) = full 36px ring.
          Ends at opacity 0 so the snap-back to scale(0) is invisible — no glitch.
        */}
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
            border: "1.5px solid #03C04A",
            boxShadow: "0 0 8px rgba(3,192,74,0.5)",
            transformOrigin: "center",
          }}
        />
        {/* Center dot only */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#03C04A",
          boxShadow: "0 0 6px rgba(3,192,74,0.9)",
        }} />
      </motion.div>
    </>
  );
}
