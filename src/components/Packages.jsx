// src/components/Packages.jsx
"use client";

import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import PackageDetailDrawer from "./PackageDetailDrawer";
import { packages } from "../data/packages";
import {
  FaLaptopCode,
  FaShoppingCart,
  FaBoxOpen,
  FaBuilding,
  FaCalendarAlt,
  FaCalendarCheck,
} from "react-icons/fa";

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

export default function Packages({ onOrder }) {
  const t = useTranslations("packages");
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const [selectedPkg, setSelectedPkg] = useState(null);

  return (
    <section
      id="packages"
      className="bg-[var(--color-secondary-light)] text-[var(--color-foreground)] scroll-mt-[var(--header-height)] py-20"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold">{t("title")}</h2>
      </div>

      {/* Packages Grid */}
      <div
        ref={gridRef}
        className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12"
      >
        {packages.map((pkg, index) => {
          const title = t(`${pkg.slug}.title`);
          const description = t(`${pkg.slug}.description`);
          const price = parseInt(t(`${pkg.slug}.price`)); // Hent pris fra oversættelser

          return (
            <motion.div
              key={pkg.slug}
              onClick={() =>
                setSelectedPkg({ ...pkg, title, description, price })
              } // Tilføj price til selectedPkg
              className="relative group bg-[var(--color-background)] border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-brand-blue)] rounded-3xl shadow-sm hover:shadow-lg cursor-pointer"
              style={{ transition: "border-color 0.2s ease" }}
              initial={{ opacity: 0, y: 30 }}
              animate={
                gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                delay: gridInView ? index * 0.1 : 0,
                duration: gridInView ? 0.6 : 0.2,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(126, 174, 219, 0.4)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1, ease: "easeOut" },
              }}
            >
              {/* Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[var(--color-brand-blue)] p-3 rounded-full shadow-lg text-white">
                  {getPackageIcon(pkg.slug)}
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 pb-6 px-6 flex flex-col h-full">
                <h3 className="mt-2 text-2xl font-semibold mb-2 text-[var(--color-foreground)] font-[var(--font-heading)]">
                  {title}
                </h3>
                <p className="text-sm mb-4 flex-grow leading-relaxed text-[var(--color-foreground)]/80 font-[var(--font-body)]">
                  {description}
                </p>
                <p className="text-lg font-bold mb-4 text-[var(--color-brand-blue)] font-[var(--font-heading)]">
                  {price.toLocaleString("da-DK")} kr.
                </p>
                <span className="inline-block underline text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-darker)] transition-colors duration-200 font-[var(--font-body)]">
                  {t("seeMoreDetails")}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Drawer */}
      <PackageDetailDrawer
        pkg={selectedPkg}
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
        onOrder={(pkg) => {
          onOrder(pkg);
          setSelectedPkg(null);
        }}
      />
    </section>
  );
}
