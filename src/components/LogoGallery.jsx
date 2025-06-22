// src/components/LogoGallery.jsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl"; // 🆕 i18n import

// Logoerne ligger i public/images/logo/ og hedder logo3.png til logo10.png
const logoImages = [
  "/images/logo/logo3.png",
  "/images/logo/logo4.png",
  "/images/logo/logo5.png",
  "/images/logo/logo6.png",
  "/images/logo/logo7.png",
  "/images/logo/logo8.png",
  "/images/logo/logo9.png",
  "/images/logo/logo10.png",
];

export default function LogoGallery() {
  const t = useTranslations("logoGallery"); // 🆕 i18n hook
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <section className="py-20 bg-[var(--color-secondary-light)]">
      <div className="container mx-auto px-6 text-center">
        {/* 🆕 Titel med i18n */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-[var(--font-heading)] text-[var(--color-foreground)]">
          {t("title")}
        </h2>
        {/* 🆕 Beskrivelse med i18n */}
        <p className="text-[var(--color-foreground)]/70 mb-12 font-[var(--font-body)] max-w-2xl mx-auto">
          {t("description")}
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center"
        >
          {logoImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={gridInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="bg-white p-6 rounded-xl shadow-md"
              style={{
                transform: "translate3d(0,0,0)",
                willChange: "transform, opacity",
              }}
            >
              <img
                src={src}
                alt={t("logoAlt", { number: idx + 3 })} // 🆕 Alt tekst med i18n
                className="max-w-full h-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
