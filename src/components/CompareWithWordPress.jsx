// src/components/CompareWithWordPress.jsx
"use client";

import { useRef, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import { FaWordpress, FaReact, FaPlug } from "react-icons/fa";
import {
  FiAlertTriangle,
  FiBox,
  FiServer,
  FiLock,
  FiZap,
  FiRefreshCcw,
  FiFeather,
  FiCode,
  FiUsers,
} from "react-icons/fi";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.215, 0.61, 0.355, 1];
const BOUNCE_EASE = [0.6, 0.05, -0.01, 0.9];

// 🔥 MODULÆR KOMPONENT: ComparisonCard med forwardRef
const ComparisonCard = forwardRef(function ComparisonCard(
  {
    title,
    icon: Icon,
    iconColor,
    features,
    isHighlighted = false,
    direction = "left",
    cardInView,
  },
  ref
) {
  const xStart = direction === "left" ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      className={`
        bg-[var(--color-background)] rounded-xl shadow-lg hover:shadow-xl 
        transition-shadow duration-300 p-6 relative overflow-hidden
        ${
          isHighlighted
            ? "border-2 border-[var(--color-brand-blue)]"
            : "border border-[var(--color-primary)]/15"
        }
      `}
      initial={{ opacity: 0, x: xStart, scale: 0.95 }}
      animate={
        cardInView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: xStart, scale: 0.95 }
      }
      transition={{
        duration: 0.8,
        ease: SMOOTH_EASE, // 🔥 HARDWARE-ACCELERATED EASING
        type: "tween",
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
    >
      {/* Highlight glow for React card */}
      {isHighlighted && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-blue)]/5 to-[var(--color-brand-blue)]/10 rounded-xl"
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      )}

      {/* Header */}
      <motion.div
        className="flex items-center mb-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          ease: SMOOTH_EASE,
          delay: 0.2,
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={
            cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
          }
          transition={{
            duration: 0.8,
            ease: BOUNCE_EASE, // 🔥 CUSTOM BOUNCE
            delay: 0.4,
          }}
        >
          <Icon size={32} className={`mr-3 ${iconColor}`} />
        </motion.div>
        <h3 className="text-2xl font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
          {title}
        </h3>
      </motion.div>

      {/* Features List */}
      <motion.ul
        className="space-y-4 text-base relative z-10"
        initial={{ opacity: 0 }}
        animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          staggerChildren: 0.1,
        }}
      >
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center text-[var(--color-foreground)]/80"
            initial={{ opacity: 0, x: -20 }}
            animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
              duration: 0.5,
              ease: SMOOTH_EASE,
              delay: 0.6 + index * 0.1,
            }}
          >
            <motion.div
              className="mr-3 flex-shrink-0"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <feature.icon className={`${feature.iconColor || iconColor}`} />
            </motion.div>
            <span className="font-[var(--font-body)]">{feature.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: BackgroundElements (statisk for performance)
const BackgroundElements = forwardRef(function BackgroundElements(
  { sectionInView },
  ref
) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* 🔥 STATISKE GRADIENT CIRKLER MED GPU ACCELERATION */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-brand-blue)]/10 rounded-full blur-3xl"
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
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-[var(--color-primary)]/8 rounded-full blur-2xl"
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

      {/* Subtile prikker i baggrunden */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, var(--color-brand-blue) 1px, transparent 1px),
              linear-gradient(180deg, var(--color-brand-blue) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          }}
        />
      </div>
    </div>
  );
});

// 🔥 MODULÄR KOMPONENT: IntroSection med forwardRef
const IntroSection = forwardRef(function IntroSection({ introInView }, ref) {
  return (
    <motion.p
      ref={ref}
      className="text-lg mb-6 text-[var(--color-foreground)]/80 font-[var(--font-body)] max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE, // 🔥 HARDWARE-ACCELERATED
        delay: 0.3,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      Hos os får du ikke bare en standard WordPress-skabelon – du får en
      dynamisk React-løsning.
    </motion.p>
  );
});

export default function CompareWithWordPress() {
  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const introInView = useInView(introRef, { once: true, amount: 0.8 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.3 });

  // Comparison data
  const wordpressFeatures = [
    {
      icon: FaPlug,
      iconColor: "text-[var(--color-foreground)]/60",
      text: "Plug-in-kaos: Mange tredjeparts-plugins",
    },
    {
      icon: FiAlertTriangle,
      iconColor: "text-[var(--color-foreground)]/60",
      text: "Uforudsigelige opdateringer kan bryde din side",
    },
    {
      icon: FiBox,
      iconColor: "text-[var(--color-foreground)]/60",
      text: "Generisk design, der ligner alle andres",
    },
    {
      icon: FiServer,
      iconColor: "text-[var(--color-foreground)]/60",
      text: "Tungere sider med mange plugins",
    },
    {
      icon: FiLock,
      iconColor: "text-[var(--color-foreground)]/60",
      text: "Begrænset fleksibilitet uden custom-code",
    },
  ];

  const reactFeatures = [
    {
      icon: FiZap,
      iconColor: "text-[var(--color-brand-blue)]",
      text: "Ultralynhurtig frontend uden ballast",
    },
    {
      icon: FiRefreshCcw,
      iconColor: "text-[var(--color-brand-blue)]",
      text: "Dynamisk indhold – automatisk opdateret",
    },
    {
      icon: FiFeather,
      iconColor: "text-[var(--color-brand-blue)]",
      text: "Fuld kreativ frihed med unikt design",
    },
    {
      icon: FiCode,
      iconColor: "text-[var(--color-brand-blue)]",
      text: "Nemme opdateringer via kode-repository",
    },
    {
      icon: FiUsers,
      iconColor: "text-[var(--color-brand-blue)]",
      text: "Personlig 24/7 support & sparring",
    },
  ];

  return (
    <motion.section
      id="compare"
      ref={sectionRef}
      className="py-20 scroll-mt-[var(--header-height)] bg-[var(--color-background)] relative overflow-hidden"
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <AnimatedHeading
          title="React vs. WordPress"
          direction="right"
          className="text-[var(--color-foreground)]"
        />

        {/* Intro - modulær komponent */}
        <IntroSection ref={introRef} introInView={introInView} />

        {/* Comparison Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WordPress Card */}
          <ComparisonCard
            title="WordPress-skabelon"
            icon={FaWordpress}
            iconColor="text-[var(--color-foreground)]/60"
            features={wordpressFeatures}
            direction="left"
            cardInView={gridInView}
          />

          {/* React Card - Highlighted */}
          <ComparisonCard
            title="React-baseret løsning"
            icon={FaReact}
            iconColor="text-[var(--color-brand-blue)]"
            features={reactFeatures}
            direction="right"
            cardInView={gridInView}
            isHighlighted={true}
          />
        </div>
      </div>
    </motion.section>
  );
}
