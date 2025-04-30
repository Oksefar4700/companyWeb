import React from "react";

const testimonials = [
  {
    name: "Kunde Navn",
    role: "CEO, Firma",
    quote: "Fantastisk service, stærke resultater!",
  },
  {
    name: "Anden Kunde",
    role: "Marketingchef",
    quote: "Super professionelt team.",
  },
];

const Testimonials = () => (
  <section className="py-16 bg-white text-center">
    <h2 className="text-3xl font-semibold mb-8">Hvad vores kunder siger</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="p-6 border rounded-lg">
          <p className="italic mb-4">“{t.quote}”</p>
          <h3 className="font-bold">{t.name}</h3>
          <p className="text-sm text-gray-600">{t.role}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
