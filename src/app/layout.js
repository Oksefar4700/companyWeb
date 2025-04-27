import "./globals.css";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      {/* pt-16 svarer til h-16 (64px), md:pt-20 svarer til h-20 (80px) */}
      <body className="pt-16 md:pt-20 bg-white text-gray-800 antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
