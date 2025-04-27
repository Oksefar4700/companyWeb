import Link from "next/link";
import Image from "next/image";
import { packages } from "../../../data/packages";
import { ArrowLeft } from "lucide-react";

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) {
    return (
      <main className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-gray-900">
            Pakke ikke fundet
          </h1>
          <Link
            href="/packages"
            className="mt-4 inline-flex items-center text-indigo-600 hover:underline"
          >
            <ArrowLeft className="mr-2" /> Tilbage til oversigt
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* HERO‐BANNER */}
      <header className="relative h-80 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center">
        <div className="container mx-auto px-6">
          <Link
            href="/packages"
            className="inline-flex items-center mb-6 text-indigo-200 hover:text-white"
          >
            <ArrowLeft className="mr-2" /> Tilbage til oversigt
          </Link>

          <h1 className="text-5xl font-bold">{pkg.title}</h1>
          <p className="mt-2 text-2xl font-semibold">
            {pkg.price.toLocaleString("da-DK")} kr.
          </p>
          <p className="mt-4 max-w-2xl text-lg opacity-90">{pkg.description}</p>
          <button className="mt-8 px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow hover:bg-gray-100 transition">
            Kontakt os
          </button>
        </div>
      </header>

      {/* PAKKE‐DETAJER */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">
          Det får du med pakken
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pkg.details.map((detail, i) => (
            <div
              key={i}
              className="flex items-start bg-gray-50 rounded-lg p-6 shadow hover:shadow-md transition"
            >
              <span className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full mr-4">
                {i + 1}
              </span>
              <p className="text-gray-900 font-medium">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EKSEMPEL‐GALLERI */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Eksempler på design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pkg.examples.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl shadow-lg bg-white"
              >
                <Image
                  src={src}
                  alt={`${pkg.title} eksempel ${i + 1}`}
                  width={800}
                  height={500}
                  className="object-cover w-full h-64 sm:h-80"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}
