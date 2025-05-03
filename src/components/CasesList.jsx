// src/components/CasesList.jsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import projects from "../data/projects";

export default function CasesList() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  // En lysere palette med hvid baggrund og gyldne accenter
  const accentClasses = [
    "bg-[var(--color-primary)]", // gylden
    "bg-[var(--color-accent)]", // mørk gylden
    "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]",
  ];
  const textBgClasses = [
    "bg-white text-[var(--color-background)]", // hvid baggrund, mørk tekst
    "bg-[var(--color-secondary)] text-[var(--color-foreground)]", // charcoal baggrund, lys tekst
    "bg-white text-[var(--color-background)]",
  ];

  return (
    <section
      id="cases"
      ref={ref}
      className="relative py-20 bg-white scroll-mt-[var(--header-height)]"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4 text-[var(--color-background)] font-heading">
          Vores Cases
        </h2>
        <div className="w-24 h-1 bg-[var(--color-primary)] mx-auto mb-12 rounded-full" />

        <div className="space-y-16">
          {projects.map((p, i) => {
            const isEven = i % 2 === 1;
            const accent = accentClasses[i % accentClasses.length];
            const textBg = textBgClasses[i % textBgClasses.length];

            return (
              <motion.div
                key={p.slug}
                custom={i}
                initial="hidden"
                animate={controls}
                variants={variants}
                className={`
                  grid items-center gap-6
                  ${
                    isEven ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]"
                  }
                `}
              >
                {/* Tekst med slanted accent */}
                <div className="relative">
                  <div
                    className={`
                      absolute inset-0 ${accent}
                      ${
                        isEven
                          ? "skew-y-3 origin-bottom-right"
                          : "-skew-y-3 origin-top-left"
                      }
                      opacity-80
                    `}
                    style={{
                      transformOrigin: isEven ? "bottom right" : "top left",
                    }}
                  />
                  <div
                    className={`relative p-12 rounded-2xl ${textBg} shadow-lg`}
                  >
                    <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
                    <p className="text-lg mb-6">{p.description}</p>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="btn-secondary inline-flex items-center justify-center group"
                    >
                      Læs case
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

                {/* Billede med selvlysende kant */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-64 rounded-xl overflow-hidden shadow-lg ring-4 ring-[var(--color-primary)]"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
