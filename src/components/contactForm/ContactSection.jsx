// src/components/contactForm/ContactSection.jsx
"use client";

import { useRef, useEffect, forwardRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { X, Calendar, Package, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 MODULÆR KOMPONENT: BackgroundImage med forwardRef
const BackgroundImage = forwardRef(function BackgroundImage(
  { sectionInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 bg-[url('/images/contact/contactImage.png')] bg-cover bg-center pointer-events-none"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={
        sectionInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 1.1 }
      }
      transition={{
        duration: 1.2,
        ease: SMOOTH_EASE,
      }}
      style={{
        transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        willChange: "transform, opacity",
      }}
    />
  );
});

// 🔥 MODULÄR KOMPONENT: SectionHeader med forwardRef
const SectionHeader = forwardRef(function SectionHeader({ headerInView }, ref) {
  return (
    <motion.div
      ref={ref}
      className="text-center mb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <h2 className="text-4xl font-bold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]">
        Kontakt os
      </h2>
      <p className="text-[var(--color-foreground)]/80 font-[var(--font-body)]">
        Har du spørgsmål eller brug for et tilbud? Skriv til os her – vi vender
        tilbage inden for 24 timer.
      </p>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: PackageResume med forwardRef
const PackageResume = forwardRef(function PackageResume(
  { selectedPkg, onClear, resumeInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-gray-200 relative bg-[var(--color-secondary-light)]"
      initial={{ opacity: 0, x: -30 }}
      animate={resumeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.5,
        ease: SMOOTH_EASE,
        delay: 0.1,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      {/* Clear Button */}
      <motion.button
        onClick={onClear}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-white/50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15 }}
        aria-label="Fjern valgt pakke"
      >
        <X size={20} strokeWidth={2} />
      </motion.button>

      {/* Package Icon */}
      <motion.div
        className="flex items-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          resumeInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 0.5,
          ease: SMOOTH_EASE,
          delay: 0.2,
        }}
      >
        <div className="w-10 h-10 bg-[var(--color-brand-blue)] rounded-full flex items-center justify-center mr-3">
          <Package className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
          {selectedPkg.title}
        </h3>
      </motion.div>

      {/* Price */}
      <motion.p
        className="text-lg font-bold text-[var(--color-brand-blue)] mb-4 font-[var(--font-heading)]"
        initial={{ opacity: 0, y: 10 }}
        animate={resumeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          ease: SMOOTH_EASE,
          delay: 0.3,
        }}
      >
        Pris: {selectedPkg.price.toLocaleString("da-DK")} kr.
      </motion.p>

      {/* Details */}
      <motion.ul
        className="list-disc list-inside space-y-1 text-sm text-[var(--color-foreground)]/70 font-[var(--font-body)]"
        initial={{ opacity: 0 }}
        animate={resumeInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: SMOOTH_EASE,
          delay: 0.4,
          staggerChildren: 0.05,
        }}
      >
        {selectedPkg.details.map((detail, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={
              resumeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
            }
            transition={{
              duration: 0.4,
              ease: SMOOTH_EASE,
              delay: 0.5 + i * 0.05,
            }}
          >
            {detail}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: BookingResume med forwardRef
const BookingResume = forwardRef(function BookingResume(
  { selectedBooking, onClear, resumeInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-gray-200 relative bg-[var(--color-secondary-light)]"
      initial={{ opacity: 0, x: -30 }}
      animate={resumeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.5,
        ease: SMOOTH_EASE,
        delay: 0.1,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      {/* Clear Button */}
      <motion.button
        onClick={onClear}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-white/50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15 }}
        aria-label="Fjern valgt booking"
      >
        <X size={20} strokeWidth={2} />
      </motion.button>

      {/* Booking Header */}
      <motion.div
        className="flex items-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          resumeInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 0.5,
          ease: SMOOTH_EASE,
          delay: 0.2,
        }}
      >
        <div className="w-10 h-10 bg-[var(--color-brand-blue)] rounded-full flex items-center justify-center mr-3">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
          Booking
        </h3>
      </motion.div>

      {/* Booking Time */}
      <motion.div
        className="p-4 border border-[var(--color-brand-blue)]/20 rounded-lg bg-[var(--color-brand-blue)]/5 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={resumeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          ease: SMOOTH_EASE,
          delay: 0.3,
        }}
      >
        <p className="text-sm text-gray-500 mb-1 font-[var(--font-body)]">
          Valgt tidspunkt:
        </p>
        <p className="font-medium text-[var(--color-foreground)] font-[var(--font-heading)]">
          {selectedBooking.formattedDateTime}
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-sm text-[var(--color-foreground)]/70 leading-relaxed font-[var(--font-body)]"
        initial={{ opacity: 0 }}
        animate={resumeInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: SMOOTH_EASE,
          delay: 0.4,
        }}
      >
        Udfyld dine kontaktoplysninger, så vi kan bekræfte din booking. Vi
        glæder os til at møde dig og høre mere om dine behov og ønsker.
      </motion.p>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: ContactFormContainer med forwardRef
