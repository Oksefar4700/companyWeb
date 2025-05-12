// src/components/ParallaxSection.jsx
"use client";
import React, { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionTemplate, // Tilføjet for at formatere transform-strengen
} from "framer-motion";

export default function ParallaxSection({
  src = "/images/parallax/image_5e1bb8.jpg",
  height = "70vh",
}) {
  const sectionRef = useRef(null);

  // --- Indgangsanimation for sektionens ramme ---
  const isSectionFrameInView = useInView(sectionRef, {
    amount: 0.1,
    once: true,
  });

  // --- Animation for indholdet hver gang ---
  const isContentInView = useInView(sectionRef, { amount: 0.3 });

  // --- Parallax scroll effekt ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transformerer scrollYProgress (0 til 1) til en Y-forskydning i procent
  // F.eks. fra -10% til 10% af elementets (skalerede) højde.
  // Du kan justere -8 og 8 for at ændre parallax-effektens "dybde".
  // Mindre tal = mindre bevægelse. Større tal = mere bevægelse.
  const imageYPercent = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Giver numeriske værdier
  const imageTranslateY = useMotionTemplate`${imageYPercent}%`; // Formaterer til "X%" streng

  // Varianter for sektionens ramme
  const sectionFrameVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  };

  // Varianter for indholdets container
  const contentParentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  // Varianter for indholdets børn
  const contentChildVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Varianter for knappen
  const buttonSpecificVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isSectionFrameInView ? "visible" : "hidden"}
      variants={sectionFrameVariants}
      className="relative overflow-hidden" // VIGTIGT: overflow-hidden her
      style={{
        height,
        // Fjern backgroundImage og backgroundPositionY fra selve sektionen
        willChange: "opacity, transform", // Kun for sektionens egen animation
      }}
    >
      {/* 1. Indre div for selve parallax-billedet */}
      <motion.div
        className="absolute inset-0" // Dækker hele sektionen
        style={{
          backgroundImage: `url('${src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale: 1.2, // Skaler billed-containeren op (f.eks. 120%) for at undgå kanter
          y: imageTranslateY, // Anvend den beregnede Y-forskydning her
          willChange: "transform", // Optimeringshint for transform-animation
        }}
      />

      {/* 2. Overlay ovenpå billedet, men under tekstindholdet */}
      <div className="absolute inset-0 bg-[var(--color-background)]/80 pointer-events-none" />

      {/* 3. Indhold (med højere z-index for at være øverst) */}
      <motion.div
        className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center"
        initial="hidden"
        animate={isContentInView ? "visible" : "hidden"}
        variants={contentParentVariants}
      >
        <motion.h2
          variants={contentChildVariants}
          className="text-4xl sm:text-5xl font-bold text-black drop-shadow-lg mb-4"
        >
          Er du i tvivl om, hvilke pakker der passer til dig?
        </motion.h2>

        <motion.p
          variants={contentChildVariants}
          className="text-lg sm:text-xl text-black drop-shadow-md mb-6 max-w-xl"
        >
          Kontakt os, og vi hjælper dig med at vælge den perfekte løsning.
        </motion.p>

        <motion.a
          href="#contact"
          variants={buttonSpecificVariants}
          className="
            px-8 py-3 rounded-lg text-lg font-semibold
            bg-[var(--color-brand-blue)] text-white
            hover:bg-[var(--color-brand-blue-darker)]
            transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl transform hover:scale-105
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 focus-visible:ring-[var(--color-brand-blue)]
          "
        >
          Kontakt os
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
