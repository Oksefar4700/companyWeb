"use client";

import { useRef } from "react"; // 🔥 FJERNET: useEffect
import { motion, useInView } from "framer-motion"; // 🔥 FJERNET: useAnimation
import AnimatedHeading from "./AnimatedHeading"; // 🔥 TILFØJET: AnimatedHeading
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

export default function CompareWithWordPress() {
  const gridRef = useRef(null);

  // 🔥 OPTIMERING: once: true - animationer kører kun én gang
  const gridInView = useInView(gridRef, { once: true, amount: 0.3 });

  // 🔥 FJERNET: useEffect hook og animation controls
  // Ikke længere nødvendige!

  // Simplificerede animation varianter
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -50 : 50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="compare"
      className="py-20 scroll-mt-[var(--header-height)] bg-[var(--color-background)]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <AnimatedHeading
          title="React vs. WordPress"
          direction="right"
          className="text-[var(--color-foreground)]"
        />

        <motion.p
          className="text-lg mb-6 text-[var(--color-foreground)]/80 font-[var(--font-body)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Hos os får du ikke bare en standard WordPress-skabelon – du får en
          dynamisk React-løsning.
        </motion.p>

        {/* Comparison Grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate={gridInView ? "visible" : {}} // 🔥 OPTIMERING: Ingen exit
          variants={gridContainerVariants}
        >
          {/* WordPress Card */}
          <motion.div
            className="bg-[var(--color-background)] border border-[var(--color-primary)]/15 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            variants={cardVariants}
            custom="left"
          >
            <div className="flex items-center mb-6">
              <FaWordpress
                size={32}
                className="text-[var(--color-foreground)]/60 mr-3"
              />
              <h3 className="text-2xl font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
                WordPress-skabelon
              </h3>
            </div>
            <ul className="mt-4 space-y-4 text-base">
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FaPlug className="mr-3 text-[var(--color-foreground)]/60 flex-shrink-0" />
                <span>Plug-in-kaos: Mange tredjeparts-plugins</span>
              </li>
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiAlertTriangle className="mr-3 text-[var(--color-foreground)]/60 flex-shrink-0" />
                <span>Uforudsigelige opdateringer kan bryde din side</span>
              </li>
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiBox className="mr-3 text-[var(--color-foreground)]/60 flex-shrink-0" />
                <span>Generisk design, der ligner alle andres</span>
              </li>
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiServer className="mr-3 text-[var(--color-foreground)]/60 flex-shrink-0" />
                <span>Tungere sider med mange plugins</span>
              </li>
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiLock className="mr-3 text-[var(--color-foreground)]/60 flex-shrink-0" />
                <span>Begrænset fleksibilitet uden custom-code</span>
              </li>
            </ul>
          </motion.div>

          {/* React Card */}
          <motion.div
            className="bg-[var(--color-background)] border-2 border-[var(--color-brand-blue)] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            variants={cardVariants}
            custom="right"
          >
            <div className="flex items-center mb-6">
              <FaReact
                size={32}
                className="text-[var(--color-brand-blue)] mr-3"
              />
              <h3 className="text-2xl font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
                React-baseret løsning
              </h3>
            </div>
            <ul className="mt-4 space-y-4 text-base">
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiZap className="mr-3 text-[var(--color-brand-blue)] flex-shrink-0" />
                <span>Ultralynhurtig frontend uden ballast</span>
              </li>
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiRefreshCcw className="mr-3 text-[var(--color-brand-blue)] flex-shrink-0" />
                <span>Dynamisk indhold – automatisk opdateret</span>
              </li>
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiFeather className="mr-3 text-[var(--color-brand-blue)] flex-shrink-0" />
                <span>Fuld kreativ frihed med unikt design</span>
              </li>
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiCode className="mr-3 text-[var(--color-brand-blue)] flex-shrink-0" />
                <span>Nemme opdateringer via kode-repository</span>
              </li>
              <li className="flex items-center text-[var(--color-foreground)]/80">
                <FiUsers className="mr-3 text-[var(--color-brand-blue)] flex-shrink-0" />
                <span>Personlig 24/7 support & sparring</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
