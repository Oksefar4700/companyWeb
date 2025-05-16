// src/app/page.js - Send handleBooking til Hero
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
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleOrder = (pkg) => {
    setSelectedBooking(null);
    setSelectedPkg(pkg);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = (bookingData) => {
    console.log("handleBooking called with data:", bookingData);
    setSelectedPkg(null);
    setSelectedBooking(bookingData);

    // Scroll til kontakt-sektionen
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
      {/* Send handleBooking til Hero */}
      <Hero onBooking={handleBooking} />

      <WhyChooseUsSection />
      <CompareWithWordPress />
      <Packages onOrder={handleOrder} />
      <ParallaxSection src="/images/contact/contactImage.png" />
      <CasesList />
      <AboutSection />
      <TeamSection />
      <ChatWidget />

      <ContactSection
        selectedPkg={selectedPkg}
        selectedBooking={selectedBooking}
        onClear={handleClear}
      />
    </main>
  );
}
