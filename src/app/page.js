// src/app/page.js
"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Hero from "@/components/Hero";
import TeamSection from "@/components/TeamSection";

export default function HomePage() {
  return (
    <main>
      <AnimatedSection
        id="hero"
        from="bottom"
        className="relative h-[80vh] flex items-center justify-center gradient-bg"
      >
        <Hero />
      </AnimatedSection>

      <AnimatedSection id="cases" from="left" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            Vores Cases
          </h2>
          {/* Her kan du loope dine to case-cards */}
        </div>
      </AnimatedSection>

      <TeamSection />

      <AnimatedSection
        id="contact"
        from="bottom"
        className="py-20 bg-gray-900 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Kontakt os</h2>
          {/* Kontaktformular eller CTA-knap */}
        </div>
      </AnimatedSection>
    </main>
  );
}
