// src/components/ui/LanguageSwitcher.jsx - FINAL VERSION
"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState("da");
  const pathname = usePathname();
  const router = useRouter();

  // Detect current locale from URL on client side
  useEffect(() => {
    if (pathname.includes("/en")) {
      setCurrentLocale("en");
    } else {
      setCurrentLocale("da");
    }
  }, [pathname]);

  const handleLanguageChange = (newLocale) => {
    const segments = pathname.split("/");

    // Replace or add locale in path
    if (segments[1] === "da" || segments[1] === "en") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join("/");
    router.push(newPath, { scroll: false }); // 🚀 No scroll to top!
  };

  return (
    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
      <motion.button
        onClick={() => handleLanguageChange("da")}
        className={`px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
          currentLocale === "da"
            ? "bg-[var(--color-brand-blue)] text-white"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        whileHover={{ scale: currentLocale !== "da" ? 1.02 : 1 }}
        whileTap={{ scale: currentLocale !== "da" ? 0.98 : 1 }}
        title="Skift til dansk"
      >
        <span className="text-base">🇩🇰</span>
        <span>DA</span>
      </motion.button>

      <div className="w-px h-6 bg-gray-200" />

      <motion.button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
          currentLocale === "en"
            ? "bg-[var(--color-brand-blue)] text-white"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        whileHover={{ scale: currentLocale !== "en" ? 1.02 : 1 }}
        whileTap={{ scale: currentLocale !== "en" ? 0.98 : 1 }}
        title="Switch to English"
      >
        <span className="text-base">🇺🇸</span>
        <span>EN</span>
      </motion.button>
    </div>
  );
}
