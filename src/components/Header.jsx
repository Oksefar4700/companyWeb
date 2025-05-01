// src/components/Header.jsx
"use client";

import Link from "next/link";

export default function Header() {
  const navItems = [
    { href: "#hero", label: "Hjem" },
    { href: "#packages", label: "Løsninger" },
    { href: "#about", label: "Om os" },
    { href: "#contact", label: "Kontakt" },
  ];

  return (
    <header className="header">
      <nav className="container mx-auto flex gap-6 py-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="btn-secondary">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
