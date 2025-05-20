// app/layout.js (tilføjelse)
import "./styles/globals.css";
import Script from "next/script";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <head>
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
        <Header />
        {children}
      </body>
    </html>
  );
}
