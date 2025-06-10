// src/app/layout.js - DIN OPDATEREDE VERSION
import "./styles/globals.css";
import Script from "next/script";
import ConditionalHeader from "../components/admin/ConditionalHeader";
// 🚫 FJERNET: import I18nProvider from "../components/I18nProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          strategy="beforeInteractive"
        />
        <Script
          id="schema-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebDevelopment",
              name: "CompanyWeb",
              description: "Skræddersyede webløsninger med React",
              url: "https://ditdomæne.dk",
              sameAs: [
                "https://www.facebook.com/companyweb",
                "https://www.linkedin.com/company/companyweb",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "København",
                addressRegion: "Hovedstaden",
                postalCode: "2100",
                addressCountry: "DK",
              },
              telephone: "+4500000000",
              email: "kontakt@ditdomæne.dk",
            }),
          }}
        />
      </head>
      <body>
        {/* 🚫 FJERNET: <I18nProvider> wrapper */}
        <ConditionalHeader />
        {children}
        {/* 🚫 FJERNET: </I18nProvider> */}
      </body>
    </html>
  );
}
