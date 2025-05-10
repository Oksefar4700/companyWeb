// src/components/ContactSection.jsx
"use client";

import ContactForm from "./ContactForm";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: ({ delay, opacity }) => ({
      opacity,
      scale: 1,
      transition: { duration: 1.5, delay, ease: "easeInOut" },
    }),
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="relative py-20 min-h-[600px] bg-[url('/images/contact/contactImage.png')] bg-cover bg-center overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      {/* Store baggrundscirkler */}
      <motion.div
        className="absolute -top-24 -left-24 w-80 h-80 bg-[var(--color-brand-blue-lighter-bg)] rounded-full pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 0.2, opacity: 0.4 }}
      />
      <motion.div
        className="absolute top-[10%] right-0 w-64 h-64 bg-[var(--color-brand-blue)] rounded-full mix-blend-overlay pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 0.4, opacity: 0.35 }}
      />
      <motion.div
        className="absolute bottom-0 left-[25%] w-96 h-96 bg-[var(--color-secondary-dark)] rounded-full mix-blend-screen pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 0.6, opacity: 0.3 }}
      />
      <motion.div
        className="absolute bottom-20 right-1/2 w-64 h-64 bg-[var(--color-brand-blue-lighter-bg)] rounded-full pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 0.8, opacity: 0.25 }}
      />
      <motion.div
        className="absolute top-1/2 right-[25%] w-48 h-48 bg-[var(--color-primary)] rounded-full mix-blend-overlay pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 1.0, opacity: 0.3 }}
      />
      <motion.div
        className="absolute top-0 right-1/2 w-56 h-56 bg-[var(--color-brand-blue)] rounded-full mix-blend-overlay pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 1.2, opacity: 0.2 }}
      />
      <motion.div
        className="absolute bottom-[33%] left-0 w-36 h-36 bg-[var(--color-secondary-dark)] rounded-full mix-blend-screen pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 1.4, opacity: 0.2 }}
      />

      {/* Overlay for kontrast */}
      <div className="absolute inset-0 bg-[var(--color-background)]/80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-20 text-center">
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="text-4xl font-bold mb-4 text-[var(--color-foreground)] font-heading"
        >
          Kontakt os
        </motion.h2>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.2, duration: 0.8 } },
          }}
          className="mb-8 text-[var(--color-foreground)]/80"
        >
          Har du spørgsmål eller brug for et tilbud? Skriv til os her – vi
          vender tilbage inden for 24 timer.
        </motion.p>

        <ContactForm />
      </div>
    </motion.section>
  );
}
