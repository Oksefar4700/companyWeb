// src/components/whyChooeseUsSection/WhyChooseUsSection.jsx - POLERET UI
"use client";

import { useRef, useEffect, useState, forwardRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// Importér data fra datafilen
import { stats, accordionItems } from "@/data/whyChooseUsData";

// Import optimerede sub-komponenter
import StatsSection from "./StatsSection";
import FeatureBlock from "./FeatureBlock";
import { VideoSection, CTASection } from "./AnimatedComponents";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 POLERET BackgroundElements - mindre distraherende
const BackgroundElements = forwardRef(function BackgroundElements(
  { sectionInView },
  ref
) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* 🔥 SUBTIL COMPUTER ILLUSTRATION - lavere opacity */}
      <motion.div
        className="absolute right-0 bottom-0 w-full h-full flex justify-end items-end"
        initial={{ opacity: 0, x: 50 }}
        animate={
          sectionInView ? { opacity: 0.08, x: 0 } : { opacity: 0, x: 50 }
        }
        transition={{ duration: 1.5, ease: SMOOTH_EASE }}
        style={{
          transform: "translate3d(0,0,0)",
          willChange: "transform, opacity",
        }}
      >
        <div className="relative w-[800px] h-[800px] transform translate-x-[20%] translate-y-[20%]">
          <Image
            src="/images/compare/computer.png"
            alt=""
            width={800}
            height={800}
            className="object-contain"
            loading="lazy"
            style={{
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </motion.div>

      {/* 🔥 ELEGANT GRADIENT CIRCLES - færre og mindre aggressive */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-brand-blue)]/6 blur-3xl"
        style={{
          opacity: sectionInView ? 1 : 0,
          transition: "opacity 2s ease-out",
          transform: "translate3d(0,0,0)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[var(--color-primary)]/4 blur-3xl"
        style={{
          opacity: sectionInView ? 1 : 0,
          transition: "opacity 2s ease-out 0.5s",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* 🔥 SUBTILE TEXTURE - mindre synlige prikker */}
      <div
        className="absolute inset-0"
        style={{
          opacity: sectionInView ? 0.05 : 0,
          transition: "opacity 1.5s ease-out 1s",
          backgroundImage:
            "radial-gradient(var(--color-brand-blue) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "translate3d(0,0,0)",
        }}
      />
    </div>
  );
});

// 🔥 POLERET HeaderSection - bedre typografi og spacing
const HeaderSection = forwardRef(function HeaderSection({ headerInView }, ref) {
  return (
    <motion.div
      ref={ref}
      className="text-center mb-20"
      initial={{ opacity: 0, y: -15 }}
      animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
      transition={{ duration: 0.8, ease: SMOOTH_EASE }}
      style={{ willChange: "transform, opacity" }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4 text-[var(--color-foreground)]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8, delay: 0.2, ease: SMOOTH_EASE }}
      >
        Hvorfor vælge os
      </motion.h2>

      <motion.div
        className="w-20 h-1 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-6"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          headerInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.8, delay: 0.4, ease: SMOOTH_EASE }}
        style={{
          transformOrigin: "center",
          transform: "translate3d(0,0,0)",
        }}
      />

      <motion.p
        className="text-lg max-w-2xl mx-auto text-[var(--color-foreground)]/75 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, delay: 0.6, ease: SMOOTH_EASE }}
        style={{ willChange: "transform, opacity" }}
      >
        Hos os handler det ikke bare om at lave hjemmesider. Det handler om at
        skabe digitale løsninger, der gør en forskel.
      </motion.p>
    </motion.div>
  );
});

// 🔥 HOVEDKOMPONENT - POLERET DESIGN
export default function WhyChooseUsSection() {
  // 🔥 REFS FOR HVER SEKTION
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  // 🔥 OPTIMERET useInView
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.7 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const videoInView = useInView(videoRef, { once: true, amount: 0.4 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.8 });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <section className="relative bg-[var(--color-secondary-light)] py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="why-us"
      ref={sectionRef}
      className="relative scroll-mt-[var(--header-height)] bg-[var(--color-secondary-light)] py-20 lg:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: SMOOTH_EASE }}
      style={{
        transform: "translate3d(0,0,0)",
        willChange: "opacity",
        contain: "layout style paint",
      }}
    >
      {/* 🔥 POLERET BACKGROUND */}
      <BackgroundElements ref={backgroundRef} sectionInView={sectionInView} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* 🔥 POLERET HEADER */}
        <HeaderSection ref={headerRef} headerInView={headerInView} />

        {/* 🔥 POLERET STATISTIK */}
        <StatsSection ref={statsRef} stats={stats} statsInView={statsInView} />

        {/* 🔥 POLERET VIDEO SEKTION */}
        <VideoSection ref={videoRef} videoInView={videoInView} />

        {/* 🔥 POLERET FEATURE BLOCKS - bedre spacing */}
        <div ref={featuresRef} className="max-w-5xl mx-auto space-y-16">
          {accordionItems.map((item, index) => (
            <FeatureBlock
              key={item.key}
              feature={item}
              featureInView={featuresInView}
              featureType={item.key}
              index={index}
            />
          ))}
        </div>

        {/* 🔥 POLERET CTA */}
        <CTASection ref={ctaRef} ctaInView={ctaInView} />
      </div>
    </motion.section>
  );
}
