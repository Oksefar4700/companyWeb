"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    setExpanded({
      ...expanded,
      [key]: !expanded[key],
    });
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

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative scroll-mt-[var(--header-height)] bg-[var(--color-secondary-light)] py-16 lg:py-24 overflow-hidden"
    >
      {/* Baggrunds-elementer */}
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
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Overskrift sektion - centreret */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-3">
            Hvorfor vælge os
          </h2>
          <div className="w-24 h-1 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-6" />
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Hos os handler det ikke bare om at lave hjemmesider. Det handler om
            at skabe digitale løsninger, der gør en forskel.
          </p>
        </div>

        {/* Hoved content area - to kolonner på desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Video kolonne - større på desktop */}
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
              <p className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                Se, hvordan vi samarbejder i praksis
              </p>
            </div>
          </motion.div>

          {/* Accordion kolonne */}
          <motion.div
            className="col-span-1 lg:col-span-6 xl:col-span-5 space-y-4"
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Punkt 1: Teknologi */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <button
                className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleExpand("technology")}
                aria-expanded={expanded.technology}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-[var(--color-foreground)]">
                    React-baseret platform: Lynhurtig, fleksibel, fremtidssikret
                  </h3>
                </div>
                <span className="ml-4 flex-shrink-0 text-gray-500">
                  {expanded.technology ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
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
                    <div className="p-4 pt-0 bg-[var(--color-brand-blue-lighter-bg)] border-t border-gray-100">
                      <p className="text-base leading-relaxed">
                        Vi arbejder i React, et af verdens mest moderne
                        frontend-teknologier, som sikrer dig en hurtig,
                        fleksibel og fremtidssikret platform. Det betyder
                        lynhurtig indlæsning, høj stabilitet og en
                        brugeroplevelse, dine kunder vil elske – uanset om du er
                        en nystartet iværksætter, en etableret virksomhed eller
                        en offentlig aktør.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Punkt 2: Support */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <button
                className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleExpand("support")}
                aria-expanded={expanded.support}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-[var(--color-foreground)]">
                    24/7 support: Klar sparring og hjælp, når du behøver det
                  </h3>
                </div>
                <span className="ml-4 flex-shrink-0 text-gray-500">
                  {expanded.support ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
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
                    <div className="p-4 pt-0 bg-[var(--color-brand-blue-lighter-bg)] border-t border-gray-100">
                      <p className="text-base leading-relaxed">
                        Vi er altid tilgængelige – 24/7. Har du brug for
                        sparring, teknisk hjælp eller bare et hurtigt svar, så
                        er vi klar. Vi ved, hvor vigtigt det er at få hjælp, når
                        behovet opstår – ikke i morgen.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Punkt 3: Løsning */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <button
                className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleExpand("custom")}
                aria-expanded={expanded.custom}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-[var(--color-foreground)]">
                    Skræddersyet løsning: Ingen skabeloner – kun kode fra bunden
                  </h3>
                </div>
                <span className="ml-4 flex-shrink-0 text-gray-500">
                  {expanded.custom ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
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
                    <div className="p-4 pt-0 bg-[var(--color-brand-blue-lighter-bg)] border-t border-gray-100">
                      <p className="text-base leading-relaxed">
                        Det, der gør os anderledes? Vi kombinerer teknisk
                        ekspertise med en dyb forståelse for din hverdag. Vi
                        lytter, spørger og udvikler løsninger, der matcher
                        præcis dine behov – ikke bare noget generisk, men noget
                        der skiller dig ud og giver værdi fra dag ét. Hvor andre
                        tilbyder skabeloner, bygger vi fra bunden. Hvor andre
                        siger nej, finder vi en løsning.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Knap */}
            <motion.a
              href="#contact"
              className="btn-primary inline-block mt-6 w-full text-center"
              variants={buttonVariants}
              initial="hidden"
              animate={controls}
            >
              Lad os tage skridtet sammen
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
