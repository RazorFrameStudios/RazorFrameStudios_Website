"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Page wipe overlay — sweeps top to bottom */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000",
            transformOrigin: "top",
            zIndex: 9998,
            pointerEvents: "none",
          }}
        />

        {/* Green accent line — sweeps bottom to top */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            top: 0, left: 0, bottom: 0,
            width: "3px",
            background: "#03C04A",
            transformOrigin: "bottom",
            zIndex: 9999,
            pointerEvents: "none",
            boxShadow: "0 0 12px rgba(3,192,74,0.9), 0 0 30px rgba(3,192,74,0.5)",
          }}
        />
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            top: 0, right: 0, bottom: 0,
            width: "3px",
            background: "#03C04A",
            transformOrigin: "bottom",
            zIndex: 9999,
            pointerEvents: "none",
            boxShadow: "0 0 12px rgba(3,192,74,0.9), 0 0 30px rgba(3,192,74,0.5)",
          }}
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
}
