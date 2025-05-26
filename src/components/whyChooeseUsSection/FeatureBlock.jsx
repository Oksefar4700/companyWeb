"use client";

import { forwardRef } from "react";
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
  Shield,
  Users,
  TrendingUp,
} from "lucide-react";

const FeatureBlock = forwardRef(
  ({ feature, featureInView, featureControls, featureType }, ref) => {
    // Animation variants
    const fadeInUpVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.05 * i,
          ease: [0.215, 0.61, 0.355, 1],
        },
      }),
    };

    const textRevealVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.1 * i,
          ease: [0.215, 0.61, 0.355, 1],
        },
      }),
    };

    // Get icon based on feature type - using Lucide React
    const getIcon = () => {
      switch (featureType) {
        case "react":
          return <Zap size={48} className="text-[var(--color-brand-blue)]" />;
        case "support":
          return <Clock size={48} className="text-[var(--color-brand-blue)]" />;
        case "custom":
          return <Code size={48} className="text-[var(--color-brand-blue)]" />;
        default:
          return <Zap size={48} className="text-[var(--color-brand-blue)]" />;
      }
    };

    // Get benefits with appropriate Lucide icons
    const getBenefits = () => {
      if (featureType === "react") {
        return [
          { icon: <Rocket size={18} />, text: feature.content.benefits[0] },
          { icon: <Shield size={18} />, text: feature.content.benefits[1] },
          { icon: <PenTool size={18} />, text: feature.content.benefits[2] },
          { icon: <TrendingUp size={18} />, text: feature.content.benefits[3] },
        ];
      }
      return [];
    };

    return (
      <motion.div
        ref={ref}
        className="flex flex-col items-center text-center relative py-6 md:py-8 px-4 md:px-6 rounded-2xl"
        custom={0}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={featureControls}
        style={{
          transform: "translate3d(0,0,0)", // GPU acceleration
          willChange: "transform, opacity",
        }}
      >
        {/* Scroll-activated highlight effect - no hover since not clickable */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-blue)]/0 via-[var(--color-brand-blue)]/3 to-[var(--color-brand-blue)]/0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: featureInView ? 0.5 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Icon section with pulse ring - no hover since not clickable */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="relative">
            <motion.div
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: featureInView ? 1 : 0,
                opacity: featureInView ? 1 : 0,
              }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
            >
              {getIcon()}
            </motion.div>

            {/* Pulse ring animation */}
            <motion.div
              className="absolute top-0 left-0 w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[var(--color-brand-blue)]/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Text content - no hover since not clickable */}
        <div className="max-w-3xl mx-auto">
          <motion.h3
            className="text-xl lg:text-2xl font-bold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]"
            variants={textRevealVariants}
            custom={0}
          >
            {feature.title}
          </motion.h3>

          <motion.p
            className="text-base leading-relaxed mb-6 text-[var(--color-foreground)]/80 font-[var(--font-body)]"
            variants={textRevealVariants}
            custom={1}
          >
            {feature.content.paragraph}
          </motion.p>

          {/* Feature-specific content */}
          {featureType === "react" && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-4xl mx-auto"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {getBenefits().map((benefit, i) => (
                <motion.div
                  key={i}
                  className="flex items-center p-4 bg-[var(--color-background)] rounded-xl shadow-sm border border-[var(--color-brand-blue)]/10"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.2 + i * 0.1,
                      },
                    },
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-[var(--color-brand-blue)]">
                      {benefit.icon}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-foreground)] font-[var(--font-body)]">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {featureType === "support" && (
            <>
              <motion.div
                className="bg-[var(--color-background)] rounded-xl p-6 shadow-md mb-4 border-l-4 border-[var(--color-brand-blue)] max-w-lg mx-auto relative overflow-hidden"
                variants={textRevealVariants}
                custom={2}
              >
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-blue)]/0 via-[var(--color-brand-blue)]/5 to-[var(--color-brand-blue)]/0 opacity-0"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 relative z-10">
                  <div>
                    <h4 className="text-base font-semibold mb-1 text-[var(--color-foreground)] font-[var(--font-heading)]">
                      Gennemsnitlig responstid
                    </h4>
                    <p className="text-xs text-[var(--color-foreground)]/60 font-[var(--font-body)]">
                      Baseret på de seneste 1000 henvendelser
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-brand-blue)] font-[var(--font-heading)]">
                    {feature.content.responseTime}
                  </div>
                </div>
              </motion.div>

              <motion.blockquote
                className="italic text-[var(--color-foreground)]/80 pl-4 border-l-2 border-[var(--color-brand-blue)]/40 max-w-md mx-auto text-sm font-[var(--font-body)]"
                variants={textRevealVariants}
                custom={3}
              >
                "Vores hjemmeside gik ned fredag aften. Jeg sendte en mail, og
                15 minutter senere var problemet løst. Det kalder jeg service!"
                <footer className="mt-2 text-xs font-medium not-italic text-[var(--color-foreground)]/60">
                  — Morten, CEO hos BrandCo
                </footer>
              </motion.blockquote>
            </>
          )}

          {featureType === "custom" && (
            <motion.div
              className="flex justify-center"
              variants={textRevealVariants}
              custom={2}
            >
              <motion.div
                className="inline-flex items-center bg-[var(--color-background)] py-4 px-6 rounded-full border-2 border-[var(--color-brand-blue)] shadow-md mt-4"
                whileInView={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    "0 10px 15px -3px rgba(126, 174, 219, 0.3)",
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              >
                <Award
                  size={22}
                  className="text-[var(--color-brand-blue)] mr-3"
                />
                <span className="text-base font-bold text-[var(--color-foreground)] font-[var(--font-heading)]">
                  {feature.content.guarantee}
                </span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }
);

FeatureBlock.displayName = "FeatureBlock";

export default FeatureBlock;
