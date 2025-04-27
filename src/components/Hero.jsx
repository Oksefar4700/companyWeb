"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
      <Image
        src="/hero-bg.jpg" // Læg dit eget billede i public/hero-bg.jpg
        alt="Hero baggrund"
        fill
        className="object-cover opacity-70"
        priority
      />

      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Få din drømme-hjemmeside
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow">
          Skræddersyede løsninger – fra portfolio til komplekse webshops.
        </p>
        <Link
          href="/packages"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-4 rounded-lg transition"
        >
          Se pakker →
        </Link>
      </div>
    </section>
  );
}
