// src/utils/dateTimeUtils.js

/**
 * Formats a Date object into a Danish string representation.
 * Example: "søndag den 1. juni 2025 kl. 09.30"
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string, or an empty string if the input is invalid.
 */
export const formatDateTime = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    console.warn("formatDateTime received an invalid date:", date);
    return "";
  }

  // Få ugedag
  const weekday = date.toLocaleString("da-DK", { weekday: "long" });

  // Få dag
  const day = date.getDate();

  // Få måned
  const month = date.toLocaleString("da-DK", { month: "long" });

  // Få år
  const year = date.getFullYear();

  // Få tid (HH:mm)
  const time = date.toLocaleString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Ensure 24-hour format for time part
  });

  // Formatér som "søndag den 1. juni 2025 kl. 09.30"
  return `${weekday} den ${day}. ${month} ${year} kl. ${time}`;
};
