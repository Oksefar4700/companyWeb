// src/components/ParallaxSection.jsx
"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function ParallaxSection({
  src = "/images/parallax/image_5e1bb8.jpg",
  height = "70vh",
}) {
  const sectionRef = useRef(null); // Ref for useScroll (parallax baggrund) og useInView (indhold)

  // --- Indgangsanimation for selve SEKTIONENS RAMME (kun én gang) ---
  // Vi bruger en separat useInView for rammens éngangs-animation,
  // så den ikke forstyrrer indholdets gentagne animation.
  // Denne kunne også være på sectionRef, men for klarhedens skyld,
  // hvis man ville have forskellige triggers, kunne man adskille refs.
  // Her bruger vi samme ref (sectionRef) til begge useInView-hooks, men med forskellig 'once'
  const isSectionFrameInView = useInView(sectionRef, {
    amount: 0.1,
    once: true,
  });

  // --- Animation for INDHOLDET (tekst og knap - hver gang) ---
  const isContentInView = useInView(sectionRef, { amount: 0.3 }); // Uden 'once: true'

  // --- Parallax scroll effekt for BAGGRUNDSBILLEDET ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Forstærket effekt:
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["60%", "-60%"]);

  // Varianter for sektionens RAMME (kun éngangs fade/scale ind)
  const sectionFrameVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
    // Ingen staggerChildren her, da indholdet styres af sin egen isContentInView
  };

  // Varianter for INDHOLDET (h2, p, a) - animerer ind/ud
  const contentParentVariants = {
    hidden: { opacity: 0 }, // Simpel fade for containeren
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger børnene (h2, p, a)
        // Ingen delay her, da det styres af isContentInView
      },
    },
  };

  const contentChildVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  // Knappen kan genbruge contentChildVariants eller have sin egen, f.eks. slide fra siden
  const buttonSpecificVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.9 }, // Slide fra venstre
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={sectionRef} // Denne ref bruges af useScroll og begge useInView
      initial="hidden"
      animate={isSectionFrameInView ? "visible" : "hidden"} // Styrer kun rammens éngangs-animation
      variants={sectionFrameVariants}
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('${src}')`,
        height,
        backgroundPositionY: backgroundY,
        willChange: "opacity, transform, backgroundPositionY",
      }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />{" "}
      {/* Lidt mørkere overlay */}
      {/* Container for indholdet der animeres ind/ud HVER gang */}
      <motion.div
        className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center"
        initial="hidden"
        animate={isContentInView ? "visible" : "hidden"} // Styres af isContentInView (uden 'once: true')
        variants={contentParentVariants} // Container for stagger
      >
        <motion.h2
          variants={contentChildVariants}
          className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-4" // Stærkere skygge
        >
          Er du i tvivl om, hvilke pakker der passer til dig?
        </motion.h2>

        <motion.p
          variants={contentChildVariants}
          className="text-lg sm:text-xl text-white drop-shadow-md mb-6 max-w-xl" // Stærkere skygge
        >
          Kontakt os, og vi hjælper dig med at vælge den perfekte løsning.
        </motion.p>

        <motion.a
          href="#contact"
          variants={buttonSpecificVariants} // Knappen bruger sine egne varianter
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
