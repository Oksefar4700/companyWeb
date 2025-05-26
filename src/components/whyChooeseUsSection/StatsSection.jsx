// src/components/whyChooeseUsSection/StatsSection.jsx - POLERET UI
"use client";

import { forwardRef, memo } from "react";
import { motion } from "framer-motion";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 POLERET StatCard Component - INGEN hover state (ikke klikkbart)
const StatCard = memo(
  forwardRef(function StatCard({ value, label, index, statsInView }, ref) {
    return (
      <motion.div
        ref={ref}
        className="
        bg-white/80
        backdrop-blur-sm
        rounded-xl
        p-6 lg:p-8
        text-center
        shadow-sm
        border
        border-[var(--color-brand-blue)]/15
        transform-gpu
      "
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={
          statsInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 25, scale: 0.95 }
        }
        transition={{
          type: "tween",
          duration: 0.7,
          delay: 0.1 + index * 0.15,
          ease: SMOOTH_EASE,
        }}
        style={{
          willChange: "transform, opacity",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
        }}
        // 🔥 INGEN HOVER - stats er ikke klikkbare
      >
        {/* Stat Value */}
        <motion.h3
          className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--color-brand-blue)] mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.2 + index * 0.15,
          }}
          style={{
            willChange: "transform, opacity",
          }}
        >
          {value}
        </motion.h3>

        {/* Stat Label */}
        <motion.p
          className="text-base lg:text-lg text-[var(--color-foreground)]/70 font-medium"
          initial={{ opacity: 0, y: 8 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.5,
            delay: 0.4 + index * 0.15,
            ease: SMOOTH_EASE,
          }}
          style={{
            willChange: "transform, opacity",
          }}
        >
          {label}
        </motion.p>
      </motion.div>
    );
  })
);

// 🔥 POLERET StatsSection Component
const StatsSection = forwardRef(function StatsSection(
  { stats, statsInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto mb-20 relative"
      initial={{ opacity: 0 }}
      animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: SMOOTH_EASE,
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }}
      style={{
        willChange: "opacity",
        transform: "translate3d(0,0,0)",
        contain: "layout style",
      }}
    >
      {stats.map((stat, i) => (
        <StatCard
          key={`${stat.value}-${stat.label}`}
          value={stat.value}
          label={stat.label}
          index={i}
          statsInView={statsInView}
        />
      ))}

      {/* 🔥 MINIMALE DECORATIVE ELEMENTS */}
      <div
        className="absolute -top-2 -right-2 w-3 h-3 bg-[var(--color-brand-blue)]/25 rounded-full"
        style={{
          transform: "translate3d(0,0,0)",
          opacity: statsInView ? 1 : 0,
          transition: "opacity 1.5s ease-out 1s",
        }}
      />
      <div
        className="absolute -bottom-2 -left-2 w-2 h-2 bg-[var(--color-primary)]/20 rounded-full"
        style={{
          transform: "translate3d(0,0,0)",
          opacity: statsInView ? 1 : 0,
          transition: "opacity 1.5s ease-out 1.2s",
        }}
      />
    </motion.div>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
