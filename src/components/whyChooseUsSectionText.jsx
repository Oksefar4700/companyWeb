"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
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

// Statistikker til visning
const stats = [
  { value: "97%", label: "Kundetilfredshed" },
  { value: "24/7", label: "Support" },
  { value: "100%", label: "Skræddersyet" },
];

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

  // Individual inView states
  const sectionInView = useInView(sectionRef, { amount: 0.05 });
  const headingInView = useInView(headingRef, { amount: 0.5 });
  const statsInView = useInView(statsRef, { amount: 0.3 });
  const videoInView = useInView(videoRef, { amount: 0.3 });
  const feature1InView = useInView(feature1Ref, { amount: 0.3 });
  const feature2InView = useInView(feature2Ref, { amount: 0.3 });
  const feature3InView = useInView(feature3Ref, { amount: 0.3 });
  const ctaInView = useInView(ctaRef, { amount: 0.8 });

  // Animation controls for different sections
  const controls = useAnimation();
  const statsControls = useAnimation();
  const feature1Controls = useAnimation();
  const feature2Controls = useAnimation();
  const feature3Controls = useAnimation();

  // Update animations for each section independently
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

  // Enhanced animation variants for text
  const textRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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

  const statVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + i * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // New animated letter variants
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
      {/* Baggrundselementer og mønstre */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Store cirkler i baggrunden */}
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[var(--color-brand-blue)]/5"></div>
        <div className="absolute right-1/4 -top-32 w-96 h-96 rounded-full bg-[var(--color-brand-blue)]/5"></div>

        {/* Subtile prikker i baggrunden */}
        <div className="absolute inset-0 opacity-30">
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
          animate={
            headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <AnimatedText
            text="Hvorfor vælge os"
            className="text-4xl md:text-5xl font-extrabold font-heading mb-5"
            isVisible={headingInView}
          />

          <motion.div
            className="w-28 h-1.5 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-10"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              headingInView
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.7, delay: 0.5 }}
          />

          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Hos os handler det ikke bare om at lave hjemmesider. Det handler om
            at skabe digitale løsninger, der gør en forskel.
          </motion.p>
        </motion.div>

        {/* Statistik sektion - individuel animation */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24"
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

        {/* Video og sektion-inddeling med individuel animation */}
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
              className="absolute bottom-0 left-0 right-0 p-10 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={
                videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold mb-3">
                En partner, ikke bare en leverandør
              </h3>
              <p className="text-xl max-w-3xl">
                Vi samarbejder tæt med vores kunder for at forstå deres behov og
                skabe løsninger, der virkelig gør en forskel.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Feature blocks med individuel animation */}
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Feature 1: React teknologi */}
          <motion.div
            ref={feature1Ref}
            className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10"
            custom={0}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={feature1Controls}
          >
            {/* Ikon-side */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <motion.div
                  className="w-32 h-32 lg:w-44 lg:h-44 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    feature1InView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                >
                  <Zap size={72} className="text-[var(--color-brand-blue)]" />
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
                  <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
                </div>
              </div>
            </div>

            {/* Tekstside med forbedret animation */}
            <div className="lg:col-span-8">
              <motion.h3
                className="text-2xl lg:text-3xl font-bold text-[var(--color-foreground)] mb-5"
                variants={textRevealVariants}
                custom={0}
              >
                React-baseret platform: Lynhurtig, fleksibel, fremtidssikret
              </motion.h3>

              <motion.p
                className="text-lg leading-relaxed mb-6"
                variants={textRevealVariants}
                custom={1}
              >
                Vi arbejder i React, et af verdens mest moderne
                frontend-teknologier, som sikrer dig en hurtig, fleksibel og
                fremtidssikret platform. Det betyder lynhurtig indlæsning, høj
                stabilitet og en brugeroplevelse, dine kunder vil elske – uanset
                om du er en nystartet iværksætter, en etableret virksomhed eller
                en offentlig aktør.
              </motion.p>

              {/* Fordele grid med staggered animation */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {[
                  { icon: <Rocket size={20} />, text: "Lynhurtig indlæsning" },
                  { icon: <MessageCircle size={20} />, text: "Høj stabilitet" },
                  { icon: <PenTool size={20} />, text: "Moderne UX/UI" },
                  { icon: <CheckCircle2 size={20} />, text: "Fremtidssikret" },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm"
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
                    <div className="w-10 h-10 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center mr-4">
                      <span className="text-[var(--color-brand-blue)]">
                        {benefit.icon}
                      </span>
                    </div>
                    <span className="text-base font-medium">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 2: 24/7 Support */}
          <motion.div
            ref={feature2Ref}
            className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10"
            custom={1}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={feature2Controls}
          >
            {/* Tekstside - omvendt rækkefølge på desktop */}
            <div className="lg:col-span-8 lg:order-2">
              <motion.h3
                className="text-2xl lg:text-3xl font-bold text-[var(--color-foreground)] mb-5"
                variants={textRevealVariants}
                custom={0}
              >
                24/7 support: Klar sparring og hjælp, når du behøver det
              </motion.h3>

              <motion.p
                className="text-lg leading-relaxed mb-6"
                variants={textRevealVariants}
                custom={1}
              >
                Vi er altid tilgængelige – 24/7. Har du brug for sparring,
                teknisk hjælp eller bare et hurtigt svar, så er vi klar. Vi ved,
                hvor vigtigt det er at få hjælp, når behovet opstår – ikke i
                morgen.
              </motion.p>

              {/* Support-statistik med animation */}
              <motion.div
                className="bg-white rounded-xl p-6 shadow-md mb-5 border-l-4 border-[var(--color-brand-blue)]"
                variants={textRevealVariants}
                custom={2}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      Gennemsnitlig responstid
                    </h4>
                    <p className="text-sm text-gray-600">
                      Baseret på de seneste 1000 henvendelser
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-[var(--color-brand-blue)]">
                    Under 30 minutter
                  </div>
                </div>
              </motion.div>

              {/* Kundeudtalelse med animation */}
              <motion.blockquote
                className="italic text-[var(--color-foreground)]/80 pl-4 border-l-2 border-[var(--color-brand-blue)]/40"
                variants={textRevealVariants}
                custom={3}
              >
                "Vores hjemmeside gik ned fredag aften. Jeg sendte en mail, og
                15 minutter senere var problemet løst. Det kalder jeg service!"
                <footer className="mt-2 text-sm font-medium not-italic">
                  — Morten, CEO hos BrandCo
                </footer>
              </motion.blockquote>
            </div>

            {/* Ikon-side */}
            <div className="lg:col-span-4 lg:order-1 flex justify-center">
              <div className="relative">
                <motion.div
                  className="w-32 h-32 lg:w-44 lg:h-44 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    feature2InView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                >
                  <Clock size={72} className="text-[var(--color-brand-blue)]" />
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
                  <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Skræddersyet løsning */}
          <motion.div
            ref={feature3Ref}
            className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10"
            custom={2}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={feature3Controls}
          >
            {/* Ikon-side */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <motion.div
                  className="w-32 h-32 lg:w-44 lg:h-44 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    feature3InView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                >
                  <Code size={72} className="text-[var(--color-brand-blue)]" />
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">
                  <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-full border-2 border-[var(--color-brand-blue)]/30"></div>
                </div>
              </div>
            </div>

            {/* Tekstside med forbedret animation */}
            <div className="lg:col-span-8">
              <motion.h3
                className="text-2xl lg:text-3xl font-bold text-[var(--color-foreground)] mb-5"
                variants={textRevealVariants}
                custom={0}
              >
                Skræddersyet løsning: Ingen skabeloner – kun kode fra bunden
              </motion.h3>

              <motion.p
                className="text-lg leading-relaxed mb-6"
                variants={textRevealVariants}
                custom={1}
              >
                Det, der gør os anderledes? Vi kombinerer teknisk ekspertise med
                en dyb forståelse for din hverdag. Vi lytter, spørger og
                udvikler løsninger, der matcher præcis dine behov – ikke bare
                noget generisk, men noget der skiller dig ud og giver værdi fra
                dag ét. Hvor andre tilbyder skabeloner, bygger vi fra bunden.
                Hvor andre siger nej, finder vi en løsning.
              </motion.p>

              {/* Garanti-segl med forbedret animation */}
              <motion.div
                className="flex justify-center"
                variants={textRevealVariants}
                custom={2}
              >
                <motion.div
                  className="inline-flex items-center bg-white py-5 px-8 rounded-full border-2 border-[var(--color-brand-blue)] shadow-md mt-4"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Award
                    size={28}
                    className="text-[var(--color-brand-blue)] mr-4"
                  />
                  <span className="text-xl font-bold text-[var(--color-foreground)]">
                    100% Skræddersyet garanti
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA sektion med forbedret animation */}
        <div ref={ctaRef} className="mt-24 text-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-5 text-xl font-semibold bg-[var(--color-brand-blue)] text-white rounded-xl shadow-lg hover:bg-[var(--color-brand-blue-darker)] transition-all duration-300 transform hover:scale-105 group"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Lad os tage skridtet sammen
            <ArrowRight
              size={22}
              className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
