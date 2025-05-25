"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// VideoSection Component
export const VideoSection = forwardRef(({ videoInView }, ref) => {
  return (
    <div
      ref={ref}
      className="max-w-6xl mx-auto mb-20 overflow-hidden rounded-2xl shadow-2xl relative"
    >
      <div className="aspect-video">
        <video
          src="/videos/why_us_demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-10 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-3">
            En partner, ikke bare en leverandør
          </h3>
          <p className="text-xl max-w-3xl mx-auto">
            Vi samarbejder tæt med vores kunder for at forstå deres behov og
            skabe løsninger, der virkelig gør en forskel.
          </p>
        </motion.div>
      </div>
    </div>
  );
});

VideoSection.displayName = "VideoSection";

// CTASection Component
export const CTASection = forwardRef(({ ctaInView }, ref) => {
  return (
    <div ref={ref} className="mt-14 text-center relative">
      <motion.a
        href="#contact"
        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-[var(--color-brand-blue)] text-white rounded-lg shadow-md hover:bg-[var(--color-brand-blue-darker)] transition-all duration-300 transform hover:scale-105 group relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        Lad os tage skridtet sammen
        <ArrowRight
          size={18}
          className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
        />
      </motion.a>
    </div>
  );
});

CTASection.displayName = "CTASection";
