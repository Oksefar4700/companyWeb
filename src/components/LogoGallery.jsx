"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedHeading from "./AnimatedHeading";

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
  const t = useTranslations("logoGallery");
  const gridRef = useRef(null);
  const descRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const descInView = useInView(descRef, { once: true, margin: "-50px" });

  return (
    <section className="py-20 bg-[var(--color-secondary-light)]">
      <div className="container mx-auto px-6 text-center">
        {/* Animeret titel */}
        <div className="mb-6">
          <AnimatedHeading
            title={t("title")}
            direction="left"
            className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-[var(--color-foreground)]"
          />
        </div>

        {/* Animeret beskrivelse */}
        <motion.p
          ref={descRef}
          className="text-[var(--color-foreground)]/70 mb-12 font-[var(--font-body)] max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.3,
          }}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
          }}
        >
          {t("description")}
        </motion.p>

        {/* Logo grid */}
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
                delay: idx * 0.1 + 0.5, // Ekstra delay så det kommer efter beskrivelsen
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{
                transform: "translate3d(0,0,0)",
                willChange: "transform, opacity",
              }}
            >
              <img
                src={src}
                alt={t("logoAlt", { number: idx + 3 })}
                className="max-w-full h-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
