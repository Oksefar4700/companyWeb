// src/components/PackageDetailDrawer.jsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PackageDetailDrawer({ pkg, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const examples = pkg?.examples || [];

  // Reset til første billede når pakken ændres
  useEffect(() => {
    setCurrentIndex(0);
  }, [pkg]);

  const prev = () =>
    setCurrentIndex((idx) => (idx - 1 + examples.length) % examples.length);
  const next = () => setCurrentIndex((idx) => (idx + 1) % examples.length);

  return (
    <AnimatePresence initial={false}>
      {isOpen && pkg && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 h-full w-full md:w-1/3 lg:w-1/4 bg-[var(--color-background)] z-50 flex flex-col overflow-auto p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            <button
              onClick={onClose}
              className="self-end mb-4 text-[var(--color-primary)] hover:text-[var(--color-accent)] transition"
            >
              Luk ✕
            </button>

            <h2 className="text-3xl font-bold mb-2 text-[var(--color-foreground)]">
              {pkg.title}
            </h2>
            <p className="text-lg mb-4 text-gray-300">{pkg.description}</p>
            <p className="text-xl font-semibold mb-6 text-[var(--color-primary)]">
              Pris: {pkg.price.toLocaleString("da-DK")} kr.
            </p>

            <h3 className="text-2xl font-semibold mb-2">Hvad er inkluderet:</h3>
            <ul className="list-disc list-inside space-y-1 mb-6">
              {pkg.details.map((d, i) => (
                <li key={i} className="text-[var(--color-foreground)]">
                  {d}
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-2">Eksempelbilleder:</h3>

            {/* CAROUSEL MAIN IMAGE */}
            <div className="relative w-full h-48 mb-2">
              <motion.div
                key={examples[currentIndex]}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={examples[currentIndex]}
                  alt={`${pkg.title} eksempel ${currentIndex + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
            </div>

            {/* NAVIGATION PILE */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prev}
                className="px-3 py-1 bg-[var(--color-secondary)] rounded-full hover:bg-[var(--color-primary)] transition"
              >
                ‹
              </button>
              <span className="text-sm text-gray-400">
                {currentIndex + 1} / {examples.length}
              </span>
              <button
                onClick={next}
                className="px-3 py-1 bg-[var(--color-secondary)] rounded-full hover:bg-[var(--color-primary)] transition"
              >
                ›
              </button>
            </div>

            {/* THUMBNAILS */}
            <div className="flex space-x-2 overflow-x-auto mb-6">
              {examples.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`
                    relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden
                    cursor-pointer border-2
                    ${
                      i === currentIndex
                        ? "border-[var(--color-primary)]"
                        : "border-transparent"
                    }
                    hover:border-[var(--color-accent)] transition
                  `}
                >
                  <Image
                    src={src}
                    alt={`thumb ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-primary mt-auto self-center inline-block"
            >
              Bestil denne pakke
            </a>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
