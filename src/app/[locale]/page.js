// src/app/[locale]/page.js - UDEN LanguageSwitcher
"use client";

import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";

import Hero from "../../components/Hero";
import SEOOverview from "../../components/SEOOverview";
import LogoGallery from "../../components/LogoGallery";
import CompareWithWordPress from "../../components/CompareWithWordPress";
import Packages from "../../components/Packages";
import ParallaxSection from "../../components/ParallaxSection";
import CasesList from "../../components/casesList/CasesList";
import AboutSection from "../../components/AboutSection";
import TeamSection from "../../components/TeamSection";
import AIIntegrationSection from "../../components/AIIntegrationSection";
import GDPRSection from "../../components/GDPRSection";
import ContactSection from "../../components/contactForm/ContactSection";
import FloatingBookingButton from "../../components/ui/FloatingBookingButton";
import BookingModal from "../../components/BookingModal";
import CompleteDigitalSolution from "../../components/CompleteDigitalSolution";

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isFloatingModalOpen, setIsFloatingModalOpen] = useState(false);

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

  const handleFloatingBooking = () => {
    setIsFloatingModalOpen(true);
  };

  const handleFloatingBookingComplete = (bookingWithId) => {
    setIsFloatingModalOpen(false);
    handleBooking(bookingWithId);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Hero onBooking={handleBooking} />
        <CompleteDigitalSolution />
        <SEOOverview />
        <LogoGallery />
        <CompareWithWordPress />
        <AIIntegrationSection />
        <Packages onOrder={handleOrder} />
        <ParallaxSection src="/images/contact/contactImage.png" />
        <CasesList />
        <AboutSection />
        <TeamSection />
        <GDPRSection />
        <ContactSection
          selectedPkg={selectedPkg}
          selectedBooking={selectedBooking}
          onClear={handleClear}
        />
      </main>

      <FloatingBookingButton onOpenBooking={handleFloatingBooking} />

      <BookingModal
        open={isFloatingModalOpen}
        onOpenChange={setIsFloatingModalOpen}
        onBooking={handleFloatingBookingComplete}
        showTrigger={false}
      />
    </QueryClientProvider>
  );
}
