// src/components/ContactForm.jsx
"use client";
import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User, Mail, MessageSquare } from "lucide-react";

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
      className="max-w-md mx-auto space-y-6"
    >
      {isSubmitSuccessful && (
        <div className="text-[var(--color-accent)] font-medium text-center">
          🎉 Tak! Vi vender tilbage hurtigst muligt.
        </div>
      )}

      {/* Navn */}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />
        <input
          id="name"
          type="text"
          placeholder=" "
          {...register("name", { required: "Navn er påkrævet" })}
          className="
            peer h-12 w-full pl-12 pr-4
            bg-[var(--color-background)]
            rounded-lg border border-[var(--color-secondary)]
            shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
            transition
          "
        />
        <label
          htmlFor="name"
          className="
          absolute left-12 top-0 -translate-y-1/2
          text-[var(--color-foreground)] text-base
          bg-[var(--color-background)] px-1 z-10
          transition-all
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-0 peer-focus:text-sm peer-focus:-translate-y-1/2 peer-focus:text-[var(--color-primary)]
        "
        >
          Dit navn
        </label>
        {errors.name && (
          <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />
        <input
          id="email"
          type="email"
          placeholder=" "
          {...register("email", { required: "Email er påkrævet" })}
          className=" peer h-12 w-full pl-12 pr-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-secondary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
        />
        <label
          htmlFor="email"
          className="
          absolute left-12 top-0 -translate-y-1/2
          text-[var(--color-foreground)] text-base
          bg-[var(--color-background)] px-1 z-10
          transition-all
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-0 peer-focus:text-sm peer-focus:-translate-y-1/2 peer-focus:text-[var(--color-primary)]
        "
        >
          Din email
        </label>
        {errors.email && (
          <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Besked */}
      <div className="relative">
        <MessageSquare className="absolute left-4 top-4 text-[var(--color-primary)]" />
        <textarea
          id="message"
          rows={4}
          placeholder=" "
          {...register("message", { required: "Besked er påkrævet" })}
          className="
            peer w-full pl-12 pr-4 pt-6 pb-3
            bg-[var(--color-background)]
            rounded-lg border border-[var(--color-secondary)]
            shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
            transition resize-none
          "
        />
        <label
          htmlFor="message"
          className="
          absolute left-12 top-0 -translate-y-1/2
          text-[var(--color-foreground)] text-base
          bg-[var(--color-background)] px-1 z-10
          transition-all
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-0 peer-focus:text-sm peer-focus:-translate-y-1/2 peer-focus:text-[var(--color-primary)]
        "
        >
          Din besked
        </label>
        {errors.message && (
          <p className="mt-1 text-red-600 text-sm">{errors.message.message}</p>
        )}
      </div>

      {/* Send-knap */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-3
          bg-[var(--color-primary)] text-[var(--color-background)]
          rounded-lg font-semibold shadow
          hover:bg-[var(--color-accent)] transition-transform hover:scale-105 disabled:opacity-50
        "
      >
        {isSubmitting ? "Sender…" : "Send besked"}
      </button>
    </form>
  );
}
