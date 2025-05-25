import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryImageCarousel = React.memo(function CategoryImageCarousel({
  images,
  onImageClick,
  categoryTitle,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
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
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % images.length);
        setIsTransitioning(false);
      }, 50); // Meget kort delay for smooth transition
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [images]);

  const handleNav = useCallback(
    (dir) => {
      if (isTransitioning) return; // Forhindre spam clicks

      clearInterval(intervalRef.current);
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((i) =>
          dir === "prev"
            ? (i - 1 + images.length) % images.length
            : (i + 1) % images.length
        );
        setIsTransitioning(false);

        // Genstart auto-rotation efter 6 sekunder
        setTimeout(() => {
          if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
              setCurrentIndex((i) => (i + 1) % images.length);
            }, 4000);
          }
        }, 6000);
      }, 50);
    },
    [images.length, isTransitioning]
  );

  const goTo = useCallback(
    (targetIndex) => {
      if (currentIndex === targetIndex || isTransitioning) return;

      clearInterval(intervalRef.current);
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex(targetIndex);
        setIsTransitioning(false);
      }, 50);
    },
    [currentIndex, isTransitioning]
  );

  const handleImageClick = useCallback(() => {
    if (!isTransitioning) {
      onImageClick(images[currentIndex].src);
    }
  }, [currentIndex, images, onImageClick, isTransitioning]);

  if (!images.length) return null;

  return (
    <div className="relative overflow-hidden rounded-lg h-56 sm:h-64 md:h-72 w-full bg-[var(--color-secondary-light)]">
      {/* 🔥 ALLE BILLEDER LOADED - INGEN REMOUNTING */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={`${categoryTitle}-${index}`} // Stabil key
            className={`
              absolute inset-0 transition-opacity duration-300 ease-in-out
              ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          >
            <img
              src={image.src}
              alt={image.alt}
              onClick={handleImageClick}
              className={`
                w-full h-full object-cover cursor-pointer
                transition-transform duration-300 ease-in-out
                ${!imagesLoaded.has(index) ? "opacity-0" : "opacity-100"}
                ${isTransitioning ? "pointer-events-none" : ""}
              `}
              loading={index === 0 ? "eager" : "lazy"} // Kun første billede eager
              draggable={false}
            />

            {/* Loading placeholder */}
            {!imagesLoaded.has(index) && (
              <div className="absolute inset-0 bg-[var(--color-secondary-light)] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--color-brand-blue)] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Gradient overlay for bedre kontrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Navigation - kun vis hvis flere end 1 billede */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => handleNav("prev")}
            disabled={isTransitioning}
            className={`
              absolute left-2 top-1/2 -translate-y-1/2 
              bg-[var(--color-background)]/90 hover:bg-[var(--color-background)] 
              p-1.5 rounded-full transition-all duration-200 shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:scale-110 active:scale-95
            `}
            aria-label="Forrige billede"
          >
            <ChevronLeft size={20} className="text-[var(--color-foreground)]" />
          </button>

          <button
            onClick={() => handleNav("next")}
            disabled={isTransitioning}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2 
              bg-[var(--color-background)]/90 hover:bg-[var(--color-background)]
              p-1.5 rounded-full transition-all duration-200 shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:scale-110 active:scale-95
            `}
            aria-label="Næste billede"
          >
            <ChevronRight
              size={20}
              className="text-[var(--color-foreground)]"
            />
          </button>
        </>
      )}

      {/* Dots - kun vis hvis flere end 1 billede */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              disabled={isTransitioning}
              className={`
                rounded-full transition-all duration-300 
                disabled:cursor-not-allowed
                ${
                  index === currentIndex
                    ? "bg-[var(--color-brand-blue)] w-6 h-1.5 shadow-sm"
                    : "bg-[var(--color-background)]/60 hover:bg-[var(--color-background)]/80 w-1.5 h-1.5"
                }
              `}
              aria-label={`Gå til billede ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress indicator */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 bg-[var(--color-background)]/80 px-2 py-1 rounded text-xs font-medium text-[var(--color-foreground)]">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
});

export default CategoryImageCarousel;
