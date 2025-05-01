// src/components/TeamSection.jsx
"use client";

import AnimatedSection from "./AnimatedSection";

const teamMembers = [
  {
    name: "Frederik Brøsen",
    age: 31,
    role: "Fullstack udvikler",
    img: "/images/team/Frederik_Broesen.jpg",
  },
  {
    name: "Oliver Larsen",
    age: 25,
    role: "HR ansvarlig",
    img: "/images/team/Oliver_larsen.jpg",
  },
  {
    name: "Daniel Bonne",
    age: 28,
    role: "Fullstack udvikler, kvalitetskontrollør",
    img: "/images/team/Daniel_Bonne.png",
  },
];

export default function TeamSection() {
  return (
    <AnimatedSection
      id="about"
      from="right"
      className="py-20 bg-gray-100 text-gray-900"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Mød teamet</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition"
            >
              {/* Nu større og ikke beskæret */}
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-72 object-contain bg-gray-50"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-1">
                  {member.name}, {member.age}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
