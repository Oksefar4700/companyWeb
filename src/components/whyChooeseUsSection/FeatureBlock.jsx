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

    // Get icon based on feature type
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

    // Get benefits based on feature type
    const getBenefits = () => {
      if (featureType === "react") {
        return [
          { icon: <Rocket size={18} />, text: feature.content.benefits[0] },
          {
            icon: <MessageCircle size={18} />,
            text: feature.content.benefits[1],
          },
          { icon: <PenTool size={18} />, text: feature.content.benefits[2] },
          {
            icon: <CheckCircle2 size={18} />,
            text: feature.content.benefits[3],
          },
        ];
      }
      return [];
    };

    return (
      <motion.div
        ref={ref}
        className="flex flex-col items-center text-center relative py-4 px-4 rounded-lg"
        custom={0}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={featureControls}
      >
        {/* Scroll-aktiveret highlight-effekt */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-blue)]/0 via-[var(--color-brand-blue)]/3 to-[var(--color-brand-blue)]/0 rounded-lg opacity-0 transition-opacity duration-1000"
          style={{
            opacity: featureInView ? 0.5 : 0,
            transitionDelay: "0.3s",
          }}
        ></div>

        {/* Ikon centreret */}
        <div className="flex justify-center mb-6 relative z-10">
          <div className="relative">
            <motion.div
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: featureInView ? 1 : 0,
                opacity: featureInView ? 1 : 0,
              }}
              transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            >
              {getIcon()}
            </motion.div>
            <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
            </div>
          </div>
        </div>

        {/* Tekst centreret */}
        <div className="max-w-3xl mx-auto">
          <motion.h3
            className="text-xl lg:text-2xl font-bold text-[var(--color-foreground)] mb-3"
            variants={textRevealVariants}
            custom={0}
          >
            {feature.title}
          </motion.h3>

          <motion.p
            className="text-base leading-relaxed mb-5"
            variants={textRevealVariants}
            custom={1}
          >
            {feature.content.paragraph}
          </motion.p>

          {/* Feature-specific content */}
          {featureType === "react" && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-4xl mx-auto"
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
                  className="flex items-center p-3 bg-white rounded-lg shadow-sm"
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
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center mr-3">
                    <span className="text-[var(--color-brand-blue)]">
                      {benefit.icon}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {featureType === "support" && (
            <>
              <motion.div
                className="bg-white rounded-lg p-4 shadow-md mb-3 border-l-4 border-[var(--color-brand-blue)] max-w-lg mx-auto"
                variants={textRevealVariants}
                custom={2}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h4 className="text-base font-semibold mb-1">
                      Gennemsnitlig responstid
                    </h4>
                    <p className="text-xs text-gray-600">
                      Baseret på de seneste 1000 henvendelser
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-brand-blue)]">
                    {feature.content.responseTime}
                  </div>
                </div>
              </motion.div>

              <motion.blockquote
                className="italic text-[var(--color-foreground)]/80 pl-4 border-l-2 border-[var(--color-brand-blue)]/40 max-w-md mx-auto text-sm"
                variants={textRevealVariants}
                custom={3}
              >
                "Vores hjemmeside gik ned fredag aften. Jeg sendte en mail, og
                15 minutter senere var problemet løst. Det kalder jeg service!"
                <footer className="mt-1 text-xs font-medium not-italic">
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
                className="inline-flex items-center bg-white py-3 px-5 rounded-full border-2 border-[var(--color-brand-blue)] shadow-md mt-3"
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Award
                  size={22}
                  className="text-[var(--color-brand-blue)] mr-3"
                />
                <span className="text-base font-bold text-[var(--color-foreground)]">
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
