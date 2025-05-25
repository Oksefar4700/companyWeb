import React, { useRef, useState } from "react";
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

export default function AIIntegrationSection() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
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

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-[var(--color-brand-blue-lighter-bg)] via-[var(--color-background)] to-[var(--color-secondary-light)] relative overflow-hidden"
    >
      {/* Animerede baggrundselementer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-2xl font-bold text-[var(--color-foreground)] mb-8 font-[var(--font-heading)]"
              variants={itemVariants}
            >
              Hvad kan din AI-assistent?
            </motion.h3>

            <div className="space-y-6">
              {aiCapabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start group"
                  >
                    <div className="w-12 h-12 bg-[var(--color-brand-blue)] rounded-xl flex items-center justify-center mr-4 group-hover:bg-[var(--color-brand-blue-darker)] group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-[var(--color-background)]" />
                    </div>
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
              })}
            </div>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <div className="bg-[var(--color-background)] rounded-xl p-6 shadow-lg border border-[var(--color-primary)]/10">
                <div className="text-3xl font-bold text-[var(--color-brand-blue)] mb-2 font-[var(--font-heading)]">
                  95%
                </div>
                <div className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                  Hurtigere responstid
                </div>
              </div>
              <div className="bg-[var(--color-background)] rounded-xl p-6 shadow-lg border border-[var(--color-primary)]/10">
                <div className="text-3xl font-bold text-[var(--color-brand-blue)] mb-2 font-[var(--font-heading)]">
                  24/7
                </div>
                <div className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                  Tilgængelighed
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Højre side - Video Demo */}
          <motion.div
            variants={videoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
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
                      className="w-20 h-20 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-8 h-8 text-[var(--color-background)] ml-1" />
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
                  >
                    <source
                      src="/videos/ai-chatbot-demo.mp4"
                      type="video/mp4"
                    />
                    Din browser understøtter ikke HTML5 video.
                  </video>
                )}
              </div>

              {/* Chat Preview */}
              {!isPlaying && (
                <div className="absolute bottom-4 right-4 bg-[var(--color-background)] rounded-lg shadow-lg p-3 max-w-xs border border-[var(--color-primary)]/10">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-[var(--color-brand-blue)] rounded-full flex items-center justify-center mr-2">
                      <Bot className="w-4 h-4 text-[var(--color-background)]" />
                    </div>
                    <div className="text-sm font-medium text-[var(--color-foreground)] font-[var(--font-body)]">
                      AI Assistant
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                  </div>
                  <div className="text-xs text-[var(--color-foreground)]/70 bg-[var(--color-secondary-light)] rounded p-2 font-[var(--font-body)]">
                    "Hej! Jeg kan hjælpe med at finde dit ordrenummer og svare
                    på spørgsmål om levering 😊"
                  </div>
                </div>
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
            />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)] text-[var(--color-background)] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-[var(--font-body)]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-5 h-5 mr-2" />
            Få AI integreret i din løsning
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
