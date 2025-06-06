// src/components/ui/FloatingBookingButton.jsx
"use client";

import { useState, useEffect } from "react";
import { Calendar, X, Clock } from "lucide-react";

export default function FloatingBookingButton({ onBooking }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Vis knappen efter 10 sekunder (når bruger har læst lidt)
    const showTimer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 10000);

    // Skjul knappen hvis brugeren scroller til hero området (top 100px)
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
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDismissed, isVisible]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleBookingClick = () => {
    onBooking?.();
    // Scroll til hero efter klik (hvor BookingModal er)
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div
      className={`
      fixed bottom-6 right-6 z-[9998]
      transform transition-all duration-500 ease-out
      ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-4 opacity-0 scale-95"
      }
    `}
    >
      {/* Main floating button */}
      <div
        className={`
        relative group transition-all duration-300 ease-out
        ${isHovered ? "scale-105" : "scale-100"}
      `}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Button container */}
        <div className="relative bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] rounded-2xl shadow-2xl overflow-hidden">
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Luk booking knap"
          >
            <X size={16} />
          </button>

          {/* Main button */}
          <button
            onClick={handleBookingClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center gap-3 px-6 py-4 text-white hover:bg-white/10 transition-all duration-200 group"
          >
            {/* Icon with animation */}
            <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-200">
              <Calendar className="h-5 w-5 text-white" />
            </div>

            {/* Text content */}
            <div className="text-left">
              <div
                className="font-semibold text-white text-sm"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Book gratis møde
              </div>
              <div className="text-white/80 text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                15 min konsultation
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>

          {/* Subtle pulse animation */}
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 rounded-2xl animate-pulse bg-white/5" />
          </div>
        </div>

        {/* Tooltip på hover */}
        <div
          className={`
          absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg
          whitespace-nowrap pointer-events-none transition-all duration-200
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
        `}
        >
          Klik for at booke et møde
          <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </div>
    </div>
  );
}
