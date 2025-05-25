// src/animations/variants.js

/**
 * Framer Motion animation varianter specifikt til CompanyWeb
 */

// Genbrugte easings
export const easings = {
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  heroEase: [0.22, 1, 0.36, 1],
  logoEase: [0.17, 0.67, 0.83, 0.97],
};

// Basale fade-in animationer (enkelt objekt)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easings.easeOut },
  },
};

// Fade-in opad med valgfrit delay
export const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easings.heroEase, delay },
  },
});

// Fade-in til venstre/højre
export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.easeOut },
  },
};
export const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.easeOut },
  },
};

// Fade-in nedad med valgfrit delay
export const fadeInDown = (delay = 0) => ({
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.easeOut, delay },
  },
});

// Scale-animation med valgfri delay
export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easings.easeOut, delay },
  },
});

// Stagger-containere
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
export const customStagger = (staggerDelay = 0.1, initialDelay = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: staggerDelay, delayChildren: initialDelay },
  },
});

// Knappens hover/tap
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

// Standard kort-hover (kan bruges hvis du vil genbruge)
export const cardHover = {
  scale: 1.03,
  y: -5,
  boxShadow:
    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  transition: { type: "spring", stiffness: 300, damping: 15 },
};

// Hjælpefunktion til at regne delay ud
export const getStaggerDelay = (index, baseDelay = 0.2, itemDelay = 0.1) =>
  baseDelay + index * itemDelay;

// ==========================================
// AboutSection-specifikke varianter:
// ==========================================

// Baggrunds-cirkler i AboutSection
export const aboutCircleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: ({ delay, opacity, scale }) => ({
    opacity,
    scale,
    transition: { duration: 1.2, ease: easings.easeInOut, delay },
  }),
};

// Kort-entré i AboutSection
export const aboutCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2 + 0.4,
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  }),
};
