// src/components/AIIntegrationSection.jsx
"use client";

import React, { useRef, useState, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  MessageCircle,
  Search,
  Clock,
  Users,
  Zap,
  Play,
} from "lucide-react";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 MODULÄR KOMPONENT: AICapabilityCard med forwardRef
const AICapabilityCard = forwardRef(function AICapabilityCard(
  { capability, index, cardInView },
  ref
) {
  const Icon = capability.icon;

  return (
    <motion.div
      ref={ref}
      className="flex items-start group"
      initial={{ opacity: 0, x: -30 }}
      animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
        delay: index * 0.1 + 0.2,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <motion.div
        className="w-12 h-12 bg-[var(--color-brand-blue)] rounded-xl flex items-center justify-center mr-4 transition-colors duration-300"
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform",
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <div>
        <h4 className="text-lg font-semibold text-[var(--color-foreground)] mb-2 font-[var(--font-heading)]">
          {capability.title}
        </h4>
        <p className="text-[var(--color-foreground)]/70 leading-relaxed font-[var(--font-body)]">
          {capability.description}
        </p>
      </div>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: StatsCard med forwardRef
const StatsCard = forwardRef(function StatsCard(
  { value, label, index, statsInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="bg-[var(--color-background)] rounded-xl p-6 shadow-lg border border-[var(--color-primary)]/10"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={
        statsInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
        delay: index * 0.1,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <div className="text-3xl font-bold text-[var(--color-brand-blue)] mb-2 font-[var(--font-heading)]">
        {value}
      </div>
      <div className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
        {label}
      </div>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: VideoDemo med forwardRef
const VideoDemo = forwardRef(function VideoDemo(
  { isPlaying, onPlay, demoInView },
  ref
) {
  const videoRef = useRef(null);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      onPlay();
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        demoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.8,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
    >
      <div className="relative bg-[var(--color-background)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--color-primary)]/10">
        {/* Video Header - Mock browser */}
        <div className="bg-[var(--color-secondary-light)] px-4 py-3 flex items-center border-b border-[var(--color-primary)]/10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-[var(--color-background)] rounded px-3 py-1 text-sm text-[var(--color-foreground)]/60 text-center border border-[var(--color-primary)]/10">
              www.dinvirksomhed.dk
            </div>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video bg-gradient-to-br from-[var(--color-secondary-light)] to-[var(--color-brand-blue-lighter-bg)]">
          {!isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={handleVideoPlay}
                className="w-20 h-20 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)] rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2, ease: SMOOTH_EASE },
                }}
                whileTap={{ scale: 0.9 }}
                style={{
                  transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
                  willChange: "transform",
                }}
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.button>

              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-blue)]/20 to-[var(--color-primary)]/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-semibold text-[var(--color-foreground)] mb-2 font-[var(--font-heading)]">
                    Se AI Chatbot i Aktion
                  </div>
                  <div className="text-sm text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                    Demonstration af kundeservice og ordrestatus
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
              style={{
                transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
                willChange: "opacity",
              }}
            >
              <source src="/videos/ai-chatbot-demo.mp4" type="video/mp4" />
              Din browser understøtter ikke HTML5 video.
            </video>
          )}
        </div>

        {/* Chat Preview */}
        {!isPlaying && (
          <motion.div
            className="absolute bottom-4 right-4 bg-[var(--color-background)] rounded-lg shadow-lg p-3 max-w-xs border border-[var(--color-primary)]/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              demoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{
              duration: 0.6,
              ease: SMOOTH_EASE,
              delay: 0.5,
            }}
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-[var(--color-brand-blue)] rounded-full flex items-center justify-center mr-2">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-medium text-[var(--color-foreground)] font-[var(--font-body)]">
                AI Assistant
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
            </div>
            <div className="text-xs text-[var(--color-foreground)]/70 bg-[var(--color-secondary-light)] rounded p-2 font-[var(--font-body)]">
              "Hej! Jeg kan hjælpe med at finde dit ordrenummer og svare på
              spørgsmål om levering 😊"
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--color-brand-blue)] rounded-full"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-[var(--color-primary)] rounded-full"
        animate={{
          y: [0, 10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        }}
      />
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: BackgroundElements med forwardRef
const BackgroundElements = forwardRef(function BackgroundElements(
  { sectionInView },
  ref
) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-[var(--color-brand-blue)]/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 bg-[var(--color-primary)]/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--color-brand-blue)]/15 rounded-lg rotate-45"
        animate={{
          rotate: [45, 225, 45],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        }}
      />
    </div>
  );
});

