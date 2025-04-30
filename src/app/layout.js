// src/app/layout.js
import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "CompanyWeb",
  description: "Skræddersyede webløsninger – portfolio, booking og webshop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da" className="bg-white">
      <head />
      <body className="antialiased text-gray-800">
        <Header />
        <main className="pt-20 md:pt-24">{children}</main>
      </body>
    </html>
  );
}
