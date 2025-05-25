"use client";

import { motion, useInView } from "framer-motion"; // 🔥 FJERNET: useAnimation
import { useRef, useState } from "react"; // 🔥 FJERNET: useEffect
import AnimatedHeading from "./AnimatedHeading"; // 🔥 TILFØJET: AnimatedHeading
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

const iconMap = {
  portfolio: FaLaptopCode,
  "webshop-basic": FaShoppingCart,
  "webshop-standard": FaBoxOpen,
  "webshop-premium": FaBuilding,
  "booking-basis": FaCalendarAlt,
  "booking-pro": FaCalendarCheck,
  "booking-enterprise": FaBuilding,
};

export default function Packages({ onOrder }) {
  const gridRef = useRef(null);

  // 🔥 OPTIMERING: once: true - animationer kører kun én gang
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  // 🔥 FJERNET: useEffect hook og animation controls
  // Ikke længere nødvendige!

  const [selectedPkg, setSelectedPkg] = useState(null);

  // Simplificerede animation varianter
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
      },
    },
  };

  return (
    <section
      id="packages"
      className="bg-[var(--color-secondary-light)] text-[var(--color-foreground)] scroll-mt-[var(--header-height)] py-20"
    >
      {/* Header */}
      <div className="text-center">
        <AnimatedHeading
          title="Vælg din løsning"
          direction="right"
          className="text-[var(--color-primary)]"
        />
      </div>

      {/* Packages Grid */}
      <motion.div
        ref={gridRef}
        className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate={gridInView ? "visible" : {}} // 🔥 OPTIMERING: Ingen exit
        variants={gridContainerVariants}
      >
        {packages.map((pkg) => {
          const Icon = iconMap[pkg.slug] || FaBoxOpen;
          return (
            <motion.div
              key={pkg.slug}
              variants={cardVariants}
              onClick={() => setSelectedPkg(pkg)}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative group bg-[var(--color-background)] border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-brand-blue)] rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Package Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-[var(--color-brand-blue)] p-3 rounded-full shadow-lg">
                  <Icon className="w-6 h-6 text-[var(--color-background)]" />
                </div>
              </div>

              {/* Package Content */}
              <div className="pt-10 pb-6 px-6 flex flex-col h-full">
                <h3 className="mt-2 text-2xl font-semibold mb-2 text-[var(--color-primary)] font-[var(--font-heading)]">
                  {pkg.title}
                </h3>
                <p className="text-sm mb-4 flex-grow leading-relaxed text-[var(--color-foreground)]/80 font-[var(--font-body)]">
                  {pkg.description}
                </p>
                <p className="text-lg font-bold mb-4 text-[var(--color-brand-blue)] transition-colors duration-200 font-[var(--font-heading)]">
                  {pkg.price.toLocaleString("da-DK")} kr.
                </p>
                <span className="inline-block underline text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-darker)] transition-colors duration-200 font-[var(--font-body)]">
                  Se flere detaljer →
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

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
