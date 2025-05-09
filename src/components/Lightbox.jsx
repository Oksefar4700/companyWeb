// src/components/Lightbox.jsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Lightbox({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="relative max-w-[90vw] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt="Forstørret case billede"
            className="block max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 sm:top-2 sm:right-2 bg-white text-[var(--color-primary)] rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-200 transition-colors"
            aria-label="Luk billede"
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
