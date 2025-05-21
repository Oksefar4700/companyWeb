// src/components/whyChooseUs/WhyUsStats.jsx
"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { stats as statsData } from '@/data/whyChooseUsData'; // Adjusted path assuming @ is src

const WhyUsStats = () => {
  const statsRef = useRef(null);
  const statsControls = useAnimation();
  // Trigger animation when 60% of the element is in view, run once
  const statsInView = useInView(statsRef, { amount: 0.6, once: true }); 

  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    } else {
      // Optional: If 'once: true' is not used, handle hiding animation
      // statsControls.start("hidden"); 
    }
  }, [statsControls, statsInView]);

  const statVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + i * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const containerVariants = {
    hidden: {}, // Can be { opacity: 0 } if desired for the container itself
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={statsRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24 relative"
      initial="hidden"
      animate={statsControls}
      variants={containerVariants}
    >
      {statsData.map((stat, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-xl p-8 text-center shadow-lg border border-[var(--color-brand-blue)]/10 transform hover:translate-y-[-5px] transition-transform duration-300"
          variants={statVariants}
          custom={i} // Pass index for custom delay in statVariants
        >
          <h3 className="text-5xl font-bold text-[var(--color-brand-blue)] mb-2">
            {stat.value}
          </h3>
          <p className="text-lg text-[var(--color-foreground)]/80 mt-2 font-medium">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WhyUsStats;