// 🔥 HOVEDKOMPONENT
export default function AIIntegrationSection() {
  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const statsRef = useRef(null);
  const demoRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const capabilitiesInView = useInView(capabilitiesRef, {
    once: true,
    amount: 0.3,
  });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const demoInView = useInView(demoRef, { once: true, amount: 0.3 });

  const [isPlaying, setIsPlaying] = useState(false);

  const aiCapabilities = [
    {
      icon: MessageCircle,
      title: "24/7 Kundesupport",
      description:
        "AI-chatbot besvarer kundeforespørgsler øjeblikkeligt, også udenfor åbningstid",
    },
    {
      icon: Search,
      title: "Ordrestatus & Sporing",
      description:
        "Kunder kan spørge om ordrenummer, leveringsstatus og få øjeblikkelige opdateringer",
    },
    {
      icon: Clock,
      title: "Booking & Tidsplanlægning",
      description:
        "Intelligent booking-assistent der hjælper med at finde ledige tider og bestille møder",
    },
    {
      icon: Users,
      title: "Lead Kvalificering",
      description:
        "AI'en identificerer og kvalificerer potentielle kunder gennem samtaler",
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-[var(--color-brand-blue-lighter-bg)] via-[var(--color-background)] to-[var(--color-secondary-light)] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: SMOOTH_EASE,
      }}
      style={{ willChange: "opacity" }} // 🔥 GPU HINT
    >
      {/* Background Elements - modulær komponent */}
      <BackgroundElements ref={backgroundRef} sectionInView={sectionInView} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={
            sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
          }
          transition={{ duration: 0.7, ease: SMOOTH_EASE }}
        >
          <div className="inline-flex items-center mb-4">
            <Bot className="w-8 h-8 text-[var(--color-brand-blue)] mr-3" />
            <h2 className="text-4xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)]">
              AI-Drevet Kundeservice
            </h2>
          </div>
          <div className="w-24 h-1 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-[var(--color-foreground)]/70 max-w-3xl mx-auto font-[var(--font-body)]">
            Integrér intelligente chatbots der arbejder 24/7 for at give dine
            kunder øjeblikkelig hjælp og forbedre deres oplevelse markant.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Venstre side - Capabilities */}
          <div>
            <motion.h3
              className="text-2xl font-bold text-[var(--color-foreground)] mb-8 font-[var(--font-heading)]"
              initial={{ opacity: 0, x: -20 }}
              animate={
                capabilitiesInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            >
              Hvad kan din AI-assistent?
            </motion.h3>

            <div ref={capabilitiesRef} className="space-y-6">
              {aiCapabilities.map((capability, index) => (
                <AICapabilityCard
                  key={index}
                  capability={capability}
                  index={index}
                  cardInView={capabilitiesInView}
                />
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-6">
              <StatsCard
                value="95%"
                label="Hurtigere responstid"
                index={0}
                statsInView={statsInView}
              />
              <StatsCard
                value="24/7"
                label="Tilgængelighed"
                index={1}
                statsInView={statsInView}
              />
            </div>
          </div>

          {/* Højre side - Video Demo */}
          <VideoDemo
            ref={demoRef}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            demoInView={demoInView}
          />
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.8, ease: SMOOTH_EASE }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-[var(--font-body)]"
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2, ease: SMOOTH_EASE },
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
              willChange: "transform",
            }}
          >
            <Zap className="w-5 h-5 mr-2" />
            Få AI integreret i din løsning
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
