// components/Hero.jsx
"use client";

import { motion } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import { ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { buttonHover } from "@/animations/variants"; 

export default function Hero({ onBooking }) {
  const [showParticles, setShowParticles] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

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

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Behold komponenten-specifikke animationer, da de er specialdesignede for hero-sektionen
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
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.17, 0.67, 0.83, 0.97],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateY: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
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
    >
      {/* Video baggrund - optimeret */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
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
        >
          <source src="/videos/teamProgrammingVideo.mp4" type="video/mp4" />
          Din browser understøtter ikke HTML5 video.
        </video>
      </div>

      {/* Elegant sort gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Hovedindhold */}
      <motion.div
        className="relative flex flex-col items-center justify-center h-full px-6"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo med wow-effect */}
        <motion.div className="mb-8" variants={logoVariants}>
          <svg
            width="180"
            height="180"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_30px_rgba(126,174,219,0.6)]"
            aria-label="CompanyWeb logo"
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

        {/* VI ER tekst - bogstav for bogstav animation */}
        <motion.div className="mb-2" variants={textVariants}>
          <div className="flex justify-center">
            {["V", "I", " ", "E", "R"].map((letter, i) => (
              <motion.span
                key={`vi-er-${i}`}
                className="text-3xl md:text-4xl font-bold text-white inline-block mx-[2px]"
                variants={letterVariants}
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

        {/* CompanyWeb tekst - bogstav for bogstav med glow */}
        <motion.div className="mb-10" variants={textVariants}>
          <div
            className="flex justify-center flex-wrap"
            role="heading"
            aria-level="1"
          >
            {["C", "o", "m", "p", "a", "n", "y", "W", "e", "b"].map(
              (letter, i) => (
                <motion.span
                  key={`company-${i}`}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-brand-blue)] inline-block mx-[1px] drop-shadow-[0_0_15px_rgba(126,174,219,0.6)]"
                  variants={letterVariants}
                  whileHover={{
                    scale: 1.1,
                    color: "#ffffff",
                    textShadow: "0 0 20px rgba(126,174,219,0.8)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter}
                </motion.span>
              )
            )}
          </div>
        </motion.div>

        {/* Beskrivelse med dynamisk glow og forbedret kontrast */}
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
          "
        >
          Skræddersyede webløsninger – fra iøjnefaldende portfolioer til
          avancerede webshops og bookingsystemer.
        </motion.p>

        {/* CTA knapper med forbedret tilgængelighed */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          {/* BookingModal komponent */}
          <BookingModal onBooking={onBooking} />

          {/* Cases knap - nu med shared buttonHover animation */}
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
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-primary-darkest)] focus:ring-[var(--color-brand-blue)]
            "
            aria-label="Se vores case-eksempler"
            whileHover={buttonHover} // Bruger fælles animation fra variants.js
            whileTap={{ scale: 0.98 }}
          >
            Se vores cases
            <ChevronRight
              size={20}
              className="ml-2 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
