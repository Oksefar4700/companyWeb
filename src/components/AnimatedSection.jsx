// src/components/AnimatedSection.jsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedSection({
  id,
  from = "left",
  children,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const xStart = from === "left" ? -50 : from === "right" ? 50 : 0;
  const yStart = from === "top" ? -50 : from === "bottom" ? 50 : 0;

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: xStart, y: yStart }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
