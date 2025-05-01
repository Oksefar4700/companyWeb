"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const cases = [
  {
    slug: "case-1",
    title: "Case 1",
    description: "Kort beskrivelse af case 1.",
  },
  {
    slug: "case-2",
    title: "Case 2",
    description: "Kort beskrivelse af case 2.",
  },
];

export default function CasesList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section ref={ref} id="cases" className="py-20 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-12 text-center text-gray-800"
      >
        Vores Cases
      </motion.h2>

      <div className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <motion.div
            key={c.slug}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform"
          >
            {/* Placeholder for case image */}
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 italic">Billede kommer snart</span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                {c.title}
              </h3>
              <p className="text-gray-700 flex-grow">{c.description}</p>
              <Link href={`/cases/${c.slug}`} className="btn-primary mt-4">
                Læs case
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
