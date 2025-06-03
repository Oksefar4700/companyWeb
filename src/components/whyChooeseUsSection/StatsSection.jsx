"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const StatsSection = forwardRef(
  ({ stats, statsInView, statsControls }, ref) => {
    const statVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.2 + i * 0.15,
          ease: [0.215, 0.61, 0.355, 1], // 🔥 hardware-easing
        },
      }),
    };

    const numberVariants = {
      hidden: { opacity: 0, scale: 0.5 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring", // GPU-optimeret
          stiffness: 200,
          damping: 15,
          delay: 0.4 + i * 0.15,
        },
      }),
    };

    return (
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-24 relative"
        initial="hidden"
        animate={statsControls}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="bg-[var(--color-background)] rounded-2xl p-8 text-center shadow-lg border border-[var(--color-brand-blue)]/10 relative overflow-hidden"
            variants={statVariants}
            custom={i}
            style={{
              transform: "translate3d(0,0,0)", // 🔥 GPU hint
              willChange: "transform, opacity", // 🔥 GPU hint
            }}
          >
            <motion.h3
              className="text-4xl font-bold mb-3 font-[var(--font-heading)] text-[var(--color-brand-blue)]"
              variants={numberVariants}
              custom={i}
            >
              {stat.value}
            </motion.h3>
            <motion.p
              className="text-base font-medium font-[var(--font-body)] text-[var(--color-foreground)]/80"
              initial={{ opacity: 0 }}
              animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
            >
              {stat.label}
            </motion.p>
            <motion.div
              className="absolute bottom-0 left-1/2 h-1 bg-[var(--color-brand-blue)] rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={
                statsInView
                  ? { width: "60%", x: "-50%" }
                  : { width: 0, x: "-50%" }
              }
              transition={{
                duration: 0.8,
                delay: 0.8 + i * 0.15,
                ease: "easeOut",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }
);

StatsSection.displayName = "StatsSection";
export default StatsSection;
