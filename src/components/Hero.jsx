// src/components/Hero.jsx
"use client";

import { motion } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function Hero({ onBooking }) {
  const [showParticles, setShowParticles] = useState(false); // Default: ingen partikler
  const videoRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Dramatisk logo animation
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.17, 0.67, 0.83, 0.97],
      },
    },
  };

  // Text animation med staggered bogstaver
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateY: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="hero"
      className="
        relative
        w-full
        h-[calc(100vh-var(--header-height))]
        overflow-hidden
        bg-[var(--color-primary-darkest)]
      "
    >
      {/* Video baggrund - med eksplicit z-index */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src="/videos/teamProgrammingVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Elegant sort gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Hovedindhold */}
      <motion.div
        className="relative flex flex-col items-center justify-center h-full px-6"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo med wow-effect */}
        <motion.div className="mb-8" variants={logoVariants}>
          <svg
            width="180"
            height="180"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_30px_rgba(126,174,219,0.6)]"
          >
            <motion.path
              d="M500 200C331.8 200 200 331.8 200 500C200 668.2 331.8 800 500 800"
              stroke="#7eaedb"
              strokeWidth="100"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d="M480 330L600 740L700 450L800 740L910 330"
              stroke="#7eaedb"
              strokeWidth="100"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </motion.div>

        {/* VI ER tekst - bogstav for bogstav animation */}
        <motion.div className="mb-2" variants={textVariants}>
          <div className="flex justify-center">
            {["V", "I", " ", "E", "R"].map((letter, i) => (
              <motion.span
                key={`vi-er-${i}`}
                className="text-3xl md:text-4xl font-bold text-white inline-block mx-[2px]"
                variants={letterVariants}
              >
                {letter === " " ? (
                  <span className="w-2 inline-block">&nbsp;</span>
                ) : (
                  letter
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CompanyWeb tekst - bogstav for bogstav med glow */}
        <motion.div className="mb-10" variants={textVariants}>
          <div className="flex justify-center flex-wrap">
            {["C", "o", "m", "p", "a", "n", "y", "W", "e", "b"].map(
              (letter, i) => (
                <motion.span
                  key={`company-${i}`}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-brand-blue)] inline-block mx-[1px] drop-shadow-[0_0_15px_rgba(126,174,219,0.6)]"
                  variants={letterVariants}
                  whileHover={{
                    scale: 1.1,
                    color: "#ffffff",
                    textShadow: "0 0 20px rgba(126,174,219,0.8)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter}
                </motion.span>
              )
            )}
          </div>
        </motion.div>

        {/* Beskrivelse med dynamisk glow */}
        <motion.p
          variants={itemVariants}
          className="
            max-w-xl
            mb-10 md:mb-12
            text-lg sm:text-xl
            text-white/90
            text-center
            drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]
            font-medium
          "
        >
          Skræddersyede webløsninger – fra iøjnefaldende portfolioer til
          avancerede webshops og bookingsystemer.
        </motion.p>

        {/* CTA knapper - KORREKT IMPLEMENTERING */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          {/* ORIGINAL BookingModal komponent - ikke ændret */}
          <BookingModal onBooking={onBooking} />

          {/* Cases knap med hover effekt */}
          <a
            href="#cases"
            className="
              inline-flex items-center justify-center
              px-8 py-3 text-lg font-semibold
              rounded-lg border-2 border-[var(--color-brand-blue)]
              text-white
              hover:bg-[var(--color-brand-blue)]
              hover:text-[var(--color-background)]
              transition transform hover:scale-105 shadow-md
            "
          >
            Se vores cases
            <ChevronRight
              size={20}
              className="ml-2 transition-transform hover:translate-x-1"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
