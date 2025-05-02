// src/app/page.js
"use client";

import Hero from "../components/Hero";
import Packages from "../components/Packages";
import CasesList from "../components/CasesList";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import ContactForm from "../components/ContactForm";
import ParallaxSection from "../components/ParallaxSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Packages />
      <CasesList />
      <ParallaxSection src="/images/parallax.png" height="70vh" />

      <section id="about">
        <AboutSection />
      </section>
      <section id="team">
        <TeamSection />
      </section>
      <section
        id="contact"
        className="bg-[var(--color-secondary)] text-[var(--color-foreground)] py-20 text-center"
      >
        <ContactForm />
      </section>
    </main>
  );
}
