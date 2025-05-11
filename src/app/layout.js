// src/app/layout.js
import "./globals.css";
import Script from "next/script";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <head>
        {/* Indlæs Lottie Player tidligt, så <lottie-player> er kendt før React kører */}
        <Script
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
