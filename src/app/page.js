// src/app/page.js
"use client";

import Hero from "../components/Hero";
import Packages from "../components/Packages";
import CasesList from "../components/CasesList";
import ParallaxSection from "../components/ParallaxSection";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import ContactSection from "../components/ContactSection";
import ChatWidget from "../components/ChatWidget";

export default function HomePage() {
  return (
    <main>
      {/* Fuldskærms-hero */}
      <Hero />

      {/* Løsninger på lys baggrund */}
      <Packages />

      {/* Parallax på lys baggrund */}
      <ParallaxSection src="/images/parallax/parallax3.png" height="70vh" />

      {/* Cases på mørk baggrund */}
      <CasesList />

      {/* Om os på mørk baggrund */}
      <AboutSection id="about" />

      {/* Team på lys baggrund */}
      <TeamSection id="team" />

      {/* Flydende chat-widget */}
      <ChatWidget />

      {/* Kontakt på mørk baggrund */}
      <ContactSection />
    </main>
  );
}
