"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import darkLogo from "@/public/sneaker-logos-dark-mode.png";
import lightLogo from "@/public/sneaker-logos-light-mode.png";

import SchedulePickupModal from "./schedule-pickup-modal";
import SocialToggle from "./social-toggle";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

// Header / Footer heights in rem
const HEADER_REM = 5;
const FOOTER_REM = 6;

const SECTION_DATA = [
  { label: 1, href: "/", isFirst: true, isLast: false },
  { label: 2, href: "/page-2", isFirst: false, isLast: false },
  { label: 3, href: "/page-3", isFirst: false, isLast: true },
];

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [currentIndex, setCurrentIndex] = useState(1);
  const [nextPage, setNextPage] = useState<string | undefined>(undefined);
  const [previousPage, setPreviousPage] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const activeIdx = SECTION_DATA.findIndex((s) => s.href === pathname);
    const idx = activeIdx === -1 ? 0 : activeIdx;

    setCurrentIndex(idx + 1);
    setPreviousPage(idx > 0 ? SECTION_DATA[idx - 1].href : undefined);
    setNextPage(
      idx < SECTION_DATA.length - 1 ? SECTION_DATA[idx + 1].href : undefined
    );
  }, [pathname]);

  return (
    <div className="bg-background text-foreground relative min-h-screen">
      {/* FIXED HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 h-20 border-b bg-white/80 backdrop-blur dark:bg-zinc-900/70">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-2">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Sneaker Hub home"
          >
            {/* Light mode */}
            <Image
              src={lightLogo}
              alt="Sneaker Hub"
              priority
              unoptimized
              className="h-17 w-70 dark:hidden"
            />
            {/* Dark mode */}
            <Image
              src={darkLogo}
              alt="Sneaker Hub"
              priority
              unoptimized
              className="hidden h-17 w-70 dark:block"
            />
          </Link>

          {/* Put the theme toggle in the header row so it doesn't overflow below */}
          <div className="relative right-0 -bottom-18 z-10 flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* SCROLLABLE, CENTERED CONTENT AREA */}
      <main
        className="mx-auto w-full max-w-5xl px-4"
        style={{
          paddingTop: `${HEADER_REM}rem`,
          paddingBottom: `${FOOTER_REM}rem`,
        }}
      >
        <div className="min-h-[calc(100vh-5rem-6rem)] overflow-y-auto">
          <div className="flex min-h-[inherit] items-center justify-center py-6">
            {children}
          </div>
        </div>
      </main>

      {/* FIXED FOOTER (NAV + PROGRESS) */}
      <footer className="fixed inset-x-0 bottom-0 z-50 h-24 border-t bg-white/80 backdrop-blur dark:bg-zinc-900/70">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
          <Link
            href={previousPage ?? "#"}
            aria-disabled={!previousPage}
            tabIndex={previousPage ? 0 : -1}
          >
            <Button
              disabled={!previousPage}
              className="rounded-3xl bg-[#e0dede] px-7 py-2 text-sm font-bold text-black opacity-70 hover:bg-[#d1d0d0] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              Back
            </Button>
          </Link>

          <div className="py-2 text-xs font-bold">
            <p className="text-xs">
              <span className="inline-block dark:text-white">
                {currentIndex}
              </span>
              <span className="inline-block px-3 opacity-50">/</span>
              <span className="inline-block opacity-50 dark:text-white">
                {SECTION_DATA.length}
              </span>
            </p>
          </div>

          <Link
            href={nextPage ?? "#"}
            aria-disabled={!nextPage}
            tabIndex={nextPage ? 0 : -1}
          >
            <Button
              disabled={!nextPage}
              className="rounded-3xl bg-zinc-900 px-7 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
            >
              Next
            </Button>
          </Link>
        </div>
      </footer>

      {/* FLOATING CTA ABOVE THE FOOTER, ALWAYS CENTERED */}
      <div
        className="fixed inset-x-0 z-50 flex justify-center"
        style={{ bottom: `${FOOTER_REM + 1.5}rem` }}
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-3xl border border-green-800 bg-gradient-to-b from-emerald-700/80 via-green-600/70 to-emerald-800/90 px-7 py-3 text-sm font-bold text-white shadow-lg hover:from-emerald-800/90 hover:via-green-700/80 hover:to-emerald-900/100 dark:border-emerald-600"
        >
          Schedule Pickup
        </Button>
      </div>

      {/* SOCIAL TOGGLE AT LEFT CENTER */}
      <div className="fixed top-1/2 left-1 z-50 -translate-y-1/2">
        <SocialToggle />
      </div>

      {/* MODAL */}
      <SchedulePickupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
