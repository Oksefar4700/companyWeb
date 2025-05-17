// src/components/StatsCard.js
import { motion } from "framer-motion";
import { statVariants } from "./variants";

export default function StatsCard({ value, label, index }) {
  return (
    <motion.div
      className="
        bg-white/90
        backdrop-blur-sm
        rounded-lg
        p-8
        text-center
        shadow-md
        border
        border-[var(--color-brand-blue)]/10
      "
      variants={statVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ willChange: "transform, opacity" }}
    >
      <h3 className="text-4xl lg:text-5xl font-bold text-[var(--color-brand-blue)] mb-2">
        {value}
      </h3>
      <p className="text-lg text-[var(--color-foreground)]/80 mt-2 font-medium">
        {label}
      </p>
    </motion.div>
  );
}
