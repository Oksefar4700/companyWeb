// src/components/whyChooeseUsSection/FeatureBlock.jsx - POLERET UI
"use client";

import { forwardRef, memo } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  Code,
  CheckCircle2,
  Award,
  Rocket,
  MessageCircle,
  PenTool,
} from "lucide-react";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 OPTIMERET Icon Mapping
const ICON_MAP = {
  react: Zap,
  support: Clock,
  custom: Code,
};

const BENEFIT_ICONS = {
  0: Rocket,
  1: MessageCircle,
  2: PenTool,
  3: CheckCircle2,
};

// 🔥 POLERET FeatureIcon - INGEN hover state (ikke klikkbar)
const FeatureIcon = memo(forwardRef(function FeatureIcon(
  { featureType, featureInView, delay = 0 },
  ref
) {
  const IconComponent = ICON_MAP[featureType] || Zap;

  return (
    <motion.div
      ref={ref}
      className="flex justify-center mb-8 relative z-10"
      initial={{ scale: 0, opacity: 0 }}
      animate={
        featureInView
          ? { scale: 1, opacity: 1 }
          : { scale: 0, opacity: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
      }}
    >
      {/* 🔥 STATISK IKON - Ingen hover da det ikke er klikkbart */}
      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center border border-[var(--color-brand-blue)]/20">
        <IconComponent size={40} className="text-[var(--color-brand-blue)]" />
      </div>
    </motion.div>
  );
}));

// 🔥 POLERET BenefitGrid - INGEN hover states (ikke klikkbare)
const BenefitGrid = memo(forwardRef(function BenefitGrid(
  { benefits, featureInView, delay = 0 },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={featureInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.7,
        delay,
        staggerChildren: 0.1,
        ease: SMOOTH_EASE,
      }}
      style={{
        willChange: "opacity",
        transform: "translate3d(0,0,0)",
      }}
    >
      {benefits.map((benefit, i) => {
        const IconComponent = BENEFIT_ICONS[i] || CheckCircle2;
        
        return (
          <motion.div
            key={`benefit-${i}`}
            className="flex items-center p-4 bg-white/60 rounded-xl border border-[var(--color-brand-blue)]/10"
            initial={{ opacity: 0, y: 15 }}
            animate={
              featureInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 15 }
            }
            transition={{
              duration: 0.5,
              delay: delay + 0.2 + i * 0.1,
              ease: SMOOTH_EASE,
            }}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
            }}
            // 🔥 INGEN HOVER - ikke klikkbart element
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)]/15 flex items-center justify-center mr-3 flex-shrink-0">
              <IconComponent size={16} className="text-[var(--color-brand-blue)]" />
            </div>
            <span className="text-sm font-medium text-[var(--color-foreground)]/80">{benefit}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}));

// 🔥 POLERET SupportContent - INGEN hover states
const SupportContent = memo(forwardRef(function SupportContent(
  { content, featureInView, delay = 0 },
  ref
) {
  return (
    <div ref={ref} className="max-w-lg mx-auto">
      <motion.div
        className="bg-gradient-to-br from-[var(--color-brand-blue)]/5 to-[var(--color-brand-blue)]/10 rounded-xl p-6 mb-4 border border-[var(--color-brand-blue)]/15"
        initial={{ opacity: 0, y: 20 }}
        animate={
          featureInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{
          duration: 0.6,
          delay: delay + 0.2,
          ease: SMOOTH_EASE,
        }}
        style={{
          willChange: "transform, opacity",
          transform: "translate3d(0,0,0)",
        }}
        // 🔥 INGEN HOVER - ikke klikkbart
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-foreground)]">
              Gennemsnitlig responstid
            </h4>
            <p className="text-xs text-[var(--color-foreground)]/60 mt-1">
              Baseret på seneste 1000 henvendelser
            </p>
          </div>
          <div className="text-3xl font-bold text-[var(--color-brand-blue)]">
            {content.responseTime}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white/70 rounded-xl p-5 border border-[var(--color-primary)]/10"
        initial={{ opacity: 0, y: 20 }}
        animate={
          featureInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{
          duration: 0.6,
          delay: delay + 0.4,
          ease: SMOOTH_EASE,
        }}
        style={{
          willChange: "transform, opacity",
        }}
        // 🔥 INGEN HOVER - ikke klikkbart
      >
        <blockquote className="text-sm italic text-[var(--color-foreground)]/75 leading-relaxed">
          "Vores hjemmeside gik ned fredag aften. Jeg sendte en mail, og
          15 minutter senere var problemet løst. Det kalder jeg service!"
        </blockquote>
        <footer className="text-xs font-semibold not-italic mt-3 text-[var(--color-brand-blue)]">
          — Morten, CEO hos BrandCo
        </footer>
      </div>
    </div>
  );
}));

