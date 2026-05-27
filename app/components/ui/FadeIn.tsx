"use client";

import { motion } from "framer-motion";

export default function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
