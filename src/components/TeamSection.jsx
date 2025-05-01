// src/components/TeamSection.jsx
"use client";

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
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-56 object-cover"
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
  );
}
