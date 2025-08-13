"use client";

import Image from "next/image";
import page1 from "@/public/images/page1.png";
import robot from "@/public/images/robot.png";

import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";

export default function Home() {
  return (
    <section className="flex w-full flex-col lg:flex-row">
      <section
        className="bale flex h-screen w-full flex-col justify-between p-9 lg:h-auto"
        style={{
          backgroundImage: `url(${page1.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Wrapper>
          <div className="mx-auto rounded-2xl border border-white/30 bg-white/40 p-4 shadow-xl backdrop-blur-sm md:p-6 dark:border-gray-700 dark:bg-black/50">
            <h2 className="mb-4 text-xl font-extrabold text-black dark:text-white">
              Your Sneaker Care Partner
            </h2>
            <p className="text-xs leading-relaxed font-medium text-black dark:text-gray-300">
              <strong className="font-semibold">Sneaker Hub</strong> in Bur
              Dubai makes shoe cleaning easy and reliable. Simply scan the QR
              code to book online, and our team will promptly pick up your
              shoes. We use expert chemical wash techniques—not just a quick
              rinse—to ensure a deep, thorough clean. Your shoes will be
              returned fresh, spotless, and perfectly cared for, keeping your
              kicks looking their absolute best!
            </p>
          </div>
        </Wrapper>
      </section>

      {/* second half */}
      <section className="hidden h-screen w-full flex-col items-center justify-center bg-[#d6ebe9] p-9 lg:flex">
        <Image src={robot} alt="Man sitting in wheelchair" />
      </section>
    </section>
  );
}
