// src/components/PackageModal.jsx
import React from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

export default function PackageModal({ pkg, isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    await fetch("/api/sendPackage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        packageId: pkg.slug,
        packageTitle: pkg.title,
      }),
    });
  };

  if (!pkg) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
          <Dialog.Title className="text-2xl font-bold mb-4">
            {pkg.title}
          </Dialog.Title>
          <p className="mb-6">{pkg.description}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isSubmitSuccessful && (
              <p className="text-green-600">
                Tak, vi har modtaget din bestilling!
              </p>
            )}
            <div>
              <label className="block mb-1 font-medium">Navn</label>
              <input
                {...register("name", { required: true })}
                className="w-full border rounded px-3 py-2"
              />
              {errors.name && (
                <p className="text-red-600">Dette felt er påkrævet</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border rounded px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-600">Dette felt er påkrævet</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {isSubmitting ? "Sender..." : `Bestil ${pkg.title}`}
            </button>
          </form>

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
