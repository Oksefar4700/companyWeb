// src/app/page.js
"use client";

import React, { useState } from "react";
import Hero from "../components/Hero";
import WhyChooseUsSection1 from "../components/WhychooseUsSection1";
import SEOOverview from "../components/SEOOverview";
import LogoGallery from "../components/LogoGallery";
import CompareWithWordPress from "../components/CompareWithWordPress";
import Packages from "../components/Packages";
import ParallaxSection from "../components/ParallaxSection";
import CasesList from "../components/casesList/CasesList";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import AIIntegrationSection from "@/components/AIIntegrationSection";
import GDPRSection from "@/components/GDPRSection";
import ContactSection from "../components/contactForm/ContactSection";

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleOrder = (pkg) => {
    setSelectedBooking(null);
    setSelectedPkg(pkg);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = (bookingData) => {
    setSelectedPkg(null);
    setSelectedBooking(bookingData);
    setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleClear = () => {
    setSelectedPkg(null);
    setSelectedBooking(null);
  };

  return (
    <main>
      <Hero onBooking={handleBooking} />
      <WhyChooseUsSection1 />
      <SEOOverview />
      <LogoGallery />
      <CompareWithWordPress />
      <Packages onOrder={handleOrder} />
      <ParallaxSection src="/images/contact/contactImage.png" />
      <CasesList />
      <AboutSection />
      <TeamSection />
      <AIIntegrationSection />
      <GDPRSection />
      <ContactSection
        selectedPkg={selectedPkg}
        selectedBooking={selectedBooking}
        onClear={handleClear}
      />
    </main>
  );
}
