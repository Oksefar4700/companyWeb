import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className="bg-white text-gray-800 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
