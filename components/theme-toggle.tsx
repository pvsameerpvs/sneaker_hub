"use client";

import React from "react";
import { useTheme } from "next-themes";

import { Icons } from "@/components/icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex w-max flex-col items-center space-y-2 rounded-full border bg-[#fafafa] p-2 shadow dark:border-zinc-800 dark:bg-[#111]">
      <button
        className={`p-1 text-zinc-700 dark:text-zinc-500 ${
          theme === "system"
            ? "rounded-full bg-white text-zinc-50 shadow-xl dark:bg-[#333]"
            : ""
        }`}
        onClick={() => setTheme("system")}
      >
        <Icons.monitor classes="" />
      </button>
      <button
        className={`p-1 text-zinc-700 dark:text-zinc-500 ${
          theme === "dark"
            ? "rounded-full bg-white text-zinc-50 shadow-xl dark:bg-[#333]"
            : ""
        }`}
        onClick={() => setTheme("dark")}
      >
        <Icons.moon />
      </button>
      <button
        className={`p-1 text-zinc-700 dark:text-zinc-500 ${
          theme === "light"
            ? "rounded-full bg-white text-zinc-700 shadow-xl dark:bg-[#333]"
            : ""
        }`}
        onClick={() => setTheme("light")}
      >
        <Icons.sun />
      </button>
    </div>
  );
}
