"use client";

import { forwardRef } from "react";
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
} from "lucide-react";
import { fadeInUpVariants, textRevealVariants } from "./animations";

const FeatureBlock = forwardRef(
  ({ feature, featureInView, featureControls, featureType }, ref) => {
    const getIcon = () => {
      switch (featureType) {
        case "react":
          return <Zap size={40} className="text-[var(--color-brand-blue)]" />;
        case "support":
          return <Clock size={40} className="text-[var(--color-brand-blue)]" />;
        case "custom":
          return <Code size={40} className="text-[var(--color-brand-blue)]" />;
        default:
          return <Zap size={40} className="text-[var(--color-brand-blue)]" />;
      }
    };

    const getBenefits = () =>
      featureType === "react"
        ? [
            { icon: <Rocket size={16} />, text: feature.content.benefits[0] },
            { icon: <Shield size={16} />, text: feature.content.benefits[1] },
            { icon: <PenTool size={16} />, text: feature.content.benefits[2] },
            {
              icon: <TrendingUp size={16} />,
              text: feature.content.benefits[3],
            },
          ]
        : [];

    return (
      <motion.div
        ref={ref}
        className="relative py-12 px-6 rounded-3xl bg-[var(--color-background)] shadow-lg border border-[var(--color-primary)]/10"
        variants={fadeInUpVariants}
        initial="hidden"
        animate={featureControls}
        style={{
          transform: "translate3d(0,0,0)",
          willChange: "transform, opacity",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:text-left text-center gap-8">
          {/* Ikon */}
          <div className="flex justify-center lg:justify-start">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-blue)]/5 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: featureInView ? 1 : 0,
                opacity: featureInView ? 1 : 0,
              }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 150,
                delay: 0.1,
              }}
            >
              {getIcon()}
            </motion.div>
          </div>

          {/* Indhold */}
          <div className="flex-1">
            <motion.h3
              className="text-2xl lg:text-3xl font-bold mb-4 font-[var(--font-heading)] text-[var(--color-foreground)]"
              variants={textRevealVariants}
              custom={0}
            >
              {feature.title}
            </motion.h3>

            {/* Opdelt brødtekst i kolonner */}
            <motion.p
              className="
                mb-6 
                text-[var(--color-foreground)]/80 
                font-[var(--font-body)] 
                leading-relaxed
                columns-1 md:columns-2 md:gap-8 
                max-w-prose mx-auto md:max-w-none
              "
              variants={textRevealVariants}
              custom={1}
              style={{ willChange: "column-width, opacity" }}
            >
              {feature.content.paragraph}
            </motion.p>

            {/* React-features */}
            {featureType === "react" && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delay: 0.4 },
                  },
                }}
              >
                {getBenefits().map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center p-4 bg-[var(--color-secondary-light)] rounded-xl border border-[var(--color-brand-blue)]/10"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-blue)]/10 flex items-center justify-center mr-3">
                      <span className="text-[var(--color-brand-blue)]">
                        {benefit.icon}
                      </span>
                    </div>
                    <span className="text-sm font-medium font-[var(--font-body)] text-[var(--color-foreground)]">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Support-features */}
            {featureType === "support" && feature.content.responseTime && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                variants={textRevealVariants}
                custom={2}
              >
                {/* Responstid fylder begge kolonner, hvis der ikke er testimonial */}
                <motion.div
                  className={`flex items-center bg-[var(--color-primary)]/5 p-6 rounded-xl ${
                    !feature.content.testimonial ? "md:col-span-2" : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={featureInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  style={{ willChange: "transform, opacity" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Clock
                    size={30}
                    className="text-[var(--color-brand-blue)] mr-4"
                  />
                  <div>
                    <p className="text-lg font-semibold text-[var(--color-foreground)]">
                      {feature.content.responseTime}
                    </p>
                    <p className="text-sm text-[var(--color-foreground)]/60">
                      Gennemsnitlig responstid
                    </p>
                  </div>
                </motion.div>

                {/* Testimonial – kun hvis det findes */}
                {feature.content.testimonial?.text && (
                  <motion.div
                    className="p-6 bg-[var(--color-secondary-light)] rounded-xl border-l-4 border-[var(--color-brand-blue)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={featureInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <blockquote className="italic text-[var(--color-foreground)]/80">
                      “{feature.content.testimonial.text}”
                    </blockquote>
                    <footer className="mt-4 text-sm font-medium text-[var(--color-foreground)]/60">
                      — {feature.content.testimonial.author}
                    </footer>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Custom-features */}
            {featureType === "custom" && (
              <motion.div
                className="flex justify-center lg:justify-start"
                variants={textRevealVariants}
                custom={2}
              >
                <div className="inline-flex items-center bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] text-white py-3 px-6 rounded-full shadow-lg">
                  <Award size={20} className="mr-3" />
                  <span className="font-bold font-[var(--font-heading)]">
                    {feature.content.guarantee}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

FeatureBlock.displayName = "FeatureBlock";
export default FeatureBlock;
