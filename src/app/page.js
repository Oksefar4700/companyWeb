// src/app/page.js - TILFØJ floating button
"use client";

import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

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
import FloatingBookingButton from "@/components/ui/FloatingBookingButton"; // 🎯 NY IMPORT

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

  // 🎯 NY FUNKTION: Trigger booking modal fra floating button
  const handleFloatingBooking = () => {
    // Scroll til hero hvor BookingModal er
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });

    // Lille delay så scroll kan fuldføre før modal åbnes
    setTimeout(() => {
      // Trigger click på hero booking button
      const heroBookingButton = document.querySelector(".btn-primary");
      if (heroBookingButton) {
        heroBookingButton.click();
      }
    }, 500);
  };

  return (
    <QueryClientProvider client={queryClient}>
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

      {/* 🎯 FLOATING BOOKING BUTTON */}
      <FloatingBookingButton onBooking={handleFloatingBooking} />
    </QueryClientProvider>
  );
}
