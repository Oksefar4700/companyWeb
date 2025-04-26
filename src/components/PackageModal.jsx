"use client";
import React from "react";
// Kun én import – Headless UI v1.x giver dig Overlay, Panel og Title på Dialog-objektet
import { Dialog } from "@headlessui/react";

export default function PackageModal({ pkg, isOpen, onClose }) {
  if (!pkg) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Den indbyggede overlay-subkomponent */}
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

      {/* Centrerings-wrapper */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Selve panelet */}
        <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
          <Dialog.Title className="text-2xl font-bold mb-4">
            {pkg.title}
          </Dialog.Title>

          <p className="mb-4">{pkg.description}</p>

          {pkg.details && (
            <ul className="list-disc list-inside mb-4">
              {pkg.details.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}

          <button
            onClick={onClose}
            className="mt-6 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Luk
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
