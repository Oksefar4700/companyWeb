// src/components/Header.jsx - FINAL VERSION
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./ui/LanguageSwitcher";

const navLinks = [
  { href: "#hero", label: "Hjem" },
  { href: "#packages", label: "Løsninger" },
  { href: "#cases", label: "Cases" },
  { href: "#process", label: "Proces" },
  { href: "#about-us", label: "Om os" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Fast hvid baggrund, skygge og kant
  const headerDynamicClasses =
    "fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200";

  // Ensartede farver til logo, links og ikoner
  const logoColorClass =
    "text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-dark)]";
  const navLinkColorClass =
    "text-gray-800 hover:text-[var(--color-brand-blue)]";
  const mobileIconColorClass =
    "text-gray-800 hover:text-[var(--color-brand-blue)]";
  const kontaktBtnClasses =
    "bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-darker)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)]";

  // Opdaterede font-størrelser og vægte
  const baseLinkClasses =
    "text-lg font-semibold transition-all duration-300 ease-in-out relative group py-2";
  const desktopLinkCombinedClasses = `${baseLinkClasses} ${navLinkColorClass}`;
  const mobileMenuNavLinkClasses = `${baseLinkClasses} text-[var(--color-foreground)] hover:text-[var(--color-brand-blue)] py-3.5 text-lg w-full text-left block border-b border-transparent hover:border-[var(--color-brand-blue)]/30`;

  // Framer Motion-varianter
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

  return (
    <header className={headerDynamicClasses}>
      <div className="container mx-auto px-6 h-[var(--header-height)] flex justify-between items-center">
        {/* Logo - NU MED SVG+TEKST */}
        <Link
          href="/"
          className="flex items-center group transition-all duration-300 ease-in-out"
        >
          {/* CW SVG Logo */}
          <div className="mr-2 md:mr-3 relative">
            <svg
              width="38"
              height="38"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            >
              <path
                d="M500 200C331.8 200 200 331.8 200 500C200 668.2 331.8 800 500 800"
                stroke="#7eaedb"
                strokeWidth="100"
                fill="none"
              />
              <path
                d="M480 330L600 740L700 450L800 740L910 330"
                stroke="#7eaedb"
                strokeWidth="100"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* CompanyWeb tekst */}
          <span
            className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-wider font-heading transition-colors duration-300 ease-in-out ${logoColorClass}`}
          >
            CompanyWeb
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${desktopLinkCombinedClasses} hover:scale-105`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[var(--color-brand-blue)] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}

          {/* Kontakt-knap */}
          <Link
            href="/kontakt"
            className={`px-6 py-3 rounded-lg text-base font-bold transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform ${kontaktBtnClasses} inline-flex items-center`}
          >
            <Phone size={16} className="mr-2" />
            Kontakt
          </Link>

          {/* Language Switcher - helt ude til højre EFTER kontakt */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile menu button */}
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

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="lg:hidden absolute top-[var(--header-height)] left-0 right-0 shadow-xl bg-[var(--color-secondary-light)] pb-4 border-t border-[var(--color-primary)]/10"
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

              {/* Language Switcher i mobile menu */}
              <motion.div
                variants={navLinkVariants}
                custom={navLinks.length}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="!mt-4 flex justify-center"
              >
                <LanguageSwitcher />
              </motion.div>

              <motion.div
                variants={navLinkVariants}
                custom={navLinks.length + 1}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="!mt-5"
              >
                <Link
                  href="/kontakt"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-5 py-3 rounded-lg text-base font-semibold text-center bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-darker)] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-secondary-light)] focus-visible:ring-[var(--color-brand-blue)] inline-flex items-center justify-center"
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
