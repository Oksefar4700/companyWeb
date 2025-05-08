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

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % galleryImages.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const prevSlide = useCallback(
    () => setCurrent((p) => (p === 0 ? galleryImages.length - 1 : p - 1)),
    []
  );
  const nextSlide = useCallback(
    () => setCurrent((p) => (p + 1) % galleryImages.length),
    []
  );

  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100vh-var(--header-height))] overflow-hidden"
    >
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
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-foreground)]/70 via-transparent to-[var(--color-foreground)]/70" />
      <div className="relative z-10 px-6 text-center max-w-3xl mx-auto flex flex-col justify-center items-center h-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-semibold text-[var(--color-background)] drop-shadow-lg font-heading">
            <Typewriter
              onInit={(tw) => tw.typeString("Få din drømme-hjemmeside").start()}
              options={{ cursor: "" }}
            />
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-[var(--color-background)] mb-8 drop-shadow"
        >
          Skræddersyede løsninger – fra portfolio til komplekse webshops.
        </motion.p>
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
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[var(--color-foreground)]/50 text-[var(--color-background)] p-2 rounded-full hover:bg-[var(--color-foreground)]/70 transition"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[var(--color-foreground)]/50 text-[var(--color-background)] p-2 rounded-full hover:bg-[var(--color-foreground)]/70 transition"
      >
        ›
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {galleryImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current
                ? "bg-[var(--color-primary)]"
                : "bg-[var(--color-background)]/50 hover:bg-[var(--color-background)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
