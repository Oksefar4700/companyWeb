// Genbrugelige animation-variants med forbedret smoothness
export const mediaVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth ending
      type: "tween",
    },
  },
};

export const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.2, 0.1, 0.3, 1], // Custom easing curve
      delay: 0.2,
    },
  },
};

export const buttonVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut", // Smoother in-out easing
      delay: 0.4,
    },
  },
};

export const statVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "tween",
      duration: 0.5,
      delay: 0.1 + i * 0.06,
      ease: [0.22, 1, 0.36, 1], // Speciel cubic-bezier kurve (en type af "backOut" kurve)
    },
  }),
};
