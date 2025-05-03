// src/app/page.js
"use client";

import Hero from "../components/Hero";
import Packages from "../components/Packages";
import CasesList from "../components/CasesList";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import ParallaxSection from "../components/ParallaxSection";
import ContactSection from "../components/ContactSection";

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

      <ContactSection />
    </main>
  );
}
