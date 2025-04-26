"use client";

import { useForm } from "react-hook-form";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "contacts"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow"
    >
      {isSubmitSuccessful && (
        <p className="mb-4 text-green-600">
          Tak for din besked! Vi vender tilbage hurtigst muligt.
        </p>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Navn</label>
        <input
          {...register("name", { required: "Navn er påkrævet" })}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email er påkrævet" })}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Besked</label>
        <textarea
          rows="4"
          {...register("message", { required: "Besked er påkrævet" })}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.message && (
          <p className="text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        {isSubmitting ? "Sender..." : "Send besked"}
      </button>
    </form>
  );
}
