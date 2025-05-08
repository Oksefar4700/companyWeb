// src/components/Packages.jsx
"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import PackageDetailDrawer from "./PackageDetailDrawer";
import {
  FaLaptopCode,
  FaShoppingCart,
  FaBoxOpen,
  FaBuilding,
  FaCalendarAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { packages } from "../data/packages";

const iconMap = {
  portfolio: FaLaptopCode,
  "webshop-basic": FaShoppingCart,
  "webshop-standard": FaBoxOpen,
  "webshop-premium": FaBuilding,
  "booking-basis": FaCalendarAlt,
  "booking-pro": FaCalendarCheck,
  "booking-enterprise": FaBuilding,
};

export default function Packages() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.3 });
  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      ref={ref}
      id="packages"
      className="bg-[#f7f5f2] text-[#1f2328] scroll-mt-[var(--header-height)] py-20"
    >
      {/* Overskrift */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        variants={{ hidden: {}, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-2 text-[#2e2e38]"
      >
        Vælg din løsning
      </motion.h2>

      {/* Accent-stripe */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={controls}
        variants={{ hidden: {}, visible: { scaleX: 1 } }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 w-24 h-1 rounded-full bg-[#7eaedb]"
      />

      {/* Kort-gitter */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={container}
        className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {packages.map((pkg) => {
          const Icon = iconMap[pkg.slug];
          return (
            <motion.div
              key={pkg.slug}
              variants={cardAnim}
              onClick={() => setSelectedPkg(pkg)}
              whileHover={{ scale: 1.02 }}
              className="relative group bg-white border-2 border-[#2e2e38] rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-visible"
            >
              {/* Ikon-badge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#7eaedb] p-3 rounded-full shadow-inner">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Indhold */}
              <div className="pt-10 pb-6 px-6 flex flex-col h-full">
                <h3 className="mt-2 text-2xl font-semibold mb-2 text-[#2e2e38]">
                  {pkg.title}
                </h3>
                <p className="text-sm mb-4 flex-grow leading-relaxed">
                  {pkg.description}
                </p>
                <p className="text-lg font-bold mb-4 text-[#7eaedb] group-hover:text-[#5a82a3] transition-colors">
                  {pkg.price.toLocaleString("da-DK")} kr.
                </p>
                <span className="inline-block underline text-[#7eaedb] hover:bg-[#e3f0fc] hover:text-[#5a82a3] transition-colors px-1 py-0.5 rounded">
                  Se flere detaljer →
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Drawer */}
      <PackageDetailDrawer
        pkg={selectedPkg}
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
      />
    </section>
  );
}
