"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

type Variant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "fadeDown";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}

const variants: Record<Variant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    show:   { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -32 },
    show:   { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -52 },
    show:   { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 52 },
    show:   { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.88 },
    show:   { opacity: 1, scale: 1 },
  },
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
