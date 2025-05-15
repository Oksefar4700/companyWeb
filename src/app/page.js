// src/app/page.js
"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import CompareWithWordPress from "../components/CompareWithWordPress";
import Packages from "../components/Packages";
import ParallaxSection from "../components/ParallaxSection";
import CasesList from "../components/CasesList";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import ChatWidget from "../components/ChatWidget";
import ContactSection from "../components/ContactSection";

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState(null);

  const handleOrder = (pkg) => {
    setSelectedPkg(pkg);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClear = () => {
    setSelectedPkg(null);
  };

  return (
    <main>
      <Hero />

      {/* Hvorfor vælge os - kort teaser med video og bullets */}
      <WhyChooseUsSection />

      {/* React vs. WordPress - non-teknisk sammenligning */}
      <CompareWithWordPress />

      {/* Pakke-oversigt */}
      <Packages onOrder={handleOrder} />

      {/* Parallax-banner */}
      <ParallaxSection src="/images/contact/contactImage.png" />

      {/* Cases */}
      <CasesList />

      {/* Om os */}
      <AboutSection />

      {/* Mød teamet */}
      <TeamSection />

      {/* Chat-widget */}
      <ChatWidget />

      {/* Kontaktformular */}
      <ContactSection selectedPkg={selectedPkg} onClear={handleClear} />
    </main>
  );
}
