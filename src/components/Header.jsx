// src/components/Header.jsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "Hjem" },
  { href: "#packages", label: "Løsninger" },
  { href: "#cases", label: "Cases" },
  { href: "#process", label: "Proces" },
  { href: "#about-us", label: "Om os" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Sæt initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Framer Motion varianter
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };
  const navLinkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 + 0.2, duration: 0.3, ease: "easeOut" },
    }),
    exit: (i) => ({
      opacity: 0,
      x: -10,
      transition: { delay: i * 0.03, duration: 0.2, ease: "easeIn" },
    }),
  };

  const baseLinkClasses =
    "text-base font-medium transition-all duration-300 ease-in-out relative group py-2";
  let headerDynamicClasses =
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out";
  let logoColorClass,
    navLinkColorClass,
    mobileIconColorClass,
    kontaktBtnClasses;

  if (scrolled || isOpen) {
    // Når scrolled/mobilmenu åben: Beige baggrund
    headerDynamicClasses += ` shadow-xl bg-[var(--color-secondary-light)]/95 backdrop-blur-md border-b border-[var(--color-primary)]/10`;
    logoColorClass = "text-[var(--color-brand-blue)]";
    navLinkColorClass =
      "text-[var(--color-foreground)] hover:text-[var(--color-brand-blue)]";
    mobileIconColorClass =
      "text-[var(--color-foreground)] hover:text-[var(--color-brand-blue)]";
    kontaktBtnClasses =
      "bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-darker)] focus-visible:ring-offset-[var(--color-secondary-light)]";
  } else {
    // Når øverst: Mørk gradient for kontrast, hvid tekst
    headerDynamicClasses +=
      " bg-gradient-to-b from-black/60 via-black/50 to-black/20 border-b border-transparent";
    logoColorClass =
      "text-[var(--color-background)] hover:text-[var(--color-brand-blue-lighter-bg)]";
    navLinkColorClass =
      "text-[var(--color-background)] hover:text-[var(--color-brand-blue-lighter-bg)]";
    mobileIconColorClass =
      "text-[var(--color-background)] hover:text-[var(--color-brand-blue-lighter-bg)]";
    kontaktBtnClasses =
      "bg-white/20 text-[var(--color-background)] border border-white/40 hover:bg-white/30 backdrop-blur-sm focus-visible:ring-offset-transparent focus-visible:ring-white/50";
  }

  const desktopLinkCombinedClasses = `${baseLinkClasses} ${navLinkColorClass}`;
  const mobileMenuNavLinkClasses = `${baseLinkClasses} text-[var(--color-foreground)] hover:text-[var(--color-brand-blue)] py-3.5 text-lg w-full text-left block border-b border-transparent hover:border-[var(--color-brand-blue)]/30`;

  return (
    <header className={headerDynamicClasses}>
      <div className="container mx-auto px-6 h-[var(--header-height)] flex justify-between items-center">
        <Link
          href="/"
          className={`text-2xl font-bold font-heading transition-colors duration-300 ease-in-out ${logoColorClass}`}
        >
          CompanyWeb
        </Link>

        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={desktopLinkCombinedClasses}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-brand-blue)] transition-all duration-300 ease-out group-hover:w-full`}
              ></span>
            </Link>
          ))}
          <Link
            href="/kontakt"
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)] ${kontaktBtnClasses} inline-flex items-center`}
          >
            <Phone size={16} className="mr-2" />
            Kontakt
          </Link>
        </nav>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Åbn menu"
            className={`transition-colors duration-300 ${mobileIconColorClass}`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className={`lg:hidden absolute top-[var(--header-height)] left-0 right-0 shadow-xl bg-[var(--color-secondary-light)] pb-4 border-t border-[var(--color-primary)]/10`} // Mobilmenu altid beige
          >
            <div className="container mx-auto px-6 flex flex-col space-y-2 pt-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  variants={navLinkVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={mobileMenuNavLinkClasses}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={navLinkVariants}
                custom={navLinks.length}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="!mt-5"
              >
                <Link
                  href="/kontakt"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-5 py-3 rounded-lg text-base font-semibold text-center bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-darker)] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-secondary-light)] focus-visible:ring-[var(--color-brand-blue)] inline-flex items-center justify-center"
                >
                  <Phone size={18} className="mr-2" />
                  Kontakt os
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
