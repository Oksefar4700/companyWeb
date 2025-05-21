// src/components/whyChooseUs/WhyUsHeading.jsx
"use client"; // Required for useInView and useRef

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WhyUsHeading = () => {
  const headingRef = useRef(null);
  // Trigger animation when 80% of the element is in view
  const headingInView = useInView(headingRef, { amount: 0.8, once: true }); 

  return (
    <motion.div
      ref={headingRef}
      className="text-center mb-24"
      initial={{ opacity: 0, y: -20 }}
      animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold font-heading mb-5"
        initial={{ opacity: 0 }}
        // Animate based on headingInView, with a slight delay for the main container
        animate={headingInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: headingInView ? 0.3 : 0 }} 
      >
        Hvorfor vælge os
      </motion.h2>

      <motion.div
        className="w-28 h-1.5 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-10"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={headingInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay: headingInView ? 0.5 : 0 }}
      />

      <motion.p
        className="text-lg md:text-xl max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: headingInView ? 0.7 : 0 }}
      >
        Hos os handler det ikke bare om at lave hjemmesider. Det handler om
        at skabe digitale løsninger, der gør en forskel.
      </motion.p>
    </motion.div>
  );
};

export default WhyUsHeading;
