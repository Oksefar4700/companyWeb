"use client";

import React from "react";
import Link from "next/link";

const galleryImages = [
  "/images/slide1.png",
  "/images/slide2.png",
  "/images/slide3.png",
  "/images/slide4.png",
];

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Baggrundsvideo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Semitransparent overlay, så teksten altid er læselig */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Tekst og knapper */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Få din drømme-hjemmeside
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow">
          Skræddersyede løsninger – fra portfolio til komplekse webshops.
        </p>
        <div className="space-x-4">
          <Link
            href="/booking"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition shadow"
          >
            Book et gratis møde
          </Link>
          <Link
            href="/portfolio"
            className="inline-block border border-blue-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-blue-600 transition shadow"
          >
            Se vores cases
          </Link>
        </div>
      </div>

      {/* Galleri */}
      <div className="relative z-10 mt-12 w-full overflow-x-auto py-4">
        <div className="flex space-x-4 px-6">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 h-40 relative rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={src}
                alt={`Galleri ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
