// src/components/whyChooseUs/WhyUsVideoPlayer.jsx
"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WhyUsVideoPlayer = () => {
  const videoRef = useRef(null);
  // Trigger animation when 50% of the element is in view, run once
  const videoInView = useInView(videoRef, { amount: 0.5, once: true }); 

  return (
    <div
      ref={videoRef}
      className="max-w-6xl mx-auto mb-20 overflow-hidden rounded-2xl shadow-2xl relative"
    >
      <div className="aspect-video">
        <video
          src="/videos/why_us_demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-10 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: videoInView ? 0.3 : 0 }} // Conditional delay
        >
          <h3 className="text-3xl font-bold mb-3">
            En partner, ikke bare en leverandør
          </h3>
          <p className="text-xl max-w-3xl mx-auto">
            Vi samarbejder tæt med vores kunder for at forstå deres behov og
            skabe løsninger, der virkelig gør en forskel.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyUsVideoPlayer;
