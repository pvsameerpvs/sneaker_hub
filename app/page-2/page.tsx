"use client";

import Image from "next/image";
import manWIthRobot from "@/public/images/man-with-robot.png";
import page2 from "@/public/images/page2.png";

import Wrapper from "@/components/wrapper";

export default function Home() {
  const steps = [
    {
      title: "Scan & Book",
      description:
        "Scan the QR code, visit our website, and fill the quick form to schedule your shoe cleaning.",
    },
    {
      title: "We Pick Up On Time",
      description:
        "Our team arrives promptly at your doorstep to collect your shoes hassle-free.",
    },
    {
      title: "Clean & Fast Delivery",
      description:
        "We clean and return your shoes fresh and spotless — ready to wear!",
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row">
      {/* LEFT: background + content */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          height: "100svh",
          backgroundImage: `url(${page2.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30" aria-hidden />

        {/* Keep Wrapper (header + footer) */}
        <Wrapper>
          {/* Content area fits exactly between header+footer; no scroll */}
          <main className="relative z-10 grid min-h-[calc(100svh-11rem)] place-items-center p-4">
            <div className="mx-auto w-full max-w-sm">
              <ol className="relative pl-7" aria-label="How it works">
                {/* Rail */}
                <span
                  aria-hidden
                  className="absolute top-3 bottom-3 left-2.5 w-[2px] bg-green-500/90"
                />
                {steps.map((step, idx) => (
                  <li key={idx} className="relative mb-4 last:mb-0">
                    {/* Index */}
                    <span className="absolute top-1 left-0 flex h-5 w-5 items-center justify-center rounded-full border border-green-500 bg-white text-[10px] font-bold text-green-600 shadow-sm dark:bg-black">
                      {idx + 1}
                    </span>

                    {/* Card */}
                    <div className="rounded-lg border border-white/20 bg-white/25 p-3 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-black/35">
                      <h3 className="mb-0.5 text-xs font-semibold tracking-tight text-black dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-[11px] leading-snug font-medium text-black/85 dark:text-gray-200">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </main>
        </Wrapper>
      </section>

      {/* RIGHT: illustration (kept as original, disabled) */}
      {/* <section className="hidden min-h-screen w-full flex-col items-center justify-center bg-[#e0f5ff] p-9 lg:flex">
        <Image src={manWIthRobot} alt="Man with robot illustration" />
      </section> */}
    </section>
  );
}
