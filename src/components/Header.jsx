// src/components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navItems = [
    { href: "#hero", label: "Hjem" },
    { href: "#packages", label: "Løsninger" },
    { href: "#about", label: "Om os" },
    { href: "#contact", label: "Kontakt" },
  ];

  // Scroll hook (udskiftet useViewportScroll)
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Scroll-progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] z-50"
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-black/50 border-b border-[var(--color-primary)]/20"
      >
        <div className="container mx-auto flex items-center justify-between h-[var(--header-height)] px-6">
          {/* Logo med større højde */}
          <motion.div
            whileHover={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <img
                src="/images/logo/logo.png"
                alt="CompanyWeb Logo"
                className="h-20 w-auto" /* Ændret fra h-8 til h-12 */
              />
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative px-1 py-1 text-[var(--color-foreground)] group overflow-hidden"
                whileHover={{ color: "var(--color-primary)" }}
              >
                {item.label}
                <span
                  className="
                    absolute left-0 bottom-0 h-[2px]
                    w-full bg-[var(--color-primary)]
                    scale-x-0 group-hover:scale-x-100
                    origin-left transition-transform duration-300
                  "
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobilmenu-knap */}
          <button
            className="md:hidden p-2 text-[var(--color-foreground)]"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Slide-out mobilmenu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center space-y-8 text-xl z-50"
            >
              <button
                className="self-end p-4 text-[var(--color-foreground)]"
                onClick={() => setIsOpen(false)}
              >
                <X size={28} />
              </button>
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-[var(--color-foreground)]"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
