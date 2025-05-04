// src/components/ExpandableCaseCard.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ExpandableCaseCard({ project }) {
  const { title, description, details, examples } = project;

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Auto-rotate carousel når kortet er åbent
  useEffect(() => {
    let timer;
    if (isOpen && autoRotate) {
      timer = setInterval(() => {
        setCurrent((i) => (i + 1) % examples.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isOpen, autoRotate, examples.length]);

  const prev = () =>
    setCurrent((i) => (i - 1 + examples.length) % examples.length);
  const next = () => setCurrent((i) => (i + 1) % examples.length);

  return (
    <>
      <motion.div
        layout
        className="
          border-2 border-[var(--color-primary)]
          rounded-2xl overflow-hidden shadow-lg
          cursor-pointer bg-gray-50
        "
        onClick={() => {
          setIsOpen((open) => !open);
          setAutoRotate((open) => !open);
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Forside-billede */}
        <div className="relative h-64">
          <Image
            src={examples[0]}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="
                bg-gray-50 p-6 text-gray-800
                border-t-2 border-[var(--color-primary)]
              "
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-4">{description}</p>

              <h4 className="font-semibold mb-2">Detaljer:</h4>
              <ul className="list-disc list-inside mb-4 space-y-1">
                {details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <h4 className="font-semibold mb-2">Galleri:</h4>

              {/* CAROUSEL */}
              <div className="relative w-full h-64 overflow-hidden rounded-lg">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={examples[current]}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <Image
                      src={examples[current]}
                      alt={`${title} eksempel ${current + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev/Next */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                    setAutoRotate(false);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                    setAutoRotate(false);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
                >
                  ›
                </button>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                  {examples.map((_, i) => (
                    <span
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrent(i);
                        setAutoRotate(false);
                      }}
                      className={`
                        w-2 h-2 rounded-full cursor-pointer
                        ${
                          i === current
                            ? "bg-[var(--color-primary)]"
                            : "bg-white/60 hover:bg-white"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* LIGHTBOX-MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lb-wrapper"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setLightboxOpen(false)}
            />

            {/* Billed-container */}
            <div className="relative z-10 w-[90vw] h-[90vh]">
              <Image
                src={examples[current]}
                alt={`Stort billede ${current + 1}`}
                fill
                style={{ objectFit: "contain" }}
              />

              {/* Luk-knap */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-2 right-2 z-20 text-white bg-black/40 p-2 rounded-full"
              >
                ✕
              </button>

              {/* Prev/Next i lightbox */}
              <button
                onClick={() => prev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white bg-black/40 p-2 rounded-full"
              >
                ‹
              </button>
              <button
                onClick={() => next()}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white bg-black/40 p-2 rounded-full"
              >
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
