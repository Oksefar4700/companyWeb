import { useRef, useEffect } from "react";
import { useAnimation, useInView } from "framer-motion";

// Custom hook til scroll animationer
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

  // Individual inView states - fjernet once:true så elementerne kan reagere på scroll
  const sectionInView = useInView(sectionRef, { amount: 0.05 });
  const headingInView = useInView(headingRef, { amount: 0.8 });
  const statsInView = useInView(statsRef, { amount: 0.6 });
  const videoInView = useInView(videoRef, { amount: 0.5 });
  const feature1InView = useInView(feature1Ref, { amount: 0.6 });
  const feature2InView = useInView(feature2Ref, { amount: 0.6 });
  const feature3InView = useInView(feature3Ref, { amount: 0.6 });
  const ctaInView = useInView(ctaRef, { amount: 0.8 });

  // Animation controls for different sections
  const controls = useAnimation();
  const statsControls = useAnimation();
  const feature1Controls = useAnimation();
  const feature2Controls = useAnimation();
  const feature3Controls = useAnimation();

  // Update animations for each section when they enter/leave viewport
  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    } else {
      statsControls.start("hidden");
    }
  }, [statsControls, statsInView]);

  useEffect(() => {
    if (feature1InView) {
      feature1Controls.start("visible");
    } else {
      feature1Controls.start("hidden");
    }
  }, [feature1Controls, feature1InView]);

  useEffect(() => {
    if (feature2InView) {
      feature2Controls.start("visible");
    } else {
      feature2Controls.start("hidden");
    }
  }, [feature2Controls, feature2InView]);

  useEffect(() => {
    if (feature3InView) {
      feature3Controls.start("visible");
    } else {
      feature3Controls.start("hidden");
    }
  }, [feature3Controls, feature3InView]);

  return {
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
  };
};

// Animation variants som kan genbruges
export const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 * i,
      ease: [0.215, 0.61, 0.355, 1],
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
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.03 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};
