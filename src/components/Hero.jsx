// src/components/Hero.jsx
"use client";

import { motion } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import { ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, forwardRef } from "react";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];
const HERO_EASE = [0.22, 1, 0.36, 1];

// 🔥 MODULÆR KOMPONENT: VideoBackground med forwardRef
const VideoBackground = forwardRef(function VideoBackground(
  { sectionRef },
  ref
) {
  const videoRef = useRef(null);

  // Video optimering
  useEffect(() => {
    if (!videoRef.current) return;

    const isMobile = window.innerWidth < 768;
    const videoElement = videoRef.current;

    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("preload", "metadata");

    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (videoElement.paused) {
          if (isMobile) {
            videoElement.currentTime = 0;
          }
          videoElement
            .play()
            .catch((err) => console.error("Video play error:", err));
        }
      } else {
        if (!videoElement.paused) {
          videoElement.pause();
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionRef]);

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      style={{
        zIndex: 1,
        transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        willChange: "opacity",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-70"
        preload="metadata"
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "opacity",
        }}
      >
        <source src="/videos/teamProgrammingVideo.mp4" type="video/mp4" />
        Din browser understøtter ikke HTML5 video.
      </video>
    </div>
  );
});

// 🔥 MODULÄR KOMPONENT: GradientOverlay med forwardRef
const GradientOverlay = forwardRef(function GradientOverlay({}, ref) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none"
      style={{
        zIndex: 2,
        transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
      }}
      aria-hidden="true"
    />
  );
});

// 🔥 MODULÄR KOMPONENT: HeroLogo med forwardRef
const HeroLogo = forwardRef(function HeroLogo({}, ref) {
  return (
    <motion.div
      ref={ref}
      className="mb-8"
      initial={{
        opacity: 0,
        scale: 0.6,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1.0,
        ease: [0.17, 0.67, 0.83, 0.97],
      }}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_30px_rgba(126,174,219,0.6)]"
        aria-label="CompanyWeb logo"
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      >
        <motion.path
          d="M500 200C331.8 200 200 331.8 200 500C200 668.2 331.8 800 500 800"
          stroke="#7eaedb"
          strokeWidth="100"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path
          d="M480 330L600 740L700 450L800 740L910 330"
          stroke="#7eaedb"
          strokeWidth="100"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: AnimatedText med forwardRef
const AnimatedText = forwardRef(function AnimatedText(
  { text, className, delay = 0 },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        staggerChildren: 0.06,
        delayChildren: delay,
      }}
    >
      <div className="flex justify-center flex-wrap">
        {text.split("").map((letter, i) => (
          <motion.span
            key={`${text}-${i}`}
            className={`inline-block mx-[1px] ${className}`}
            initial={{
              opacity: 0,
              y: 20,
              rotateY: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotateY: 0,
            }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.1,
              color: "#ffffff",
              textShadow: "0 0 20px rgba(126,174,219,0.8)",
              transition: { duration: 0.2 },
            }}
          >
            {letter === " " ? (
              <span className="w-2 inline-block">&nbsp;</span>
            ) : (
              letter
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: CTAButtons med forwardRef
const CTAButtons = forwardRef(function CTAButtons({ onBooking }, ref) {
  return (
    <motion.div
      ref={ref}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: HERO_EASE,
        delay: 0.8,
      }}
    >
      {/* BookingModal komponent */}
      <BookingModal onBooking={onBooking} />

      {/* Cases knap */}
      <motion.a
        href="#cases"
        className="
          inline-flex items-center justify-center
          px-8 py-3 text-lg font-semibold
          rounded-lg border-2 border-[var(--color-brand-blue)]
          text-white
          hover:bg-[var(--color-brand-blue)]
          hover:text-[var(--color-background)]
          transition shadow-md
          focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-offset-[var(--color-primary-darkest)] 
          focus:ring-[var(--color-brand-blue)]
          font-[var(--font-body)]
        "
        aria-label="Se vores case-eksempler"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2, ease: SMOOTH_EASE },
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform",
        }}
      >
        Se vores cases
        <ChevronRight
          size={20}
          className="ml-2 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </motion.a>
    </motion.div>
  );
});

// 🔥 HOVEDKOMPONENT
export default function Hero({ onBooking }) {
  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: HERO_EASE },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="
        relative
        w-full
        h-[calc(100vh-var(--header-height))]
        overflow-hidden
        bg-[var(--color-primary-darkest)]
      "
      aria-label="Velkommen til CompanyWeb"
      style={{
        transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
        willChange: "opacity",
      }}
    >
      {/* Video baggrund - optimeret */}
      <VideoBackground ref={videoRef} sectionRef={sectionRef} />

      {/* Gradient overlay */}
      <GradientOverlay ref={overlayRef} />

      {/* Hovedindhold */}
      <motion.div
        className="relative flex flex-col items-center justify-center h-full px-6"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo med wow-effect */}
        <HeroLogo ref={logoRef} />

        {/* VI ER tekst */}
        <AnimatedText
          ref={textRef}
          text="VI ER"
          className="text-3xl md:text-4xl font-bold text-white"
          delay={0.1}
        />

        {/* CompanyWeb tekst */}
        <AnimatedText
          text="CompanyWeb"
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-brand-blue)] drop-shadow-[0_0_15px_rgba(126,174,219,0.6)]"
          delay={0.2}
        />

        {/* Beskrivelse */}
        <motion.p
          variants={itemVariants}
          className="
            max-w-xl
            mb-10 md:mb-12
            text-lg sm:text-xl
            text-white
            text-center
            drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]
            font-medium
            font-[var(--font-body)]
          "
        >
          Skræddersyede webløsninger – fra iøjnefaldende portfolioer til
          avancerede webshops og bookingsystemer.
        </motion.p>

        {/* CTA knapper */}
        <CTAButtons ref={ctaRef} onBooking={onBooking} />
      </motion.div>
    </section>
  );
}
