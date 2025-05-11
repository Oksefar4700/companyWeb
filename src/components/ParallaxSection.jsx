// src/components/ParallaxSection.jsx
"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

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
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);

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
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('${src}')`,
        height,
        backgroundPositionY: backgroundY,
        willChange: "opacity, transform, backgroundPositionY",
      }}
    >
      {/* Overlay med samme filter som i ContactSection */}
      <div className="absolute inset-0 bg-[var(--color-background)]/80 pointer-events-none" />

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
