"use client";

import Packages from "../components/Packages";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/ContactForm";

export default function HomePage() {
  return (
    <main>
      {/* LYS sektion: pakker */}
      <section id="packages" className="bg-white text-gray-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Vælg din løsning
          </h2>
          <Packages />
        </div>
      </section>

      {/* MØRK sektion: om os */}
      <section id="about" className="bg-gray-900 text-gray-100 py-16">
        <div className="container mx-auto px-6">
          <AboutSection />
        </div>
      </section>

      {/* LYSGRÅ sektion: kontakt */}
      <section id="contact" className="bg-gray-50 text-gray-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Kontakt os</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