// 🔥 POLERET CustomContent - INGEN hover state
const CustomContent = memo(forwardRef(function CustomContent(
  { content, featureInView, delay = 0 },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="flex justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        featureInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        delay: delay + 0.2,
        ease: SMOOTH_EASE,
      }}
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
      }}
    >
      {/* 🔥 STATISK BADGE - Ingen hover da det ikke er klikkbart */}
      <div className="inline-flex items-center bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] text-white py-3 px-6 rounded-full shadow-lg border border-[var(--color-brand-blue)]">
        <Award size={20} className="mr-3" />
        <span className="text-base font-bold">
          {content.guarantee}
        </span>
      </div>
    </motion.div>
  );
}));

// 🔥 HOVEDKOMPONENT: POLERET FeatureBlock
const FeatureBlock = forwardRef(function FeatureBlock(
  { feature, featureInView, featureType, index = 0 },
  ref
) {
  const baseDelay = index * 0.15;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center relative py-6 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={
        featureInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 30 }
      }
      transition={{
        duration: 0.8,
        delay: baseDelay,
        ease: SMOOTH_EASE,
      }}
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
        contain: "layout style",
      }}
    >
      {/* 🔥 SUBTIL HIGHLIGHT EFFECT */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-blue)]/0 via-[var(--color-brand-blue)]/2 to-[var(--color-brand-blue)]/0 rounded-2xl"
        style={{
          opacity: featureInView ? 1 : 0,
          transition: "opacity 1.2s ease-out 0.5s",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Feature Icon */}
      <FeatureIcon
        featureType={featureType}
        featureInView={featureInView}
        delay={baseDelay + 0.1}
      />

      {/* Feature Content */}
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.h3
          className="text-xl lg:text-2xl font-bold text-[var(--color-foreground)] mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={
            featureInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 15 }
          }
          transition={{
            duration: 0.6,
            delay: baseDelay + 0.2,
            ease: SMOOTH_EASE,
          }}
          style={{
            willChange: "transform, opacity",
          }}
        >
          {feature.title}
        </motion.h3>

        <motion.p
          className="text-base leading-relaxed mb-6 text-[var(--color-foreground)]/75"
          initial={{ opacity: 0, y: 15 }}
          animate={
            featureInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 15 }
          }
          transition={{
            duration: 0.6,
            delay: baseDelay + 0.3,
            ease: SMOOTH_EASE,
          }}
          style={{
            willChange: "transform, opacity",
          }}
        >
          {feature.content.paragraph}
        </motion.p>

        {/* Feature-specific content */}
        {featureType === "react" && feature.content.benefits && (
          <BenefitGrid
            benefits={feature.content.benefits}
            featureInView={featureInView}
            delay={baseDelay + 0.4}
          />
        )}

        {featureType === "support" && (
          <SupportContent
            content={feature.content}
            featureInView={featureInView}
            delay={baseDelay + 0.4}
          />
        )}

        {featureType === "custom" && (
          <CustomContent
            content={feature.content}
            featureInView={featureInView}
            delay={baseDelay + 0.4}
          />
        )}
      </div>
    </motion.div>
  );
});

FeatureBlock.displayName = "FeatureBlock";

export default FeatureBlock;