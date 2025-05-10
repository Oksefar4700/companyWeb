// src/components/TeamSection.jsx
"use client";

import AnimatedSection from "./AnimatedSection";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

// Teammedlemmer uden alder
const teamMembers = [
  {
    name: "Frederik Brøsen",
    role: "Fullstack udvikler",
    img: "/images/team/Frederik_Broesen.jpg",
  },
  {
    name: "Oliver Larsen",
    role: "HR ansvarlig",
    img: "/images/team/Oliver_larsen.jpg",
  },
  {
    name: "Daniel Bonne",
    role: "Fullstack udvikler, kvalitetskontrollør",
    img: "/images/team/Daniel_Bonne.png",
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: ({ delay, opacity }) => ({
      opacity,
      scale: 1,
      transition: { duration: 1.5, delay, ease: "easeInOut" },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2 + 0.2,
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    }),
  };

  return (
    <AnimatedSection
      id="team"
      from="right"
      className="py-20 bg-[var(--color-secondary-light)] relative overflow-hidden"
    >
      {/* Baggrundscirkler: tilføjet flere og forstærket */}
      <motion.div
        className="absolute -top-24 -left-24 w-80 h-80 bg-[var(--color-brand-blue-lighter-bg)] rounded-full pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 0.2, opacity: 0.4 }}
        initial="hidden"
        animate={controls}
      />
      <motion.div
        className="absolute top-1/6 right-0 w-64 h-64 bg-[var(--color-brand-blue)] rounded-full mix-blend-overlay pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 0.4, opacity: 0.35 }}
        initial="hidden"
        animate={controls}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--color-secondary-dark)] rounded-full mix-blend-screen pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 0.6, opacity: 0.3 }}
        initial="hidden"
        animate={controls}
      />
      <motion.div
        className="absolute bottom-20 right-1/2 w-64 h-64 bg-[var(--color-brand-blue-lighter-bg)] rounded-full pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 0.8, opacity: 0.25 }}
        initial="hidden"
        animate={controls}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-[var(--color-primary)] rounded-full mix-blend-overlay pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 1.0, opacity: 0.3 }}
        initial="hidden"
        animate={controls}
      />
      <motion.div
        className="absolute top-0 right-1/2 w-56 h-56 bg-[var(--color-brand-blue)] rounded-full mix-blend-overlay opacity-0 pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 1.2, opacity: 0.2 }}
        initial="hidden"
        animate={controls}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-36 h-36 bg-[var(--color-secondary-dark)] rounded-full mix-blend-screen pointer-events-none"
        variants={circleVariants}
        custom={{ delay: 1.4, opacity: 0.2 }}
        initial="hidden"
        animate={controls}
      />

      <div
        ref={ref}
        className="container mx-auto px-6 lg:px-20 text-center relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="text-4xl font-bold mb-3 text-[var(--color-primary)] font-heading"
        >
          Mød teamet
        </motion.h2>
        <motion.div
          className="w-16 h-1 bg-[var(--color-brand-blue)] mx-auto mb-12 rounded-full"
          initial={{ scaleX: 0 }}
          animate={controls}
          variants={{
            hidden: { scaleX: 0 },
            visible: {
              scaleX: 1,
              transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
            },
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              className="bg-[var(--color-background)] rounded-2xl p-6 cursor-default"
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="text-center" style={{ perspective: 600 }}>
                <motion.div
                  whileHover={{ rotateY: 6, rotateX: 6 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-[var(--color-brand-blue)] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--color-foreground)] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[var(--color-foreground)] text-opacity-70">
                    {member.role}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
