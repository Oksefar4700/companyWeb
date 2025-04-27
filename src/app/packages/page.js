"use client";

import Packages from "../../components/Packages";

export default function PackagesPage() {
  return (
    <main className="bg-white min-h-screen pt-16 md:pt-20">
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-gray-900">
            Vælg din løsning
          </h1>
          <Packages />
        </div>
      </section>
    </main>
  );
}
