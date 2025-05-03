// src/components/TeamSection.jsx
"use client";

import AnimatedSection from "./AnimatedSection";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const teamMembers = [
  {
    name: "Frederik Brøsen",
    age: 31,
    role: "Fullstack udvikler",
    img: "/images/team/Frederik_Broesen.jpg",
  },
  {
    name: "Oliver Larsen",
    age: 25,
    role: "HR ansvarlig",
    img: "/images/team/Oliver_larsen.jpg",
  },
  {
    name: "Daniel Bonne",
    age: 28,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
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
      className="py-20 bg-[var(--color-background)] relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--color-primary)] rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[var(--color-accent)] rounded-full opacity-10 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div
        ref={ref}
        className="container mx-auto px-6 lg:px-20 text-center relative z-10"
      >
        <h2 className="text-4xl font-bold mb-3 text-[var(--color-foreground)] font-heading">
          Mød teamet
        </h2>
        <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
              className="bg-[var(--color-secondary)] rounded-2xl overflow-hidden cursor-pointer"
            >
              <motion.div
                whileHover={{ rotateY: 8, rotateX: 8 }}
                style={{ perspective: 300 }}
                className="p-6 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-[var(--color-primary)] overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--color-foreground)]">
                  {member.name}
                </h3>
                <p className="text-[var(--color-foreground)] text-opacity-70 mb-2">
                  {member.role}
                </p>
                <span className="text-sm text-[var(--color-primary)]">
                  Alder: {member.age}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
