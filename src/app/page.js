"use client";

import Hero from "../components/Hero";
import Packages from "../components/Packages";
import CasesList from "../components/CasesList";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import ContactForm from "../components/ContactForm";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section id="hero" className="pt-[var(--header-height)]">
        <Hero />
      </section>

      {/* PAKKER / LØSNINGER */}
      <Packages />

      {/* CASES / PORTFOLIO */}
      <CasesList />

      {/* OM OS + TEAM */}
      <section id="about" className="bg-gray-100 text-gray-900 py-20">
        <div className="container mx-auto px-6 space-y-12">
          <AboutSection />
          <TeamSection />
        </div>
      </section>

      {/* KONTAKT */}
      <section
        id="contact"
        className="bg-gray-900 text-white py-20 text-center"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Kontakt os</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
