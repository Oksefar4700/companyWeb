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

export default function Packages({ onOrder }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.2 });

  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeIn",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 35,
        stiffness: 150,
        restDelta: 0.001,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeInOut", duration: 0.6 },
    },
  };

  const barVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.6,
        delay: 0.1,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="packages"
      className="bg-[#f7f5f2] text-[#1f2328] scroll-mt-[var(--header-height)] py-20"
    >
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        animate={controls}
        className="text-4xl font-extrabold font-heading text-center mb-2 text-[#2e2e38]"
      >
        Vælg din løsning
      </motion.h2>
      <motion.div
        variants={barVariants}
        initial="hidden"
        animate={controls}
        className="mx-auto mb-12 w-24 h-1 rounded-full bg-[#7eaedb]"
      />
      <motion.div
        className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate={controls}
        variants={gridContainerVariants}
      >
        {packages.map((pkg) => {
          const Icon = iconMap[pkg.slug] || FaBoxOpen;
          return (
            <motion.div
              key={pkg.slug}
              variants={cardAnim}
              onClick={() => setSelectedPkg(pkg)}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                borderColor: "#7eaedb",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative group bg-white border-2 border-[#2e2e38] rounded-3xl shadow-sm transition-all duration-300 cursor-pointer"
              style={{ willChange: "transform" }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#7eaedb] p-3 rounded-full shadow-inner">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="pt-10 pb-6 px-6 flex flex-col h-full">
                <h3 className="mt-2 text-2xl font-semibold mb-2 text-[#2e2e38]">
                  {pkg.title}
                </h3>
                <p className="text-sm mb-4 flex-grow leading-relaxed">
                  {pkg.description}
                </p>
                <p className="text-lg font-bold mb-4 text-[#7eaedb] transition-colors duration-200">
                  {pkg.price.toLocaleString("da-DK")} kr.
                </p>
                <span className="inline-block underline text-[#7eaedb] transition-colors duration-200">
                  Se flere detaljer →
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <PackageDetailDrawer
        pkg={selectedPkg}
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
        onOrder={onOrder}
      />
    </section>
  );
}
