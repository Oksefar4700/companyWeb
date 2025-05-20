// src/components/PackageDetailDrawer.jsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fadeIn, scaleIn } from "@/animations/variants";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaShoppingCart,
} from "react-icons/fa";

export default function PackageDetailDrawer({ pkg, isOpen, onClose, onOrder }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const examples = pkg?.examples || [];

  useEffect(() => {
    setCurrentIndex(0);
  }, [pkg]);

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + examples.length) % examples.length);
  const next = () => setCurrentIndex((i) => (i + 1) % examples.length);

  // Drawer-specifikke animationer
  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "tween", duration: 0.4 } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.4 } },
  };

  // Billede-slide animationer
  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && pkg && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-[var(--color-foreground)]/60 backdrop-blur-sm z-40"
            onClick={onClose}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white z-50 flex flex-col overflow-auto shadow-xl border-l border-[var(--color-brand-blue)]"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header med forbedret styling */}
            <div className="p-6 pb-4 border-b border-gray-100 relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-secondary-light)] hover:bg-[var(--color-brand-blue-lighter-bg)] text-[var(--color-foreground)] hover:text-[var(--color-brand-blue)] transition-all"
                aria-label="Luk"
              >
                <FaTimes size={16} />
              </button>

              <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-2">
                {pkg.title}
              </h2>

              <div className="w-24 h-1 bg-[var(--color-brand-blue-lighter-bg)] mb-3"></div>

              <p className="text-lg text-[var(--color-foreground)]/80 mb-4">
                {pkg.description}
              </p>

              <div className="mt-2 bg-[var(--color-brand-blue)] text-white font-bold px-6 py-2 rounded-md inline-block shadow-sm">
                {pkg.price.toLocaleString("da-DK")} kr.
              </div>
            </div>

            {/* Content med forbedret spacing */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-foreground)] border-l-4 border-[var(--color-brand-blue)] pl-3 flex items-center">
                  Hvad er inkluderet:
                </h3>

                <ul className="space-y-3 pl-2">
                  {pkg.details.map((d, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[var(--color-brand-blue)] mr-2 mt-1 flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-[var(--color-foreground)]/90">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-foreground)] border-l-4 border-[var(--color-brand-blue)] pl-3 flex items-center">
                  Eksempelbilleder:
                </h3>

                {/* Forbedret image gallery med skygge og bedre spacing */}
                <div className="relative mt-4">
                  <div className="relative w-full h-64 mb-4 bg-[var(--color-secondary-light)] rounded-lg overflow-hidden shadow-md border border-gray-100">
                    <motion.div
                      key={examples[currentIndex]}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <Image
                        src={examples[currentIndex]}
                        alt={`${pkg.title} eksempel ${currentIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        style={{ objectFit: "contain" }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={prev}
                      className="p-2.5 rounded-full bg-[var(--color-secondary-light)] hover:bg-[var(--color-brand-blue-lighter-bg)] text-[var(--color-foreground)] hover:text-[var(--color-brand-blue)] transition-all shadow-sm"
                      aria-label="Forrige billede"
                    >
                      <FaChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-medium text-[var(--color-foreground)]/70 bg-[var(--color-secondary-light)] px-3 py-1 rounded-full">
                      {currentIndex + 1} / {examples.length}
                    </span>
                    <button
                      onClick={next}
                      className="p-2.5 rounded-full bg-[var(--color-secondary-light)] hover:bg-[var(--color-brand-blue-lighter-bg)] text-[var(--color-foreground)] hover:text-[var(--color-brand-blue)] transition-all shadow-sm"
                      aria-label="Næste billede"
                    >
                      <FaChevronRight size={16} />
                    </button>
                  </div>

                  {/* Forbedrede thumbnails med bedre spacing og hover effekter */}
                  <div className="flex gap-3 overflow-x-auto pb-2 px-1">
                    {examples.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 hover:shadow-md ${
                          i === currentIndex
                            ? "border-[var(--color-brand-blue)] shadow-md"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`Miniature ${i + 1}`}
                          fill
                          sizes="64px"
                          style={{ objectFit: "cover" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer med forbedret CTA-knap */}
            <div className="p-6 mt-auto border-t border-gray-100 bg-[var(--color-secondary-light)]">
              <button
                onClick={() => {
                  onOrder(pkg);
                  onClose();
                }}
                className="w-full py-3.5 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)] text-white font-semibold rounded-md transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FaShoppingCart size={16} />
                <span>Bestil denne pakke</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
