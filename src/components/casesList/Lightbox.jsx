"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Lightbox({ imageUrl, onClose }) {
  // Luk med Escape key og håndter scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (imageUrl) {
      document.addEventListener("keydown", handleEscape);
      // Forhindre scrolling bag lightbox og gem original overflow
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [imageUrl, onClose]);

  if (!imageUrl) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="
          fixed inset-0 
          bg-[var(--color-primary)]/70 
          backdrop-blur-sm 
          flex items-center justify-center 
          z-[9999] 
          p-4
        "
        onClick={onClose}
        style={{ margin: 0, padding: "1rem" }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="
            relative 
            max-w-[90vw] max-h-[90vh] 
            w-auto h-auto
            flex items-center justify-center
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Billede */}
          <img
            src={imageUrl}
            alt="Forstørret case billede"
            className="
              block
              max-w-full max-h-full 
              w-auto h-auto
              object-contain 
              rounded-lg 
              shadow-2xl
              border-2 border-[var(--color-background)]/20
            "
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          />

          {/* Luk knap */}
          <button
            onClick={onClose}
            className="
              absolute -top-2 -right-2
              bg-[var(--color-background)] 
              hover:bg-[var(--color-secondary-light)]
              text-[var(--color-foreground)]
              rounded-full 
              p-2 
              shadow-lg 
              transition-all duration-200
              hover:scale-110
              z-10
              border border-[var(--color-brand-blue)]/20
            "
            aria-label="Luk billede"
          >
            <X size={18} />
          </button>
        </motion.div>

        {/* Subtil hint */}
        <div
          className="
          absolute bottom-6 left-1/2 transform -translate-x-1/2
          text-[var(--color-background)]/80 text-sm
          bg-[var(--color-primary)]/60 px-4 py-2 rounded-full
          backdrop-blur-sm
          border border-[var(--color-background)]/10
        "
        >
          Klik udenfor eller tryk Escape for at lukke
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
