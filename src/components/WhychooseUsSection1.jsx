// src/components/WhyChooseUsModern.jsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Clock,
  Code,
  Award,
  Rocket,
  Shield,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";
import { FiImage, FiPenTool, FiZap as FiZapIcon } from "react-icons/fi";
import AnimatedHeading from "./AnimatedHeading";
import FancyButton from "./FancyButton";

// ────────────────────────────────────────────────────────────────────────────
// Data til "Hvorfor vælge os" (stats og features)
// ────────────────────────────────────────────────────────────────────────────
const stats = [
  {
    value: "12+",
    label: "Års erfaring",
    color: "from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)]",
  },
  {
    value: "147",
    label: "Projekter leveret",
    color: "from-[var(--color-primary)] to-[var(--color-primary-darkest)]",
  },
  {
    value: "98%",
    label: "Tilfredse kunder",
    color: "from-[var(--color-brand-blue-darker)] to-[var(--color-brand-blue)]",
  },
];

const features = [
  {
    id: "react",
    icon: <Zap className="w-8 h-8" />,
    title: "Lynhurtig React udvikling",
    description:
      "Vi bygger performante React-applikationer der giver dine brugere en fantastisk oplevelse.",
    highlight: "3x hurtigere udvikling",
    highlightType: "performance",
    benefits: [
      {
        icon: <Rocket className="w-4 h-4" />,
        text: "Komponent-baseret arkitektur",
      },
      { icon: <Shield className="w-4 h-4" />, text: "Optimeret performance" },
    ],
    bgGradient:
      "from-[var(--color-brand-blue-lighter-bg)] to-[var(--color-secondary-light)]",
    iconBg: "from-[var(--color-brand-blue)]/20 to-[var(--color-brand-blue)]/10",
  },
  {
    id: "support",
    icon: <Clock className="w-8 h-8" />,
    title: "24/7 Support garanti",
    description: "Vi er her når du har brug for os – altid.",
    highlight: "< 30 min responstid",
    highlightType: "urgent",
    testimonial: {
      text: "Vores hjemmeside gik ned fredag aften. 15 minutter senere var problemet løst!",
      author: "Morten, CEO hos BrandCo",
      rating: 5,
    },
    bgGradient:
      "from-[var(--color-secondary-light)] to-[var(--color-brand-blue-lighter-bg)]",
    iconBg: "from-[var(--color-primary)]/15 to-[var(--color-primary)]/10",
  },
  {
    id: "custom",
    icon: <Code className="w-8 h-8" />,
    title: "100% Skræddersyet kode",
    description:
      "Ingen templates. Alt kode er bygget specifikt til din virksomhed.",
    highlight: "Unik løsning garanteret",
    highlightType: "premium",
    badge: "Ingen genbrug",
    bgGradient: "from-white to-[var(--color-secondary-light)]",
    iconBg:
      "from-[var(--color-brand-blue-darker)]/20 to-[var(--color-brand-blue-darker)]/10",
  },
  {
    id: "branding",
    icon: <FiImage className="w-8 h-8" />,
    title: "Logo & Branding",
    description:
      "Få et skræddersyet logo eller opdater dit eksisterende, så din visuelle identitet stemmer 100% overens med dit nye website.",
    highlight: "Komplet branding-pakke inkluderet",
    highlightType: "included",
    badge: "Logo-design & opfriskning",
    bgGradient: "from-[var(--color-brand-blue-lighter-bg)] to-white",
    iconBg: "from-[var(--color-brand-blue)]/25 to-[var(--color-brand-blue)]/15",
  },
  {
    id: "seo",
    icon: <FiZapIcon className="w-8 h-8" />,
    title: "Skalerbar SEO-strategi",
    description:
      "Vi optimerer dine sider, så du lander øverst på Google og får mere organisk trafik.",
    highlight: "+126% mere trafik i lokale søgninger",
    highlightType: "growth",
    benefits: [
      { icon: <Code className="w-4 h-4" />, text: "Teknisk SEO-audit" },
      {
        icon: <FiPenTool className="w-4 h-4" />,
        text: "Indholdsoptimering & keywords",
      },
    ],
    testimonial: {
      text: "Efter kun 3 måneder med deres SEO blev vi #1 på 'webudvikler Aarhus' og så 80 % flere henvendelser.",
      author: "Anna, Markedschef hos NordWeb",
      rating: 5,
    },
    bgGradient: "from-[var(--color-secondary-light)] to-white",
    iconBg: "from-[var(--color-primary)]/20 to-[var(--color-primary)]/10",
  },
];

