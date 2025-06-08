// src/components/CompleteDigitalSolution.jsx
"use client";

import React, { useRef, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import FancyButton from "./FancyButton";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Trophy,
  Zap,
  PlayCircle,
  Calendar,
} from "lucide-react";
import {
  packageIncludes,
  processSteps,
  missionPoints,
} from "../data/completeSolutionData";

const SMOOTH_EASE = [0.215, 0.61, 0.355, 1];

// ────────────────────────────────────────────────────────────────────────────
// Modulære komponenter
// ────────────────────────────────────────────────────────────────────────────

const PackageIncludeCard = forwardRef(function PackageIncludeCard(
  { item, index, cardInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--color-brand-blue)]/10"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="w-12 h-12 bg-[var(--color-brand-blue-lighter-bg)] rounded-lg flex items-center justify-center mb-4">
        <div className="text-[var(--color-brand-blue)]">{item.icon}</div>
      </div>

      <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2 font-[var(--font-heading)]">
        {item.title}
      </h3>

      <p className="text-[var(--color-foreground)]/70 mb-4 font-[var(--font-body)] leading-relaxed">
        {item.description}
      </p>

      <div className="space-y-2">
        {item.deliverables.map((deliverable, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-blue)] flex-shrink-0" />
            <span className="text-[var(--color-foreground)]/80 font-[var(--font-body)]">
              {deliverable}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

const ProcessStep = forwardRef(function ProcessStep(
  { step, index, stepInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={stepInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Linje til næste step (undtagen sidste) */}
      {index < processSteps.length - 1 && (
        <div className="hidden md:block absolute top-8 left-8 w-0.5 h-20 bg-[var(--color-brand-blue)]/30" />
      )}

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-[var(--color-brand-blue)] text-white rounded-full flex items-center justify-center text-xl font-bold font-[var(--font-heading)] flex-shrink-0">
          {step.step}
        </div>

        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
              {step.title}
            </h3>
            <span className="bg-[var(--color-brand-blue-lighter-bg)] text-[var(--color-brand-blue)] px-3 py-1 rounded-full text-sm font-medium">
              {step.duration}
            </span>
          </div>
          <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

const MissionCard = forwardRef(function MissionCard(
  { mission, index, missionInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-brand-blue)]/10 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={missionInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="w-16 h-16 bg-[var(--color-brand-blue-lighter-bg)] rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="text-[var(--color-brand-blue)]">{mission.icon}</div>
      </div>

      <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3 font-[var(--font-heading)]">
        {mission.title}
      </h3>

      <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)] leading-relaxed">
        {mission.description}
      </p>
    </motion.div>
  );
});

// ────────────────────────────────────────────────────────────────────────────
// Hovedkomponent
// ────────────────────────────────────────────────────────────────────────────

export default function CompleteDigitalSolution() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const includesRef = useRef(null);
  const processRef = useRef(null);
  const missionRef = useRef(null);
  const ctaRef = useRef(null);

  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.8 });
  const includesInView = useInView(includesRef, { once: true, amount: 0.2 });
  const processInView = useInView(processRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.5 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.8 });

  return (
    <section
      ref={sectionRef}
      id="complete-solution"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-secondary-light)] overflow-hidden"
    >
      {/* Baggrundselementer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Venstre hjørne */}
        <div
          className="absolute top-0 left-0 w-80 h-80 bg-[var(--color-brand-blue-lighter-bg)] rounded-full"
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Højre hjørne */}
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary-light)] rounded-full"
          style={{ transform: "translate(50%, 50%)" }}
        />

        {/* Ekstra accent cirkler */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-[var(--color-brand-blue)]/5 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-[var(--color-brand-blue)]/8 rounded-full blur-lg" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[var(--color-brand-blue)]" />
            <span className="bg-[var(--color-brand-blue)] text-white px-4 py-2 rounded-full text-sm font-semibold">
              SÅDAN ARBEJDER VI
            </span>
          </div>

          <AnimatedHeading
            title="Alt-i-én digital løsning"
            direction="right"
            className="text-[var(--color-foreground)] mb-4"
          />

          <p className="text-xl text-[var(--color-foreground)]/70 max-w-3xl mx-auto font-[var(--font-body)] leading-relaxed mb-6">
            Få en hjemmeside behøver ikke være kompliceret. Læn dig tilbage – vi
            klarer ALT med løbende samtaler så resultatet bliver perfekt til
            dine behov.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[var(--color-foreground)]/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--color-brand-blue)]" />
              <span>8 ugers levering</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[var(--color-brand-blue)]" />
              <span>Alt inkluderet</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--color-brand-blue)]" />
              <span>Klar til brug</span>
            </div>
          </div>
        </motion.div>

        {/* Hvad er inkluderet */}
        <div ref={includesRef} className="mb-20">
          <motion.h3
            className="text-3xl font-bold text-center text-[var(--color-foreground)] mb-12 font-[var(--font-heading)]"
            initial={{ opacity: 0, y: 20 }}
            animate={includesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          >
            Alt du behøver – intet mere, intet mindre
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packageIncludes.map((item, index) => (
              <PackageIncludeCard
                key={index}
                item={item}
                index={index}
                cardInView={includesInView}
              />
            ))}
          </div>
        </div>

        {/* Processen */}
        <div ref={processRef} className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          >
            <h3 className="text-3xl font-bold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]">
              Sådan gør vi det
            </h3>
            <p className="text-lg text-[var(--color-foreground)]/70 max-w-2xl mx-auto font-[var(--font-body)]">
              En klar proces hvor du ved præcis hvad der sker hvornår
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                step={step}
                index={index}
                stepInView={processInView}
              />
            ))}
          </div>
        </div>

        {/* Vores tilgang */}
        <div ref={missionRef} className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          >
            <h3 className="text-3xl font-bold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]">
              Det behøver ikke være svært
            </h3>
            <p className="text-lg text-[var(--color-foreground)]/70 max-w-3xl mx-auto font-[var(--font-body)] leading-relaxed">
              Vores mission er at gøre hele processen så glat som muligt for
              dig. Du skal ikke bekymre dig om det tekniske - det klarer vi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {missionPoints.map((mission, index) => (
              <MissionCard
                key={index}
                mission={mission}
                index={index}
                missionInView={missionInView}
              />
            ))}
          </div>
        </div>

        {/* Call to Action - Forbedret version */}
        <motion.div
          ref={ctaRef}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[var(--color-brand-blue-lighter-bg)] via-white to-[var(--color-secondary-light)] rounded-3xl p-8 lg:p-12 border border-[var(--color-brand-blue)]/20 shadow-xl relative overflow-hidden">
            {/* Accent cirkler i baggrunden */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-blue)]/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--color-brand-blue)]/8 rounded-full blur-xl" />

            <div className="relative z-10">
              {/* Header med ikon */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-brand-blue)] rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)]">
                  Klar til at starte dit digitale eventyr?
                </h3>
              </div>

              <p className="text-lg text-[var(--color-foreground)]/70 mb-8 max-w-2xl mx-auto font-[var(--font-body)] leading-relaxed">
                Book et gratis konsultationsmøde og få en skræddersyet plan for
                din digitale tilstedeværelse. Vi tager os god tid til at forstå
                dine behov og ønsker.
              </p>

              {/* Fordele med ikoner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center justify-center gap-2 bg-white/60 rounded-full px-4 py-3">
                  <Clock className="w-5 h-5 text-[var(--color-brand-blue)]" />
                  <span className="text-[var(--color-foreground)] font-medium font-[var(--font-body)]">
                    Gratis konsultation
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/60 rounded-full px-4 py-3">
                  <Users className="w-5 h-5 text-[var(--color-brand-blue)]" />
                  <span className="text-[var(--color-foreground)] font-medium font-[var(--font-body)]">
                    Personlig vejledning
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/60 rounded-full px-4 py-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-blue)]" />
                  <span className="text-[var(--color-foreground)] font-medium font-[var(--font-body)]">
                    Ingen forpligtelse
                  </span>
                </div>
              </div>

              {/* CTA knapper */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <FancyButton
                  href="#contact"
                  className="bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)]"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book gratis konsultation
                </FancyButton>

                <motion.button
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/80 border-2 border-[var(--color-brand-blue)]/30 rounded-full text-[var(--color-brand-blue)] font-semibold hover:bg-[var(--color-brand-blue)]/5 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlayCircle className="w-5 h-5" />
                  Se vores arbejde
                </motion.button>
              </div>

              {/* Pris information - mindre prominent */}
              <div className="border-t border-[var(--color-brand-blue)]/20 pt-6">
                <div className="text-center">
                  <div className="text-sm text-[var(--color-foreground)]/60 mb-2 font-[var(--font-body)]">
                    Komplette løsninger starter fra
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-brand-blue)] mb-2 font-[var(--font-heading)]">
                    75.000 kr.
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-[var(--color-foreground)]/70">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-blue)]" />
                      <span>Alt inkluderet</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-blue)]" />
                      <span>Skræddersyet til dig</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-blue)]" />
                      <span>Ingen skjulte omkostninger</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgency element */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>Ledige konsultationer denne uge</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
