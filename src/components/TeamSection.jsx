// src/components/TeamSection.jsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, forwardRef } from "react";
import { useTranslations } from "next-intl"; // 🆕 i18n import
import AnimatedHeading from "./AnimatedHeading";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 MODULÄR KOMPONENT: TeamMemberCard med forwardRef
const TeamMemberCard = forwardRef(function TeamMemberCard(
  { member, index, cardInView },
  ref
) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="bg-[var(--color-background)] rounded-2xl p-6 shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={
        cardInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: 0.95 }
      }
      transition={{
        delay: index * 0.15 + 0.3,
        duration: 0.6,
        ease: SMOOTH_EASE,
        type: "tween",
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <div className="text-center">
        {/* Profile Image Container */}
        <motion.div
          className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-[var(--color-brand-blue)] overflow-hidden relative bg-[var(--color-secondary-light)]"
          initial={{ scale: 0, rotate: -10 }}
          animate={
            cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }
          }
          transition={{
            delay: index * 0.15 + 0.5,
            duration: 0.7,
            ease: SMOOTH_EASE,
            type: "spring",
            stiffness: 120,
            damping: 15,
          }}
        >
          {/* Loading Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[var(--color-secondary-light)] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[var(--color-brand-blue)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Profile Image */}
          <img
            src={member.img}
            alt={member.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
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
            delay: index * 0.15 + 0.7,
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
            delay: index * 0.15 + 0.8,
            duration: 0.5,
            ease: SMOOTH_EASE,
          }}
        >
          {member.role}
        </motion.p>
      </div>
    </motion.div>
  );
});

// 🔥 MODULÁR KOMPONENT: BackgroundElements (statisk for performance)
const BackgroundElements = forwardRef(function BackgroundElements(
  { sectionInView },
  ref
) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* 🔥 STATISKE GRADIENT ELEMENTER MED GPU ACCELERATION */}
      <motion.div
        className="absolute -top-24 -left-24 w-80 h-80 bg-[var(--color-brand-blue)]/8 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.6, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.5,
          ease: SMOOTH_EASE,
          delay: 0.2,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute top-1/6 right-0 w-64 h-64 bg-[var(--color-brand-blue)]/6 rounded-full blur-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.4, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.5,
          ease: SMOOTH_EASE,
          delay: 0.4,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.3, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.5,
          ease: SMOOTH_EASE,
          delay: 0.6,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />

      {/* Geometriske former */}
      <div
        className="absolute bottom-20 right-1/2 w-64 h-64 bg-[var(--color-brand-blue)]/4 rounded-full"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-[var(--color-primary)]/6 rounded-full"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute top-0 right-1/2 w-56 h-56 bg-[var(--color-brand-blue)]/3 rounded-full"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-36 h-36 bg-[var(--color-primary)]/4 rounded-full"
        style={{ transform: "translate3d(0,0,0)" }}
      />

      {/* Subtile prikker */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(var(--color-brand-blue) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          }}
        />
      </div>
    </div>
  );
});

// 🔥 HOVEDKOMPONENT
export default function TeamSection() {
  const t = useTranslations("team"); // 🆕 i18n hook

  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const cardsRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.3 });

  // 🆕 Teammedlemmer data med i18n
  const teamMembers = [
    {
      name: "Frederik Brøsen",
      role: t("members.frederik.role"),
      img: "/images/team/Frederik_Broesen.jpg",
    },
    {
      name: "Oliver Larsen",
      role: t("members.oliver.role"),
      img: "/images/team/Oliver_larsen.jpg",
    },
    {
      name: "Daniel Bonne",
      role: t("members.daniel.role"),
      img: "/images/team/Daniel_Bonne.png",
    },
  ];

  return (
    <motion.section
      id="team"
      ref={sectionRef}
      className="py-20 bg-[var(--color-secondary-light)] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "opacity" }} // 🔥 GPU HINT
    >
      {/* Background Elements - modulær komponent */}
      <BackgroundElements ref={backgroundRef} sectionInView={sectionInView} />

      <div className="container mx-auto px-6 lg:px-20 text-center relative z-10">
        {/* 🆕 Header med i18n */}
        <div className="mb-12">
          <AnimatedHeading
            title={t("title")}
            direction="right"
            className="text-[var(--color-foreground)]"
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
