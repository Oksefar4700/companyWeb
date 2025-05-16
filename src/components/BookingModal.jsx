"use client";

import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { Dialog } from "@headlessui/react";
import { FiX as X } from "react-icons/fi";
import { setHours, setMinutes, addDays } from "date-fns";
import { da } from "date-fns/locale";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
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

  // Format dato og tid i dansk format (som vist i referencebilledet)
  const formatDateTime = (date) => {
    if (!date) return "";

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
    });

    // Formatér som "søndag den 1. juni 2025 kl. 09.30"
    return `${weekday} den ${day}. ${month} ${year} kl. ${time}`;
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary">
        Book et gratis møde
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <Dialog.Panel className="booking-dialog-panel">
          <Dialog.Title className="dialog-title">Vælg dato & tid</Dialog.Title>
          <button onClick={() => setOpen(false)} className="close-button">
            <X size={24} />
          </button>

          <div className="flex justify-center">
            <DatePicker
              inline
              selected={dateTime}
              onChange={setDateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="Pp"
              includeTimes={includeTimes}
              locale={da} // Dansk lokalisering
              minDate={new Date()} // Forhindrer valg af tidligere datoer
              filterDate={(date) => {
                // Kun fremtidige datoer er valgbare
                return date >= today;
              }}
              excludeTimes={
                [
                  // Her kan du tilføje eksisterende bookinger der ikke skal kunne vælges
                  // Eksempel: setHours(setMinutes(new Date(), 30), 8) // 8:30 i dag
                ]
              }
              scrollToTime={dateTime || includeTimes[0]} // Scroll til valgt tid
              calendarClassName="custom-datepicker"
              timeClassName={(time) => {
                if (
                  dateTime &&
                  time.getHours() === dateTime.getHours() &&
                  time.getMinutes() === dateTime.getMinutes()
                ) {
                  return "selected-time-item";
                }
                return "";
              }}
              dayClassName={(date) => {
                // Tilføj ekstra klasser til datoer hvis nødvendigt
                return date < today
                  ? "react-datepicker__day--disabled"
                  : undefined;
              }}
            />
          </div>

          {dateTime && (
            <div>
              <p className="selected-datetime">
                Valgt tidspunkt: <strong>{formatDateTime(dateTime)}</strong>
              </p>
              <button
                onClick={() => {
                  alert(
                    `Din booking er bekræftet!\n\nTidspunkt: ${formatDateTime(
                      dateTime
                    )}\n\nVi har sendt en bekræftelse til din mail.`
                  );
                  setDateTime(null);
                  setOpen(false);
                }}
                className="confirm-button"
              >
                Bekræft
              </button>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
