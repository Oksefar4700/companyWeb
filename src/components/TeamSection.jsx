"use client";

import { motion, useInView } from "framer-motion";
import { useRef, forwardRef } from "react";
import AnimatedHeading from "./AnimatedHeading";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.215, 0.61, 0.355, 1];
const BOUNCE_EASE = [0.6, 0.05, -0.01, 0.9];

// Teammedlemmer data
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

// 🔥 MODULÆR KOMPONENT: TeamMemberCard med forwardRef
const TeamMemberCard = forwardRef(function TeamMemberCard(
  { member, index, cardInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="bg-[var(--color-background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={
        cardInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: 0.95 }
      }
      transition={{
        delay: index * 0.2 + 0.3,
        duration: 0.7,
        ease: SMOOTH_EASE, // 🔥 HARDWARE-ACCELERATED EASING
        type: "tween",
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <div className="text-center" style={{ perspective: 600 }}>
        <motion.div
          whileHover={{
            rotateY: 6,
            rotateX: 6,
            scale: 1.02,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          style={{ transformStyle: "preserve-3d" }} // 🔥 3D ACCELERATION
        >
          {/* Profile Image */}
          <motion.div
            className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-[var(--color-brand-blue)] overflow-hidden"
            initial={{ scale: 0, rotate: -180 }}
            animate={
              cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
            }
            transition={{
              delay: index * 0.2 + 0.5,
              duration: 0.8,
              ease: BOUNCE_EASE, // 🔥 CUSTOM BOUNCE
            }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover"
              loading="lazy"
              style={{
                backfaceVisibility: "hidden", // 🔥 3D OPTIMIZATION
                transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
              }}
            />
          </motion.div>

          {/* Name */}
          <motion.h3
            className="text-2xl font-semibold text-[var(--color-foreground)] mb-1 font-[var(--font-heading)]"
            initial={{ opacity: 0, y: 10 }}
            animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              delay: index * 0.2 + 0.7,
              duration: 0.5,
              ease: SMOOTH_EASE,
            }}
          >
            {member.name}
          </motion.h3>

          {/* Role */}
          <motion.p
            className="text-[var(--color-foreground)]/70 font-[var(--font-body)]"
            initial={{ opacity: 0, y: 10 }}
            animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              delay: index * 0.2 + 0.9,
              duration: 0.5,
              ease: SMOOTH_EASE,
            }}
          >
            {member.role}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: BackgroundElements (statisk for performance)
const BackgroundElements = forwardRef(function BackgroundElements(
  { sectionInView },
  ref
) {
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      {/* 🔥 STATISKE ELEMENTER MED GPU ACCELERATION */}
      <motion.div
        className="absolute -top-24 -left-24 w-80 h-80 bg-[var(--color-brand-blue-lighter-bg)]/40 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.4, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.2,
          ease: SMOOTH_EASE,
          delay: 0.2,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute top-1/6 right-0 w-64 h-64 bg-[var(--color-brand-blue)]/35 rounded-full mix-blend-overlay"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.35, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.2,
          ease: SMOOTH_EASE,
          delay: 0.4,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--color-secondary-dark)]/30 rounded-full mix-blend-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.3, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.2,
          ease: SMOOTH_EASE,
          delay: 0.6,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />

      {/* Mindre cirkler - statiske for performance */}
      <div
        className="absolute bottom-20 right-1/2 w-64 h-64 bg-[var(--color-brand-blue-lighter-bg)]/25 rounded-full"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-[var(--color-primary)]/30 rounded-full mix-blend-overlay"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute top-0 right-1/2 w-56 h-56 bg-[var(--color-brand-blue)]/20 rounded-full mix-blend-overlay"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-36 h-36 bg-[var(--color-secondary-dark)]/20 rounded-full mix-blend-screen"
        style={{ transform: "translate3d(0,0,0)" }}
      />
    </div>
  );
});

export default function TeamSection() {
  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const cardsRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.3 });

  return (
    <motion.section
      id="team"
      ref={sectionRef}
      className="py-20 bg-[var(--color-secondary-light)] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE, // 🔥 HARDWARE-ACCELERATED
      }}
      style={{ willChange: "opacity" }} // 🔥 GPU HINT
    >
      {/* Background Elements - modulær komponent */}
      <BackgroundElements ref={backgroundRef} sectionInView={sectionInView} />

      <div className="container mx-auto px-6 lg:px-20 text-center relative z-10">
        {/* Header */}
        <div className="mb-12">
          <AnimatedHeading
            title="Mød teamet"
            direction="right"
            className="text-[var(--color-primary)]"
          />
        </div>

        {/* Team Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {teamMembers.map((member, i) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={i}
              cardInView={cardsInView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