const ContactFormContainer = forwardRef(function ContactFormContainer(
  { selectedPkg, selectedBooking, formInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="md:col-span-2 p-6"
      initial={{ opacity: 0, x: 30 }}
      animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{
        duration: 0.5,
        ease: SMOOTH_EASE,
        delay: 0.2,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <ContactForm
        selectedPkg={selectedPkg}
        selectedBooking={selectedBooking}
      />
    </motion.div>
  );
});

// 🔥 HOVEDKOMPONENT
export default function ContactSection({
  selectedPkg,
  selectedBooking,
  onClear,
}) {
  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const resumeRef = useRef(null);
  const formRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.8 });
  const containerInView = useInView(containerRef, { once: true, amount: 0.3 });
  const resumeInView = useInView(resumeRef, { once: true, amount: 0.5 });
  const formInView = useInView(formRef, { once: true, amount: 0.5 });

  // Animation controls
  const controls = useAnimation();

  useEffect(() => {
    controls.start(containerInView ? "visible" : "hidden");
  }, [controls, containerInView]);

  const hasSelection = selectedPkg || selectedBooking;

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-32 min-h-[600px]"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "opacity" }} // 🔥 GPU HINT
    >
      {/* Background Image - modulær komponent */}
      <BackgroundImage ref={backgroundRef} sectionInView={sectionInView} />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header - modulär komponent */}
        <SectionHeader ref={headerRef} headerInView={headerInView} />

        {/* Main Container med smooth width animation */}
        <motion.div
          ref={containerRef}
          className="bg-white rounded-3xl shadow-lg overflow-hidden mx-auto"
          initial={false}
          animate={{
            width: hasSelection ? "100%" : "28rem",
            maxWidth: hasSelection ? "none" : "28rem",
          }}
          transition={{
            duration: 0.6,
            ease: SMOOTH_EASE,
          }}
          style={{
            transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
            willChange: "width",
          }}
        >
          {selectedPkg ? (
            // Package Selection Layout
            <div className="grid grid-cols-1 md:grid-cols-3">
              <PackageResume
                ref={resumeRef}
                selectedPkg={selectedPkg}
                onClear={onClear}
                resumeInView={resumeInView}
              />
              <ContactFormContainer
                ref={formRef}
                selectedPkg={selectedPkg}
                selectedBooking={null}
                formInView={formInView}
              />
            </div>
          ) : selectedBooking ? (
            // Booking Selection Layout
            <div className="grid grid-cols-1 md:grid-cols-3">
              <BookingResume
                ref={resumeRef}
                selectedBooking={selectedBooking}
                onClear={onClear}
                resumeInView={resumeInView}
              />
              <ContactFormContainer
                ref={formRef}
                selectedPkg={null}
                selectedBooking={selectedBooking}
                formInView={formInView}
              />
            </div>
          ) : (
            // Standard Contact Form
            <motion.div
              className="p-8"
              initial={{ opacity: 0 }}
              animate={containerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: SMOOTH_EASE,
                delay: 0.2,
              }}
            >
              <ContactForm />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
