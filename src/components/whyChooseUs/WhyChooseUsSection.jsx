"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import * as Icons from "lucide-react";

import { mediaVariants, textVariants, buttonVariants } from "./variants";
import StatsCard from "./StatsCard";
import AccordionItem from "./AccordionItem";
import TechContent from "./TechContent";
import SupportContent from "./SupportContent";
import CustomContent from "./CustomContent";
import { stats, accordionItems } from "../../data/whyChooseUsData";

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.3 });

  const [expanded, setExpanded] = useState({
    technology: false,
    support: false,
    custom: false,
  });

  const toggleExpand = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative scroll-mt-[var(--header-height)] bg-[var(--color-secondary-light)] py-20 lg:py-28 overflow-hidden w-screen"
    >
      {/* Baggrundselementer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute right-0 top-0 w-1/2 h-full opacity-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.08, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/images/compare/computer.png"
            alt=""
            className="absolute top-1/2 right-0 -translate-y-1/2 max-w-2xl"
          />
        </motion.div>
        <motion.div
          className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[var(--color-brand-blue)]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div
          className="absolute left-1/3 -top-32 w-96 h-96 rounded-full bg-[var(--color-brand-blue)]/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
      </div>

      {/* Indhold */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* Titel & intro */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Hvorfor vælge os
            </h2>
            <div className="w-24 h-1 bg-[var(--color-brand-blue)] rounded-full mx-auto mb-8" />
          </motion.div>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Hos os handler det ikke bare om at lave hjemmesider. Det handler om
            at skabe digitale løsninger, der gør en forskel.
          </motion.p>
        </motion.div>

        {/* Statistikker */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-4xl mx-auto mb-24"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((s, i) => (
            <StatsCard key={i} {...s} index={i} />
          ))}
        </motion.div>

        {/* Video + accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            className="col-span-1 lg:col-span-6 xl:col-span-7 overflow-hidden rounded-xl shadow-xl"
            variants={mediaVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="aspect-video relative">
              <video
                src="/videos/why_us_demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <p className="absolute bottom-6 left-6 bg-black/60 text-white px-5 py-3 rounded-lg text-sm font-medium backdrop-blur-sm">
                Se, hvordan vi samarbejder i praksis
              </p>
            </div>
          </motion.div>

          <motion.div
            className="col-span-1 lg:col-span-6 xl:col-span-5 space-y-6"
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            {accordionItems.map((item) => (
              <AccordionItem
                key={item.key}
                icon={Icons[item.icon]}
                title={item.title}
                isOpen={expanded[item.key]}
                onToggle={() => toggleExpand(item.key)}
              >
                {item.key === "technology" && <TechContent {...item.content} />}
                {item.key === "support" && <SupportContent {...item.content} />}
                {item.key === "custom" && <CustomContent {...item.content} />}
              </AccordionItem>
            ))}

            <motion.a
              href="#contact"
              className="btn-primary inline-block mt-10 w-full text-center shadow-lg group py-4 text-lg"
              variants={buttonVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Lad os tage skridtet sammen
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
