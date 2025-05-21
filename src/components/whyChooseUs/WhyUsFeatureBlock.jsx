// src/components/whyChooseUs/WhyUsFeatureBlock.jsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const WhyUsFeatureBlock = ({
  featureRef,
  featureNum,
  IconComponent, // e.g., Zap, Clock, Code from lucide-react
  title,
  paragraph,
  featureSpecificContent,
  animationControls,
  isInView,
  textRevealVariant, // Should be textRevealVariants (plural) based on parent
  fadeInUpVariant,   // Should be fadeInUpVariants (plural) based on parent
}) => {
  return (
    <motion.div
      ref={featureRef}
      className="flex flex-col items-center text-center relative py-4 px-4 rounded-lg"
      custom={featureNum} // Used by fadeInUpVariants if it's a function that takes an index
      variants={fadeInUpVariant} // Use the passed variant
      initial="hidden"
      animate={animationControls}
    >
      {/* Scroll-aktiveret highlight-effekt */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-blue)]/0 via-[var(--color-brand-blue)]/3 to-[var(--color-brand-blue)]/0 rounded-lg opacity-0 transition-opacity duration-1000"
        style={{
          opacity: isInView ? 0.5 : 0,
          transitionDelay: "0.3s",
        }}
      ></div>

      {/* Ikon centreret - med once-triggered animation */}
      <div className="flex justify-center mb-6 relative z-10">
        <div className="relative">
          <motion.div
            className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isInView ? 1 : 0,
              opacity: isInView ? 1 : 0,
            }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          >
            {IconComponent && <IconComponent size={48} className="text-[var(--color-brand-blue)]" />}
          </motion.div>
          <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
          </div>
        </div>
      </div>

      {/* Tekst centreret - kortere spacing */}
      <div className="max-w-3xl mx-auto">
        <motion.h3
          className="text-xl lg:text-2xl font-bold text-[var(--color-foreground)] mb-3"
          variants={textRevealVariant} // Use the passed variant
          custom={0} // First text element to reveal
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-base leading-relaxed mb-5"
          variants={textRevealVariant} // Use the passed variant
          custom={1} // Second text element to reveal
        >
          {paragraph}
        </motion.p>

        {/* Render feature-specific content */}
        {featureSpecificContent}
      </div>
    </motion.div>
  );
};

export default WhyUsFeatureBlock;
