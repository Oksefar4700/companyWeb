"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { stats, accordionItems } from "@/data/whyChooseUsData";
import StatsSection from "./StatsSection";
import FeatureBlock from "./FeatureBlock";
import { CTASection } from "./AnimatedComponents";
import { useScrollAnimations } from "./animations";
import AnimatedHeading from "../AnimatedHeading";

export default function WhyChooseUsSection() {
  const sectionRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const feature1Ref = useRef(null);
  const feature2Ref = useRef(null);
  const feature3Ref = useRef(null);
  const ctaRef = useRef(null);

  const {
    descriptionInView,
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
    descriptionRef,
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
      className="relative scroll-mt-[var(--header-height)] bg-gradient-to-b from-[var(--color-background)] via-[var(--color-secondary-light)] to-[var(--color-background)] py-24 lg:py-32 overflow-hidden"
    >
      {/* Statiske baggrunde med GPU-optimeret positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-20 w-96 h-96 bg-[var(--color-brand-blue)]/5 rounded-full blur-3xl"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-[var(--color-primary)]/8 rounded-full blur-2xl"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundSize: "50px 50px",
            backgroundImage:
              "radial-gradient(var(--color-brand-blue) 1px, transparent 1px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <AnimatedHeading
            title="Hvorfor vælge os"
            direction="right"
            delay={0.5}
            className="text-[var(--color-foreground)]"
          />
          <motion.p
            ref={descriptionRef}
            className="text-lg md:text-xl max-w-3xl mx-auto font-[var(--font-body)] text-[var(--color-foreground)]/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={
              descriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.8,
              delay: 1.0,
              ease: [0.215, 0.61, 0.355, 1],
            }} // 🔥 hardware easing
            style={{ willChange: "transform, opacity" }} // 🔥 GPU hint
          >
            Vi skaber ikke bare hjemmesider – vi bygger digitale oplevelser der
            gør en forskel for din virksomhed og dine kunder.
          </motion.p>
        </div>

        <StatsSection
          ref={statsRef}
          stats={stats}
          statsInView={statsInView}
          statsControls={statsControls}
        />

        <motion.div
          ref={videoRef}
          className="max-w-4xl mx-auto mb-24 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ willChange: "transform, opacity" }} // 🔥 GPU hint
        >
          {/* … video-HTML … */}
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16 lg:space-y-20">
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

        <CTASection ref={ctaRef} ctaInView={ctaInView} />
      </div>
    </section>
  );
}
