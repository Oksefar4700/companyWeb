"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { packages } from "../data/packages";

export default function Packages() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => (
        <Link
          key={pkg.slug}
          href={`/packages/${pkg.slug}`}
          className="group block transform hover:-translate-y-2 transition-transform"
        >
          <div className="relative bg-white rounded-2xl shadow-lg p-8 flex flex-col h-full">
            {/* Badge */}
            <div className="absolute -top-4 left-6 bg-indigo-600 text-white text-xs uppercase px-3 py-1 rounded-full">
              Ny
            </div>

            {/* Titel & pris */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
                {pkg.title}
              </h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">
                {pkg.price.toLocaleString("da-DK")} kr.
              </p>
            </div>

            {/* Kort beskrivelse */}
            <p className="text-gray-600 flex-grow">{pkg.description}</p>

            {/* Se detaljer */}
            <div className="mt-6 pt-6 border-t flex items-center justify-between">
              <span className="text-indigo-600 font-medium">Se detaljer</span>
              <ArrowRight className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
