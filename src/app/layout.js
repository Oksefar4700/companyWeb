/* src/app/layout.js */
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Header from "../components/Header";
import Footer from "../components/Footer";

const sans = GeistSans;
const mono = GeistMono;

export const metadata = {
  title: "CompanyWeb • Webløsninger",
  description: "Portfolio, webshop og booking-pakker til din virksomhed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da" className={`${GeistSans.className} ${GeistMono.className}`}>
      <body className="bg-gray-50 text-gray-800 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
