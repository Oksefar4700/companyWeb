// src/components/Packages.jsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
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
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  return (
    <section
      ref={ref}
      id="packages"
      className="
        relative pt-20 pb-28
        bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-background)]
        scroll-mt-[var(--header-height)]
        overflow-hidden
      "
    >
      {/* subtle wave divider */}
      <div className="absolute -top-12 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          className="block w-full h-20 text-[var(--color-background)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0,64L48,53.3C96,43,192,21,288,21.3C384,21,480,43,576,53.3C672,64,768,64,864,64C960,64,1056,64,1152,53.3C1248,43,1344,21,1392,10.7L1440,0L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
          />
        </svg>
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
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            }}
            className="relative p-1 rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
          >
            <div className="flex flex-col bg-[var(--color-secondary)] rounded-2xl overflow-hidden h-full">
              <div className="p-6 flex justify-center">
                {iconMap[pkg.slug] || (
                  <FaLaptopCode className="w-8 h-8 text-[var(--color-primary)]" />
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold mb-2 text-[var(--color-foreground)]">
                  {pkg.title}
                </h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  {pkg.description}
                </p>
                <p className="text-lg font-bold mb-4 text-[var(--color-foreground)]">
                  {pkg.price.toLocaleString("da-DK")} kr.
                </p>
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="btn-primary mt-auto inline-flex items-center justify-center"
                >
                  Se detaljer
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
