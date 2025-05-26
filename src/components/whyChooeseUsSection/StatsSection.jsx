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
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24 relative"
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
            className="bg-white rounded-xl p-8 text-center shadow-lg border border-[var(--color-brand-blue)]/10 transform hover:translate-y-[-5px] transition-transform duration-300"
            variants={statVariants}
            custom={i}
          >
            <h3 className="text-5xl font-bold text-[var(--color-brand-blue)] mb-2">
              {stat.value}
            </h3>
            <p className="text-lg text-[var(--color-foreground)]/80 mt-2 font-medium">
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
