// src/hooks/useBookings.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 🎯 Hent bookede tidspunkter for en dato
export function useBookedTimes(date) {
  const dateKey = date ? date.toISOString().split("T")[0] : null;

  return useQuery({
    queryKey: ["booked-times", dateKey],
    queryFn: async () => {
      if (!date) return [];

      const response = await fetch(
        `/api/bookings/available?date=${date.toISOString()}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Kunne ikke hente bookede tidspunkter");
      }

      return result.bookedTimes || [];
    },
    enabled: !!date, // Kun kør hvis date findes
  });
}

// 🎯 Opret ny booking
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Kunne ikke gemme booking");
      }

      return result;
    },
    onSuccess: (data, variables) => {
      // Invalidér cache for datoen
      const date = new Date(variables.dateTime);
      const dateKey = date.toISOString().split("T")[0];

      queryClient.invalidateQueries({
        queryKey: ["booked-times", dateKey],
      });
    },
  });
}

// 🎯 Send contact form
export function useCreateContact() {
  return useMutation({
    mutationFn: async (contactData) => {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Kunne ikke sende besked");
      }

      return result;
    },
  });
}
