// src/components/ParallaxSection.jsx
"use client";
import React from "react";

export default function ParallaxSection({
  src = "/images/parallax.png",
  height = "70vh",
}) {
  return (
    <section
      className="relative overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url('${src}')`, height }}
    >
      <div className="absolute inset-0 bg-[var(--color-primary)]/50 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl font-bold text-[var(--color-primary)] mb-4">
          Er du i tvivl om, hvilke pakker der passer til dig?
        </h2>
        <p className="text-xl text-[var(--color-foreground)] mb-6">
          Kontakt os, og vi hjælper dig med at vælge den perfekte løsning.
        </p>
        <a href="#contact" className="btn-primary">
          Kontakt os
        </a>
      </div>
    </section>
  );
}
