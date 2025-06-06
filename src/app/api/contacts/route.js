// src/app/api/contacts/route.js - MED EMAIL VALIDERING
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({
          error: "Manglende påkrævede felter: navn, email og besked",
        }),
        { status: 400 }
      );
    }

    // 🎯 EMAIL VALIDERING: Simpel query + JavaScript filtering
    if (data.type === "booking-confirmation" && data.bookingId) {
      console.log(
        `🔍 Tjekker for eksisterende bookings for email: ${data.email}`
      );

      const contactsRef = collection(db, "contacts");
      // 🎯 SIMPEL query - kun email og type (ingen index krævet)
      const emailQuery = query(
        contactsRef,
        where("email", "==", data.email),
        where("type", "==", "booking-confirmation")
      );

      const querySnapshot = await getDocs(emailQuery);

      // 🎯 Filter i JavaScript i stedet for i databasen
      const conflictingBookings = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        // Tjek om det er en ANDEN booking og stadig aktiv
        if (
          docData.bookingId !== data.bookingId && // Ikke samme booking
          (docData.status === "new" || docData.status === "pending") // Stadig aktiv
        ) {
          conflictingBookings.push({
            id: doc.id,
            ...docData,
          });
        }
      });

      if (conflictingBookings.length > 0) {
        console.log(
          `❌ Email ${data.email} har ${conflictingBookings.length} ANDRE aktive booking(s)`
        );

        return new Response(
          JSON.stringify({
            error:
              "Denne email har allerede en anden aktiv booking. Kontakt os hvis du har brug for at ændre din booking.",
            code: "DUPLICATE_EMAIL",
            details: conflictingBookings.map((b) => b.bookingId),
          }),
          { status: 409 }
        );
      }

      console.log(
        `✅ Email ${data.email} kan bekræfte booking ${data.bookingId}`
      );
    }

    // Bestem request type
    const requestType = data.bookingId
      ? "booking-confirmation"
      : data.packageSlug
      ? "package-order"
      : "contact";

    // Tilføj contact til Firestore
    const docRef = await addDoc(collection(db, "contacts"), {
      ...data,
      type: requestType,
      createdAt: serverTimestamp(),
      status: data.bookingId ? "pending" : "new",
    });

    console.log("✅ Contact gemt med ID:", docRef.id);

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Besked sendt succesfuldt",
        id: docRef.id,
        type: requestType,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Fejl i /api/contacts:", err);
    return new Response(
      JSON.stringify({
        error: "Kunne ikke sende besked",
        details: err.message,
      }),
      { status: 500 }
    );
  }
}
