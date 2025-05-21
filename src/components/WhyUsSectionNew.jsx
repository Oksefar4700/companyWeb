"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
// import Image from "next/image"; // Removed as FeatureIcon is removed
import {
  Zap,
  Clock,
  Code,
  CheckCircle2,
  Award,
  // ArrowRight, // Moved to WhyUsCTA
  MessageCircle,
  PenTool,
  Rocket,
} from "lucide-react";

// Importér data fra datafilen
import { accordionItems } from "@/data/whyChooseUsData"; // Removed stats
import WhyUsBackgroundVisuals from "./whyChooseUs/WhyUsBackgroundVisuals";
import WhyUsHeading from "./whyChooseUs/WhyUsHeading";
import WhyUsStats from "./whyChooseUs/WhyUsStats";
import WhyUsVideoPlayer from "./whyChooseUs/WhyUsVideoPlayer";
import WhyUsFeatureBlock from "./whyChooseUs/WhyUsFeatureBlock";
import WhyUsCTA from "./whyChooseUs/WhyUsCTA";

export default function WhyChooseUsSection() {
  // Individual refs for each section
  const sectionRef = useRef(null);
  // const headingRef = useRef(null); // Moved to WhyUsHeading
  // const statsRef = useRef(null); // Moved to WhyUsStats
  // const videoRef = useRef(null); // Moved to WhyUsVideoPlayer
  const feature1Ref = useRef(null);
  const feature2Ref = useRef(null);
  const feature3Ref = useRef(null);
  // const ctaRef = useRef(null); // Moved to WhyUsCTA

  // Individual inView states
  // const sectionInView = useInView(sectionRef, { amount: 0.05 }); // Removed, not used for parent animation
  // const headingInView = useInView(headingRef, { amount: 0.8 }); // Moved to WhyUsHeading
  // const statsInView = useInView(statsRef, { amount: 0.6 }); // Moved to WhyUsStats
  // const videoInView = useInView(videoRef, { amount: 0.5 }); // Moved to WhyUsVideoPlayer
  const feature1InView = useInView(feature1Ref, { amount: 0.6, once: true }); // Added once: true
  const feature2InView = useInView(feature2Ref, { amount: 0.6, once: true }); // Added once: true
  const feature3InView = useInView(feature3Ref, { amount: 0.6, once: true }); // Added once: true
  // const ctaInView = useInView(ctaRef, { amount: 0.8 }); // Moved to WhyUsCTA

  // Animation controls for different sections med opdaterede useEffect hooks
  // const controls = useAnimation(); // Removed, not used for parent animation
  // const statsControls = useAnimation(); // Moved to WhyUsStats
  const feature1Controls = useAnimation();
  const feature2Controls = useAnimation();
  const feature3Controls = useAnimation();

  // Update animations for each section when they enter/leave viewport
  // useEffect for statsInView moved to WhyUsStats.jsx

  useEffect(() => {
    if (feature1InView) {
      feature1Controls.start("visible");
    }
    // Removed else block due to once: true on useInView
  }, [feature1Controls, feature1InView]);

  useEffect(() => {
    if (feature2InView) {
      feature2Controls.start("visible");
    }
    // Removed else block due to once: true on useInView
  }, [feature2Controls, feature2InView]);

  useEffect(() => {
    if (feature3InView) {
      feature3Controls.start("visible");
    }
    // Removed else block due to once: true on useInView
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

  // statVariants moved to WhyUsStats.jsx

  // letterVariants removed
  // FeatureIcon component removed
  // AnimatedText component removed

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative scroll-mt-[var(--header-height)] bg-[var(--color-secondary-light)] py-24 lg:py-32 overflow-hidden"
    >
      <WhyUsBackgroundVisuals />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <WhyUsHeading />

        <WhyUsStats />

        <WhyUsVideoPlayer />

        {/* Feature blocks med individuel animation - CENTRERET LAYOUT */}
        <div className="max-w-6xl mx-auto space-y-8">
          <WhyUsFeatureBlock
            featureRef={feature1Ref}
            featureNum={0}
            IconComponent={Zap}
            title={accordionItems[0].title}
            paragraph={accordionItems[0].content.paragraph}
            featureSpecificContent={
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
                  { icon: <Rocket size={18} />, text: accordionItems[0].content.benefits[0] },
                  { icon: <MessageCircle size={18} />, text: accordionItems[0].content.benefits[1] },
                  { icon: <PenTool size={18} />, text: accordionItems[0].content.benefits[2] },
                  { icon: <CheckCircle2 size={18} />, text: accordionItems[0].content.benefits[3] },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center p-3 bg-white rounded-lg shadow-sm"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 + i * 0.1 } },
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center mr-3">
                      <span className="text-[var(--color-brand-blue)]">{benefit.icon}</span>
                    </div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            }
            animationControls={feature1Controls}
            isInView={feature1InView}
            textRevealVariant={textRevealVariants}
            fadeInUpVariant={fadeInUpVariants}
          />

          <WhyUsFeatureBlock
            featureRef={feature2Ref}
            featureNum={1}
            IconComponent={Clock}
            title={accordionItems[1].title}
            paragraph={accordionItems[1].content.paragraph}
            featureSpecificContent={
              <>
                <motion.div
                  className="bg-white rounded-lg p-4 shadow-md mb-3 border-l-4 border-[var(--color-brand-blue)] max-w-lg mx-auto"
                  variants={textRevealVariants}
                  custom={2} // This custom index should be relative to the parent's textRevealVariants if it's a function
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h4 className="text-base font-semibold mb-1">Gennemsnitlig responstid</h4>
                      <p className="text-xs text-gray-600">Baseret på de seneste 1000 henvendelser</p>
                    </div>
                    <div className="text-2xl font-bold text-[var(--color-brand-blue)]">
                      {accordionItems[1].content.responseTime}
                    </div>
                  </div>
                </motion.div>
                <motion.blockquote
                  className="italic text-[var(--color-foreground)]/80 pl-4 border-l-2 border-[var(--color-brand-blue)]/40 max-w-md mx-auto text-sm"
                  variants={textRevealVariants}
                  custom={3} // This custom index should be relative to the parent's textRevealVariants
                >
                  "Vores hjemmeside gik ned fredag aften. Jeg sendte en mail, og 15 minutter senere var problemet løst. Det kalder jeg service!"
                  <footer className="mt-1 text-xs font-medium not-italic">— Morten, CEO hos BrandCo</footer>
                </motion.blockquote>
              </>
            }
            animationControls={feature2Controls}
            isInView={feature2InView}
            textRevealVariant={textRevealVariants}
            fadeInUpVariant={fadeInUpVariants}
          />

          <WhyUsFeatureBlock
            featureRef={feature3Ref}
            featureNum={2}
            IconComponent={Code}
            title={accordionItems[2].title}
            paragraph={accordionItems[2].content.paragraph}
            featureSpecificContent={
              <motion.div
                className="flex justify-center"
                variants={textRevealVariants} // This variant is for the container of the seal
                custom={2} // This custom index should be relative to the parent's textRevealVariants
              >
                <motion.div
                  className="inline-flex items-center bg-white py-3 px-5 rounded-full border-2 border-[var(--color-brand-blue)] shadow-md mt-3"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  // Individual animation for the seal itself, not using textRevealVariants directly on this element
                >
                  <Award size={22} className="text-[var(--color-brand-blue)] mr-3" />
                  <span className="text-base font-bold text-[var(--color-foreground)]">
                    {accordionItems[2].content.guarantee}
                  </span>
                </motion.div>
              </motion.div>
            }
            animationControls={feature3Controls}
            isInView={feature3InView}
            textRevealVariant={textRevealVariants}
            fadeInUpVariant={fadeInUpVariants}
          />
        </div>

        {/* CTA sektion med forbedret animation - uden baggrundsgrafik */}
        <WhyUsCTA />
      </div>
    </section>
  );
}
