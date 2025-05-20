// src/components/AboutSection.jsx
"use client";

import { motion } from "framer-motion";
import { Globe, Users, TrendingUp } from "lucide-react";
import { fadeIn, fadeInUp, staggerContainer } from "@/animations/variants";

export default function AboutSection() {
  const features = [
    { icon: Globe, title: "Globalt mindset", text: "Vi designer med fokus..." },
    { icon: Users, title: "Personlig service", text: "Fra første møde..." },
    {
      icon: TrendingUp,
      title: "Resultatgaranti",
      text: "Vi kombinerer kreativt...",
    },
  ];

  // Behold disse specifikke animationer i komponenten, da de er unikke for baggrundscirklerne
  const backgroundCircleAnimation = {
    initial: { x: -100, y: -50, scale: 0.8, opacity: 0 },
    animate: { x: 0, y: 0, scale: 1.2, opacity: 0.2 },
    exit: { x: -100, y: -50, scale: 0.8, opacity: 0 },
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  const backgroundCircleAnimation2 = {
    initial: { x: 100, y: 50, scale: 1.1, opacity: 0 },
    animate: { x: 0, y: 0, scale: 0.9, opacity: 0.25 },
    exit: { x: 100, y: 50, scale: 1.1, opacity: 0 },
    transition: {
      duration: 12,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        py-20
        section-about-themed
        bg-animated-gradient
      "
    >
      {/* Baggrundscirkler (beholder specifik animation) */}
      <motion.div
        className="
          absolute -top-16 -left-16
          w-96 h-96
          bg-[var(--color-brand-blue)]
          rounded-full
          mix-blend-overlay opacity-20
          pointer-events-none
        "
        initial={backgroundCircleAnimation.initial}
        whileInView={backgroundCircleAnimation.animate}
        exit={backgroundCircleAnimation.exit}
        transition={backgroundCircleAnimation.transition}
        viewport={{ once: false }}
      />
      <motion.div
        className="
          absolute -bottom-20 -right-20
          w-80 h-80
          bg-[var(--color-brand-blue-lighter-bg)]
          rounded-full
          mix-blend-screen opacity-30
          pointer-events-none
        "
        initial={backgroundCircleAnimation2.initial}
        whileInView={backgroundCircleAnimation2.animate}
        exit={backgroundCircleAnimation2.exit}
        transition={backgroundCircleAnimation2.transition}
        viewport={{ once: false }}
      />

      <div className="container mx-auto px-6 lg:px-20 text-center relative z-10">
        {/* Overskrift - nu med fælles fadeInUp animation */}
        <motion.h2
          variants={fadeInUp()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="text-4xl font-bold mb-3 font-heading"
        >
          Om os
        </motion.h2>

        {/* Divider - beholder original */}
        <div className="section-divider mx-auto mb-8" />

        {/* Intro-tekst - nu med fælles fadeIn animation */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-2xl mx-auto text-lg mb-12 text-opacity-80"
        >
          Hos{" "}
          <span className="font-semibold text-[var(--color-primary)]">
            CompanyWeb
          </span>{" "}
          lever vi...
        </motion.p>

        {/* Features grid - bruger stadig custom variant for hver feature */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                delay: i * 0.2 + 0.4,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="
                flex flex-col items-center
                p-6
                bg-[var(--color-background)]
                rounded-3xl
                shadow-lg hover:shadow-2xl
                transition-shadow
              "
            >
              <div className="p-4 mb-4 bg-[var(--color-primary)] rounded-full text-[var(--color-background)]">
                <Icon size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-center text-opacity-80">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Call-to-action - nu med fælles fadeIn animation */}
        <motion.div
          variants={fadeInUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mt-12"
        >
          <a href="#team" className="btn-primary inline-block">
            Mød os her ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
