"use client";

import { usePathname } from "next/navigation";
import Header from "../Header"; // 👈 Gå ét niveau op med '../'

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return !isAdminPage ? <Header /> : null;
}
