// src/components/Packages.jsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, forwardRef } from "react";
import { useTranslations } from "next-intl"; // 🆕 i18n import
import AnimatedHeading from "./AnimatedHeading";
import PackageDetailDrawer from "./PackageDetailDrawer";
import {
  FaLaptopCode,
  FaShoppingCart,
  FaBoxOpen,
  FaBuilding,
  FaCalendarAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { packages } from "../data/packages";

// 🎯 IKON FUNKTION UDENFOR KOMPONENTEN
const getPackageIcon = (slug) => {
  switch (slug) {
    case "portfolio":
      return <FaLaptopCode className="w-6 h-6" />;
    case "webshop-basic":
      return <FaShoppingCart className="w-6 h-6" />;
    case "webshop-standard":
      return <FaBoxOpen className="w-6 h-6" />;
    case "webshop-premium":
      return <FaBuilding className="w-6 h-6" />;
    case "booking-basis":
      return <FaCalendarAlt className="w-6 h-6" />;
    case "booking-pro":
      return <FaCalendarCheck className="w-6 h-6" />;
    case "booking-enterprise":
      return <FaBuilding className="w-6 h-6" />;
    default:
      return <FaBoxOpen className="w-6 h-6" />;
  }
};

// 🔥 ENKEL, PROFESSIONEL PackageCard med FancyButton animationer og i18n
const PackageCard = forwardRef(function PackageCard(
  { pkg, index, cardInView, onSelect, t },
  ref
) {
  return (
    <motion.div
      ref={ref}
      onClick={() => onSelect(pkg)}
      className="relative group bg-[var(--color-background)] border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-brand-blue)] rounded-3xl shadow-sm hover:shadow-lg cursor-pointer"
      style={{
        // Kun transition for properties som Framer Motion IKKE styrer
        transition: "border-color 0.2s ease",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        delay: cardInView ? index * 0.1 : 0,
        duration: cardInView ? 0.6 : 0.2,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      // 🎯 FancyButton's animationer - med transition indlejret i whileHover
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(126, 174, 219, 0.4)",
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: {
          duration: 0.1,
          ease: "easeOut",
        },
      }}
    >
      {/* Package Icon - floating above card */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-[var(--color-brand-blue)] p-3 rounded-full shadow-lg text-white">
          {getPackageIcon(pkg.slug)}
        </div>
      </div>

      {/* Package Content */}
      <div className="pt-12 pb-6 px-6 flex flex-col h-full">
        <h3 className="mt-2 text-2xl font-semibold mb-2 text-[var(--color-foreground)] font-[var(--font-heading)]">
          {pkg.title}
        </h3>

        <p className="text-sm mb-4 flex-grow leading-relaxed text-[var(--color-foreground)]/80 font-[var(--font-body)]">
          {pkg.description}
        </p>

        <p className="text-lg font-bold mb-4 text-[var(--color-brand-blue)] font-[var(--font-heading)]">
          {pkg.price.toLocaleString("da-DK")} kr.
        </p>

        {/* 🆕 i18n tekst */}
        <span className="inline-block underline text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-darker)] transition-colors duration-200 font-[var(--font-body)]">
          {t("viewDetails")}
        </span>
      </div>
    </motion.div>
  );
});

export default function Packages({ onOrder }) {
  const t = useTranslations("packages"); // 🆕 i18n hook
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const [selectedPkg, setSelectedPkg] = useState(null);

  return (
    <section
      id="packages"
      className="bg-[var(--color-secondary-light)] text-[var(--color-foreground)] scroll-mt-[var(--header-height)] py-20"
    >
      {/* Header - 🆕 med i18n */}
      <div className="text-center">
        <AnimatedHeading
          title={t("title")}
          direction="right"
          className="text-[var(--color-foreground)]"
        />
      </div>

      {/* Packages Grid - med plads til ikoner */}
      <div
        ref={gridRef}
        className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12"
      >
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.slug}
            pkg={pkg}
            index={index}
            cardInView={gridInView}
            onSelect={setSelectedPkg}
            t={t} // 🆕 Send t ned til PackageCard
          />
        ))}
      </div>

      {/* Package Detail Drawer */}
      <PackageDetailDrawer
        pkg={selectedPkg}
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
        onOrder={onOrder}
      />
    </section>
  );
}
