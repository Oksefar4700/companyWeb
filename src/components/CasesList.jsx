import React from "react";
import Link from "next/link";
import projects from "../data/projects";

const CasesList = () => (
  <section className="py-16 bg-gray-100">
    <h2 className="text-3xl font-semibold text-center mb-8">Vores Cases</h2>
    <div className="grid md:grid-cols-3 gap-8 px-4">
      {projects.map((project) => (
        <div key={project.slug} className="bg-white p-6 rounded-lg shadow">
          <img
            src={project.image}
            alt={project.title}
            className="mb-4 rounded"
          />
          <h3 className="font-bold text-xl mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <Link href={`/portfolio/${project.slug}`}>
            <a className="text-blue-600 hover:underline">Læs mere →</a>
          </Link>
        </div>
      ))}
    </div>
  </section>
);

export default CasesList;
