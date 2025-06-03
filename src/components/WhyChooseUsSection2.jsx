"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  Code,
  Award,
  Rocket,
  Shield,
  PenTool,
  TrendingUp,
  ArrowRight,
  Play,
} from "lucide-react";

// Simplified hook for intersection observer
const useIntersection = (ref, options = {}) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
};

// Simplified animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Mock data - replace with your actual data
const stats = [
  { value: "100+", label: "Tilfredse kunder" },
  { value: "50+", label: "Projekter leveret" },
  { value: "24/7", label: "Support tilgængelig" },
];

const features = [
  {
    id: "react",
    icon: <Zap size={32} />,
    title: "React & Next.js Ekspertise",
    description:
      "Vi bygger moderne, hurtige og skalerbare webapplikationer med de nyeste teknologier. Vores løsninger er optimeret for performance og SEO.",
    highlights: [
      { icon: <Rocket size={16} />, text: "Lynhurtig indlæsning" },
      { icon: <Shield size={16} />, text: "Sikker og stabil" },
      { icon: <PenTool size={16} />, text: "Moderne design" },
      { icon: <TrendingUp size={16} />, text: "SEO optimeret" },
    ],
  },
  {
    id: "support",
    icon: <Clock size={32} />,
    title: "Pålidelig Support",
    description:
      "Vi er her når du har brug for os. Vores erfarne team sørger for at dit website altid kører optimalt med hurtig respons på alle henvendelser.",
    responseTime: "< 2 timer",
    testimonial: {
      text: "Fantastisk service og super hurtig respons!",
      author: "Maria Hansen, CEO",
    },
  },
  {
    id: "custom",
    icon: <Code size={32} />,
    title: "Skræddersyede Løsninger",
    description:
      "Hver virksomhed er unik, og det samme gælder vores løsninger. Vi skaber præcis det du har brug for - ikke mere, ikke mindre.",
    guarantee: "100% tilfredshedsgaranti",
  },
];

// Simplified Stats Component
const StatsSection = ({ isVisible }) => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
    variants={staggerChildren}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
  >
    {stats.map((stat, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-xl p-6 text-center shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
        variants={fadeInUp}
      >
        <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</h3>
        <p className="text-gray-600">{stat.label}</p>
      </motion.div>
    ))}
  </motion.div>
);

// Simplified Feature Component
const FeatureCard = ({ feature, isVisible, index }) => (
  <motion.div
    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
    initial={{ opacity: 0, y: 50 }}
    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
          {feature.icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* Feature-specific content */}
        {feature.highlights && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {feature.highlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-center p-3 bg-blue-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">
                  {highlight.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {highlight.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {feature.responseTime && (
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Clock size={24} className="text-blue-600 mr-3" />
              <div>
                <p className="font-semibold text-gray-900">
                  {feature.responseTime}
                </p>
                <p className="text-sm text-gray-600">
                  Gennemsnitlig responstid
                </p>
              </div>
            </div>
            {feature.testimonial && (
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
                <blockquote className="text-gray-600 italic">
                  "{feature.testimonial.text}"
                </blockquote>
                <footer className="mt-2 text-sm font-medium text-gray-500">
                  — {feature.testimonial.author}
                </footer>
              </div>
            )}
          </div>
        )}

        {feature.guarantee && (
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-full">
            <Award size={20} className="mr-2" />
            <span className="font-semibold">{feature.guarantee}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

// Main Component
export default function WhyChooseUsSection() {
  const sectionRef = useRef();
  const statsRef = useRef();
  const featuresRef = useRef();
  const videoRef = useRef();
  const ctaRef = useRef();

  const sectionInView = useIntersection(sectionRef);
  const statsInView = useIntersection(statsRef);
  const featuresInView = useIntersection(featuresRef);
  const videoInView = useIntersection(videoRef);
  const ctaInView = useIntersection(ctaRef);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hvorfor vælge os
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vi skaber ikke bare hjemmesider – vi bygger digitale oplevelser der
            gør en forskel for din virksomhed og dine kunder.
          </p>
        </motion.div>

        {/* Stats */}
        <div ref={statsRef}>
          <StatsSection isVisible={statsInView} />
        </div>

        {/* Video Section */}
        <motion.div
          ref={videoRef}
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            videoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Mød teamet bag løsningerne
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hør fra vores grundlæggere om hvad der driver os, og hvorfor vi er
              passionerede omkring at skabe exceptionelle digitale oplevelser.
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
            <video
              className="w-full h-full object-cover"
              poster="/images/video/why-us-poster.jpg"
              controls
              preload="metadata"
            >
              <source src="/videos/why_us_demo.mp4" type="video/mp4" />
              Din browser understøtter ikke HTML5 video.
            </video>
            <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
              2:15
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            💡 Et personligt indblik i vores tilgang til webudvikling og
            kundeservice
          </p>
        </motion.div>

        {/* Features */}
        <div ref={featuresRef} className="space-y-12 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isVisible={featuresInView}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4">Klar til at komme i gang?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Lad os tage en snak om hvordan vi kan hjælpe din virksomhed med den
            perfekte digitale løsning.
          </p>
          <button className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Kontakt os i dag
            <ArrowRight size={20} className="ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
