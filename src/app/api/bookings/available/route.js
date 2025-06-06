// src/app/api/bookings/available/route.js - SIMPLIFICERET (kun bookings collection)
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return new Response(
        JSON.stringify({ error: "Dato parameter er påkrævet" }),
        { status: 400 }
      );
    }

    // Konverter dato til start og slut af dagen (UTC)
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    console.log(
      "🔍 Søger efter bookings mellem:",
      startOfDay.toISOString(),
      "og",
      endOfDay.toISOString()
    );

    // 🎯 ENKELHED: Søg kun i bookings collection (single source of truth)
    const bookingsRef = collection(db, "bookings");
    const bookingsQuery = query(
      bookingsRef,
      where("dateTime", ">=", startOfDay.toISOString()),
      where("dateTime", "<=", endOfDay.toISOString())
    );

    const querySnapshot = await getDocs(bookingsQuery);
    const bookedTimes = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.dateTime) {
        bookedTimes.push({
          id: doc.id,
          dateTime: data.dateTime,
          formattedDateTime: data.formattedDateTime,
        });
      }
    });

    console.log(
      `📅 Fundet ${bookedTimes.length} bookede tidspunkter for ${
        selectedDate.toISOString().split("T")[0]
      }`
    );

    return new Response(
      JSON.stringify({
        bookedTimes,
        requestedDate: date,
        count: bookedTimes.length,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Fejl ved hentning af bookede tidspunkter:", err);
    return new Response(
      JSON.stringify({
        error: "Kunne ikke hente bookede tidspunkter",
        details: err.message,
      }),
      { status: 500 }
    );
  }
}
