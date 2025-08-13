"use client";

import React from "react";

export default function SocialToggle() {
  return (
    <div className="flex w-max flex-col items-center space-y-2 rounded-full border bg-[#fafafa] p-1 shadow dark:border-zinc-800 dark:bg-[#111]">
      {/* Instagram Button */}
      <a
        href="https://instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 text-zinc-700 hover:text-pink-600 dark:text-zinc-500 dark:hover:text-pink-400"
      >
        {/* Instagram SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5a4.25 4.25 0 00-4.25 4.25v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zm8.5 2.25a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
        </svg>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/yourphonenumber"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 text-zinc-700 hover:text-green-600 dark:text-zinc-500 dark:hover:text-green-500"
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 .09 5.3.09 11.82a11.47 11.47 0 001.77 6.03L0 24l6.43-1.66a11.8 11.8 0 005.57 1.41h.02c6.63 0 11.9-5.3 11.9-11.82a11.52 11.52 0 00-3.4-8.25zm-8.49 16.25h-.01a9.36 9.36 0 01-4.78-1.33l-.34-.2-3.02.78.8-2.94-.22-.3a9.4 9.4 0 01-1.44-5.01c0-5.18 4.26-9.4 9.5-9.4 2.53 0 4.9.98 6.68 2.76a9.32 9.32 0 012.74 6.67c0 5.19-4.26 9.4-9.49 9.4zm5.19-6.98c-.28-.14-1.65-.81-1.9-.9-.25-.1-.43-.14-.61.14s-.7.9-.85 1.08-.31.21-.59.07a7.57 7.57 0 01-2.22-1.37 8.46 8.46 0 01-1.56-1.94c-.16-.28 0-.43.12-.57.12-.12.28-.31.43-.47.14-.16.19-.28.28-.47a.9.9 0 00.05-.85c-.14-.28-.61-1.47-.84-2.02-.22-.53-.45-.46-.62-.47-.16 0-.34 0-.52 0s-.48.07-.73.35a3.12 3.12 0 00-1 2.43c0 1.42 1.13 2.8 1.29 3s2.23 3.4 5.41 4.77a18.55 18.55 0 002.61 1.1 3.69 3.69 0 001.68.14 3.2 3.2 0 001.91-1.53c.17-.29.17-.54.12-.75-.05-.2-.22-.29-.5-.43z" />
        </svg>
      </a>
    </div>
  );
}
