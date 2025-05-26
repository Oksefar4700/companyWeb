// src/components/ParallaxSection.jsx
"use client";

import React, { useRef, forwardRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 MODULÆR KOMPONENT: ParallaxBackground med forwardRef
const ParallaxBackground = forwardRef(function ParallaxBackground(
  { src, scrollYProgress },
  ref
) {
  // 🔥 GPU-OPTIMERET PARALLAX TRANSFORM
  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0"
      style={{
        backgroundImage: `url('${src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // 🔥 CSS PARALLAX ACCELERATION
        scale: 1.2, // Undgå kanter ved parallax
        y: imageY,
        willChange: "transform", // 🔥 GPU HINT
        transform: "translate3d(0,0,0)", // 🔥 FORCE GPU LAYER
      }}
    />
  );
});

// 🔥 MODULÆR KOMPONENT: ContentOverlay med forwardRef
const ContentOverlay = forwardRef(function ContentOverlay(
  { contentInView },
  ref
) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 bg-[var(--color-background)]/80 pointer-events-none"
      style={{
        transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        willChange: "opacity",
      }}
    />
  );
});

// 🔥 MODULÄR KOMPONENT: ParallaxContent med forwardRef
const ParallaxContent = forwardRef(function ParallaxContent(
  { contentInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }}
      style={{ willChange: "opacity" }} // 🔥 GPU HINT
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-[var(--color-foreground)] drop-shadow-lg mb-4 font-[var(--font-heading)]"
        initial={{ opacity: 0, y: 20 }}
        animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          ease: SMOOTH_EASE,
          delay: 0.1,
        }}
      >
        Er du i tvivl om, hvilke pakker der passer til dig?
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-lg sm:text-xl text-[var(--color-foreground)] drop-shadow-md mb-6 max-w-xl font-[var(--font-body)]"
        initial={{ opacity: 0, y: 20 }}
        animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          ease: SMOOTH_EASE,
          delay: 0.2,
        }}
      >
        Kontakt os, og vi hjælper dig med at vælge den perfekte løsning.
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#contact"
        className="
          px-8 py-3 rounded-lg text-lg font-semibold
          bg-[var(--color-brand-blue)] text-white
          hover:bg-[var(--color-brand-blue-darker)]
          transition-colors duration-200 ease-out shadow-xl 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
          focus-visible:ring-offset-black/60 focus-visible:ring-[var(--color-brand-blue)]
          font-[var(--font-body)]
        "
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={
          contentInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 20, scale: 0.95 }
        }
        transition={{
          duration: 0.6,
          ease: SMOOTH_EASE,
          delay: 0.3,
        }}
        whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow:
            "0 20px 25px -5px rgba(126, 174, 219, 0.4), 0 10px 10px -5px rgba(126, 174, 219, 0.1)",
          transition: { duration: 0.2, ease: SMOOTH_EASE },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      >
        Kontakt os
      </motion.a>
    </motion.div>
  );
});

// 🔥 HOVEDKOMPONENT
export default function ParallaxSection({
  src = "/images/contact/contactImage.png", // 🎯 Bruger det rigtige billede
  height = "70vh",
}) {
  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const contentInView = useInView(sectionRef, { amount: 0.3 });

  // 🔥 OPTIMERET PARALLAX SCROLL TRACKING
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        height,
        willChange: "opacity", // 🔥 GPU HINT
        transform: "translate3d(0,0,0)", // 🔥 FORCE GPU LAYER
      }}
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
      }}
    >
      {/* 🔥 OPTIMERET PARALLAX BACKGROUND */}
      <ParallaxBackground
        ref={backgroundRef}
        src={src}
        scrollYProgress={scrollYProgress}
      />

      {/* 🔥 CONTENT OVERLAY */}
      <ContentOverlay ref={overlayRef} contentInView={contentInView} />

      {/* 🔥 PARALLAX CONTENT */}
      <ParallaxContent ref={contentRef} contentInView={contentInView} />
    </motion.section>
  );
}
