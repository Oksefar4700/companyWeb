import React from "react";
import { packages } from "../data/packages";

export default function Packages() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => (
        <div
          key={pkg.slug}
          className="bg-white rounded-2xl shadow hover:shadow-lg transition p-8 flex flex-col justify-between"
        >
          <div>
            <h4 className="text-2xl font-semibold mb-2">{pkg.title}</h4>
            <p className="text-3xl font-bold text-indigo-600 mb-4">
              {pkg.price ? `${pkg.price} kr.` : "Kontakt for pris"}
            </p>
            <p className="text-gray-600">{pkg.description}</p>
          </div>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Vælg pakke
          </button>
        </div>
      ))}
    </div>
  );
}
