// src/components/CompareWithWordPress.jsx
"use client";

import { useRef, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl"; // 🆕 i18n import
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

// 🔥 ComparisonCard
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
        bg-[var(--color-background)] rounded-xl shadow-lg
        p-6 relative overflow-hidden transition-shadow duration-300
        ${
          isHighlighted
            ? "border-2 border-[var(--color-brand-blue)]"
            : "border border-[var(--color-primary)]/15"
        }
      `}
      initial={{ opacity: 0, x: xStart, scale: 0.95 }}
      animate={cardInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: SMOOTH_EASE, type: "tween" }}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Highlight baggrund for React-kortet */}
      {isHighlighted && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-blue)]/5 to-[var(--color-brand-blue)]/10 rounded-xl"
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: SMOOTH_EASE }}
        />
      )}

      {/* Header */}
      <motion.div
        className="flex items-center mb-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={cardInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: SMOOTH_EASE, delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={cardInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, ease: BOUNCE_EASE, delay: 0.4 }}
        >
          <Icon size={32} className={`mr-3 ${iconColor}`} />
        </motion.div>
        <h3 className="text-2xl font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
          {title}
        </h3>
      </motion.div>

      {/* Liste af features */}
      <motion.ul
        className="space-y-4 text-base relative z-10"
        initial={{ opacity: 0 }}
        animate={cardInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5, staggerChildren: 0.1 }}
      >
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center text-[var(--color-foreground)]/80"
            initial={{ opacity: 0, x: -20 }}
            animate={cardInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              ease: SMOOTH_EASE,
              delay: 0.6 + index * 0.1,
            }}
          >
            <div className="mr-3 flex-shrink-0">
              <feature.icon className={`${feature.iconColor || iconColor}`} />
            </div>
            <span className="font-[var(--font-body)]">{feature.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
});

// 🔥 IntroSection med i18n
const IntroSection = forwardRef(function IntroSection({ introInView, t }, ref) {
  return (
    <motion.p
      ref={ref}
      className="text-lg mb-6 text-[var(--color-foreground)]/80 font-[var(--font-body)] max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={introInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: SMOOTH_EASE, delay: 0.3 }}
      style={{ willChange: "transform, opacity" }}
    >
      {t("subtitle")}
    </motion.p>
  );
});

export default function CompareWithWordPress() {
  const t = useTranslations("compare"); // 🆕 i18n hook

  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);

  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const introInView = useInView(introRef, { once: true, amount: 0.8 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.3 });

  // 🆕 WordPress features med i18n
  const wordpressFeatures = [
    {
      icon: FaPlug,
      iconColor: "text-[var(--color-foreground)]/60",
      text: t("wordpress.features.plugins"),
    },
    {
      icon: FiAlertTriangle,
      iconColor: "text-[var(--color-foreground)]/60",
      text: t("wordpress.features.updates"),
    },
    {
      icon: FiBox,
      iconColor: "text-[var(--color-foreground)]/60",
      text: t("wordpress.features.generic"),
    },
    {
      icon: FiServer,
      iconColor: "text-[var(--color-foreground)]/60",
      text: t("wordpress.features.heavy"),
    },
    {
      icon: FiLock,
      iconColor: "text-[var(--color-foreground)]/60",
      text: t("wordpress.features.limited"),
    },
  ];

  // 🆕 React features med i18n
  const reactFeatures = [
    {
      icon: FiZap,
      iconColor: "text-[var(--color-brand-blue)]",
      text: t("react.features.fast"),
    },
    {
      icon: FiRefreshCcw,
      iconColor: "text-[var(--color-brand-blue)]",
      text: t("react.features.dynamic"),
    },
    {
      icon: FiFeather,
      iconColor: "text-[var(--color-brand-blue)]",
      text: t("react.features.creative"),
    },
    {
      icon: FiCode,
      iconColor: "text-[var(--color-brand-blue)]",
      text: t("react.features.updates"),
    },
    {
      icon: FiUsers,
      iconColor: "text-[var(--color-brand-blue)]",
      text: t("react.features.support"),
    },
  ];

  return (
    <motion.section
      id="compare"
      ref={sectionRef}
      className="
        py-20 scroll-mt-[var(--header-height)]
        bg-gradient-to-b from-[var(--color-brand-blue-lighter-bg)]
                         to-[var(--color-background)]
        relative overflow-hidden
      "
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: SMOOTH_EASE }}
      style={{ willChange: "opacity" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* 🆕 Titel med i18n */}
        <AnimatedHeading
          title={t("title")}
          direction="right"
          className="text-[var(--color-foreground)]"
        />

        {/* 🆕 Intro med i18n */}
        <IntroSection ref={introRef} introInView={introInView} t={t} />

        {/* Sammenligningskort */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComparisonCard
            title={t("wordpress.title")}
            icon={FaWordpress}
            iconColor="text-[var(--color-foreground)]/60"
            features={wordpressFeatures}
            direction="left"
            cardInView={gridInView}
          />

          <ComparisonCard
            title={t("react.title")}
            icon={FaReact}
            iconColor="text-[var(--color-brand-blue)]"
            features={reactFeatures}
            direction="right"
            cardInView={gridInView}
            isHighlighted
          />
        </div>
      </div>
    </motion.section>
  );
}
