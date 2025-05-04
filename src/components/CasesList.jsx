// src/components/CasesList.jsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import projects from "../data/projects";
import ExpandableCaseCard from "./ExpandableCaseCard";

export default function CasesList() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  // Generer 15 partikler med varierende størrelse, farve, pos, duration og delay
  const particles = Array.from({ length: 15 }).map((_, i) => {
    // størrelse
    const size = 4 + Math.random() * 4 + "px"; // 4–8px
    // farver
    const colors = [
      "var(--color-primary)",
      "var(--color-accent)",
      "var(--color-secondary)",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    // duration 12–20s
    const duration = 12 + Math.random() * 8 + "s";
    // delay 0–6s
    const delay = Math.random() * 6 + "s";

    // position med 20% chance for kant-placement
    const rndX = Math.random();
    const left =
      rndX < 0.2
        ? `${Math.random() * 5}%`
        : rndX > 0.8
        ? `${95 + Math.random() * 5}%`
        : `${Math.random() * 100}%`;

    const rndY = Math.random();
    const top =
      rndY < 0.2
        ? `${Math.random() * 5}%`
        : rndY > 0.8
        ? `${95 + Math.random() * 5}%`
        : `${Math.random() * 100}%`;

    return { id: i, size, color, duration, delay, top, left };
  });

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };
  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  };
  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      id="cases"
      ref={ref}
      className="relative py-24 bg-white overflow-hidden scroll-mt-[var(--header-height)]"
    >
      {/* Partikler bagved */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            backgroundColor: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Bløde blobs */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-[var(--color-primary)] rounded-full opacity-10 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[var(--color-accent)] rounded-full opacity-10 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Indhold ovenpå */}
      <div className="relative z-10 container mx-auto px-12">
        <motion.h2
          initial="hidden"
          animate={controls}
          variants={headingVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[var(--color-secondary)] text-center mb-4 font-heading"
        >
          Vores Cases
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={underlineVariants}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 w-24 h-1 bg-[var(--color-primary)] origin-left rounded-full"
        />

        <motion.div
          initial="hidden"
          animate={controls}
          variants={gridVariants}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.div
              key={p.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 100, damping: 20 },
                },
              }}
            >
              <ExpandableCaseCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
