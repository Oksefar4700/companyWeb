// src/app/api/bookings/route.js - OPDATERET til at returnere ID
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request) {
  try {
    const data = await request.json();

    // 🎯 Gem booking og få document reference med ID
    const docRef = await addDoc(collection(db, "bookings"), {
      ...data,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Booking oprettet med ID:", docRef.id);

    // 🎯 Returner success med booking ID
    return new Response(
      JSON.stringify({
        ok: true,
        id: docRef.id, // Vigtig: Returnér ID så ContactForm kan referere til det
        message: "Booking oprettet succesfuldt",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Fejl i /api/bookings:", err);
    return new Response(JSON.stringify({ error: "Kunne ikke gemme booking" }), {
      status: 500,
    });
  }
}
