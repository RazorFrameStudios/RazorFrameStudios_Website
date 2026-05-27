"use client";

import { motion } from "framer-motion";

export default function StaggerContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
