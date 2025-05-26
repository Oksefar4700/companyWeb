// src/components/whyChooeseUsSection/AnimatedComponents.jsx - POLERET UI
"use client";

import { forwardRef, useRef, useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// 🔥 POLERET VideoSection - INGEN hover states (video er ikke klikkbart)
export const VideoSection = memo(
  forwardRef(function VideoSection({ videoInView }, ref) {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // 🔥 ACCESSIBILITY: Respect prefers-reduced-motion
    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // 🔥 OPTIMERET VIDEO LOADING & INTERSECTION OBSERVER
    useEffect(() => {
      if (!videoRef.current) return;

      const video = videoRef.current;

      video.setAttribute("preload", "metadata");
      video.setAttribute("playsinline", "");

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !prefersReducedMotion) {
            if (video.paused) {
              video.play().catch((err) => {
                console.log("Video autoplay prevented:", err);
              });
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        },
        {
          threshold: 0.5,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      observer.observe(video);

      const handleLoadedData = () => setIsLoaded(true);
      video.addEventListener("loadeddata", handleLoadedData);

      return () => {
        observer.disconnect();
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }, [prefersReducedMotion]);

    return (
      <motion.div
        ref={ref}
        className="max-w-5xl mx-auto mb-20 overflow-hidden rounded-2xl shadow-xl relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          videoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{
          duration: 0.8,
          ease: SMOOTH_EASE,
        }}
        style={{
          willChange: "transform, opacity",
          transform: "translate3d(0,0,0)",
          contain: "layout style paint",
        }}
        // 🔥 INGEN HOVER - video container er ikke klikkbart
      >
        <div className="aspect-video relative">
          {/* 🔥 CLEAN LOADING PLACEHOLDER */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-[var(--color-secondary-light)] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-[var(--color-brand-blue)] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-[var(--color-foreground)]/70 text-sm">
                  Indlæser video...
                </p>
              </div>
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            src="/videos/why_us_demo.mp4"
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
            }}
            poster="/images/video-poster.jpg"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
            style={{ transform: "translate3d(0,0,0)" }}
          />

          {/* Video Content Overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: SMOOTH_EASE,
            }}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0,0,0)",
            }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-[var(--font-heading)]">
              En partner, ikke bare en leverandør
            </h3>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto font-[var(--font-body)] opacity-90">
              Vi samarbejder tæt med vores kunder for at forstå deres behov og
              skabe løsninger, der virkelig gør en forskel.
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  })
);

// 🔥 POLERET CTASection - KUN denne har hover (den ER klikkbar!)
export const CTASection = memo(
  forwardRef(function CTASection({ ctaInView }, ref) {
    return (
      <motion.div
        ref={ref}
        className="mt-16 text-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: SMOOTH_EASE,
        }}
        style={{
          willChange: "transform, opacity",
          transform: "translate3d(0,0,0)",
        }}
      >
        {/* 🔥 DENNE HAR HOVER - den ER klikkbar! */}
        <motion.a
          href="#contact"
          className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-[var(--color-brand-blue)] text-white rounded-xl shadow-lg hover:bg-[var(--color-brand-blue-darker)] transition-all duration-300 group relative z-10 font-[var(--font-body)]"
          whileHover={{
            scale: 1.03,
            y: -2,
            boxShadow: "0 12px 30px -5px rgba(126, 174, 219, 0.4)",
            transition: { duration: 0.2, ease: SMOOTH_EASE },
          }}
          whileTap={{
            scale: 0.98,
            transition: { duration: 0.1 },
          }}
          style={{
            transform: "translate3d(0,0,0)",
            willChange: "transform",
          }}
        >
          Lad os starte dit projekt
          <motion.div
            className="ml-3"
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{
              duration: 0.3,
              ease: SMOOTH_EASE,
            }}
            style={{
              willChange: "transform",
            }}
          >
            <ArrowRight size={20} />
          </motion.div>
        </motion.a>

        {/* Trust signals under CTA */}
        <motion.p
          className="text-sm text-[var(--color-foreground)]/60 mt-4 font-[var(--font-body)]"
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: SMOOTH_EASE,
          }}
        >
          Gratis konsultation • Svar inden 24 timer • 100% tilfredshedsgaranti
        </motion.p>
      </motion.div>
    );
  })
);

VideoSection.displayName = "VideoSection";
CTASection.displayName = "CTASection";
