import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Lock, FileText, CheckCircle2, Eye } from "lucide-react";

export default function GDPRSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const complianceFeatures = [
    {
      icon: Shield,
      title: "GDPR Compliance",
      description:
        "Alle vores løsninger overholder EU's databeskyttelsesforordning",
    },
    {
      icon: Lock,
      title: "SSL & Sikkerhed",
      description: "256-bit kryptering og sikre dataoverførsler som standard",
    },
    {
      icon: FileText,
      title: "Privatlivspolitik",
      description: "Klare og gennemsigtige privatlivspolitikker integreret",
    },
    {
      icon: Eye,
      title: "Cookie Consent",
      description: "GDPR-kompatible cookie bannere og consent management",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-[var(--color-secondary-light)] to-[var(--color-background)] relative overflow-hidden"
    >
      {/* Baggrundselementer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[var(--color-brand-blue)] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[var(--color-brand-blue-lighter-bg)] rounded-lg rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[var(--color-brand-blue)]/30 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center mb-4">
            <Shield className="w-8 h-8 text-[var(--color-brand-blue)] mr-3" />
            <h2 className="text-4xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)]">
              Sikkerhed & Compliance
            </h2>
          </div>
          <div className="w-24 h-1 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-[var(--color-foreground)]/70 max-w-3xl mx-auto font-[var(--font-body)]">
            Vi tager datasikkerhed alvorligt. Alle vores løsninger er bygget med
            GDPR-compliance og høj sikkerhed som fundament.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {complianceFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-[var(--color-background)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-primary)]/10 hover:border-[var(--color-brand-blue)]/30"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-[var(--color-brand-blue-lighter-bg)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[var(--color-brand-blue)]/20 transition-colors">
                  <Icon className="w-8 h-8 text-[var(--color-brand-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3 font-[var(--font-heading)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-foreground)]/70 leading-relaxed font-[var(--font-body)]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certificering badge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="inline-flex items-center bg-[var(--color-brand-blue-lighter-bg)] border border-[var(--color-brand-blue)]/20 rounded-full px-6 py-3">
            <CheckCircle2 className="w-6 h-6 text-[var(--color-brand-blue)] mr-3" />
            <span className="text-[var(--color-foreground)] font-semibold font-[var(--font-body)]">
              GDPR Certificeret & EU-kompatibel
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
