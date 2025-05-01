"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const galleryImages = [
  "/images/image.png",
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-var(--header-height))] w-full overflow-hidden">
      {/* Baggrundsvideo */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Tekst med fly-in */}
      <div className="relative z-10 px-6 text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
        >
          Få din drømme-hjemmeside
        </motion.h1>
        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white mb-8 drop-shadow"
        >
          Skræddersyede løsninger – fra portfolio til komplekse webshops.
        </motion.p>
        <div className="space-x-4">
          <Link href="/booking" className="btn-primary">
            Book et gratis møde
          </Link>
          <Link href="#cases" className="btn-secondary">
            Se vores cases
          </Link>
        </div>
      </div>

      {/* Stort slideshow */}
      <div className="relative z-10 mt-12 w-full h-80 md:h-96">
        <motion.img
          key={galleryImages[current]}
          src={galleryImages[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}
