// src/app/page.js - MED SEPARATE BOOKING MODALS
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
import FloatingBookingButton from "@/components/ui/FloatingBookingButton";
import BookingModal from "@/components/BookingModal"; // 🎯 SEPARAT MODAL TIL FLOATING BUTTON
import CompleteDigitalSolution from "@/components/CompleteDigitalSolution";

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // 🎯 FLOATING MODAL STATE (separat fra Hero's modal)
  const [isFloatingModalOpen, setIsFloatingModalOpen] = useState(false);

  const handleOrder = (pkg) => {
    setSelectedBooking(null);
    setSelectedPkg(pkg);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // 🎯 KORREKT: Denne funktion bruges af BEGGE BookingModals
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

  // 🎯 FLOATING BUTTON: Åbn modal hvor brugeren er (IKKE scroll til hero)
  const handleFloatingBooking = () => {
    setIsFloatingModalOpen(true);
  };

  // 🎯 FLOATING MODAL: Luk modal
  const handleCloseFloatingModal = () => {
    setIsFloatingModalOpen(false);
  };

  // 🎯 FLOATING MODAL: Håndter booking success
  const handleFloatingBookingComplete = (bookingWithId) => {
    setIsFloatingModalOpen(false); // Luk floating modal
    handleBooking(bookingWithId); // Samme flow som Hero's modal
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        {/* Hero med sin egen BookingModal */}
        <Hero onBooking={handleBooking} />
        <CompleteDigitalSolution />
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

      {/* 🎯 FLOATING BOOKING BUTTON med smart chat-bobler */}
      <FloatingBookingButton onOpenBooking={handleFloatingBooking} />

      {/* 🎯 SEPARAT BOOKING MODAL til FloatingBookingButton - UDEN trigger knap */}
      <BookingModal
        open={isFloatingModalOpen}
        onOpenChange={setIsFloatingModalOpen}
        onBooking={handleFloatingBookingComplete}
        showTrigger={false}
      />
    </QueryClientProvider>
  );
}
