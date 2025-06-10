// src/app/page.js - FIXED VERSION
import { redirect } from "next/navigation";

export default function RootPage() {
  // 🚀 Simpel redirect uden try/catch - Next.js håndterer det
  redirect("/da");
}
