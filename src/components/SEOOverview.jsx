// src/components/SEOOverview.jsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import FancyButton from "./FancyButton";

const SMOOTH_EASE = [0.215, 0.61, 0.355, 1];

// 🎯 FALLBACK TEKSTER (bruges hvis i18n ikke er tilgængelig)
const fallbackTexts = {
  da: {
    title: "Hvorfor SEO betyder alt",
    subtitle:
      "Over 90% af alle online-oplevelser starter med en søgning – med en skarp SEO-strategi kan du lande øverst og hente kvalificerede leads året rundt.",
    stats: {
      traffic: {
        label: "126% mere trafik (lokal 3-pack)",
        detail:
          "Virksomheder i Google 3-pack får 126% mere trafik og 93% flere handlinger.",
      },
      organic: {
        label: "65% klikker organisk",
        detail:
          "65% af brugerne klikker på et organisk søgeresultat i stedet for en annonce.",
      },
      positive: {
        label: "91% positiv SEO-effekt",
        detail:
          "91% af marketingfolk rapporterer, at SEO har haft en positiv effekt på deres business.",
      },
    },
    cta: "Få en gratis SEO-audit",
  },
  en: {
    title: "Why SEO means everything",
    subtitle:
      "Over 90% of all online experiences start with a search – with a sharp SEO strategy you can land at the top and get qualified leads all year round.",
    stats: {
      traffic: {
        label: "126% more traffic (local 3-pack)",
        detail:
          "Businesses in Google 3-pack get 126% more traffic and 93% more actions.",
      },
      organic: {
        label: "65% click organic",
        detail:
          "65% of users click on an organic search result instead of an ad.",
      },
      positive: {
        label: "91% positive SEO effect",
        detail:
          "91% of marketers report that SEO has had a positive effect on their business.",
      },
    },
    cta: "Get a free SEO audit",
  },
};

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
// Hovedkomponenten SEOOverview
// ────────────────────────────────────────────────────────────────────────────
export default function SEOOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // 🎯 TRY TO USE i18n, FALL BACK TO DEFAULT
  let t;
  let currentLocale = "da"; // default

  try {
    const { useTranslations, useLocale } = require("next-intl");
    t = useTranslations("seo");
    currentLocale = useLocale();
  } catch (error) {
    // Fallback hvis i18n ikke er tilgængelig
    t = (key) => {
      const keys = key.split(".");
      let value = fallbackTexts[currentLocale];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    };
  }

  // Data for de tre statistik-kort med smart fallback
  const seoStats = [
    {
      label: t("stats.traffic.label"),
      detail: t("stats.traffic.detail"),
    },
    {
      label: t("stats.organic.label"),
      detail: t("stats.organic.detail"),
    },
    {
      label: t("stats.positive.label"),
      detail: t("stats.positive.detail"),
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
        {/* Overskrift + underoverskrift (AnimatedHeading er fra din modulære komponent) */}
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
        {/* Statistik-kort (126%, 65%, 91%) samlet i en baggrundsfarvet container */}
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
          {/* CTA-knappen midt i det blå, lettonede område */}
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
              {t("cta")}
            </FancyButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
