/* src/components/PackageCard.jsx */
import React from "react";

export default function PackageCard({ pkg, onClick }) {
  return (
    <div
      className="border p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer flex flex-col"
      onClick={() => onClick(pkg.slug)}
    >
      <h2 className="text-xl font-semibold mb-2">{pkg.title}</h2>
      <p className="text-3xl font-bold mb-4">
        {pkg.price ? `${pkg.price} kr.` : "Kontakt for pris"}
      </p>
      <button className="mt-auto inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg">
        Læs mere
      </button>
    </div>
  );
}
