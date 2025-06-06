// src/hooks/useToast.js
import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState({
    isVisible: false,
    type: "success",
    title: "",
    message: "",
    bookingDetails: null,
  });

  const showToast = ({
    type = "success",
    title,
    message,
    bookingDetails = null,
    duration = 5000,
  }) => {
    setToast({
      isVisible: true,
      type,
      title,
      message,
      bookingDetails,
      duration,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  // Convenience methods
  const showSuccess = (title, message, bookingDetails = null) => {
    showToast({ type: "success", title, message, bookingDetails });
  };

  const showBookingSuccess = (bookingDetails) => {
    showToast({
      type: "success",
      title: "Booking bekræftet! 🎉",
      message:
        "Vi har modtaget din booking og sender en bekræftelse til din email.",
      bookingDetails,
    });
  };

  const showContactSuccess = () => {
    showToast({
      type: "success",
      title: "Besked sendt! 📧",
      message: "Tak for din henvendelse. Vi vender tilbage hurtigst muligt.",
    });
  };

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showBookingSuccess,
    showContactSuccess,
  };
}
