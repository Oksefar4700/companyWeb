// src/components/Hero.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Typewriter from "typewriter-effect";

const galleryImages = [
  "/images/image.png",
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-play slides every 5s
  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % galleryImages.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  // Manual nav
  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, []);
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % galleryImages.length);
  }, []);

  return (
    <section
      id="hero"
      className="
        relative w-full
        h-[calc(100vh-var(--header-height))]
        overflow-hidden
      "
    >
      {/* Slides as full-section background with fade */}
      <AnimatePresence>
        {galleryImages.map((src, idx) =>
          idx === current ? (
            <motion.img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          ) : null
        )}
      </AnimatePresence>

      {/* Gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70" />

      {/* Content container */}
      <div
        className="
          relative z-10 px-6 text-center max-w-3xl mx-auto
          flex flex-col justify-center items-center
          h-full
        "
      >
        {/* Animated heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-semibold text-white drop-shadow-lg font-heading">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString("Få din drømme-hjemmeside").start();
              }}
              options={{ cursor: "" }}
            />
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-white mb-8 drop-shadow"
        >
          Skræddersyede løsninger – fra portfolio til komplekse webshops.
        </motion.p>

        {/* Call-to-action buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/booking"
            className="btn-primary group inline-flex items-center"
          >
            Book et gratis møde
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link
            href="#cases"
            className="btn-secondary group inline-flex items-center"
          >
            Se vores cases
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {galleryImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`
              w-3 h-3 rounded-full transition
              ${
                idx === current
                  ? "bg-[var(--color-primary)]"
                  : "bg-white/50 hover:bg-white"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}
