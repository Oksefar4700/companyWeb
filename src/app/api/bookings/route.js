import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request) {
  try {
    const data = await request.json();
    await addDoc(collection(db, "bookings"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Fejl i /api/bookings:", err);
    return new Response(
      JSON.stringify({ error: "Kunne ikke gemme booking" }),
      { status: 500 }
    );
  }
}
