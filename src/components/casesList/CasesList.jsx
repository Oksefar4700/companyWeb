// src/components/casesList/CasesList.jsx
"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects as projectsData } from "../../data/projects";
import Lightbox from "./Lightbox";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 🚀 SMOOTH EASING CURVES (hardware-accelerated)
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// Hjælper: grupér eksempler per projekt
const groupImagesByProjectTitle = (projects) =>
  projects.reduce((acc, project) => {
    const title = project.title;
    if (!acc[title]) acc[title] = [];
    project.examples?.forEach((src) =>
      acc[title].push({ src, title, alt: `${title} – eksempelbillede` })
    );
    return acc;
  }, {});

// 🔥 MODULÆR KOMPONENT: CategoryImageCarousel med forwardRef
const CategoryImageCarousel = forwardRef(function CategoryImageCarousel(
  { images, onImageClick, categoryTitle },
  ref
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const intervalRef = useRef(null);

  // 🔥 PRELOAD billeder for smooth transitions
  useEffect(() => {
    if (!images.length) return;

    const preloadImages = () => {
      images.forEach((image, index) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded((prev) => new Set([...prev, index]));
        };
        img.src = image.src;
      });
    };

    preloadImages();
  }, [images]);

  // Auto-rotation med smooth transition
  useEffect(() => {
    if (!images.length || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [images]);

  const handleNav = (dir) => {
    clearInterval(intervalRef.current);
    setCurrentIndex((i) =>
      dir === "prev"
        ? (i - 1 + images.length) % images.length
        : (i + 1) % images.length
    );
  };

  const goTo = (targetIndex) => {
    if (currentIndex === targetIndex) return;
    clearInterval(intervalRef.current);
    setCurrentIndex(targetIndex);
  };

  if (!images.length) return null;

  return (
    <div
      ref={ref}
      className="mt-4 h-56 sm:h-64 md:h-72 w-full relative overflow-hidden rounded-lg bg-[var(--color-secondary-light)]"
      style={{ transform: "translate3d(0,0,0)" }} // 🔥 GPU LAYER
    >
      {/* 🔥 OPTIMERET BILLEDE CONTAINER */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <motion.div
            key={`${categoryTitle}-${index}`}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.05,
            }}
            transition={{
              duration: 0.5,
              ease: SMOOTH_EASE,
            }}
            style={{
              transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
              willChange: "opacity, transform",
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              onClick={() => onImageClick(image.src)}
              className={`
                w-full h-full object-cover cursor-pointer
                transition-opacity duration-300 ease-in-out
                ${!imagesLoaded.has(index) ? "opacity-0" : "opacity-100"}
              `}
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
              style={{
                backfaceVisibility: "hidden", // 🔥 3D OPTIMIZATION
                transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
              }}
            />

            {/* Loading placeholder */}
            {!imagesLoaded.has(index) && (
              <div className="absolute inset-0 bg-[var(--color-secondary-light)] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--color-brand-blue)] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay for bedre kontrast */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
        style={{ transform: "translate3d(0,0,0)" }} // 🔥 GPU LAYER
      />

      {/* Navigation - kun vis hvis flere end 1 billede */}
      {images.length > 1 && (
        <>
          <motion.button
            onClick={() => handleNav("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            aria-label="Forrige billede"
          >
            <ChevronLeft size={20} className="text-[var(--color-foreground)]" />
          </motion.button>

          <motion.button
            onClick={() => handleNav("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            aria-label="Næste billede"
          >
            <ChevronRight
              size={20}
              className="text-[var(--color-foreground)]"
            />
          </motion.button>
        </>
      )}

      {/* Dots - kun vis hvis flere end 1 billede */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goTo(index)}
              className={`
                rounded-full transition-all duration-300 
                ${
                  index === currentIndex
                    ? "bg-[var(--color-brand-blue)] w-6 h-1.5"
                    : "bg-white/60 hover:bg-white/80 w-1.5 h-1.5"
                }
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              aria-label={`Gå til billede ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress indicator */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded text-xs font-medium text-[var(--color-foreground)]">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
});

// 🔥 MODULÄR KOMPONENT: CaseCard med forwardRef
const CaseCard = forwardRef(function CaseCard(
  { title, details, images, cardInView, onImageClick, index },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="bg-[var(--color-background)] p-6 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer flex flex-col"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={
        cardInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: 0.95 }
      }
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: SMOOTH_EASE,
        type: "tween",
      }}
      style={{ willChange: "transform, opacity" }} // 🔥 GPU HINT
      whileHover={{
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2, ease: SMOOTH_EASE },
      }}
    >
      <motion.h3
        className="text-xl sm:text-2xl font-semibold text-[var(--color-brand-blue)] mb-3 text-center font-[var(--font-heading)]"
        initial={{ opacity: 0, y: 10 }}
        animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          delay: index * 0.15 + 0.2,
          duration: 0.5,
          ease: SMOOTH_EASE,
        }}
      >
        {title}
      </motion.h3>

      <CategoryImageCarousel
        images={images}
        onImageClick={onImageClick}
        categoryTitle={title}
      />
    </motion.div>
  );
});

// 🔥 MODULÄR KOMPONENT: BackgroundElements (statisk for performance)
const BackgroundElements = forwardRef(function BackgroundElements(
  { sectionInView },
  ref
) {
  return (
    <div ref={ref} className="absolute inset-0 opacity-30 pointer-events-none">
      {/* 🔥 STATISKE GRADIENT CIRKLER MED GPU ACCELERATION */}
      <motion.div
        className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.6, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.5,
          ease: SMOOTH_EASE,
          delay: 0.2,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[var(--color-primary)]/20 to-transparent rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.4, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.5,
          ease: SMOOTH_EASE,
          delay: 0.4,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-r from-[var(--color-brand-blue)]/15 to-transparent rounded-full blur-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          sectionInView
            ? { opacity: 0.5, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.5,
          ease: SMOOTH_EASE,
          delay: 0.6,
        }}
        style={{
          transform: "translate3d(0,0,0)", // 🔥 GPU LAYER
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
});

export default function CasesList() {
  // 🔥 REFS FOR HVER SEKTION (modulær tilgang)
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  // 🔥 OPTIMERET useInView - once: true + hardware acceleration
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.8 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.3 });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesByTitle, setImagesByTitle] = useState({});

  useEffect(() => {
    setImagesByTitle(groupImagesByProjectTitle(projectsData));
  }, []);

  const projectCategoriesToShow = [
    "Frisør-Booking",
    "Håndværker-Portfolio",
    "Mini-Webshop",
  ];

  return (
    <>
      <motion.section
        ref={sectionRef}
        id="cases"
        className="relative bg-[var(--color-secondary-light)] text-[var(--color-foreground)] scroll-mt-[var(--header-height)] py-20 sm:py-24 overflow-hidden"
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

        {/* Overskrift */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
            ref={headingRef}
            className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-3 font-[var(--font-heading)]"
            initial={{ opacity: 0, y: -20 }}
            animate={
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
            }
            transition={{ duration: 0.6, delay: 0.1, ease: SMOOTH_EASE }}
          >
            Vores Cases & Løsninger
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-[var(--color-brand-blue)] mx-auto mb-12 sm:mb-16 rounded-full"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: SMOOTH_EASE }}
          />
        </div>

        {/* Kort-grid */}
        <div className="container mx-auto px-6 relative z-10">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {projectCategoriesToShow.map((title, index) => {
              const imgs = imagesByTitle[title] || [];
              const details = projectsData.find((p) => p.title === title);
              if (!details || !imgs.length) return null;

              return (
                <CaseCard
                  key={details.slug || title}
                  title={details.title}
                  details={details}
                  images={imgs}
                  cardInView={gridInView}
                  onImageClick={setSelectedImage}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
      <Lightbox
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
