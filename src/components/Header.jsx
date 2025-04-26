// components/Header.jsx
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CompanyWeb</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link href="/#packages" className="hover:text-indigo-600">
            Pakker
          </Link>
          <Link href="/#about" className="hover:text-indigo-600">
            Om os
          </Link>
          <Link href="/#contact" className="hover:text-indigo-600">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
