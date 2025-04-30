"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Hjem" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/booking", label: "Booking" },
    { href: "/shop", label: "Shop" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          CompanyWeb
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-lg transition ${
                  pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
