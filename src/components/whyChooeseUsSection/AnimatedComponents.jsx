"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// VideoSection Component - forbedret med decorative border glow
export const VideoSection = forwardRef(({ videoInView }, ref) => {
  return (
    <div
      ref={ref}
      className="max-w-6xl mx-auto mb-16 md:mb-20 overflow-hidden rounded-2xl shadow-2xl relative"
    >
      <div className="aspect-video relative">
        <video
          src="/videos/why_us_demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{
            transform: "translate3d(0,0,0)", // GPU acceleration
          }}
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/70 via-transparent to-transparent pointer-events-none" />

        {/* Content overlay - no hover since not clickable */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-[var(--color-background)] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3 font-[var(--font-heading)]">
            En partner, ikke bare en leverandør
          </h3>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-[var(--font-body)]">
            Vi samarbejder tæt med vores kunder for at forstå deres behov og
            skabe løsninger, der virkelig gør en forskel.
          </p>
        </motion.div>

        {/* Subtle border glow effect - decorative only */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-[var(--color-brand-blue)]/0"
          animate={{
            borderColor: [
              "rgba(126, 174, 219, 0)",
              "rgba(126, 174, 219, 0.3)",
              "rgba(126, 174, 219, 0)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
});

VideoSection.displayName = "VideoSection";

// CTASection Component - med hover effects da den er klikbar
export const CTASection = forwardRef(({ ctaInView }, ref) => {
  return (
    <div ref={ref} className="mt-14 text-center relative">
      <motion.a
        href="#contact"
        className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-semibold bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)] text-[var(--color-background)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative z-10 font-[var(--font-body)] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        // Hover effects only on clickable button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 15px 30px -5px rgba(126, 174, 219, 0.4)",
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          transform: "translate3d(0,0,0)", // GPU acceleration
          willChange: "transform",
        }}
      >
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-background)]/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        <span className="relative z-10">Lad os tage skridtet sammen</span>

        <ArrowRight
          size={20}
          className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1 relative z-10"
        />
      </motion.a>

      {/* Background decoration - not clickable, no hover */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-[var(--color-brand-blue)]/5 via-[var(--color-brand-blue)]/10 to-[var(--color-brand-blue)]/5 rounded-2xl -z-10"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

CTASection.displayName = "CTASection";
