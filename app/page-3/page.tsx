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
      {/* LEFT: background + centered content */}
      <section
        className="relative w-full"
        style={{
          height: "100svh",
          backgroundImage: `url(${page3.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-black/25" aria-hidden />

        {/* Keep Wrapper (header + footer) */}
        <Wrapper>
          {/* Content fits exactly between header+footer */}
          <main className="relative z-10 grid min-h-[calc(100svh-11rem)] place-items-center p-4">
            <div className="mx-auto w-full max-w-sm space-y-3">
              {/* Services Card */}
              <div className="rounded-2xl border border-white/20 bg-white/25 p-4 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/35">
                <h2 className="mb-2 text-base font-bold text-black dark:text-white">
                  Our Services
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-white/20 bg-white/40 p-2 text-center text-[11px] font-medium text-black shadow-sm dark:border-white/10 dark:bg-black/45 dark:text-gray-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Card */}
              <div className="rounded-2xl border border-white/20 bg-white/25 p-4 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/35">
                <h2 className="mb-1 text-base font-bold text-black dark:text-white">
                  Pricing
                </h2>
                <p className="text-xs leading-snug font-medium text-black dark:text-gray-200">
                  Transparent, simple price list with free pickup & delivery
                  within Bur Dubai.
                </p>
                <p className="text-xs leading-snug font-medium text-black dark:text-gray-200">
                  Discounts for multiple pairs.
                </p>
                <p className="text-xs leading-snug font-medium text-black dark:text-gray-200">
                  Price based on dust — starting from <strong>AED 20</strong>{" "}
                  per pair.
                </p>
              </div>
            </div>
          </main>
        </Wrapper>
      </section>

      {/* RIGHT: illustration (optional, kept commented) */}
      {/* <section className="hidden min-h-screen w-full flex-col items-center justify-center bg-[#ffefd6] p-9 lg:flex">
        <Image src={boyAndGirl} alt="Boy and girl playing with robot" />
      </section> */}
    </section>
  );
}
