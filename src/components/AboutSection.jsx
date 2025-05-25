"use client";

import { motion, useInView } from "framer-motion";
import { Globe, Users, TrendingUp } from "lucide-react";
import { useRef, forwardRef } from "react";
import AnimatedHeading from "./AnimatedHeading";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.215, 0.61, 0.355, 1];
const BOUNCE_EASE = [0.6, 0.05, -0.01, 0.9];

// 🔥 MODULÆR KOMPONENT: FeatureCard med forwardRef
const FeatureCard = forwardRef(function FeatureCard(
  { icon: Icon, title, text, index, cardInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center p-6 bg-[var(--color-background)] rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        cardInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        delay: index * 0.15 + 0.3,
        duration: 0.7,
        ease: SMOOTH_EASE, // 🔥 HARDWARE-ACCELERATED EASING
        type: "tween", // GPU optimeret
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <motion.div
        className="p-4 mb-4 bg-[var(--color-brand-blue)] rounded-full text-[var(--color-background)]"
        initial={{ scale: 0, rotate: -180 }}
        animate={
          cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
        }
        transition={{
          delay: index * 0.15 + 0.5,
          duration: 0.6,
          ease: BOUNCE_EASE, // 🔥 CUSTOM BOUNCE
        }}
      >
        <Icon size={32} />
      </motion.div>
      <h3 className="text-2xl font-semibold mb-2 text-[var(--color-foreground)] font-[var(--font-heading)]">
        {title}
      </h3>
      <p className="text-center text-[var(--color-foreground)]/80 font-[var(--font-body)]">
        {text}
      </p>
    </motion.div>
  );
});

// 🔥 MODULÆR KOMPONENT: IntroSection med forwardRef
const IntroSection = forwardRef(function IntroSection({ introInView }, ref) {
  return (
    <motion.p
      ref={ref}
      className="max-w-2xl mx-auto text-lg mb-12 text-[var(--color-foreground)]/80 font-[var(--font-body)]"
      initial={{ opacity: 0, y: 20 }}
      animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE, // 🔥 HARDWARE-ACCELERATED
        delay: 0.2,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      Hos{" "}
      <span className="font-semibold text-[var(--color-primary)]">
        CompanyWeb
      </span>{" "}
      lever vi for at skabe digitale løsninger der ikke bare ser flotte ud, men
      som virkelig gør en forskel for din forretning og dine kunder.
    </motion.p>
  );
});

// 🔥 MODULÆR KOMPONENT: CTASection med forwardRef
const CTASection = forwardRef(function CTASection({ ctaInView }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={
        ctaInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE, // 🔥 HARDWARE-ACCELERATED
        delay: 0.2,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <motion.a
        href="#team"
        className="inline-flex items-center px-8 py-3 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)] text-[var(--color-background)] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-[var(--font-body)]"
        whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: "0 10px 25px -5px rgba(126, 174, 219, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        Mød os her ↓
      </motion.a>
    </motion.div>
  );
});

export default function AboutSection() {
  const features = [
    {
      icon: Globe,
      title: "Globalt mindset",
      text: "Vi designer med fokus på brugeroplevelse og moderne standarder der fungerer på tværs af platforme og kulturer.",
    },
    {
      icon: Users,
      title: "Personlig service",
      text: "Fra første møde til projektets afslutning får du dedikeret support og tæt samarbejde med vores team.",
    },
    {
      icon: TrendingUp,
      title: "Resultatgaranti",
      text: "Vi kombinerer kreativt design med målrettet funktionalitet for at skabe løsninger der leverer konkrete resultater.",
    },
  ];

  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const introInView = useInView(introRef, { once: true, amount: 0.8 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.8 });

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-20 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-brand-blue-lighter-bg)] to-[var(--color-secondary-light)]"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE, // 🔥 HARDWARE-ACCELERATED
      }}
      style={{ willChange: "opacity" }} // 🔥 GPU HINT
    >
      {/* 🔥 STATISKE BAGGRUNDSELEMENTER (ingen animationer for bedre performance) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, var(--color-brand-blue) 1px, transparent 1px),
                linear-gradient(180deg, var(--color-brand-blue) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Statiske cirkler - hardware optimeret positioning */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 bg-[var(--color-brand-blue)]/8 rounded-full blur-3xl"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute top-1/4 right-10 w-32 h-32 border border-[var(--color-brand-blue)]/15 rounded-full"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute top-40 left-1/3 w-16 h-16 bg-[var(--color-brand-blue-darker)]/20 rounded-full"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 border-2 border-[var(--color-brand-blue)]/12 rounded-full"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-80 h-80 bg-[var(--color-brand-blue-lighter-bg)]/15 rounded-full blur-2xl"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute bottom-20 left-20 w-12 h-12 bg-[var(--color-brand-blue)]/25 rounded-full"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute top-1/2 left-10 w-6 h-6 bg-[var(--color-brand-blue-darker)]/30 rounded-full"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute top-3/4 right-1/3 w-8 h-8 border border-[var(--color-brand-blue)]/20 rounded-full"
          style={{ transform: "translate3d(0,0,0)" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-20 text-center relative z-10">
        {/* Header */}
        <div className="mb-12">
          <AnimatedHeading
            title="Om os"
            direction="right"
            className="text-[var(--color-primary)]"
          />
        </div>

        {/* Intro - modulær komponent */}
        <IntroSection ref={introRef} introInView={introInView} />

        {/* Features grid - hver card får sin egen inView detection */}
        <div
          ref={cardsRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12"
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              {...feature}
              index={i}
              cardInView={cardsInView}
            />
          ))}
        </div>

        {/* CTA - modulær komponent */}
        <CTASection ref={ctaRef} ctaInView={ctaInView} />
      </div>
    </motion.section>
  );
}
