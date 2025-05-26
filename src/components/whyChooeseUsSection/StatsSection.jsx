"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const StatsSection = forwardRef(
  ({ stats, statsInView, statsControls }, ref) => {
    // Statistik animation variants
    const statVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: 0.1 + i * 0.1,
          ease: [0.215, 0.61, 0.355, 1],
        },
      }),
    };

    return (
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-24 relative"
        initial="hidden"
        animate={statsControls}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="bg-[var(--color-background)] rounded-xl p-6 md:p-8 text-center shadow-lg border border-[var(--color-brand-blue)]/10 relative overflow-hidden"
            variants={statVariants}
            custom={i}
            style={{
              transform: "translate3d(0,0,0)", // GPU acceleration
              willChange: "transform, opacity",
            }}
          >
            {/* Shine effect animation - purely decorative */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-brand-blue)]/5 to-transparent opacity-0"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4 + i,
                ease: "easeInOut",
              }}
            />

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(var(--color-brand-blue) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <motion.h3
              className="text-4xl md:text-5xl font-bold text-[var(--color-brand-blue)] mb-2 font-[var(--font-heading)] relative z-10"
              initial={{ scale: 0 }}
              animate={statsInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2 + i * 0.1,
              }}
            >
              {stat.value}
            </motion.h3>
            <p className="text-base md:text-lg text-[var(--color-foreground)]/80 mt-2 font-medium font-[var(--font-body)] relative z-10">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    );
  }
);

StatsSection.displayName = "StatsSection";

export default StatsSection;
