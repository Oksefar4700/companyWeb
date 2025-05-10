// src/components/CasesList.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { projects as projectsData } from "../data/projects";
import Lightbox from "./Lightbox";

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

// Pixel-baseret marquee-loop via Framer Motion
const CategoryImageLoop = ({ images, onImageClick, categoryTitle }) => {
  if (!images?.length) return null;
  const displayImages = [...images, ...images]; // 2x for kontinuerlig loop
  const containerRef = useRef(null);
  const [loopWidth, setLoopWidth] = useState(0);

  // Når billederne mountes, mål scrollWidth/2
  useEffect(() => {
    if (containerRef.current) {
      const total = containerRef.current.scrollWidth;
      setLoopWidth(total / 2);
    }
  }, [images]);

  return (
    <div className="mt-4 h-56 sm:h-64 md:h-72 w-full overflow-hidden relative rounded-lg bg-black/5 shadow-inner">
      <motion.div
        ref={containerRef}
        className="flex h-full will-change-transform transform-gpu"
        animate={{ x: [0, -loopWidth] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: images.length * 6,
            ease: "linear",
          },
        }}
      >
        {displayImages.map((image, i) => (
          <motion.div
            key={`${categoryTitle}-img-${i}`}
            className="flex-shrink-0 h-full w-auto aspect-[16/10] sm:aspect-[16/9] mr-4 cursor-pointer overflow-hidden rounded-md"
            onClick={() => onImageClick(image.src)}
            initial={{ opacity: 0.9 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
      {/* fade‐kanter */}
      <div
        className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r
                    from-[var(--color-secondary-light)]
                    via-[var(--color-secondary-light)]/80
                    to-transparent pointer-events-none z-10"
      />
      <div
        className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l
                    from-[var(--color-secondary-light)]
                    via-[var(--color-secondary-light)]/80
                    to-transparent pointer-events-none z-10"
      />
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

  // --- Framer‐motion varianter ---
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

        {/* kort‐grid */}
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

                  <CategoryImageLoop
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

      {/* Lightbox – ingen ændringer */}
      <Lightbox
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
