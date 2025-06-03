"use client";

import { useRef, useEffect } from "react";
import { useAnimation, useInView } from "framer-motion";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
export const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 * i,
      ease: [0.215, 0.61, 0.355, 1], // 🔥 hardware-accelerated easing
    },
  }),
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1], // 🔥 hardware-accelerated easing
    },
  }),
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1], // 🔥 hardware-accelerated easing
    },
  },
};

export const slideInVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1], // 🔥 hardware-accelerated easing
    },
  },
};

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

export const useScrollAnimations = (refs) => {
  const {
    sectionRef,
    descriptionRef,
    statsRef,
    videoRef,
    feature1Ref,
    feature2Ref,
    feature3Ref,
    ctaRef,
  } = refs;

  const sectionInView = useInView(sectionRef, { amount: 0.05, once: true });
  const descriptionInView = useInView(descriptionRef, {
    amount: 0.6,
    once: true,
  });
  const statsInView = useInView(statsRef, { amount: 0.4, once: true });
  const videoInView = useInView(videoRef, { amount: 0.3, once: true });
  const feature1InView = useInView(feature1Ref, { amount: 0.4, once: true });
  const feature2InView = useInView(feature2Ref, { amount: 0.4, once: true });
  const feature3InView = useInView(feature3Ref, { amount: 0.4, once: true });
  const ctaInView = useInView(ctaRef, { amount: 0.6, once: true });

  const controls = useAnimation();
  const statsControls = useAnimation();
  const feature1Controls = useAnimation();
  const feature2Controls = useAnimation();
  const feature3Controls = useAnimation();

  useEffect(() => {
    if (statsInView) statsControls.start("visible");
  }, [statsControls, statsInView]);

  useEffect(() => {
    if (feature1InView) feature1Controls.start("visible");
  }, [feature1Controls, feature1InView]);

  useEffect(() => {
    if (feature2InView) feature2Controls.start("visible");
  }, [feature2Controls, feature2InView]);

  useEffect(() => {
    if (feature3InView) feature3Controls.start("visible");
  }, [feature3Controls, feature3InView]);

  return {
    sectionInView,
    descriptionInView,
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
  };
};
