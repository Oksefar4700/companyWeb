"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import {
  Zap,
  Clock,
  Code,
  CheckCircle2,
  Award,
  ArrowRight,
  MessageCircle,
  PenTool,
  Rocket,
} from "lucide-react";

// Importér data fra datafilen
import { stats, accordionItems } from "@/data/whyChooseUsData";

export default function WhyChooseUsSection() {
  // Individual refs for each section
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const feature1Ref = useRef(null);
  const feature2Ref = useRef(null);
  const feature3Ref = useRef(null);
  const ctaRef = useRef(null);

  // Individual inView states - fjernet once:true så elementerne kan reagere på scroll
  const sectionInView = useInView(sectionRef, { amount: 0.05 });
  const headingInView = useInView(headingRef, { amount: 0.8 });
  const statsInView = useInView(statsRef, { amount: 0.6 });
  const videoInView = useInView(videoRef, { amount: 0.5 });
  const feature1InView = useInView(feature1Ref, { amount: 0.6 });
  const feature2InView = useInView(feature2Ref, { amount: 0.6 });
  const feature3InView = useInView(feature3Ref, { amount: 0.6 });
  const ctaInView = useInView(ctaRef, { amount: 0.8 });

  // Animation controls for different sections med opdaterede useEffect hooks
  const controls = useAnimation();
  const statsControls = useAnimation();
  const feature1Controls = useAnimation();
  const feature2Controls = useAnimation();
  const feature3Controls = useAnimation();

  // Update animations for each section when they enter/leave viewport
  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    } else {
      statsControls.start("hidden");
    }
  }, [statsControls, statsInView]);

  useEffect(() => {
    if (feature1InView) {
      feature1Controls.start("visible");
    } else {
      feature1Controls.start("hidden");
    }
  }, [feature1Controls, feature1InView]);

  useEffect(() => {
    if (feature2InView) {
      feature2Controls.start("visible");
    } else {
      feature2Controls.start("hidden");
    }
  }, [feature2Controls, feature2InView]);

  useEffect(() => {
    if (feature3InView) {
      feature3Controls.start("visible");
    } else {
      feature3Controls.start("hidden");
    }
  }, [feature3Controls, feature3InView]);

  // Enhanced animation variants for text with scroll trigger
  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.1 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Statistik sektion - individuel animation med fade-out
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

  // Animated letter variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.03 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Section heading with icon integration
  const FeatureIcon = ({ icon, isVisible, iconRef }) => (
    <div className="flex justify-center mb-6 relative z-10" ref={iconRef}>
      <div className="relative">
        <motion.div
          className="w-28 h-28 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
        >
          {icon === "computer" ? (
            <div className="w-16 h-16 relative">
              <Image
                src="/images/compare/computer.png"
                alt=""
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          ) : (
            icon
          )}
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
          <div className="w-28 h-28 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
        </div>
      </div>
    </div>
  );

  // Animated title function
  const AnimatedText = ({ text, className, isVisible }) => {
    return (
      <div className={className}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative scroll-mt-[var(--header-height)] bg-[var(--color-secondary-light)] py-24 lg:py-32 overflow-hidden"
    >
      {/* Computer illustration og stor sky i baggrunden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stor computer i baggrunden - dækket delvist af indhold */}
        <div className="absolute right-0 bottom-0 w-full h-full flex justify-end items-end">
          <div className="relative w-[900px] h-[900px] opacity-15 transform translate-x-[15%] translate-y-[15%]">
            <Image
              src="/images/compare/computer.png"
              alt=""
              width={900}
              height={900}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Elegant baggrundsgradient der sikrer læsbarhed */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, transparent 50%, var(--color-secondary-light) 120%)",
          }}
        ></div>

        {/* Flyt skyen helt op til toppen med større afstand fra indholdet */}
        <div className="absolute left-0 top-0 w-[600px] h-[400px] opacity-10 transform translate-y-[-15%]">
          <Image
            src="/images/whyChooseUs/cloud.png"
            alt=""
            width={600}
            height={400}
            className="object-contain"
            style={{
              filter: "drop-shadow(0 8px 12px rgba(126, 174, 219, 0.12))",
            }}
            priority
          />
        </div>

        {/* Subtile prikker i baggrunden */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-brand-blue) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Overskrift sektion med forbedret animation */}
        <motion.div
          ref={headingRef}
          className="text-center mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: headingInView ? 1 : 0,
            y: headingInView ? 0 : -20,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold font-heading mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: headingInView ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Hvorfor vælge os
          </motion.h2>

          <motion.div
            className="w-28 h-1.5 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-10"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: headingInView ? 1 : 0,
              opacity: headingInView ? 1 : 0,
            }}
            transition={{ duration: 0.7, delay: 0.5 }}
          />

          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: headingInView ? 1 : 0,
              y: headingInView ? 0 : 20,
            }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Hos os handler det ikke bare om at lave hjemmesider. Det handler om
            at skabe digitale løsninger, der gør en forskel.
          </motion.p>
        </motion.div>

        {/* Statistik sektion - individuel animation uden baggrundselementer */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24 relative"
          initial="hidden"
          animate={statsControls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Stats cards uden baggrundsfigurer */}
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl p-8 text-center shadow-lg border border-[var(--color-brand-blue)]/10 transform hover:translate-y-[-5px] transition-transform duration-300"
              variants={statVariants}
              custom={i}
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

        {/* Video og sektion-inddeling med individuel animation - uden baggrundsgrafik */}
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
              animate={
                videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
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

        {/* Feature blocks med individuel animation - CENTRERET LAYOUT */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Feature 1: React teknologi - uden baggrundsgrafik */}
          <motion.div
            ref={feature1Ref}
            className="flex flex-col items-center text-center relative py-4 px-4 rounded-lg"
            custom={0}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={feature1Controls}
          >
            {/* Scroll-aktiveret highlight-effekt */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-blue)]/0 via-[var(--color-brand-blue)]/3 to-[var(--color-brand-blue)]/0 rounded-lg opacity-0 transition-opacity duration-1000"
              style={{
                opacity: feature1InView ? 0.5 : 0,
                transitionDelay: "0.3s",
              }}
            ></div>

            {/* Ikon centreret - med once-triggered animation */}
            <div className="flex justify-center mb-6 relative z-10">
              <div className="relative">
                <motion.div
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: feature1InView ? 1 : 0,
                    opacity: feature1InView ? 1 : 0,
                  }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                >
                  <Zap size={48} className="text-[var(--color-brand-blue)]" />
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
                </div>
              </div>
            </div>

            {/* Tekst centreret - kortere spacing */}
            <div className="max-w-3xl mx-auto">
              <motion.h3
                className="text-xl lg:text-2xl font-bold text-[var(--color-foreground)] mb-3"
                variants={textRevealVariants}
                custom={0}
              >
                {accordionItems[0].title}
              </motion.h3>

              <motion.p
                className="text-base leading-relaxed mb-5"
                variants={textRevealVariants}
                custom={1}
              >
                {accordionItems[0].content.paragraph}
              </motion.p>

              {/* Fordele grid med staggered animation - mindre spacing */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-4xl mx-auto"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {[
                  {
                    icon: <Rocket size={18} />,
                    text: accordionItems[0].content.benefits[0],
                  },
                  {
                    icon: <MessageCircle size={18} />,
                    text: accordionItems[0].content.benefits[1],
                  },
                  {
                    icon: <PenTool size={18} />,
                    text: accordionItems[0].content.benefits[2],
                  },
                  {
                    icon: <CheckCircle2 size={18} />,
                    text: accordionItems[0].content.benefits[3],
                  },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center p-3 bg-white rounded-lg shadow-sm"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.2 + i * 0.1,
                        },
                      },
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center mr-3">
                      <span className="text-[var(--color-brand-blue)]">
                        {benefit.icon}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 2: 24/7 Support - uden baggrundsgrafik */}
          <motion.div
            ref={feature2Ref}
            className="flex flex-col items-center text-center relative py-4 px-4 rounded-lg mt-4"
            custom={1}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={feature2Controls}
          >
            {/* Scroll-aktiveret highlight-effekt */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-blue)]/0 via-[var(--color-brand-blue)]/3 to-[var(--color-brand-blue)]/0 rounded-lg opacity-0 transition-opacity duration-1000"
              style={{
                opacity: feature2InView ? 0.5 : 0,
                transitionDelay: "0.3s",
              }}
            ></div>

            {/* Ikon centreret - med once-triggered animation */}
            <div className="flex justify-center mb-6 relative z-10">
              <div className="relative">
                <motion.div
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: feature2InView ? 1 : 0,
                    opacity: feature2InView ? 1 : 0,
                  }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                >
                  <Clock size={48} className="text-[var(--color-brand-blue)]" />
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
                </div>
              </div>
            </div>

            {/* Tekst centreret - kortere spacing */}
            <div className="max-w-3xl mx-auto">
              <motion.h3
                className="text-xl lg:text-2xl font-bold text-[var(--color-foreground)] mb-3"
                variants={textRevealVariants}
                custom={0}
              >
                {accordionItems[1].title}
              </motion.h3>

              <motion.p
                className="text-base leading-relaxed mb-5"
                variants={textRevealVariants}
                custom={1}
              >
                {accordionItems[1].content.paragraph}
              </motion.p>

              {/* Support-statistik med animation - kompakt */}
              <motion.div
                className="bg-white rounded-lg p-4 shadow-md mb-3 border-l-4 border-[var(--color-brand-blue)] max-w-lg mx-auto"
                variants={textRevealVariants}
                custom={2}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h4 className="text-base font-semibold mb-1">
                      Gennemsnitlig responstid
                    </h4>
                    <p className="text-xs text-gray-600">
                      Baseret på de seneste 1000 henvendelser
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-brand-blue)]">
                    {accordionItems[1].content.responseTime}
                  </div>
                </div>
              </motion.div>

              {/* Kundeudtalelse med animation - kompakt */}
              <motion.blockquote
                className="italic text-[var(--color-foreground)]/80 pl-4 border-l-2 border-[var(--color-brand-blue)]/40 max-w-md mx-auto text-sm"
                variants={textRevealVariants}
                custom={3}
              >
                "Vores hjemmeside gik ned fredag aften. Jeg sendte en mail, og
                15 minutter senere var problemet løst. Det kalder jeg service!"
                <footer className="mt-1 text-xs font-medium not-italic">
                  — Morten, CEO hos BrandCo
                </footer>
              </motion.blockquote>
            </div>
          </motion.div>

          {/* Feature 3: Skræddersyet løsning - uden baggrundsgrafik */}
          <motion.div
            ref={feature3Ref}
            className="flex flex-col items-center text-center relative py-4 px-4 rounded-lg mt-4"
            custom={2}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={feature3Controls}
          >
            {/* Scroll-aktiveret highlight-effekt */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-blue)]/0 via-[var(--color-brand-blue)]/3 to-[var(--color-brand-blue)]/0 rounded-lg opacity-0 transition-opacity duration-1000"
              style={{
                opacity: feature3InView ? 0.5 : 0,
                transitionDelay: "0.3s",
              }}
            ></div>

            {/* Ikon centreret - med once-triggered animation */}
            <div className="flex justify-center mb-6 relative z-10">
              <div className="relative">
                <motion.div
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: feature3InView ? 1 : 0,
                    opacity: feature3InView ? 1 : 0,
                  }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                >
                  <Code size={48} className="text-[var(--color-brand-blue)]" />
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
                </div>
              </div>
            </div>

            {/* Tekst centreret - kortere spacing */}
            <div className="max-w-3xl mx-auto">
              <motion.h3
                className="text-xl lg:text-2xl font-bold text-[var(--color-foreground)] mb-3"
                variants={textRevealVariants}
                custom={0}
              >
                {accordionItems[2].title}
              </motion.h3>

              <motion.p
                className="text-base leading-relaxed mb-5"
                variants={textRevealVariants}
                custom={1}
              >
                {accordionItems[2].content.paragraph}
              </motion.p>

              {/* Garanti-segl med forbedret animation - kompakt */}
              <motion.div
                className="flex justify-center"
                variants={textRevealVariants}
                custom={2}
              >
                <motion.div
                  className="inline-flex items-center bg-white py-3 px-5 rounded-full border-2 border-[var(--color-brand-blue)] shadow-md mt-3"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Award
                    size={22}
                    className="text-[var(--color-brand-blue)] mr-3"
                  />
                  <span className="text-base font-bold text-[var(--color-foreground)]">
                    {accordionItems[2].content.guarantee}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA sektion med forbedret animation - uden baggrundsgrafik */}
        <div ref={ctaRef} className="mt-14 text-center relative">
          <motion.a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-[var(--color-brand-blue)] text-white rounded-lg shadow-md hover:bg-[var(--color-brand-blue-darker)] transition-all duration-300 transform hover:scale-105 group relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Lad os tage skridtet sammen
            <ArrowRight
              size={18}
              className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
