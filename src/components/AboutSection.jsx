// components/AboutSection.jsx
import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-4">Om os</h2>
      <p className="mb-4">
        Vi er tre passionerede datamatikerstuderende, der brænder for
        webudvikling og god kundedialog. Hos CompanyWeb forstår vi, at
        teknologien kun er midlet – det er dialogen med dig, der skaber de
        bedste løsninger.
      </p>
      <ul className="list-disc list-inside">
        <li>Personlig rådgivning fra start til slut</li>
        <li>Brugervenlige løsninger med fokus på dit kundesegment</li>
        <li>Support og opfølgning, så du aldrig står alene</li>
      </ul>
    </section>
  );
}
