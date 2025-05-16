// src/components/Hero.jsx med korrekt video baggrund
"use client";

import { motion } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import Typewriter from "typewriter-effect";
import { ChevronRight } from "lucide-react";

// Tilføj onBooking som prop her
export default function Hero({ onBooking }) {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
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
        bg-animated-gradient
      "
    >
      {/* Video-baggrund (erstatter Lottie-animation) */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/why_us_demo1.mp4" type="video/mp4" />
          {/* Fallback tekst hvis video ikke kan afspilles */}
          Din browser understøtter ikke HTML5 video.
        </video>
      </div>

      {/* Mørkere overlay */}
      <div className="absolute inset-0 bg-[var(--color-background)]/70 pointer-events-none" />

      {/* Tekst & knapper */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={textVariants}
          className="
            text-4xl sm:text-5xl md:text-6xl
            font-bold
            !text-[var(--color-primary-darkest)]
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]
            font-heading
            mb-4 lg:mb-6
          "
        >
          <Typewriter
            options={{
              strings: [
                "Få din drømme-hjemmeside",
                "Skab digital succes med os",
                "Moderne webdesign løsninger",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
              pauseFor: 5000,
              cursor: "_",
            }}
          />
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="
            max-w-xl
            mb-8
            text-lg sm:text-xl
            !text-[var(--color-primary-darkest)]
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]
          "
        >
          Skræddersyede webløsninger – fra iøjnefaldende portfolioer til
          avancerede webshops og bookingsystemer.
        </motion.p>

        <motion.div
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          {/* Send onBooking prop videre til BookingModal her */}
          <BookingModal onBooking={onBooking} />

          <a
            href="#cases"
            className="
              inline-flex items-center justify-center
              px-8 py-3 text-lg font-semibold
              rounded-lg border-2 border-[var(--color-brand-blue)]
              text-[var(--color-primary)]
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
