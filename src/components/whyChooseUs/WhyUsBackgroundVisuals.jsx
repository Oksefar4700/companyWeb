// src/components/whyChooseUs/WhyUsBackgroundVisuals.jsx
import React from 'react';
import Image from 'next/image';

const WhyUsBackgroundVisuals = (props) => {
  return (
    <>
      {/* Computer illustration og stor sky i baggrunden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stor computer i baggrunden - dækket delvist af indhold */}
        <div className="absolute right-0 bottom-0 w-full h-full flex justify-end items-end">
          <div className="relative w-[900px] h-[900px] opacity-15 transform translate-x-[15%] translate-y-[15%]">
            <Image
              src="/images/compare/computer.png"
              alt=""
              width={900}
              height={900}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Elegant baggrundsgradient der sikrer læsbarhed */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, transparent 50%, var(--color-secondary-light) 120%)",
          }}
        ></div>

        {/* Flyt skyen helt op til toppen med større afstand fra indholdet */}
        <div className="absolute left-0 top-0 w-[600px] h-[400px] opacity-10 transform translate-y-[-15%]">
          <Image
            src="/images/whyChooseUs/cloud.png"
            alt=""
            width={600}
            height={400}
            className="object-contain"
            style={{
              filter: "drop-shadow(0 8px 12px rgba(126, 174, 219, 0.12))",
            }}
            priority
          />
        </div>

        {/* Subtile prikker i baggrunden */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-brand-blue) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default WhyUsBackgroundVisuals;
