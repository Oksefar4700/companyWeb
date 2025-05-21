// src/components/whyChooseUs/WhyUsCTA.jsx
"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WhyUsCTA = ({ 
  href = "#contact", 
  text = "Lad os tage skridtet sammen" 
}) => {
  const ctaRef = useRef(null);
  // Trigger animation when 80% of the element is in view, run once
  const ctaInView = useInView(ctaRef, { amount: 0.8, once: true }); 

  return (
    <div ref={ctaRef} className="mt-14 text-center relative">
      <motion.a
        href={href}
        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-[var(--color-brand-blue)] text-white rounded-lg shadow-md hover:bg-[var(--color-brand-blue-darker)] transition-all duration-300 transform hover:scale-105 group relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: ctaInView ? 0.3 : 0 }} // Conditional delay
        whileHover={{
          scale: 1.03,
          boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        {text}
        <ArrowRight
          size={18}
          className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
        />
      </motion.a>
    </div>
  );
};

export default WhyUsCTA;