const SMOOTH_EASE = [0.215, 0.61, 0.355, 1];

// Hjælpefunktion til badge-farver
const getHighlightStyle = (type) => {
  const styles = {
    performance:
      "bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] text-white",
    urgent:
      "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-darkest)] text-white animate-pulse",
    premium:
      "bg-gradient-to-r from-[var(--color-brand-blue-darker)] to-[var(--color-primary)] text-white",
    included:
      "bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] text-white",
    growth:
      "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-brand-blue-darker)] text-white",
  };
  return styles[type] || styles.performance;
};

// ────────────────────────────────────────────────────────────────────────────
// Baggrundscirkler – To dæmpede cirkler i hjørnerne (ingen animation, blur, opacity)
// ────────────────────────────────────────────────────────────────────────────
function WhyChooseBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* VENSTRE HJØRNE */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-brand-blue-lighter-bg)] rounded-full"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* HØJRE HJØRNE */}
      <div
        className="absolute bottom-0 right-0 w-72 h-72 bg-[var(--color-secondary-light)] rounded-full"
        style={{ transform: "translate(50%, 50%)" }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// StatsCard-komponent (GPU-venlige animationer kun på indscrol)
// ────────────────────────────────────────────────────────────────────────────
const StatsCard = React.memo(({ value, label, color, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: SMOOTH_EASE }}
      className="bg-white rounded-2xl p-6 md:p-8 text-center border border-[var(--color-brand-blue)]/15 shadow-lg"
      style={{
        transform: "translate3d(0,0,0)",
        willChange: "transform, opacity",
      }}
    >
      <div
        className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2 font-[var(--font-heading)]`}
      >
        {value}
      </div>
      <div className="text-base text-[var(--color-foreground)]/70 font-[var(--font-body)]">
        {label}
      </div>
    </motion.div>
  );
});

// ────────────────────────────────────────────────────────────────────────────
// FeatureCard-komponent (GPU-venlige animationer kun på indscrol)
// ────────────────────────────────────────────────────────────────────────────
const FeatureCard = React.memo(
  ({
    icon,
    title,
    description,
    highlight,
    highlightType,
    benefits = [],
    testimonial,
    badge,
    bgGradient,
    iconBg,
    index,
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: SMOOTH_EASE }}
        className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-6 lg:p-8 border border-[var(--color-brand-blue)]/10 shadow-lg min-h-[420px] flex flex-col`}
        style={{
          transform: "translate3d(0,0,0)",
          willChange: "transform, opacity",
        }}
      >
        {/* Ikon */}
        <div
          className={`w-16 h-16 bg-gradient-to-br ${iconBg} rounded-xl flex items-center justify-center mb-6`}
        >
          <div className="text-[var(--color-brand-blue)]">{icon}</div>
        </div>

        {/* Tekstindhold */}
        <div className="flex-grow">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-foreground)] mb-3 font-[var(--font-heading)]">
            {title}
          </h3>
          <p className="text-[var(--color-foreground)]/70 mb-4 font-[var(--font-body)] leading-relaxed">
            {description}
          </p>

          {/* Highlight-badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md ${getHighlightStyle(
              highlightType
            )}`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {highlight}
          </div>
        </div>

        {/* Footer: benefits, testimonial eller badge */}
        <div className="mt-auto">
          {benefits.length > 0 && (
            <div className="grid grid-cols-1 gap-3 mt-6">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm bg-white/50 rounded-lg p-3"
                >
                  <div className="text-[var(--color-brand-blue)] bg-white rounded-full p-1">
                    {b.icon}
                  </div>
                  <span className="text-[var(--color-foreground)]/80 font-[var(--font-body)] font-medium">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {testimonial && (
            <motion.blockquote
              className="mt-6 p-4 bg-white/60 rounded-xl border-l-4 border-[var(--color-brand-blue)] backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, ease: SMOOTH_EASE }}
              style={{
                transform: "translate3d(0,0,0)",
                willChange: "transform, opacity",
              }}
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[var(--color-brand-blue)] text-[var(--color-brand-blue)]"
                  />
                ))}
              </div>
              <p className="text-[var(--color-foreground)]/80 italic mb-2 font-[var(--font-body)]">
                "{testimonial.text}"
              </p>
              <cite className="text-sm text-[var(--color-foreground)]/60 not-italic font-[var(--font-body)] font-semibold">
                — {testimonial.author}
              </cite>
            </motion.blockquote>
          )}

          {badge && (
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 text-[var(--color-brand-blue)] font-semibold font-[var(--font-body)] bg-white/60 px-3 py-2 rounded-lg">
                <Award className="w-5 h-5" />
                {badge}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

// ────────────────────────────────────────────────────────────────────────────
// VideoSection (GPU-venlige animationer kun på indscrol)
// ────────────────────────────────────────────────────────────────────────────
const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: SMOOTH_EASE }}
      className="max-w-4xl mx-auto"
      style={{
        transform: "translate3d(0,0,0)",
        willChange: "transform, opacity",
      }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]">
          Mød teamet bag løsningerne
        </h3>
        <p className="text-lg text-[var(--color-foreground)]/80 max-w-2xl mx-auto font-[var(--font-body)]">
          Hør fra vores grundlæggere om hvad der driver os, og hvorfor vi er
          passionerede omkring at skabe exceptionelle digitale oplevelser.
        </p>
      </div>
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-brand-blue)]/20">
        <video
          className="w-full h-full object-cover transition-transform duration-500"
          controls
          preload="metadata"
        >
          <source src="/videos/why_us_demo.mp4" type="video/mp4" />
          Din browser understøtter ikke HTML5 video.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm font-medium">
          2:15
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-[var(--color-foreground)]/60 font-[var(--font-body)]">
          💡 Et personligt indblik i vores tilgang til webudvikling og
          kundeservice
        </p>
      </div>
    </motion.div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Hovedkomponenten: Hvorfor vælge os
