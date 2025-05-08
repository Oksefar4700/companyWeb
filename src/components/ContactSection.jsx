// src/components/ContactSection.jsx
"use client";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-20 bg-[var(--color-background)] overflow-hidden"
      style={{
        background: "var(--bg-contact-image)",
      }}
    >
      <div className="absolute inset-0 bg-[var(--bg-contact-overlay)] pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-20 relative z-10 text-center">
        <h2 className="text-4xl font-bold mb-4 text-[var(--color-foreground)] font-heading">
          Kontakt os
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-[var(--color-secondary)]">
          Har du spørgsmål eller brug for et tilbud? Skriv til os her – vi
          vender tilbage inden for 24 timer.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
