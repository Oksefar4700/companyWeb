"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, X, MessageCircle } from "lucide-react";

export default function FloatingBookingButton({ onOpenBooking }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  // Use ref to prevent re-initialization
  const hasShownBubble = useRef(false);
  const bubbleTimer = useRef(null);
  const buttonTimer = useRef(null);

  // Enkelt besked der er brugervenlig
  const message = {
    text: "Få en gratis konsultation",
    icon: MessageCircle,
  };

  useEffect(() => {
    // Button timer - only once
    if (buttonTimer.current) return;

    buttonTimer.current = setTimeout(() => {
      setIsVisible(true);
    }, 20000);

    return () => {
      if (buttonTimer.current) {
        clearTimeout(buttonTimer.current);
        buttonTimer.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Bubble timer - only once ever
    if (hasShownBubble.current || bubbleTimer.current) return;

    bubbleTimer.current = setTimeout(() => {
      if (!hasShownBubble.current) {
        setShowBubble(true);
        // DON'T set hasShownBubble here - only when user closes it
      }
    }, 10000);

    return () => {
      if (bubbleTimer.current) {
        clearTimeout(bubbleTimer.current);
        bubbleTimer.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Scroll logic - only for button visibility
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setIsVisible(false);
      } else if (!isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    setShowBubble(false);
  };

  const handleBookingClick = () => {
    if (typeof onOpenBooking === "function") {
      onOpenBooking();
    }
    setShowBubble(false);
  };

  const handleCloseBubble = (e) => {
    e.stopPropagation();
    setShowBubble(false);
    hasShownBubble.current = true; // Prevent showing again
  };

  if (isDismissed || !isVisible) return null;

  const MessageIcon = message.icon;

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        pointerEvents: "auto",
        maxWidth: "300px",
        width: "auto",
      }}
    >
      {/* Elegant chat boble - simpel og ikke irriterende */}
      {showBubble && (
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
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 p-1.5 bg-[var(--color-brand-blue)]/10 rounded-full">
                <MessageIcon className="w-4 h-4 text-[var(--color-brand-blue-darker)]" />
              </div>
              <span className="text-sm font-medium leading-relaxed text-gray-700">
                {message.text}
              </span>
            </div>

            {/* Elegant chat tail */}
            <div className="absolute -bottom-2 right-5 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white/95"></div>

            {/* Elegant close button - matching dit tema */}
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

      {/* Layout-sikker floating icon button */}
      <div
        className="relative group"
        style={{
          position: "relative",
          width: "4rem",
          height: "4rem",
        }}
      >
        {/* Elegant dismiss button - matching dit tema */}
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
