// src/components/SEOOverview.jsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
// Hovedkomponenten SEOOverview
// ────────────────────────────────────────────────────────────────────────────
export default function SEOOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Data for de tre statistik-kort
  const seoStats = [
    {
      label: "126% mere trafik (lokal 3-pack)",
      detail:
        "Virksomheder i Google 3-pack får 126% mere trafik og 93% flere handlinger.",
    },
    {
      label: "65% klikker organisk",
      detail:
        "65% af brugerne klikker på et organisk søgeresultat i stedet for en annonce.",
    },
    {
      label: "91% positiv SEO-effekt",
      detail:
        "91% af marketingfolk rapporterer, at SEO har haft en positiv effekt på deres business.",
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
          title="Hvorfor SEO betyder alt"
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
          Over 90% af alle online-oplevelser starter med en søgning – med en
          skarp SEO-strategi kan du lande øverst og hente kvalificerede leads
          året rundt.
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
              Få en gratis SEO-audit
            </FancyButton>
          </motion.div>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* Uddybende SEO-services (3 kolonner på desktop) */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-md text-left"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: SMOOTH_EASE }}
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform, opacity",
            }}
          >
            <FiSearch className="w-10 h-10 text-[var(--color-brand-blue)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-[var(--font-heading)]">
              Teknisk SEO-audit
            </h3>
            <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
              Vi gennemgår site-struktur, hastighed og mobilvenlighed, så Google
              nemt crawler og indekserer dit indhold.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-md text-left"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: SMOOTH_EASE }}
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform, opacity",
            }}
          >
            <FiTarget className="w-10 h-10 text-[var(--color-brand-blue)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-[var(--font-heading)]">
              Keyword-Research & Indhold
            </h3>
            <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
              Vi finder de søgeord, dine potentielle kunder bruger, og skaber
              værdifuldt indhold til hver fase i kunderejsen.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-md text-left"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease: SMOOTH_EASE }}
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform, opacity",
            }}
          >
            <FiShield className="w-10 h-10 text-[var(--color-brand-blue)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-[var(--font-heading)]">
              Lokalt SEO & Linkbuilding
            </h3>
            <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
              Vi optimerer din Google Business Profile, sikrer korrekt NAP
              (Navn, Adresse, Telefon) og opbygger lokale kvalitets-backlinks.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
