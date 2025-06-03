"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import FancyButton from "../FancyButton";

// VideoSection Component - Team introduction video
export const VideoSection = forwardRef(({ videoInView }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="max-w-4xl mx-auto mb-24 relative"
      initial={{ opacity: 0, y: 40 }}
      animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="text-center mb-8">
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]"
          initial={{ opacity: 0, y: 20 }}
          animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Mød teamet bag løsningerne
        </motion.h3>
        <motion.p
          className="text-lg text-[var(--color-foreground)]/80 max-w-2xl mx-auto font-[var(--font-body)]"
          initial={{ opacity: 0, y: 20 }}
          animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Hør fra vores grundlæggere om hvad der driver os, og hvorfor vi er
          passionerede omkring at skabe exceptionelle digitale oplevelser.
        </motion.p>
      </div>

      <motion.div
        className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-primary)]/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          videoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <video
          className="w-full h-full object-cover"
          poster="/images/video/why-us-poster.jpg"
          controls
          preload="metadata"
          style={{
            transform: "translate3d(0,0,0)",
            willChange: "opacity",
          }}
        >
          <source src="/videos/why_us_demo.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/videos/captions/why-us-demo-da.vtt"
            srcLang="da"
            label="Dansk"
            default
          />
          Din browser understøtter ikke HTML5 video.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        <motion.div
          className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={videoInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          2:15
        </motion.div>

        <div className="absolute inset-0 rounded-2xl ring-1 ring-[var(--color-brand-blue)]/20 pointer-events-none" />
      </motion.div>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-sm text-[var(--color-foreground)]/60 font-[var(--font-body)]">
          💡 Et personligt indblik i vores tilgang til webudvikling og
          kundeservice
        </p>
      </motion.div>
    </motion.div>
  );
});

VideoSection.displayName = "VideoSection";

// CTASection Component - opdateret til at bruge FancyButton
export const CTASection = forwardRef(({ ctaInView }, ref) => {
  return (
    <div ref={ref} className="mt-20 text-center relative">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Overskrift */}
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]"
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Klar til at komme i gang?
        </motion.h3>

        {/* Beskrivelse */}
        <motion.p
          className="text-lg text-[var(--color-foreground)]/80 mb-8 font-[var(--font-body)]"
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Lad os tage en snak om hvordan vi kan hjælpe din virksomhed med den
          perfekte digitale løsning.
        </motion.p>

        {/* CTA Knap */}
        <FancyButton href="#contact">
          Kontakt os i dag
          <ArrowRight size={20} className="ml-2" />
        </FancyButton>
      </motion.div>

      {/* Subtil baggrunds-dekoration */}
      <div className="absolute -inset-8 bg-gradient-to-r from-[var(--color-brand-blue)]/5 via-[var(--color-brand-blue)]/10 to-[var(--color-brand-blue)]/5 rounded-3xl -z-10 opacity-50" />
    </div>
  );
});

CTASection.displayName = "CTASection";
