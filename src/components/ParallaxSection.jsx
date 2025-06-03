// src/components/ParallaxSection.jsx
"use client";

import React, { useRef, useEffect, useState, forwardRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 MODULÆR KOMPONENT: OptimizedParallaxBackground med forwardRef
const OptimizedParallaxBackground = forwardRef(
  function OptimizedParallaxBackground({ src, scrollYProgress }, ref) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // 🔥 ACCESSIBILITY: Respect prefers-reduced-motion
    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // 🔥 OPTIMERET PARALLAX TRANSFORM - kun hvis motion er tilladt
    const imageY = useTransform(
      scrollYProgress,
      [0, 1],
      prefersReducedMotion ? [0, 0] : [-50, 50] // 🔥 REDUCE MOTION SUPPORT
    );

    // 🔥 PRELOAD BILLEDE FOR SMOOTH EXPERIENCE
    useEffect(() => {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = src;
    }, [src]);

    return (
      <motion.div
        ref={ref}
        className="absolute inset-0"
        style={{
          y: imageY,
          scale: prefersReducedMotion ? 1 : 1.1, // 🔥 UNDGÅ KANTER VED PARALLAX
          willChange: prefersReducedMotion ? "auto" : "transform", // 🔥 CONDITIONAL GPU HINT
          transform: "translate3d(0,0,0)", // 🔥 FORCE GPU LAYER
          backfaceVisibility: "hidden", // 🔥 3D OPTIMIZATION
        }}
      >
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div
            className="absolute inset-0 bg-[var(--color-secondary-light)] animate-pulse"
            style={{ transform: "translate3d(0,0,0)" }}
          />
        )}

        {/* Optimeret baggrundsbillede */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${src}')`,
            transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
            willChange: prefersReducedMotion ? "auto" : "transform",
          }}
        />
      </motion.div>
    );
  }
);

// 🔥 MODULÆR KOMPONENT: ContentOverlay med forwardRef
const ContentOverlay = forwardRef(function ContentOverlay({}, ref) {
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
      style={{
        transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        willChange: "opacity",
      }}
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
        style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
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
        style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
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
          transition-all duration-200 ease-out shadow-xl 
          hover:shadow-2xl
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
          transition: { duration: 0.2, ease: SMOOTH_EASE },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
          transition:
            "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), background-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        Kontakt os
      </motion.a>
    </motion.div>
  );
});

// 🔥 HOVEDKOMPONENT
export default function ParallaxSection({
  src = "/images/contact/contactImage.png",
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

  // 🔥 THROTTLED SCROLL TRACKING FOR PERFORMANCE
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false, // 🔥 PERFORMANCE: Avoid layout thrashing
  });

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        height,
        willChange: "opacity", // 🔥 GPU HINT
        transform: "translate3d(0,0,0)", // 🔥 FORCE GPU LAYER
        contain: "layout style paint", // 🔥 CSS CONTAINMENT FOR PERFORMANCE
      }}
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
      }}
    >
      {/* 🔥 OPTIMERET PARALLAX BACKGROUND */}
      <OptimizedParallaxBackground
        ref={backgroundRef}
        src={src}
        scrollYProgress={scrollYProgress}
      />

      {/* 🔥 CONTENT OVERLAY */}
      <ContentOverlay ref={overlayRef} />

      {/* 🔥 PARALLAX CONTENT */}
      <ParallaxContent ref={contentRef} contentInView={contentInView} />
    </motion.section>
  );
}
