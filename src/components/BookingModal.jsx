// src/components/BookingModal.jsx - Kompakt side-by-side layout
"use client";

import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { Dialog } from "@headlessui/react";
import { FiX as X } from "react-icons/fi";
import { setHours, setMinutes } from "date-fns";
import { da } from "date-fns/locale";
import { formatDateTime } from "@/utils/dateTimeUtils";

export default function BookingModal({ onBooking }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  // Opret en dato for i dag ved midnat (for at sammenligne med andre datoer)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Lav en liste med tidspunkter 08:00–16:00 på 30-min intervaller
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

  // Håndter dato-valg (uden tid)
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setDateTime(null);
  };

  // Håndter tid-valg og kombiner med dato
  const handleTimeChange = (time) => {
    setSelectedTime(time);

    if (selectedDate) {
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(time.getHours());
      newDateTime.setMinutes(time.getMinutes());
      setDateTime(newDateTime);
    }
  };

  // Robuste tjek og fejlsikring
  const handleConfirmBooking = () => {
    // Dobbelttjek at vi har en valid dato med tid og at onBooking eksisterer
    if (!dateTime) {
      console.error("Cannot confirm booking: dateTime is null");
      return;
    }

    if (typeof onBooking !== "function") {
      console.error("Cannot confirm booking: onBooking is not a function");
      return;
    }

    // Alt OK, fortsæt med booking
    const bookingData = {
      dateTime: dateTime,
      formattedDateTime: formatDateTime(dateTime),
      type: "booking",
    };

    // Send data til parent
    onBooking(bookingData);

    // Luk modal og reset
    setOpen(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setDateTime(null);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setDateTime(null);
  };

  // Formatter for tidspunkt
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
      <button onClick={() => setOpen(true)} className="btn-primary">
        Book et gratis møde
      </button>

      <Dialog
        open={open}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <Dialog.Panel className="booking-dialog-panel">
          <Dialog.Title className="dialog-title">
            Vælg dato & tid
          </Dialog.Title>
          <button onClick={closeModal} className="close-button">
            <X size={24} />
          </button>

          {/* To-kolonne layout for kalender og tid */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Venstre kolonne - Dato */}
            <div className="w-full md:w-auto">
              <h3 className="booking-step-title">
                <span className="booking-step-number">1</span>
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
                  dayClassName={(date) =>
                    date < today ? "react-datepicker__day--disabled" : undefined
                  }
                />
              </div>
            </div>

            {/* Højre kolonne - Tidspunkter */}
            <div className="w-full md:w-[40%] mt-4 md:mt-0">
              <h3 className="booking-step-title mb-4"> {/* Adjusted mb from booking-step-title which has mb-3 */}
                <span className="booking-step-number">2</span>
                Vælg tidspunkt
              </h3>

              {!selectedDate ? (
                <div className="text-gray-500 italic text-center p-4 border border-dashed border-gray-300 rounded-lg">
                  Vælg først en dato
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 md:gap-3 max-h-[320px] overflow-y-auto pr-2">
                  {includeTimes.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeChange(time)}
                      className={`btn-time-slot ${
                        selectedTime &&
                        selectedTime.getHours() === time.getHours() &&
                        selectedTime.getMinutes() === time.getMinutes()
                          ? "btn-time-slot-selected"
                          : "btn-time-slot-default"
                      }`}
                    >
                      {formatTime(time)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Valgt tidspunkt og bekræftelse */}
          {dateTime && (
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="selected-datetime">
                Valgt tidspunkt: <strong>{formatDateTime(dateTime)}</strong>
              </p>
              <button onClick={handleConfirmBooking} className="confirm-button">
                Bekræft tidspunkt
              </button>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
