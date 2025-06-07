// src/components/BookingModal.jsx - SMART VERSION
"use client";

import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { Dialog } from "@headlessui/react";
import { FiX as X } from "react-icons/fi";
import { setHours, setMinutes } from "date-fns";
import { da } from "date-fns/locale";
import { useBookedTimes, useCreateBooking } from "@/hooks/useBookings";

export default function BookingModal({
  onBooking,
  open,
  onOpenChange,
  showTrigger = true,
}) {
  // 🎯 INTERN STATE for Hero's modal (hvis ikke controlled)
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  // Support både controlled og uncontrolled usage
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  // React Query hooks
  const {
    data: bookedTimes = [],
    isLoading: loadingAvailability,
    error: availabilityError,
  } = useBookedTimes
    ? useBookedTimes(selectedDate)
    : { data: [], isLoading: false, error: null };

  const createBookingMutation = useCreateBooking
    ? useCreateBooking()
    : {
        mutateAsync: async (data) => ({ id: Math.random().toString(36) }),
        isPending: false,
        error: null,
      };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const includeTimes = useMemo(() => {
    const times = [];
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    for (let mins = 8 * 60; mins <= 16 * 60; mins += 30) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      times.push(setHours(setMinutes(new Date(now), m), h));
    }
    return times;
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setDateTime(null);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(time.getHours());
      newDateTime.setMinutes(time.getMinutes());
      setDateTime(newDateTime);
    }
  };

  const formatDateTime = (date) => {
    if (!date) return "";
    const weekday = date.toLocaleString("da-DK", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleString("da-DK", { month: "long" });
    const year = date.getFullYear();
    const time = date.toLocaleString("da-DK", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${weekday} den ${day}. ${month} ${year} kl. ${time}`;
  };

  const isTimeBooked = (time) => {
    if (!selectedDate || !bookedTimes.length) return false;

    const checkDateTime = new Date(selectedDate);
    checkDateTime.setHours(time.getHours());
    checkDateTime.setMinutes(time.getMinutes());
    checkDateTime.setSeconds(0);
    checkDateTime.setMilliseconds(0);

    return bookedTimes.some((bookedTime) => {
      const bookedDateTime = new Date(bookedTime.dateTime);
      return bookedDateTime.getTime() === checkDateTime.getTime();
    });
  };

  const availableTimes = useMemo(() => {
    return includeTimes.filter((time) => !isTimeBooked(time));
  }, [includeTimes, bookedTimes, selectedDate]);

  const handleConfirmBooking = async () => {
    if (!dateTime) return;

    const bookingData = {
      dateTime: dateTime.toISOString(),
      formattedDateTime: formatDateTime(dateTime),
      status: "pending",
      type: "booking",
    };

    try {
      const result = await createBookingMutation.mutateAsync(bookingData);

      const bookingWithId = {
        ...bookingData,
        id: result.id,
      };

      onBooking?.(bookingWithId);
      closeModal();
    } catch (error) {
      console.error("Booking fejlede:", error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setDateTime(null);
  };

  const formatTime = (time) => {
    if (!time) return "";
    return time.toLocaleTimeString("da-DK", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <>
      {/* 🎯 CONDITIONAL TRIGGER KNAP - kun til Hero */}
      {showTrigger && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            inline-flex items-center justify-center
            px-10 py-4 text-lg font-semibold
            rounded-lg border-2 border-[var(--color-brand-blue)]
            bg-[var(--color-brand-blue)] text-white
            hover:bg-[var(--color-brand-blue-darker)]
            hover:shadow-[0_8px_20px_rgba(var(--color-brand-blue-rgb),0.4)]
            transition-all duration-200 ease-[0.25,0.1,0.25,1]
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-offset-[var(--color-primary-darkest)]
            focus:ring-[var(--color-brand-blue)]
            font-[var(--font-body)]
          "
        >
          Book et gratis møde
        </button>
      )}

      {/* 🎯 MODAL med glasmorphism baggrund */}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/20 p-4"
      >
        <Dialog.Panel className="booking-dialog-panel max-w-[42rem] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
          <Dialog.Title className="dialog-title text-[1.8rem]">
            Vælg dato & tid
          </Dialog.Title>
          <button onClick={closeModal} className="close-button">
            <X size={24} />
          </button>

          {(availabilityError || createBookingMutation.error) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {availabilityError?.message ||
                createBookingMutation.error?.message}
            </div>
          )}

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-auto">
              <h3 className="flex items-center mb-3 text-lg font-medium text-gray-700">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-brand-blue)] text-white mr-2 text-sm font-bold">
                  1
                </span>
                Vælg dato
              </h3>
              <div className="flex justify-center">
                <DatePicker
                  inline
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showTimeSelect={false}
                  dateFormat="PP"
                  locale={da}
                  minDate={new Date()}
                  filterDate={(date) => date >= today}
                  calendarClassName="custom-datepicker"
                />
              </div>
            </div>

            <div className="w-full md:w-[40%] mt-4 md:mt-0">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-700">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-brand-blue)] text-white mr-2 text-sm font-bold">
                  2
                </span>
                Vælg tidspunkt
              </h3>

              {!selectedDate ? (
                <div className="text-gray-500 italic text-center p-4 border border-dashed border-gray-300 rounded-lg">
                  Vælg først en dato
                </div>
              ) : loadingAvailability ? (
                <div className="text-gray-500 text-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-brand-blue)] mx-auto mb-2"></div>
                  Henter ledige tidspunkter...
                </div>
              ) : availableTimes.length === 0 ? (
                <div className="text-gray-500 italic text-center p-4 border border-dashed border-gray-300 rounded-lg">
                  Ingen ledige tidspunkter på denne dato
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 md:gap-3 max-h-[320px] overflow-y-auto pr-2">
                  {availableTimes.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeChange(time)}
                      className={`
                        p-3 rounded-lg border text-center transition-all h-12 flex items-center justify-center
                        ${
                          selectedTime &&
                          selectedTime.getHours() === time.getHours() &&
                          selectedTime.getMinutes() === time.getMinutes()
                            ? "bg-[var(--color-brand-blue)] text-white border-[var(--color-brand-blue)] shadow-md"
                            : "border-gray-300 hover:bg-[var(--color-brand-blue-darker)] hover:text-white hover:border-[var(--color-brand-blue-darker)]"
                        }
                      `}
                    >
                      {formatTime(time)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {dateTime && (
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="selected-datetime">
                Valgt tidspunkt: <strong>{formatDateTime(dateTime)}</strong>
              </p>
              <button
                onClick={handleConfirmBooking}
                disabled={createBookingMutation.isPending}
                className={`confirm-button ${
                  createBookingMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {createBookingMutation.isPending
                  ? "Gemmer..."
                  : "Bekræft tidspunkt"}
              </button>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
