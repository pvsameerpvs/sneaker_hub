"use client";

import Image from "next/image";
import boyAndGirl from "@/public/images/boy-and-girl.png";
import page3 from "@/public/images/page3.png";

import Wrapper from "@/components/wrapper";

export default function Home() {
  const services = [
    "Sneakers",
    "Leather shoes",
    "Suede & nubuck shoes",
    "Sports shoes",
    "Footwear",
  ];

  return (
    <section className="flex flex-col lg:flex-row">
      {/* Left Section */}
      <section
        className="flex min-h-screen w-full flex-col justify-between p-9 lg:h-auto"
        style={{
          backgroundImage: `url(${page3.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Wrapper>
          <div className="mx-auto max-w-sm overflow-hidden rounded-xl shadow-lg backdrop-blur-sm">
            {/* Services Card - Top */}
            <div className="bg-white/30 p-4 dark:bg-black/40">
              <h2 className="mb-2 text-lg font-bold text-black dark:text-white">
                Our Services
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {services.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-white/50 p-2 text-center text-xs font-medium text-black shadow-sm dark:bg-black/50 dark:text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Card - Bottom */}
            <div className="bg-white/30 p-4 dark:bg-black/40">
              <h2 className="text-lg font-bold text-black dark:text-white">
                Pricing
              </h2>
              <p className="text-xs font-medium text-black dark:text-gray-300">
                Transparent, simple price list with free pickup & delivery
                within Bur Dubai.
              </p>
              <p className="mb-2 text-xs font-medium text-black dark:text-gray-300">
                Discounts for multiple pairs.
              </p>
              <p className="text-xs font-medium text-black dark:text-gray-300">
                Price based on dust — starting from <strong>AED 20</strong> per
                pair.
              </p>
            </div>
          </div>
        </Wrapper>
      </section>

      {/* Right Section */}
      <section className="hidden min-h-screen w-full flex-col items-center justify-center bg-[#ffefd6] p-9 lg:flex">
        <Image src={boyAndGirl} alt="Boy and girl playing with robot" />
      </section>
    </section>
  );
}
