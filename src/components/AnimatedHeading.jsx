"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedHeading({
  title,
  direction = "right",
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  // 🔥 OPTIMERING: Bruger egen useInView i stedet for controls
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  const xStart = direction === "left" ? -50 : direction === "right" ? 50 : 0;

  const headingVariants = {
    hidden: { opacity: 0, x: xStart },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay },
    },
  };

  const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: delay + 0.2, ease: "easeOut" },
    },
  };

  return (
    <div ref={ref}>
      <motion.h2
        initial="hidden"
        animate={isInView ? "visible" : {}} // 🔥 OPTIMERING: Direkte animation state
        variants={headingVariants}
        className={`text-3xl sm:text-4xl font-bold mb-3 font-[var(--font-heading)] ${className}`}
      >
        {title}
      </motion.h2>

      <motion.div
        className="w-16 sm:w-24 h-1 bg-[var(--color-brand-blue)] mx-auto mb-8 sm:mb-12 rounded-full origin-center"
        initial="hidden"
        animate={isInView ? "visible" : {}} // 🔥 OPTIMERING: Direkte animation state
        variants={dividerVariants}
      />
    </div>
  );
}

// 🔄 HVIS DU STADIG VIL BRUGE DEN GAMLE MÅDE:
// Du kan også lave en backwards-compatible version:

export function AnimatedHeadingWithControls({
  title,
  controls, // Stadig accepterer controls for bagudkompatibilitet
  direction = "right",
  className = "",
}) {
  const xStart = direction === "left" ? -50 : direction === "right" ? 50 : 0;

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, x: xStart }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: xStart },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
        className={`text-3xl sm:text-4xl font-bold mb-3 font-[var(--font-heading)] ${className}`}
      >
        {title}
      </motion.h2>
      <motion.div
        className="w-16 sm:w-24 h-1 bg-[var(--color-brand-blue)] mx-auto mb-8 sm:mb-12 rounded-full origin-center"
        initial={{ scaleX: 0 }}
        animate={controls}
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
          },
        }}
      />
    </>
  );
}
