// src/components/PackageModal.jsx
"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  DialogDescription, // valgfri, hvis du vil bruge <DialogDescription>
} from "@headlessui/react";

export default function PackageModal({ pkg, isOpen, onClose }) {
  if (!pkg) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Wrapper til at centrere panelet */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Selve dialog‐panelet */}
        <DialogPanel className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
          <DialogTitle className="text-2xl font-bold mb-4">
            {pkg.title}
          </DialogTitle>

          {pkg.description && (
            <DialogDescription className="mb-4 text-gray-700">
              {pkg.description}
            </DialogDescription>
          )}

          {pkg.details && (
            <ul className="list-disc list-inside mb-4 text-gray-600">
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
        </DialogPanel>
      </div>
    </Dialog>
  );
}
