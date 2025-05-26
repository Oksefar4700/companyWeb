// src/components/whyChooeseUsSection/animations.js
import { useRef, useEffect, useMemo } from "react";
import { useAnimation, useInView } from "framer-motion";

// 🚀 OPTIMERET EASING CURVES (hardware-accelerated)
export const EASING = {
  smooth: [0.25, 0.1, 0.25, 1],
  snappy: [0.215, 0.61, 0.355, 1],
  bounce: [0.6, 0.05, -0.01, 0.9],
};

// 🔥 OPTIMERET useScrollAnimations hook med memoization og performance improvements
export const useScrollAnimations = (refs) => {
  const {
    sectionRef,
    headingRef,
    statsRef,
    videoRef,
    feature1Ref,
    feature2Ref,
    feature3Ref,
    ctaRef,
  } = refs;

  // 🔥 OPTIMERET useInView hooks - mindre aggressive detection + once: true
  const sectionInView = useInView(sectionRef, {
    amount: 0.05,
    once: true,
    margin: "0px 0px -50px 0px", // Preload before visible
  });

  const headingInView = useInView(headingRef, {
    amount: 0.6,
    once: true,
  });

  const statsInView = useInView(statsRef, {
    amount: 0.4,
    once: true,
  });

  const videoInView = useInView(videoRef, {
    amount: 0.3,
    once: true,
    margin: "0px 0px -100px 0px", // Start loading before fully visible
  });

  const feature1InView = useInView(feature1Ref, {
    amount: 0.5,
    once: true,
  });

  const feature2InView = useInView(feature2Ref, {
    amount: 0.5,
    once: true,
  });

  const feature3InView = useInView(feature3Ref, {
    amount: 0.5,
    once: true,
  });

  const ctaInView = useInView(ctaRef, {
    amount: 0.7,
    once: true,
  });

  // 🔥 MEMOIZED ANIMATION CONTROLS - prevent unnecessary re-creates
  const controls = useAnimation();
  const statsControls = useAnimation();
  const feature1Controls = useAnimation();
  const feature2Controls = useAnimation();
  const feature3Controls = useAnimation();

  // 🔥 OPTIMERET EFFECTS - only trigger when necessary
  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    }
  }, [statsControls, statsInView]);

  useEffect(() => {
    if (feature1InView) {
      feature1Controls.start("visible");
    }
  }, [feature1Controls, feature1InView]);

  useEffect(() => {
    if (feature2InView) {
      feature2Controls.start("visible");
    }
  }, [feature2Controls, feature2InView]);

  useEffect(() => {
    if (feature3InView) {
      feature3Controls.start("visible");
    }
  }, [feature3Controls, feature3InView]);

  // 🔥 MEMOIZED RETURN OBJECT - prevent unnecessary re-renders
  return useMemo(
    () => ({
      sectionInView,
      headingInView,
      statsInView,
      videoInView,
      feature1InView,
      feature2InView,
      feature3InView,
      ctaInView,
      controls,
      statsControls,
      feature1Controls,
      feature2Controls,
      feature3Controls,
    }),
    [
      sectionInView,
      headingInView,
      statsInView,
      videoInView,
      feature1InView,
      feature2InView,
      feature3InView,
      ctaInView,
      controls,
      statsControls,
      feature1Controls,
      feature2Controls,
      feature3Controls,
    ]
  );
};

// 🔥 OPTIMERET ANIMATION VARIANTS med GPU acceleration hints
export const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98, // Subtle scale for smoothness
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.1 * i,
      ease: EASING.snappy,
      type: "tween", // GPU-optimized
    },
  }),
};

export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95, // Subtle scale for smoothness
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.05 * i,
      ease: EASING.snappy,
      type: "tween", // GPU-optimized
    },
  }),
};

export const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: 45, // 3D effect
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: 0.03 * i,
      ease: EASING.snappy,
      type: "tween", // GPU-optimized
    },
  }),
};

// 🔥 NYE OPTIMEREDE VARIANTS FOR PERFORMANCE
export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5, // Subtle rotation for interest
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: EASING.bounce,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const slideInVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.95,
  },
  visible: (direction = "left") => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASING.smooth,
      type: "tween",
    },
  }),
};

// 🔥 CONTAINER VARIANTS FOR STAGGERED ANIMATIONS
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ease: EASING.smooth,
    },
  },
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASING.snappy,
      type: "tween",
    },
  },
};

// 🔥 HOVER VARIANTS FOR INTERACTIVE ELEMENTS
export const hoverScale = {
  scale: 1.05,
  y: -2,
  transition: {
    duration: 0.2,
    ease: EASING.smooth,
    type: "tween",
  },
};

export const tapScale = {
  scale: 0.98,
  transition: {
    duration: 0.1,
    ease: EASING.smooth,
    type: "tween",
  },
};

// 🔥 UTILITY FUNCTIONS FOR ANIMATION TIMING
export const getStaggerDelay = (index, baseDelay = 0.1, itemDelay = 0.1) =>
  baseDelay + index * itemDelay;

export const getEasingByType = (type = "smooth") =>
  EASING[type] || EASING.smooth;

// 🔥 PERFORMANCE HELPER: Check if animations should be reduced
export const useReducedMotion = () => {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return prefersReducedMotion;
};

// 🔥 OPTIMERET CUSTOM HOOK: useOptimizedAnimation
export const useOptimizedAnimation = (triggerRef, options = {}) => {
  const { threshold = 0.3, once = true, margin = "0px", delay = 0 } = options;

  const controls = useAnimation();
  const inView = useInView(triggerRef, {
    amount: threshold,
    once,
    margin,
  });

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        controls.start(prefersReducedMotion ? "reducedMotion" : "visible");
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [controls, inView, delay, prefersReducedMotion]);

  return { controls, inView };
};
