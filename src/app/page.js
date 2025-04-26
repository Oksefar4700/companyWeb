/* src/app/page.js */
"use client";
import React, { useState } from "react";
import PackageCard from "../components/PackageCard";
import PackageModal from "../components/PackageModal";
import AboutSection from "../components/AboutSection";
import { packages } from "../data/packages";

export default function HomePage() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = (slug) => {
    const pkg = packages.find((p) => p.slug === slug);
    setSelected(pkg);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <main>
      <section id="packages" className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">Vælg din pakke</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} onClick={openModal} />
          ))}
        </div>
        <PackageModal pkg={selected} isOpen={open} onClose={closeModal} />
      </section>
      <AboutSection />
    </main>
  );
}
