// src/app/page.js
"use client";

import Hero from "../components/Hero";
import Packages from "../components/Packages";
import ParallaxSection from "../components/ParallaxSection";
import CasesList from "../components/CasesList";
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
      <ParallaxSection src="/images/contact/contactImage.png" height="70vh" />

      {/* Cases på lys baggrund */}
      <CasesList />

      {/* Om os på lys baggrund */}
      <AboutSection />

      {/* Team på lys baggrund */}
      <TeamSection />

      {/* Flydende chat-widget */}
      <ChatWidget />

      {/* Kontakt på lys baggrund med baggrundsbillede */}
      <ContactSection />
    </main>
  );
}
