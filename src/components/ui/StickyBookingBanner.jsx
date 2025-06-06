// src/components/ui/StickyBookingBanner.jsx - ALTERNATIV (mere diskret)
"use client";

import { useState, useEffect } from "react";
import { Calendar, X, ArrowUp } from "lucide-react";

export default function StickyBookingBanner({ onBooking }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Vis banner når brugeren har scrollet mindst 70% af viewporten
      if (scrollY > windowHeight * 0.7 && !isDismissed) {
        setIsVisible(true);
      } else if (scrollY < 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleBookingClick = () => {
    onBooking?.();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div
      className={`
      fixed bottom-0 left-0 right-0 z-[9998]
      transform transition-all duration-500 ease-out
      ${isVisible ? "translate-y-0" : "translate-y-full"}
    `}
    >
      <div className="bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] shadow-2xl border-t border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Content */}
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Calendar className="h-5 w-5 text-white" />
              </div>

              <div className="text-white">
                <div
                  className="font-semibold text-sm"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Klar til at komme i gang?
                </div>
                <div className="text-white/80 text-xs">
                  Book et gratis 15 min møde og få et skræddersyet tilbud
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleBookingClick}
                className="bg-white text-[var(--color-brand-blue)] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all duration-200 flex items-center gap-2"
              >
                <ArrowUp className="h-4 w-4" />
                Book nu
              </button>

              <button
                onClick={handleDismiss}
                className="text-white/60 hover:text-white p-2 transition-colors"
                aria-label="Luk banner"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
