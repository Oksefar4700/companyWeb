"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, X, Sparkles } from "lucide-react";

export default function FloatingBookingButton({ onOpenBooking }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);
  const [currentBubble, setCurrentBubble] = useState(0);

  const bubbleTimerRef = useRef(null);
  const nextBubbleTimerRef = useRef(null);

  // 🎯 ELEGANT beskeder der matcher dit brand
  const bubbleMessages = [
    "✨ Få en gratis konsultation",
    "🚀 Lad os skabe din digitale løsning",
    "💼 Book et uforpligtende møde",
  ];

  useEffect(() => {
    // 1) Vis knappen efter 3 sekunder
    const showTimer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
        // Start bobler med det samme (efter 1 sek)
        setTimeout(() => {
          if (!isDismissed) {
            setShowBubbles(true);
            startBubbleCycle();
          }
        }, 1000);
      }
    }, 3000);

    // 2) Scroll-logik
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 100 && isVisible) {
        setIsVisible(false);
      } else if (scrollY > 100 && !isDismissed) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(showTimer);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      if (nextBubbleTimerRef.current) clearTimeout(nextBubbleTimerRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDismissed, isVisible]);

  const startBubbleCycle = () => {
    // 🎯 CLEAR alle eksisterende timers først
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    if (nextBubbleTimerRef.current) clearTimeout(nextBubbleTimerRef.current);

    // 🎯 SIKR at der kun er én boble ad gangen
    setShowBubbles(false);

    // Kort delay for at sikre cleanup, så vis boble
    setTimeout(() => {
      if (!isDismissed && isVisible) {
        setShowBubbles(true);

        // 🎯 FORBEDRET: Vis boble i 7 sekunder
        bubbleTimerRef.current = setTimeout(() => {
          setShowBubbles(false);

          // 🎯 LÆNGERE PAUSE mellem bobler for at undgå overlap
          nextBubbleTimerRef.current = setTimeout(() => {
            if (!isDismissed && isVisible) {
              setCurrentBubble((prev) => (prev + 1) % bubbleMessages.length);
              startBubbleCycle(); // Rekursivt kald
            }
          }, 12000); // 12 sekunder pause mellem bobler
        }, 7000); // 7 sekunder visning
      }
    }, 100); // 100ms cleanup delay
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    setShowBubbles(false);
    // Clear alle timers
    [bubbleTimerRef, nextBubbleTimerRef].forEach((timer) => {
      if (timer.current) clearTimeout(timer.current);
    });
  };

  const handleBookingClick = () => {
    if (typeof onOpenBooking === "function") {
      onOpenBooking();
    }
    setShowBubbles(false);
  };

  const handleCloseBubble = (e) => {
    e.stopPropagation();
    setShowBubbles(false);
  };

  if (isDismissed || !isVisible) return null;

  // 🎯 KUN IKON-TILSTAND med FIXED LAYOUT FIX
  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        pointerEvents: "auto",
        maxWidth: "300px", // Forhindrer overflow
        width: "auto",
      }}
    >
      {/* 🎯 ELEGANT CHAT BOBLE - matchende dit tema */}
      {showBubbles && (
        <div
          className="absolute bottom-20 right-0 animate-in slide-in-from-bottom-2 duration-500"
          style={{
            position: "absolute",
            bottom: "5rem",
            right: "0",
            maxWidth: "300px",
            width: "max-content",
          }}
        >
          <div className="relative bg-white/95 backdrop-blur-xl border border-white/20 text-gray-800 px-6 py-4 rounded-2xl rounded-br-sm shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 bg-[var(--color-brand-blue)] rounded-full mt-2 animate-pulse"></div>
              <span className="text-sm font-medium leading-relaxed text-gray-700">
                {bubbleMessages[currentBubble]}
              </span>
            </div>

            {/* Elegant chat tail */}
            <div className="absolute -bottom-2 right-5 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white/95"></div>

            {/* 🎯 ELEGANT Close button - matching dit tema */}
            <button
              onClick={handleCloseBubble}
              className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full p-2 transition-all duration-200 shadow-md hover:shadow-lg border border-white/50"
              aria-label="Luk besked"
              style={{ position: "absolute", top: "-0.5rem", right: "-0.5rem" }}
            >
              <X size={12} />
            </button>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)]/5 to-transparent rounded-2xl pointer-events-none"></div>
          </div>
        </div>
      )}

      {/* LAYOUT-SIKKER FLOATING ICON BUTTON */}
      <div
        className="relative group"
        style={{
          position: "relative",
          width: "4rem",
          height: "4rem",
        }}
      >
        {/* 🎯 ELEGANT Dismiss button - matching dit tema */}
        <button
          onClick={handleDismiss}
          className="absolute bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full p-2 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border border-white/50"
          aria-label="Luk booking-knap"
          style={{
            position: "absolute",
            top: "-0.75rem",
            right: "-0.75rem",
            zIndex: 20,
          }}
        >
          <X size={12} />
        </button>

        <button
          onClick={handleBookingClick}
          aria-label="Åbn booking"
          className="w-16 h-16 bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl relative overflow-hidden group border-2 border-white/20"
          style={{
            position: "relative",
            zIndex: 10,
            width: "4rem",
            height: "4rem",
          }}
        >
          {/* Elegant pulse animation */}
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30"></div>

          {/* Subtle inner glow */}
          <div className="absolute inset-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>

          <Calendar className="h-8 w-8 relative z-10 drop-shadow-sm" />
        </button>
      </div>
    </div>
  );
}
