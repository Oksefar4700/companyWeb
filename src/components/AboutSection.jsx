// src/components/AboutSection.jsx
"use client";
import { motion } from "framer-motion";
import { Globe, Users, TrendingUp } from "lucide-react";

export default function AboutSection() {
  const features = [
    { icon: Globe, title: "Globalt mindset", text: "Vi designer med fokus..." },
    { icon: Users, title: "Personlig service", text: "Fra første møde..." },
    {
      icon: TrendingUp,
      title: "Resultatgaranti",
      text: "Vi kombinerer kreativt...",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden section-about-themed"
      style={{
        background: "var(--bg-about-global)",
        color: "var(--color-foreground)",
      }}
    >
      {/* Cirkler */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--color-primary)] rounded-full opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-10 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-20 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-3 font-heading"
        >
          Om os
        </motion.h2>
        <div className="w-24 h-1 bg-[var(--color-primary)] mx-auto mb-8 rounded-full" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg mb-12 text-opacity-80"
        >
          Hos{" "}
          <span className="font-semibold text-[var(--color-primary)]">
            CompanyWeb
          </span>{" "}
          lever vi...
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2 + 0.4,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="flex flex-col items-center p-6 bg-[var(--color-background)] rounded-3xl shadow-lg hover:shadow-2xl transition-shadow text-[var(--color-foreground)]"
            >
              <div className="p-4 mb-4 bg-[var(--color-primary)] rounded-full text-[var(--color-background)]">
                <Icon size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-center text-opacity-80">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <a href="#team" className="btn-primary inline-block">
            Mød os her ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
