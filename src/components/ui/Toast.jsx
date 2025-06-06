// src/components/ui/Toast.jsx - FIKSERET VERSION
"use client";

import { useState, useEffect } from "react";
import { CheckCircle, X, Calendar, Mail } from "lucide-react";

export default function Toast({
  isVisible,
  onClose,
  type = "success",
  title,
  message,
  bookingDetails = null,
  duration = 5000,
}) {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible) {
      // Start animation
      setShow(true);
      setProgress(100);

      // Progress bar countdown
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (duration / 100);
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      // Auto close timer
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      setShow(false);
      setProgress(100);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
      setProgress(100);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
      fixed top-20 right-6 z-[9999] 
      transform transition-all duration-300 ease-out
      ${
        show
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }
    `}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[360px] max-w-[480px]">
        {/* Header med brand farver */}
        <div className="bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {title}
                </h3>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          <p
            className="text-[var(--color-foreground)] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {message}
          </p>

          {/* Booking detaljer hvis det er en booking */}
          {bookingDetails && (
            <div className="bg-[var(--color-brand-blue-lighter-bg)] rounded-lg p-4 border border-[var(--color-brand-blue)]/20">
              <div className="flex items-center mb-3">
                <div className="bg-[var(--color-brand-blue)]/10 rounded-full p-2 mr-3">
                  <Calendar className="h-4 w-4 text-[var(--color-brand-blue-darker)]" />
                </div>
                <span
                  className="font-medium text-[var(--color-primary)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Booking detaljer:
                </span>
              </div>
              <p
                className="text-[var(--color-primary)] font-semibold text-lg mb-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {bookingDetails.formattedDateTime}
              </p>
              <div className="flex items-center text-sm text-[var(--color-brand-blue-darker)]">
                <div className="bg-[var(--color-brand-blue)]/10 rounded-full p-1 mr-2">
                  <Mail className="h-3 w-3" />
                </div>
                <span>Bekræftelse sendt til din email</span>
              </div>
            </div>
          )}
        </div>

        {/* 🎯 FIKSERET Progress bar med animeret countdown */}
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-1.5 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] rounded-full transition-all duration-100 ease-linear"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
