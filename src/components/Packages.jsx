// src/components/Packages.jsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
  portfolio: <FaLaptopCode className="w-8 h-8 text-[var(--color-primary)]" />,
  "webshop-basic": (
    <FaShoppingCart className="w-8 h-8 text-[var(--color-primary)]" />
  ),
  "webshop-standard": (
    <FaBoxOpen className="w-8 h-8 text-[var(--color-primary)]" />
  ),
  "webshop-premium": (
    <FaBuilding className="w-8 h-8 text-[var(--color-primary)]" />
  ),
  "booking-basis": (
    <FaCalendarAlt className="w-8 h-8 text-[var(--color-primary)]" />
  ),
  "booking-pro": (
    <FaCalendarCheck className="w-8 h-8 text-[var(--color-primary)]" />
  ),
  "booking-enterprise": (
    <FaBuilding className="w-8 h-8 text-[var(--color-primary)]" />
  ),
};

export default function Packages() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  return (
    <>
      <section
        ref={ref}
        id="packages"
        className="relative pt-20 pb-28 bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-background)] scroll-mt-[var(--header-height)] overflow-hidden"
      >
        {/* Bølge-divider */}
        <div className="absolute -top-12 left-0 w-full overflow-hidden leading-none">
          {/* …SVG her… */}
        </div>

        <motion.h2
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center text-[var(--color-foreground)] font-heading"
        >
          Vælg din løsning
        </motion.h2>
        <div className="w-24 h-1 bg-[var(--color-primary)] mx-auto mb-16 rounded-full" />

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.slug}
              variants={cardVariants}
              className="relative cursor-pointer rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-1"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPkg(pkg)}
            >
              <div className="flex flex-col bg-[var(--color-secondary)] rounded-2xl overflow-hidden h-full">
                <div className="p-6 flex justify-center">
                  {iconMap[pkg.slug]}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-2 text-[var(--color-foreground)]">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {pkg.description}
                  </p>
                  <p className="text-lg font-bold text-[var(--color-foreground)]">
                    {pkg.price.toLocaleString("da-DK")} kr.
                  </p>
                  <span className="mt-auto inline-block text-[var(--color-primary)] underline">
                    Se flere detaljer →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Draweren */}
      <PackageDetailDrawer
        pkg={selectedPkg}
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
      />
    </>
  );
}
