"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const videoVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative scroll-mt-[var(--header-height)] bg-[var(--color-secondary-light)] py-16 lg:py-20 px-6 lg:px-12 overflow-hidden"
    >
      {/* Baggrunds‐sky ude til højre */}
      <motion.div
        className="absolute inset-0 flex justify-end items-center pr-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{
          opacity: 0.12,
          scale: 1,
          rotate: 0,
          transition: { duration: 1.2, ease: "easeOut" },
        }}
      >
        <img
          src="/images/compare/computer.png"
          alt=""
          className="max-w-xs lg:max-w-md"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div
          className="col-span-1 lg:col-span-8 overflow-hidden rounded-xl shadow-lg"
          variants={videoVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="aspect-video relative">
            <video
              src="/videos/why_us_demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <p className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
              Se, hvordan vi samarbejder i praksis
            </p>
          </div>
        </motion.div>

        <motion.div
          className="col-span-1 lg:col-span-4 space-y-6"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-2">
              Hvorfor vælge os
            </h2>
            <div className="w-16 h-1 bg-[var(--color-brand-blue)] rounded-full mb-4" />
          </div>
          <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
            <li>
              <strong>React-baseret platform:</strong> Lynhurtig, fleksibel,
              fremtidssikret.
            </li>
            <li>
              <strong>24/7 support:</strong> Klar sparring og hjælp, når du
              behøver det.
            </li>
            <li>
              <strong>Skræddersyet løsning:</strong> Ingen skabeloner – kun kode
              fra bunden.
            </li>
          </ul>
          <motion.a
            href="#contact"
            className="btn-primary inline-block"
            variants={buttonVariants}
            initial="hidden"
            animate={controls}
          >
            Lad os tage skridtet sammen
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
