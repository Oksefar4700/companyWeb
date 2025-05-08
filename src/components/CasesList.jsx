// src/components/CasesList.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import projects from "../data/projects";
import ExpandableCaseCard from "./ExpandableCaseCard";

export default function CasesList() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.2 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  useEffect(() => {
    // Generér små “bolde” med accent, beige og mørk farve
    const gen = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: `${4 + Math.random() * 4}px`,
      color: ["#7eaedb", "#f7f5f2", "#2e2e38"][Math.floor(Math.random() * 3)],
      duration: `${12 + Math.random() * 8}s`,
      delay: `${Math.random() * 6}s`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setParticles(gen);
  }, []);

  return (
    <section
      ref={ref}
      id="cases"
      className="
        relative overflow-hidden
        bg-white                  /* hvid sektion */
        text-[#1f2328]            /* mørk tekst */
        scroll-mt-[var(--header-height)]
        py-24
      "
    >
      {/* Flyvende partikler */}
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

      {/* Store dekorative cirkler */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-[#7eaedb] rounded-full opacity-10 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#5a82a3] rounded-full opacity-10 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-12">
        {/* Overskrift */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{ hidden: {}, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4 text-[#2e2e38]"
        >
          Vores Cases
        </motion.h2>

        {/* Accent-stripe under overskrift */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={controls}
          variants={{ hidden: {}, visible: { scaleX: 1 } }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 w-24 h-1 rounded-full bg-[#7eaedb]"
        />

        {/* Kort-grid */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
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
              {/* Hvidt kort med beige baggrund i inner, sort kant */}
              <div
                className="
                bg-[#f7f5f2]
                border-2 border-[#2e2e38]
                rounded-2xl
                shadow-lg hover:shadow-2xl
                transition-shadow
                overflow-hidden
              "
              >
                <ExpandableCaseCard project={p} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
