"use client";

import page1 from "@/public/images/page1.png";

import BackgroundThree from "@/components/background-three";
import Wrapper from "@/components/wrapper";

export default function Home() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${page1.src})` }}
      />
      {/* 3D layer (particles) - sits above image, below overlay */}
      <BackgroundThree /> {/* <-- add */}
      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Keep Wrapper (provides header + footer) */}
      <Wrapper>
        {/* Content area height = viewport minus header+footer (5rem + 6rem) */}
        <main className="relative z-10 grid min-h-[calc(100svh-11rem)] place-items-center p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/20 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/30">
            <div className="p-3 md:p-4">
              <h2 className="mb-1 text-base font-extrabold tracking-tight text-black md:text-lg dark:text-white">
                Your Sneaker Care Partner
              </h2>
              <p className="text-[11px] leading-snug font-medium text-black/85 md:text-xs dark:text-gray-200">
                <strong className="font-semibold text-black dark:text-white">
                  Sneaker Hub
                </strong>
                in Bur Dubai makes shoe cleaning easy and reliable. Simply scan
                the QR code to book online, and our team will promptly pick up
                your shoes. We use expert chemical wash techniques—not just a
                quick rinse—to ensure a deep, thorough clean. Your shoes will be
                returned fresh, spotless, and perfectly cared for, keeping your
                kicks looking their absolute best!
              </p>
            </div>
          </div>
        </main>
      </Wrapper>
    </section>
  );
}
