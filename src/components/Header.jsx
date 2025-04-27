"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">CompanyWeb</h1>

        <nav className="hidden md:flex space-x-6 text-gray-700">
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

        <button
          className="md:hidden focus:outline-none text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="bg-white border-t md:hidden">
          <ul className="flex flex-col p-4 space-y-2 text-gray-700">
            <li>
              <Link href="/#packages" onClick={() => setOpen(false)}>
                Pakker
              </Link>
            </li>
            <li>
              <Link href="/#about" onClick={() => setOpen(false)}>
                Om os
              </Link>
            </li>
            <li>
              <Link href="/#contact" onClick={() => setOpen(false)}>
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <div className="h-16 md:h-20" />
    </header>
  );
}
