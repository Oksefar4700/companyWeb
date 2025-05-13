"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function WhyChooseUsSection() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const videoVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="bg-[var(--color-background)] text-[var(--color-primary)] flex flex-col lg:flex-row items-start scroll-mt-[var(--header-height)] py-16 lg:py-20 px-6 lg:px-12"
    >
      {/* Animated video section */}
      <motion.div
        variants={videoVariants}
        initial="hidden"
        animate={controls}
        className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 mb-8 lg:mb-0 rounded-xl ring-1 ring-[var(--color-primary)]/10 overflow-hidden"
      >
        <video
          src="/videos/why_us_demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Text section with centered underline and shorter heading */}
      <div className="w-full lg:w-1/2 lg:pl-12">
        <div className="inline-block mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ikke bare WordPress
          </h2>
          <div className="w-16 h-1 bg-[var(--color-brand-blue)] mt-2 mx-auto" />
        </div>

        <div className="space-y-8 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-brand-blue)] mb-2">
              Total fleksibilitet
            </h3>
            <p className="text-lg leading-relaxed">
              Slut med plugin-begrænsninger – vi skaber en skræddersyet løsning
              uden WordPress-tag.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[var(--color-brand-blue)] mb-2">
              Ydeevne i top
            </h3>
            <p className="text-lg leading-relaxed">
              Ingen unødvendig ballast – lynhurtige sider optimeret til dine
              brugere.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[var(--color-brand-blue)] mb-2">
              Vedvarende support
            </h3>
            <p className="text-lg leading-relaxed">
              Løbende opdateringer og personlig sparring giver dig ro i maven.
            </p>
          </div>
        </div>

        {/* Animated button on scroll */}
        <motion.a
          href="#contact"
          className="btn-primary inline-block"
          variants={buttonVariants}
          initial="hidden"
          animate={controls}
        >
          Lad os tage skridtet sammen
        </motion.a>
      </div>
    </section>
  );
}
