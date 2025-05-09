// src/components/Hero.jsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "/images/hero/image.png",
  "/images/hero/image1.png",
  "/images/hero/image2.png",
  "/images/hero/image3.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.2 },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100vh-var(--header-height))] overflow-hidden bg-slate-900"
    >
      <AnimatePresence initial={false} custom={current}>
        <motion.img
          key={current}
          src={galleryImages[current]}
          alt={`Hero billede ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.7, ease: "circIn" },
          }}
          transition={{ duration: 1.2, ease: "circOut" }}
        />
      </AnimatePresence>

      {/* Mørkt overlay for kontrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col justify-center items-center h-full">
        <motion.div
          variants={heroContentVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:max-w-3xl"
        >
          <motion.h1
            variants={textVariants}
            // Bruger Tailwind's !important for at sikre, at farven anvendes
            className="text-4xl sm:text-5xl md:text-6xl font-bold !text-[var(--color-background)] drop-shadow-2xl font-heading mb-4 lg:mb-6"
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
                cursor: "_",
              }}
            />
          </motion.h1>
          <motion.p
            variants={textVariants}
            // Bruger Tailwind's !important for at sikre, at farven anvendes
            className="text-base sm:text-lg md:text-xl !text-[var(--color-background)]/95 mb-8 lg:mb-10 drop-shadow-xl max-w-xl mx-auto"
          >
            Skræddersyede webløsninger – fra iøjnefaldende portfolioer til
            avancerede webshops og bookingsystemer.
          </motion.p>

          <motion.div
            variants={buttonContainerVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5"
          >
            <Link
              href="/booking"
              className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-lg text-base sm:text-lg font-semibold bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-darker)] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus-visible:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] focus-visible:ring-[var(--color-brand-blue)] w-full sm:w-auto group inline-flex items-center justify-center transform hover:scale-105"
            >
              Book et gratis møde{" "}
              <ChevronRight
                size={22}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="#cases"
              className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-lg text-base sm:text-lg font-semibold bg-transparent !text-[var(--color-background)] border-2 border-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)] hover:!text-white hover:border-[var(--color-brand-blue)] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus-visible:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] focus-visible:ring-[var(--color-brand-blue)] w-full sm:w-auto group inline-flex items-center justify-center transform hover:scale-105"
            >
              Se vores cases{" "}
              <ChevronRight
                size={22}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      {/* Navigation og prikker (uændret) */}
      <button
        onClick={prevSlide}
        aria-label="Forrige billede"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-[var(--color-background)]/30 text-[var(--color-primary)] p-2 sm:p-3 rounded-full hover:bg-[var(--color-background)]/50 transition-all duration-300 z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)]"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Næste billede"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-[var(--color-background)]/30 text-[var(--color-primary)] p-2 sm:p-3 rounded-full hover:bg-[var(--color-background)]/50 transition-all duration-300 z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)]"
      >
        <ChevronRight size={30} />
      </button>
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
        {galleryImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Gå til billede ${idx + 1}`}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-in-out outline-none ${
              idx === current
                ? "bg-[var(--color-brand-blue)] scale-125 ring-2 ring-offset-1 ring-offset-transparent ring-[var(--color-brand-blue)]/70"
                : "bg-[var(--color-background)]/40 hover:bg-[var(--color-background)]/70 focus-visible:bg-[var(--color-background)]/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
