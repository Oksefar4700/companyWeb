// src/components/contactForm/ContactForm.jsx - CLEANED VERSION
"use client";

import { useForm } from "react-hook-form";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { useCreateContact } from "@/hooks/useBookings";
import SimpleSuccessMessage from "@/components/ui/SimpleSuccessMessage";
import { useState } from "react";

export default function ContactForm({
  selectedPkg,
  selectedBooking,
  onClear,
  onSuccess,
}) {
  const createContactMutation = useCreateContact();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Pakke-felter
      packageSlug: selectedPkg?.slug || "",
      packageTitle: selectedPkg?.title || "",
      packagePrice: selectedPkg?.price || "",

      // Booking reference
      bookingId: selectedBooking?.id || "",

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
      const contactType = selectedBooking
        ? "booking-confirmation"
        : selectedPkg
        ? "package-order"
        : "general";

      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        type: contactType,

        // Pakke data (hvis relevant)
        ...(selectedPkg && {
          packageSlug: data.packageSlug,
          packageTitle: data.packageTitle,
          packagePrice: data.packagePrice,
        }),

        // Booking reference
        ...(selectedBooking && {
          bookingId: data.bookingId,
        }),
      };

      await createContactMutation.mutateAsync(contactData);

      // 🎯 SUCCESS: Gem booking data og notificer parent
      const bookingDataForToast = selectedBooking
        ? { ...selectedBooking }
        : null;

      console.log("✅ Contact form submitted successfully");

      // Reset form fields
      reset({
        packageSlug: "",
        packageTitle: "",
        packagePrice: "",
        bookingId: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      // 🎯 Notificer parent om success (VIS TOAST FØRST)
      if (onSuccess && typeof onSuccess === "function") {
        console.log("📧 Calling parent success callback");
        onSuccess(!!bookingDataForToast, bookingDataForToast);
      }

      // 🎯 Vis grøn besked for ikke-booking forms
      if (!bookingDataForToast) {
        setShowSuccess(true);
      }

      // 🎯 CLEAR UI EFTER success notification
      if (onClear && typeof onClear === "function") {
        console.log("🧹 Calling onClear EFTER success notification");
        onClear();
        console.log("✅ onClear called successfully");
      } else {
        console.error("❌ onClear function not available:", onClear);

        if (selectedBooking || selectedPkg) {
          console.log("🔄 Attempting to clear via window event");
          window.dispatchEvent(new CustomEvent("clearBookingSelection"));
        }
      }
    } catch (error) {
      console.error("Contact form fejlede:", error);
    }
  };

  // Handle success message completion
  const handleSuccessComplete = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 🎯 Success state (kun for ikke-booking forms) */}
        <SimpleSuccessMessage
          message="🎉 Tak! Vi vender tilbage hurtigst muligt."
          isVisible={showSuccess}
          onComplete={handleSuccessComplete}
        />

        {/* Error state med speciel håndtering af duplikerede emails */}
        {createContactMutation.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg transform transition-all duration-300 ease-out">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-2">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">
                  {createContactMutation.error.message.includes(
                    "allerede en aktiv booking"
                  )
                    ? "🚫 Duplikeret booking"
                    : "Fejl"}
                </span>
                <p className="mt-1 text-sm">
                  {createContactMutation.error.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Skjulte felter */}
        <input type="hidden" {...register("packageSlug")} />
        <input type="hidden" {...register("packageTitle")} />
        <input type="hidden" {...register("packagePrice")} />
        <input type="hidden" {...register("bookingId")} />

        {/* Form felter */}
        <div className="space-y-4">
          {/* Navn felt */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)] w-5 h-5 transition-colors group-focus-within:text-[var(--color-brand-blue)]" />
            <input
              id="name"
              type="text"
              placeholder="Dit navn"
              {...register("name", { required: "Navn er påkrævet" })}
              className="h-12 w-full pl-12 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent transition-all duration-200"
            />
            {errors.name && (
              <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email felt */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)] w-5 h-5 transition-colors group-focus-within:text-[var(--color-brand-blue)]" />
            <input
              id="email"
              type="email"
              placeholder="Din email"
              {...register("email", {
                required: "Email er påkrævet",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ugyldig email adresse",
                },
              })}
              className="h-12 w-full pl-12 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent transition-all duration-200"
            />
            {errors.email && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Telefon felt */}
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)] w-5 h-5 transition-colors group-focus-within:text-[var(--color-brand-blue)]" />
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
              className="h-12 w-full pl-12 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent transition-all duration-200"
            />
            {errors.phone && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Besked felt */}
          <div className="relative group">
            <MessageSquare className="absolute left-4 top-4 text-[var(--color-primary)] w-5 h-5 transition-colors group-focus-within:text-[var(--color-brand-blue)]" />
            <textarea
              id="message"
              rows={4}
              placeholder="Din besked"
              {...register("message", {
                required: "Besked er påkrævet",
                minLength: {
                  value: 10,
                  message: "Beskeden skal være mindst 10 tegn",
                },
              })}
              className="w-full pl-12 pr-4 pt-4 pb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent transition-all duration-200 resize-none"
            />
            {errors.message && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit knap med animation */}
        <button
          type="submit"
          disabled={createContactMutation.isPending}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-white 
            transition-all duration-200 transform
            ${
              createContactMutation.isPending
                ? "bg-gray-400 cursor-not-allowed scale-100"
                : "bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-darker)] hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
            }
          `}
        >
          {createContactMutation.isPending ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sender…
            </span>
          ) : selectedBooking ? (
            "Bekræft booking"
          ) : selectedPkg ? (
            "Bestil pakke"
          ) : (
            "Send besked"
          )}
        </button>
      </form>
    </>
  );
}
