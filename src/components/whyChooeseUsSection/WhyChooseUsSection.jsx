"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Importér data fra datafilen
import { stats, accordionItems } from "@/data/whyChooseUsData";

// Import sub-komponenter
import StatsSection from "./StatsSection";
import FeatureBlock from "./FeatureBlock";
import { VideoSection, CTASection } from "./AnimatedComponents";
import { useScrollAnimations } from "./animations";

export default function WhyChooseUsSection() {
  // Refs for hver sektion
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const feature1Ref = useRef(null);
  const feature2Ref = useRef(null);
  const feature3Ref = useRef(null);
  const ctaRef = useRef(null);

  // Custom hook til scroll animationer
  const {
    headingInView,
    statsInView,
    videoInView,
    feature1InView,
    feature2InView,
    feature3InView,
    ctaInView,
    statsControls,
    feature1Controls,
    feature2Controls,
    feature3Controls,
  } = useScrollAnimations({
    sectionRef,
    headingRef,
    statsRef,
    videoRef,
    feature1Ref,
    feature2Ref,
    feature3Ref,
    ctaRef,
  });

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

        {/* Statistik sektion */}
        <StatsSection
          ref={statsRef}
          stats={stats}
          statsInView={statsInView}
          statsControls={statsControls}
        />

        {/* Video sektion */}
        <VideoSection ref={videoRef} videoInView={videoInView} />

        {/* Feature blocks */}
        <div className="max-w-6xl mx-auto space-y-8">
          <FeatureBlock
            ref={feature1Ref}
            feature={accordionItems[0]}
            featureInView={feature1InView}
            featureControls={feature1Controls}
            featureType="react"
          />

          <FeatureBlock
            ref={feature2Ref}
            feature={accordionItems[1]}
            featureInView={feature2InView}
            featureControls={feature2Controls}
            featureType="support"
          />

          <FeatureBlock
            ref={feature3Ref}
            feature={accordionItems[2]}
            featureInView={feature3InView}
            featureControls={feature3Controls}
            featureType="custom"
          />
        </div>

        {/* CTA sektion */}
        <CTASection ref={ctaRef} ctaInView={ctaInView} />
      </div>
    </section>
  );
}
