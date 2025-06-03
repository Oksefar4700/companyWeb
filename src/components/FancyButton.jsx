"use client";

import { motion } from "framer-motion";

export default function FancyButton({ href, onClick, children }) {
  // Vælg det rigtige tag afhængig af om der er et href
  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      href={href}
      onClick={onClick}
      className="inline-flex items-center bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] text-white py-3 px-6 rounded-full shadow-lg font-bold font-[var(--font-heading)]"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(126, 174, 219, 0.4)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      style={{ textDecoration: "none" }} // fjerner understregning når det er et <a>
    >
      {children}
    </Tag>
  );
}
