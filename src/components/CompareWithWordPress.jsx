// src/components/CompareWithWordPress.jsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaWordpress, FaReact, FaPlug } from "react-icons/fa";
import {
  FiAlertTriangle,
  FiBox,
  FiServer,
  FiLock,
  FiZap,
  FiRefreshCcw,
  FiFeather,
  FiCode,
  FiUsers,
} from "react-icons/fi";
// Import animation variants
import { fadeIn } from "../animations/variants";

export default function CompareWithWordPress() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.3 }); // Animation starter når 30% er synligt

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  // Using fadeIn from variants as the basic structure is the same
  const gridContainerVariants = {
    ...fadeIn,
    visible: {
      ...fadeIn.visible,
      transition: {
        duration: 0.5,
        ease: "easeIn",
        when: "beforeChildren",
        staggerChildren: 0.2, // Forsinkelse mellem børne-animationer
      },
    },
  };

  const cardVariants = {
    hidden: (custom) => ({
      opacity: 0,
      x: custom,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 35, // Øget dæmpning for at reducere "bounce" og gøre slutningen glattere
        stiffness: 150, // Justeret stivhed; kan eksperimenteres med sammen med damping
        restDelta: 0.001, // Hjælper med at definere en skarpere afslutning for animationen
      },
    },
  };

  const gpuHint = { willChange: "transform, opacity" }; // Optimeringsforslag til browseren

  return (
    <section
      id="compare"
      ref={ref}
      className="py-20 scroll-mt-[var(--header-height)]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold font-heading mb-2">
          React vs. WordPress
        </h2>
        <p className="text-lg mb-6">
          Hos os får du ikke bare en standard WordPress-skabelon – du får en
          dynamisk React-løsning.
        </p>
        <div className="mx-auto mb-12 w-24 h-1 bg-[var(--color-brand-blue)] rounded-full" />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate={controls}
          variants={gridContainerVariants}
        >
          {/* WordPress-kort: ind fra venstre */}
          <motion.div
            className="custom-card p-6"
            variants={cardVariants}
            custom={-100}
            style={gpuHint}
          >
            <div className="flex items-center mb-6">
              <FaWordpress size={32} className="text-gray-600 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-800">
                WordPress-skabelon
              </h3>
            </div>
            <ul className="mt-4 pl-6 space-y-4 text-lg">
              <li className="flex items-center">
                <FaPlug className="mr-3 text-gray-600" />
                <span>Plug-in-kaos: Mange tredjeparts-plugins</span>
              </li>
              <li className="flex items-center">
                <FiAlertTriangle className="mr-3 text-gray-600" />
                <span>Uforudsigelige opdateringer kan bryde din side</span>
              </li>
              <li className="flex items-center">
                <FiBox className="mr-3 text-gray-600" />
                <span>Generisk design, der ligner alle andres</span>
              </li>
              <li className="flex items-center">
                <FiServer className="mr-3 text-gray-600" />
                <span>Tungere sider med mange plugins</span>
              </li>
              <li className="flex items-center">
                <FiLock className="mr-3 text-gray-600" />
                <span>Begrænset fleksibilitet uden custom-code</span>
              </li>
            </ul>
          </motion.div>

          {/* React-kort: ind fra højre */}
          <motion.div
            className="custom-card p-6 border-[var(--color-brand-blue)]"
            variants={cardVariants}
            custom={100}
            style={gpuHint}
          >
            <div className="flex items-center mb-6">
              <FaReact
                size={32}
                className="text-[var(--color-brand-blue)] mr-3"
              />
              <h3 className="text-2xl font-semibold text-[var(--color-foreground)]">
                React-baseret løsning
              </h3>
            </div>
            <ul className="mt-4 pl-6 space-y-4 text-lg">
              <li className="flex items-center">
                <FiZap className="mr-3 text-[var(--color-brand-blue)]" />
                <span>Ultralynhurtig frontend uden ballast</span>
              </li>
              <li className="flex items-center">
                <FiRefreshCcw className="mr-3 text-[var(--color-brand-blue)]" />
                <span>Dynamisk indhold – automatisk opdateret</span>
              </li>
              <li className="flex items-center">
                <FiFeather className="mr-3 text-[var(--color-brand-blue)]" />
                <span>Fuld kreativ frihed med unikt design</span>
              </li>
              <li className="flex items-center">
                <FiCode className="mr-3 text-[var(--color-brand-blue)]" />
                <span>Nemme opdateringer via kode-repository</span>
              </li>
              <li className="flex items-center">
                <FiUsers className="mr-3 text-[var(--color-brand-blue)]" />
                <span>Personlig 24/7 support & sparring</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
