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
      {/* LEFT: content over background */}
      <section
        className="flex min-h-screen w-full flex-col justify-between p-9 lg:h-auto"
        style={{
          backgroundImage: `url(${page2.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Wrapper>
          <div className="mx-auto w-full max-w-sm">
            {/* Stepper */}
            <ol className="relative pl-8" aria-label="How it works">
              {/* vertical rail (kept green, respects theme) */}
              <span
                aria-hidden
                className="absolute top-3 bottom-3 left-3 w-[2px] bg-green-500"
              />

              {steps.map((step, idx) => (
                <li key={idx} className="relative mb-6 last:mb-0">
                  {/* step index */}
                  <span className="absolute top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-green-500 bg-white text-xs font-bold text-green-500 dark:bg-black">
                    {idx + 1}
                  </span>

                  {/* card */}
                  <div className="rounded-lg bg-white/30 p-3 shadow-md backdrop-blur-sm dark:bg-black/40">
                    <h3 className="mb-1 text-sm font-bold text-black dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs font-medium text-black dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Wrapper>
      </section>

      {/* RIGHT: illustration */}
      <section className="hidden min-h-screen w-full flex-col items-center justify-center bg-[#e0f5ff] p-9 lg:flex">
        <Image src={manWIthRobot} alt="Man with robot illustration" />
      </section>
    </section>
  );
}
