// src/components/contactForm/ContactSection.jsx - MED TOAST
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { X, Calendar, Package as PackageIcon } from "lucide-react";
import ContactForm from "./ContactForm";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

export default function ContactSection({
  selectedPkg,
  selectedBooking,
  onClear,
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // 🎯 TOAST STATE FLYTTET HER (påvirkes ikke af ContactForm clearing)
  const { toast, showBookingSuccess, showContactSuccess, hideToast } =
    useToast();

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const hasSelection = Boolean(selectedPkg || selectedBooking);

  // 🎯 Callback til ContactForm success
  const handleContactSuccess = (isBooking, bookingData = null) => {
    console.log("📧 ContactSection received success callback:", {
      isBooking,
      bookingData,
    });

    if (isBooking && bookingData) {
      showBookingSuccess(bookingData);
    } else {
      showContactSuccess();
    }
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="relative overflow-hidden py-32 min-h-[600px]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
    >
      {/* Dæmpet baggrundsbillede */}
      <div
        className="
          absolute inset-0
          bg-[url('/images/contact/contactImage.png')]
          bg-cover bg-center
          opacity-30
          pointer-events-none
        "
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Titel */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="text-4xl font-bold text-center mb-4 text-[var(--color-foreground)]"
        >
          Kontakt os
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.2, duration: 0.8 } },
          }}
          className="text-center mb-10 text-[var(--color-foreground)]/80"
        >
          Har du spørgsmål eller brug for et tilbud? Skriv til os her – vi
          vender tilbage inden for 24 timer.
        </motion.p>

        {/* Bredden styres her */}
        <motion.div
          initial={false}
          animate={{
            width: hasSelection ? "100%" : "28rem",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
          className="
            bg-white rounded-3xl shadow-lg overflow-hidden
            mx-auto
          "
        >
          {/* Udskiftning af indhold */}
          {selectedPkg ? (
            <motion.div
              key="package"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3"
            >
              {/* Pakke-resume */}
              <div className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-gray-200 relative">
                <button
                  onClick={onClear}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  aria-label="Fjern valgt pakke"
                >
                  <X size={20} strokeWidth={2} />
                </button>
                <h3 className="text-2xl font-semibold mb-2 text-[var(--color-foreground)]">
                  {selectedPkg.title}
                </h3>
                <p className="text-lg font-bold text-[var(--color-brand-blue)] mb-4">
                  Pris: {selectedPkg.price.toLocaleString("da-DK")} kr.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-[var(--color-foreground)]/70">
                  {selectedPkg.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              {/* Formular */}
              <div className="md:col-span-2 p-6">
                <ContactForm
                  selectedPkg={selectedPkg}
                  onClear={onClear}
                  onSuccess={handleContactSuccess}
                />
              </div>
            </motion.div>
          ) : selectedBooking ? (
            <motion.div
              key="booking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3"
            >
              {/* Booking-resume */}
              <div className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-gray-200 relative">
                <button
                  onClick={onClear}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  aria-label="Fjern valgt booking"
                >
                  <X size={20} strokeWidth={2} />
                </button>
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-[var(--color-brand-blue)] mr-2" />
                  <h3 className="text-2xl font-semibold text-[var(--color-foreground)]">
                    Booking
                  </h3>
                </div>
                <div className="p-4 border border-[var(--color-brand-blue)]/20 rounded-lg bg-[var(--color-brand-blue)]/5 mb-4">
                  <p className="text-sm text-gray-500 mb-1">Valgt tidspunkt:</p>
                  <p className="font-medium text-[var(--color-foreground)]">
                    {selectedBooking.formattedDateTime}
                  </p>
                </div>
                <p className="text-sm text-[var(--color-foreground)]/70 leading-relaxed">
                  Udfyld dine kontaktoplysninger, så vi kan bekræfte din
                  booking. Vi glæder os til at møde dig og høre mere om dine
                  behov og ønsker.
                </p>
              </div>
              {/* Formular */}
              <div className="md:col-span-2 p-6">
                <ContactForm
                  selectedBooking={selectedBooking}
                  onClear={onClear}
                  onSuccess={handleContactSuccess}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="standard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8"
            >
              <ContactForm onClear={onClear} onSuccess={handleContactSuccess} />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 🎯 TOAST ER NU HER (påvirkes ikke af ContactForm clearing) */}
      <Toast
        isVisible={toast.isVisible}
        onClose={hideToast}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        bookingDetails={toast.bookingDetails}
      />
    </motion.section>
  );
}
