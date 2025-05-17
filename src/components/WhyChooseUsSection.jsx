"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Zap,
  Clock,
  Code,
  CheckCircle2,
  Award,
} from "lucide-react";

// Statistikker til visning
const stats = [
  { value: "97%", label: "Kundetilfredshed" },
  { value: "24/7", label: "Support" },
  { value: "100%", label: "Skræddersyet" },
];

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.3 });

  // State til at styre hvilke punkter der er udvidet
  const [expanded, setExpanded] = useState({
    technology: false,
    support: false,
    custom: false,
  });

  // Toggle funktion til at udvide/minimere punkter
  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const mediaVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2 + i * 0.1,
      },
    }),
  };

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative scroll-mt-[var(--header-height)] bg-[var(--color-secondary-light)] py-20 lg:py-28 overflow-hidden w-screen"
    >
      {/* Baggrundselementer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute right-0 top-0 w-1/2 h-full opacity-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.08, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/images/compare/computer.png"
            alt=""
            className="absolute top-1/2 right-0 -translate-y-1/2 max-w-2xl"
          />
        </motion.div>
        <motion.div
          className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[var(--color-brand-blue)]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div
          className="absolute left-1/3 -top-32 w-96 h-96 rounded-full bg-[var(--color-brand-blue)]/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
      </div>

      {/* Indhold wrapper */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* Overskrift */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Hvorfor vælge os
            </h2>
            <div className="w-24 h-1 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-8" />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Hos os handler det ikke bare om at lave hjemmesider. Det handler om
            at skabe digitale løsninger, der gør en forskel.
          </motion.p>
        </motion.div>

        {/* Statistikker */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-4xl mx-auto mb-24"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-md border border-[var(--color-brand-blue)]/10 transform hover:scale-105 transition-transform duration-300"
              variants={statVariants}
              custom={i}
            >
              <h3 className="text-4xl lg:text-5xl font-bold text-[var(--color-brand-blue)] mb-2">
                {stat.value}
              </h3>
              <p className="text-lg text-[var(--color-foreground)]/80 mt-2 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Hoved-indhold: video + accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            className="col-span-1 lg:col-span-6 xl:col-span-7 overflow-hidden rounded-xl shadow-xl"
            variants={mediaVariants}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <p className="absolute bottom-6 left-6 bg-black/60 text-white px-5 py-3 rounded-lg text-sm font-medium backdrop-blur-sm">
                Se, hvordan vi samarbejder i praksis
              </p>
            </div>
          </motion.div>

          <motion.div
            className="col-span-1 lg:col-span-6 xl:col-span-5 space-y-6"
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Teknologi */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-[var(--color-brand-blue)]/30 transition-colors duration-300">
              <button
                className="w-full p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleExpand("technology")}
                aria-expanded={expanded.technology}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--color-foreground)]">
                    React-baseret platform: Lynhurtig, fleksibel, fremtidssikret
                  </h3>
                </div>
                <span className="ml-4 flex-shrink-0 text-gray-500">
                  {expanded.technology ? (
                    <ChevronUp size={22} />
                  ) : (
                    <ChevronDown size={22} />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {expanded.technology && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 bg-[var(--color-brand-blue-lighter-bg)] border-t border-gray-100">
                      <p className="text-base leading-relaxed pt-6">
                        Vi arbejder i React, et af verdens mest moderne
                        frontend-teknologier, som sikrer dig en hurtig,
                        fleksibel og fremtidssikret platform. Det betyder
                        lynhurtig indlæsning, høj stabilitet og en
                        brugeroplevelse, dine kunder vil elske – uanset om du er
                        en nystartet iværksætter, en etableret virksomhed eller
                        en offentlig aktør.
                      </p>
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "Lynhurtig indlæsning",
                          "Høj stabilitet",
                          "Moderne UX/UI",
                          "Fremtidssikret",
                        ].map((benefit, idx) => (
                          <div key={idx} className="flex items-center p-2">
                            <CheckCircle2
                              size={18}
                              className="text-[var(--color-brand-blue)] mr-3"
                            />
                            <span className="text-base">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-[var(--color-brand-blue)]/30 transition-colors duration-300">
              <button
                className="w-full p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleExpand("support")}
                aria-expanded={expanded.support}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--color-foreground)]">
                    24/7 support: Klar sparring og hjælp, når du behøver det
                  </h3>
                </div>
                <span className="ml-4 flex-shrink-0 text-gray-500">
                  {expanded.support ? (
                    <ChevronUp size={22} />
                  ) : (
                    <ChevronDown size={22} />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {expanded.support && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 bg-[var(--color-brand-blue-lighter-bg)] border-t border-gray-100">
                      <p className="text-base leading-relaxed pt-6">
                        Vi er altid tilgængelige – 24/7. Har du brug for
                        sparring, teknisk hjælp eller bare et hurtigt svar, så
                        er vi klar. Vi ved, hvor vigtigt det er at få hjælp, når
                        behovet opstår – ikke i morgen.
                      </p>
                      <div className="mt-8 p-4 bg-white rounded-lg border border-[var(--color-brand-blue)]/20">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-medium">
                            Gennemsnitlig responstid:
                          </span>
                          <span className="text-[var(--color-brand-blue)] text-lg font-bold">
                            Under 30 minutter
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Skræddersyet løsning */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-[var(--color-brand-blue)]/30 transition-colors duration-300">
              <button
                className="w-full p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleExpand("custom")}
                aria-expanded={expanded.custom}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center mr-4 flex-shrink-0">
                    <Code size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--color-foreground)]">
                    Skræddersyet løsning: Ingen skabeloner – kun kode fra bunden
                  </h3>
                </div>
                <span className="ml-4 flex-shrink-0 text-gray-500">
                  {expanded.custom ? (
                    <ChevronUp size={22} />
                  ) : (
                    <ChevronDown size={22} />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {expanded.custom && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 bg-[var(--color-brand-blue-lighter-bg)] border-t border-gray-100">
                      <p className="text-base leading-relaxed pt-6">
                        Det, der gør os anderledes? Vi kombinerer teknisk
                        ekspertise med en dyb forståelse for din hverdag. Vi
                        lytter, spørger og udvikler løsninger, der matcher
                        præcis dine behov – ikke bare noget generisk, men noget
                        der skiller dig ud og giver værdi fra dag ét. Hvor andre
                        tilbyder skabeloner, bygger vi fra bunden. Hvor andre
                        siger nej, finder vi en løsning.
                      </p>
                      <div className="mt-8 flex items-center justify-center">
                        <div className="flex items-center p-4 bg-white rounded-full border-2 border-[var(--color-brand-blue)] w-fit">
                          <Award
                            size={22}
                            className="text-[var(--color-brand-blue)] mr-3"
                          />
                          <span className="text-base font-bold text-[var(--color-foreground)]">
                            100% Skræddersyet garanti
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Knap */}
            <motion.a
              href="#contact"
              className="btn-primary inline-block mt-10 w-full text-center shadow-lg group py-4 text-lg"
              variants={buttonVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Lad os tage skridtet sammen
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  repeatType: "loop",
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
