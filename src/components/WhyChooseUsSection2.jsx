"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl"; // 🆕 i18n import
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

// Simplified Stats Component
const StatsSection = ({ isVisible, t }) => {
  // 🆕 Stats data med i18n
  const stats = [
    { value: "100+", label: t("stats.satisfiedCustomers") },
    { value: "50+", label: t("stats.projectsDelivered") },
    { value: "24/7", label: t("stats.supportAvailable") },
  ];

  return (
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
          <h3 className="text-3xl font-bold text-blue-600 mb-2">
            {stat.value}
          </h3>
          <p className="text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

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
                  {feature.responseTimeLabel}
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
  const t = useTranslations("whyChooseUs"); // 🆕 i18n hook

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

  // 🆕 Features data med i18n
  const features = [
    {
      id: "react",
      icon: <Zap size={32} />,
      title: t("features.react.title"),
      description: t("features.react.description"),
      highlights: [
        {
          icon: <Rocket size={16} />,
          text: t("features.react.highlights.fastLoading"),
        },
        {
          icon: <Shield size={16} />,
          text: t("features.react.highlights.secureStable"),
        },
        {
          icon: <PenTool size={16} />,
          text: t("features.react.highlights.modernDesign"),
        },
        {
          icon: <TrendingUp size={16} />,
          text: t("features.react.highlights.seoOptimized"),
        },
      ],
    },
    {
      id: "support",
      icon: <Clock size={32} />,
      title: t("features.support.title"),
      description: t("features.support.description"),
      responseTime: t("features.support.responseTime"),
      responseTimeLabel: t("features.support.responseTimeLabel"),
      testimonial: {
        text: t("features.support.testimonial.text"),
        author: t("features.support.testimonial.author"),
      },
    },
    {
      id: "custom",
      icon: <Code size={32} />,
      title: t("features.custom.title"),
      description: t("features.custom.description"),
      guarantee: t("features.custom.guarantee"),
    },
  ];

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header - 🆕 med i18n */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Stats */}
        <div ref={statsRef}>
          <StatsSection isVisible={statsInView} t={t} />
        </div>

        {/* Video Section - 🆕 med i18n */}
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
              {t("video.title")}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("video.description")}
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
              {t("video.notSupported")}
            </video>
            <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
              2:15
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            {t("video.insight")}
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

        {/* CTA - 🆕 med i18n */}
        <motion.div
          ref={ctaRef}
          className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4">{t("cta.title")}</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <button className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            {t("cta.button")}
            <ArrowRight size={20} className="ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
