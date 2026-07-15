"use client";

import { motion } from "framer-motion";

/**
 * Lightweight scroll-reveal wrapper built on framer-motion.
 * Fade + small upward translate, plays once when it enters the viewport.
 */
export default function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
