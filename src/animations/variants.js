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

// Basale fade-in animationer - Simple objekt variant
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easings.easeOut },
  },
};

// Funktions-baserede varianter med delay parameter
export const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.heroEase,
      delay,
    },
  },
});

// Retningsspecifikke fade-in animationer - Simple objekt varianter
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

// Variants der kan tage delay parameter som funktion
export const fadeInDown = (delay = 0) => ({
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
      delay,
    },
  },
});

// Scale-baserede animationer - Som funktioner der tager delay
export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easings.easeOut,
      delay,
    },
  },
});

// Stagger container-animationer - Simple objekt varianter
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Custom stagger med justerbare parametre
export const customStagger = (staggerDelay = 0.1, initialDelay = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

// Hover-animationer - Simple objekter
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

export const cardHover = {
  scale: 1.03,
  y: -5,
  boxShadow:
    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 15,
  },
};

// Hjælpefunktioner til animation timings
export const getStaggerDelay = (index, baseDelay = 0.2, itemDelay = 0.1) => {
  return baseDelay + index * itemDelay;
};

// Drawer-specifikke animationer
export const slideInRight = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "tween", duration: 0.4 } },
  exit: { x: "100%", transition: { type: "tween", duration: 0.4 } },
};
