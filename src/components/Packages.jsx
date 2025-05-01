// src/components/Packages.jsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { packages } from "../data/packages";

export default function Packages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    }),
  };

  return (
    <section
      ref={ref}
      id="packages"
      className="py-20 bg-[var(--color-secondary)]"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-12 text-center text-[var(--color-foreground)]"
      >
        Vælg din løsning
      </motion.h2>

      <div className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, idx) => (
          <motion.div
            key={pkg.slug}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col bg-[var(--color-secondary)] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform"
          >
            {/* Placeholder image */}
            <div className="relative w-full h-48 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 italic">Billede kommer snart</span>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2 text-[var(--color-foreground)]">
                {pkg.title}
              </h3>
              <p className="text-gray-300 mb-4 flex-grow">{pkg.description}</p>
              <p className="text-lg font-bold mb-4 text-[var(--color-foreground)]">
                {pkg.price.toLocaleString("da-DK")} kr.
              </p>
              <Link
                href={`/packages/${pkg.slug}`}
                className="btn-primary mt-auto"
              >
                Se detaljer
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
