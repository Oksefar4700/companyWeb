// src/components/CasesList.jsx
"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { projects as projectsData } from "../data/projects";
import Lightbox from "./Lightbox";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Automatisk carousel med pile og prikker
const CategoryImageCarousel = ({ images, onImageClick, categoryTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Auto-loop
  useEffect(() => {
    if (!images.length) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [images]);

  if (!images.length) return null;

  const prev = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const next = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const goTo = (i) => {
    clearInterval(intervalRef.current);
    setCurrentIndex(i);
  };

  return (
    <div className="mt-4 h-56 sm:h-64 md:h-72 w-full relative overflow-hidden rounded-lg">
      {/* Billeder */}
      {images.map((image, i) => (
        <div
          key={`${categoryTitle}-img-${i}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => onImageClick(image.src)}
            loading="lazy"
          />
        </div>
      ))}

      {/* Pile */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white backdrop-blur-sm p-2 rounded-full z-20"
        aria-label="Forrige"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white backdrop-blur-sm p-2 rounded-full z-20"
        aria-label="Næste"
      >
        <ChevronRight size={24} />
      </button>

      {/* Prikker */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full transition-opacity duration-300 ${
              i === currentIndex ? "opacity-100" : "opacity-50"
            } bg-[var(--color-brand-blue)]`}
            aria-label={`Billede ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function CasesList() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(sectionRef, { amount: 0.2 });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesByTitle, setImagesByTitle] = useState({});

  useEffect(() => {
    setImagesByTitle(groupImagesByProjectTitle(projectsData));
  }, []);

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [inView, controls]);

  const projectCategoriesToShow = [
    "Frisør-Booking",
    "Håndværker-Portfolio",
    "Mini-Webshop",
  ];

  // Framer-motion varianter
  const circleVariant = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom) => ({
      scale: 1,
      opacity: custom.opacity,
      transition: { duration: 1, delay: custom.delay, ease: "easeOut" },
    }),
  };
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
  };
  const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.6, delay: 0.2, ease: [0.6, 0.05, -0.01, 0.9] },
    },
  };
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };
  const cardBoxVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="cases"
        className="
          relative
          bg-[var(--color-secondary-light)]
          text-[var(--color-foreground)]
          scroll-mt-[var(--header-height)]
          py-20 sm:py-24
          overflow-x-visible overflow-y-hidden
        "
      >
        {/* baggrundscirkler */}
        <motion.div
          className="
            absolute top-0 right-0 w-72 h-72
            bg-[var(--color-primary)] rounded-full
            pointer-events-none z-1
            -translate-y-1/2 translate-x-1/3
          "
          variants={circleVariant}
          custom={{ delay: 0.2, opacity: 0.3 }}
          initial="hidden"
          animate={controls}
        />
        <motion.div
          className="
            absolute bottom-0 left-0 w-96 h-96
            bg-[var(--color-primary)] rounded-full
            pointer-events-none z-1
            translate-y-1/2 -translate-x-1/3
          "
          variants={circleVariant}
          custom={{ delay: 0.4, opacity: 0.2 }}
          initial="hidden"
          animate={controls}
        />
        <motion.div
          className="
            absolute top-1/2 left-1/2 w-60 h-60
            bg-[var(--color-brand-blue)] rounded-full
            pointer-events-none z-1
            -translate-x-1/2 -translate-y-1/2
          "
          variants={circleVariant}
          custom={{ delay: 0.6, opacity: 0.3 }}
          initial="hidden"
          animate={controls}
        />

        {/* overskrift */}
        <div className="container mx-auto px-6 text-center relative z-5">
          <motion.h2
            initial="hidden"
            variants={headingVariants}
            animate={controls}
            className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-3"
          >
            Vores Cases & Løsninger
          </motion.h2>
          <motion.div
            initial="hidden"
            variants={dividerVariants}
            animate={controls}
            className="w-24 h-1 bg-[var(--color-brand-blue)] mx-auto mb-12 sm:mb-16"
          />
        </div>

        {/* kort-grid */}
        <div className="container mx-auto px-6 relative z-5">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            initial="hidden"
            variants={gridContainerVariants}
            animate={controls}
          >
            {projectCategoriesToShow.map((title) => {
              const imgs = imagesByTitle[title] || [];
              const details = projectsData.find((p) => p.title === title);
              if (!details || !imgs.length) return null;

              return (
                <motion.div
                  key={details.slug || title}
                  className="
                    bg-[var(--color-background)]
                    p-6 rounded-2xl
                    shadow-xl hover:shadow-2xl
                    transition-shadow duration-300
                    flex flex-col
                  "
                  variants={cardBoxVariants}
                >
                  <h3
                    className="
                      text-xl sm:text-2xl font-semibold
                      text-[var(--color-brand-blue)]
                      mb-3 text-center
                    "
                  >
                    {details.title}
                  </h3>

                  <CategoryImageCarousel
                    images={imgs}
                    onImageClick={setSelectedImage}
                    categoryTitle={details.title}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
