// src/components/ContactForm.jsx
"use client";

import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User, Mail, Phone, MessageSquare } from "lucide-react";

export default function ContactForm({ selectedPkg, selectedBooking }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      // Pakke-relaterede felter
      packageSlug: selectedPkg?.slug || "",
      packageTitle: selectedPkg?.title || "",
      packagePrice: selectedPkg?.price || "",

      // Booking-relaterede felter
      bookingDateTime: selectedBooking?.dateTime || null,
      bookingFormattedDateTime: selectedBooking?.formattedDateTime || "",

      // Besked
      message: selectedPkg
        ? `Hej! Jeg vil gerne bestille pakken: ${
            selectedPkg.title
          } (${selectedPkg.price.toLocaleString(
            "da-DK"
          )} kr.), som inkluderer: ${selectedPkg.details.join(", ")}.`
        : selectedBooking
        ? `Hej! Jeg vil gerne bekræfte min booking ${selectedBooking.formattedDateTime}.`
        : "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Tilføj type-felt baseret på om det er en pakke, booking eller alm. henvendelse
      const requestType = selectedPkg
        ? "package"
        : selectedBooking
        ? "booking"
        : "contact";

      // Gem i Firebase
      await addDoc(collection(db, "contacts"), {
        ...data,
        type: requestType,
        createdAt: serverTimestamp(),
        status: selectedBooking ? "pending" : undefined, // For bookings tilføj status
      });

      reset();

      // Vis bekræftelse
      if (selectedBooking) {
        alert(
          `Din booking er bekræftet!\n\nTidspunkt: ${selectedBooking.formattedDateTime}\n\nVi har sendt en bekræftelse til din mail.`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isSubmitSuccessful && (
        <div className="text-[var(--color-accent)] font-medium text-center">
          🎉 Tak! Vi vender tilbage hurtigst muligt.
        </div>
      )}

      {/* Skjulte felter for pakker */}
      <input type="hidden" {...register("packageSlug")} />
      <input type="hidden" {...register("packageTitle")} />
      <input type="hidden" {...register("packagePrice")} />

      {/* Skjulte felter for bookings */}
      <input type="hidden" {...register("bookingFormattedDateTime")} />
      {selectedBooking && (
        <input
          type="hidden"
          {...register("bookingDateTime")}
          value={selectedBooking.dateTime.toISOString()}
        />
      )}

      {/* Navn */}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />
        <input
          id="name"
          type="text"
          placeholder="Dit navn"
          {...register("name", { required: "Navn er påkrævet" })}
          className="h-12 w-full pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] transition"
        />
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
          placeholder="Din email"
          {...register("email", { required: "Email er påkrævet" })}
          className="h-12 w-full pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] transition"
        />
        {errors.email && (
          <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Telefon (kun obligatorisk for bookings) */}
      <div className="relative">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />
        <input
          id="phone"
          type="tel"
          placeholder={`Dit telefonnummer${
            selectedBooking ? "" : " (valgfri)"
          }`}
          {...register("phone", {
            required: selectedBooking
              ? "Telefonnummer er påkrævet for bookings"
              : false,
          })}
          className="h-12 w-full pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] transition"
        />
        {errors.phone && (
          <p className="mt-1 text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Besked */}
      <div className="relative">
        <MessageSquare className="absolute left-4 top-4 text-[var(--color-primary)]" />
        <textarea
          id="message"
          rows={4}
          placeholder="Din besked"
          {...register("message", { required: "Besked er påkrævet" })}
          className="w-full pl-12 pr-4 pt-6 pb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] transition resize-none"
        />
        {errors.message && (
          <p className="mt-1 text-red-600 text-sm">{errors.message.message}</p>
        )}
      </div>

      {/* Opdateret knap */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-3
          bg-[var(--color-brand-blue)]
          text-white
          rounded-lg
          font-semibold
          shadow
          hover:bg-[var(--color-brand-blue-darker)]
          transition-colors
          disabled:opacity-50
        "
      >
        {isSubmitting
          ? "Sender…"
          : selectedBooking
          ? "Bekræft booking"
          : selectedPkg
          ? "Bestil pakke"
          : "Send besked"}
      </button>
    </form>
  );
}