// ────────────────────────────────────────────────────────────────────────────
export default function WhyChooseUsModern() {
  return (
    <section
      id="why-us"
      className="relative py-20 lg:py-28 scroll-mt-[var(--header-height)] bg-[var(--color-background)] overflow-hidden"
    >
      {/* To baggrundscirkler i hjørnerne (ingen animation, blur eller opacity) */}
      <WhyChooseBackground />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* ─────────────────────────────────────────────────────────────── */}
        {/* Overskrift + beskrivelse */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <AnimatedHeading
            title="Hvorfor vælge os"
            direction="right"
            delay={0.2}
            className="text-[var(--color-foreground)]"
          />
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto text-[var(--color-foreground)]/70 font-[var(--font-body)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform, opacity",
            }}
          >
            Vi skaber ikke bare hjemmesider – vi bygger digitale oplevelser der
            gør en forskel for din virksomhed og dine kunder.
          </motion.p>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* Statistikkort (3 kolonner på desktop) */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
          {stats.map((s, i) => (
            <StatsCard
              key={s.value}
              value={s.value}
              label={s.label}
              color={s.color}
              index={i}
            />
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* Feature-kort i 2 rækker: 3 + 2 kolonner */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto mb-20">
          {/* Første række (3 kort) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {features.slice(0, 3).map((f, i) => (
              <FeatureCard
                key={f.id}
                icon={f.icon}
                title={f.title}
                description={f.description}
                highlight={f.highlight}
                highlightType={f.highlightType}
                benefits={f.benefits}
                testimonial={f.testimonial}
                badge={f.badge}
                bgGradient={f.bgGradient}
                iconBg={f.iconBg}
                index={i}
              />
            ))}
          </div>
          {/* Anden række (2 kort) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.slice(3).map((f, i) => (
              <FeatureCard
                key={f.id}
                icon={f.icon}
                title={f.title}
                description={f.description}
                highlight={f.highlight}
                highlightType={f.highlightType}
                benefits={f.benefits}
                testimonial={f.testimonial}
                badge={f.badge}
                bgGradient={f.bgGradient}
                iconBg={f.iconBg}
                index={i + 3}
              />
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* Video-sektion */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="mb-20">
          <VideoSection />
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* Call-to-Action i bunden */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          style={{
            transform: "translate3d(0,0,0)",
            willChange: "transform, opacity",
          }}
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-[var(--color-brand-blue-lighter-bg)] to-[var(--color-secondary-light)] rounded-2xl p-8 border border-[var(--color-brand-blue)]/20">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]">
              Klar til at komme i gang?
            </h3>
            <p className="text-lg text-[var(--color-foreground)]/70 mb-8 font-[var(--font-body)]">
              Lad os tage en snak om hvordan vi kan hjælpe din virksomhed med
              den perfekte digitale løsning.
            </p>
            <FancyButton href="#contact">
              Kontakt os i dag <ArrowRight className="w-5 h-5" />
            </FancyButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
