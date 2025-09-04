// src/components/SEOOverview.jsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl"; // 🆕 i18n import
import AnimatedHeading from "./AnimatedHeading";
import FancyButton from "./FancyButton";
import { FiSearch, FiTarget, FiShield } from "react-icons/fi";

const SMOOTH_EASE = [0.215, 0.61, 0.355, 1];

// ────────────────────────────────────────────────────────────────────────────
// Baggrundscirkler (modulær komponent).
// Al animation her bruger translate3d + willChange for GPU acceleration.
// ────────────────────────────────────────────────────────────────────────────
function SEOBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-24 -right-28 w-80 h-80 bg-[var(--color-brand-blue)]/10 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: SMOOTH_EASE }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU-lag
          willChange: "transform, opacity",
        }}
      />
      <motion.div
        className="absolute -bottom-24 -left-20 w-72 h-72 bg-[var(--color-primary)]/8 rounded-full blur-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2, ease: SMOOTH_EASE, delay: 0.2 }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU-lag
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Hovedkomponenten SEOOverview med i18n
// ────────────────────────────────────────────────────────────────────────────
export default function SEOOverview() {
  const t = useTranslations("seo"); // 🆕 i18n hook
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // 🆕 Data for de tre statistik-kort med i18n
  const seoStats = [
    {
      label: t("stats.localTraffic.label"),
      detail: t("stats.localTraffic.detail"),
    },
    {
      label: t("stats.organicClicks.label"),
      detail: t("stats.organicClicks.detail"),
    },
    {
      label: t("stats.positiveEffect.label"),
      detail: t("stats.positiveEffect.detail"),
    },
  ];

  // 🆕 SEO services med i18n
  const seoServices = [
    {
      icon: FiSearch,
      title: t("services.technicalAudit.title"),
      description: t("services.technicalAudit.description"),
    },
    {
      icon: FiTarget,
      title: t("services.keywordResearch.title"),
      description: t("services.keywordResearch.description"),
    },
    {
      icon: FiShield,
      title: t("services.localSeo.title"),
      description: t("services.localSeo.description"),
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 bg-[var(--color-background)] overflow-hidden"
    >
      {/* Baggrundscirklerne, der ligger under hovedindholdet */}
      <SEOBackground />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* ─────────────────────────────────────────────────────────────── */}
        {/* Overskrift + underoverskrift med i18n */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <AnimatedHeading
          title={t("title")}
          direction="left"
          className="text-[var(--color-foreground)]"
        />
        <motion.p
          className="text-[var(--color-foreground)]/70 mb-12 font-[var(--font-body)] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            transform: "translate3d(0,0,0)",
            willChange: "transform, opacity",
          }}
        >
          {t("subtitle")}
        </motion.p>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* Statistik-kort med i18n */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="bg-[var(--color-brand-blue-lighter-bg)]/20 py-10 rounded-xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {seoStats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="seo-stat-card bg-white rounded-2xl p-6 shadow-md border border-[var(--color-primary)]/10 text-left"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.2,
                  ease: SMOOTH_EASE,
                }}
                whileHover={{
                  translateY: -4,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
                style={{
                  transform: "translate3d(0,0,0)", // 🔥 GPU-lag
                  willChange: "transform, opacity",
                }}
              >
                <div className="text-2xl font-bold text-[var(--color-brand-blue)] mb-2 font-[var(--font-heading)]">
                  {stat.label}
                </div>
                <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* CTA-knappen med i18n */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform, opacity",
            }}
          >
            <FancyButton
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(126,174,219,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              // Pulserende effekt i baggrund (en gang pr. 2 sekunder)
              whileInView={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {t("ctaButton")}
            </FancyButton>
          </motion.div>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SEO-services med i18n */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {seoServices.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-md text-left"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + idx * 0.2,
                ease: SMOOTH_EASE,
              }}
              style={{
                transform: "translate3d(0,0,0)",
                willChange: "transform, opacity",
              }}
            >
              <service.icon className="w-10 h-10 text-[var(--color-brand-blue)] mb-4" />
              <h3 className="text-xl font-semibold mb-2 font-[var(--font-heading)]">
                {service.title}
              </h3>
              <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
