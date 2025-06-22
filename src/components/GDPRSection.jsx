// src/components/GDPRSection.jsx
"use client";

import React, { useRef, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl"; // 🆕 i18n import
import { Shield, Lock, FileText, CheckCircle2, Eye } from "lucide-react";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 MODULÄR KOMPONENT: ComplianceFeatureCard med forwardRef
const ComplianceFeatureCard = forwardRef(function ComplianceFeatureCard(
  { feature, index, cardInView },
  ref
) {
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      className="group bg-[var(--color-background)] rounded-xl p-6 shadow-lg transition-shadow duration-300 border border-[var(--color-primary)]/10"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={
        cardInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
        delay: index * 0.1 + 0.2,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      {/* Icon Container */}
      <motion.div
        className="w-16 h-16 bg-[var(--color-brand-blue-lighter-bg)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[var(--color-brand-blue)]/20 transition-colors duration-300"
        initial={{ scale: 0, rotate: -45 }}
        animate={
          cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }
        }
        transition={{
          duration: 0.6,
          ease: SMOOTH_EASE,
          delay: index * 0.1 + 0.4,
          type: "spring",
          stiffness: 120,
          damping: 15,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2, ease: SMOOTH_EASE },
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform",
        }}
      >
        <Icon className="w-8 h-8 text-[var(--color-brand-blue)]" />
      </motion.div>

      {/* Title */}
      <motion.h3
        className="text-xl font-semibold text-[var(--color-foreground)] mb-3 font-[var(--font-heading)]"
        initial={{ opacity: 0, y: 10 }}
        animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          ease: SMOOTH_EASE,
          delay: index * 0.1 + 0.5,
        }}
      >
        {feature.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-[var(--color-foreground)]/70 leading-relaxed font-[var(--font-body)]"
        initial={{ opacity: 0, y: 10 }}
        animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          ease: SMOOTH_EASE,
          delay: index * 0.1 + 0.6,
        }}
      >
        {feature.description}
      </motion.p>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: CertificationBadge med forwardRef og i18n
const CertificationBadge = forwardRef(function CertificationBadge(
  { badgeInView, t },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="mt-16 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        badgeInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
      }
      transition={{
        duration: 0.7,
        ease: SMOOTH_EASE,
        delay: 0.5,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <motion.div
        className="inline-flex items-center bg-[var(--color-brand-blue-lighter-bg)] border border-[var(--color-brand-blue)]/20 rounded-full px-6 py-3"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(126, 174, 219, 0.3)",
          transition: { duration: 0.2, ease: SMOOTH_EASE },
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform",
        }}
      >
        <CheckCircle2 className="w-6 h-6 text-[var(--color-brand-blue)] mr-3" />
        <span className="text-[var(--color-foreground)] font-semibold font-[var(--font-body)]">
          {t("certification")}
        </span>
      </motion.div>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: BackgroundElements med forwardRef
const BackgroundElements = forwardRef(function BackgroundElements(
  { sectionInView },
  ref
) {
  return (
    <div ref={ref} className="absolute inset-0 opacity-20 pointer-events-none">
      {/* Static geometric shapes for performance */}
      <div
        className="absolute top-10 left-10 w-32 h-32 border-2 border-[var(--color-brand-blue)] rounded-full"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-[var(--color-brand-blue-lighter-bg)] rounded-lg rotate-45"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-16 h-16 bg-[var(--color-brand-blue)]/30 rounded-full"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute top-1/4 right-1/3 w-20 h-20 border border-[var(--color-brand-blue)]/15 rounded-lg"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-[var(--color-brand-blue)]/20 rounded-full"
        style={{ transform: "translate3d(0,0,0)" }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, var(--color-brand-blue) 1px, transparent 1px),
              linear-gradient(180deg, var(--color-brand-blue) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          }}
        />
      </div>
    </div>
  );
});

// 🔥 HOVEDKOMPONENT
export default function GDPRSection() {
  const t = useTranslations("gdpr"); // 🆕 i18n hook

  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const badgeRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.8 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.3 });
  const badgeInView = useInView(badgeRef, { once: true, amount: 0.8 });

  // 🆕 Compliance features med i18n
  const complianceFeatures = [
    {
      icon: Shield,
      title: t("features.gdprCompliance.title"),
      description: t("features.gdprCompliance.description"),
    },
    {
      icon: Lock,
      title: t("features.sslSecurity.title"),
      description: t("features.sslSecurity.description"),
    },
    {
      icon: FileText,
      title: t("features.privacyPolicy.title"),
      description: t("features.privacyPolicy.description"),
    },
    {
      icon: Eye,
      title: t("features.cookieConsent.title"),
      description: t("features.cookieConsent.description"),
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[var(--color-secondary-light)] to-[var(--color-background)] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "opacity" }} // 🔥 GPU HINT
    >
      {/* Background Elements - modulær komponent */}
      <BackgroundElements ref={backgroundRef} sectionInView={sectionInView} />

      <div className="container mx-auto px-6 relative z-10">
        {/* 🆕 Header med i18n */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{
            duration: 0.7,
            ease: SMOOTH_EASE,
          }}
          style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
        >
          <div className="inline-flex items-center mb-4">
            <Shield className="w-8 h-8 text-[var(--color-brand-blue)] mr-3" />
            <h2 className="text-4xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)]">
              {t("title")}
            </h2>
          </div>
          <div className="w-24 h-1 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-[var(--color-foreground)]/70 max-w-3xl mx-auto font-[var(--font-body)]">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Compliance Features Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {complianceFeatures.map((feature, index) => (
            <ComplianceFeatureCard
              key={index}
              feature={feature}
              index={index}
              cardInView={cardsInView}
            />
          ))}
        </div>

        {/* 🆕 Certification Badge med i18n */}
        <CertificationBadge ref={badgeRef} badgeInView={badgeInView} t={t} />
      </div>
    </motion.section>
  );
}
