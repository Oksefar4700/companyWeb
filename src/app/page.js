// src/app/page.js
"use client";

import { useState } from "react";
import Hero from "../components/Hero";
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

      <Packages onOrder={handleOrder} />

      <ParallaxSection src="/images/contact/contactImage.png" />
      <CasesList />
      <AboutSection />
      <TeamSection />
      <ChatWidget />

      {/* ContactSection står selv for id="contact", padding og baggrund */}
      <ContactSection selectedPkg={selectedPkg} onClear={handleClear} />
    </main>
  );
}
