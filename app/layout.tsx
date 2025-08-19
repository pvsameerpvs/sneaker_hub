import "./globals.css";
import "leaflet/dist/leaflet.css";

import localFont from "next/font/local";
import type { Metadata } from "next/types";

import { Provider } from "@/components/provider";

const spaceMono = localFont({
  src: [
    {
      path: "../public/fonts/space-mono/SpaceMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/space-mono/SpaceMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/space-mono/SpaceMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/space-mono/SpaceMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  // ── Core
  title: {
    default: "Sneaker Hub",
    template: "%s | Sneaker Hub",
  },
  description:
    "Sneaker Hub – premium sneaker cleaning, restoration, and pickup service in Dubai, UAE. Schedule a doorstep pickup and get your shoes professionally cleaned and protected.",
  keywords: [
    "Sneaker cleaning",
    "Shoe laundry",
    "Sneaker restoration",
    "Shoe pickup service",
    "Dubai",
    "UAE",
    "Sole whitening",
    "Stain removal",
    "Waterproof coating",
    "Sneaker Hub",
    "Kaminari",
    "Next.js",
    "React",
    "shadcn-ui",
  ],

  // ── Attribution (kept)
  generator: "Next.js",
  applicationName: "Kaminari",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Virgil", url: "https://obedd.vercel.app" }],
  creator: "Virgil",
  publisher: "Virgil",

  // ── Crawling
  robots: { index: true },

  // ── Canonical (replace with your real domain when ready)
  alternates: {
    canonical: "https://kaminari.vercel.app",
  },

  // ── Base URL (keep or change to your real prod domain)
  metadataBase: new URL("https://kaminari.vercel.app"),

  // ── Mobile parsing
  formatDetection: { email: false, address: false, telephone: false },

  // ── Open Graph
  openGraph: {
    title: "Sneaker Hub",
    description:
      "Doorstep sneaker pickup & professional cleaning in Dubai, UAE. Book in seconds.",
    url: "https://kaminari.vercel.app",
    siteName: "Sneaker Hub",
    images: [
      { url: "https://kaminari.vercel.app/og.png", width: 800, height: 600 },
      {
        url: "https://kaminari.vercel.app/og-dark.png",
        width: 1800,
        height: 1600,
        alt: "Sneaker Hub – premium sneaker cleaning & pickup",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ── Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Sneaker Hub",
    description:
      "Premium sneaker cleaning & pickup in Dubai. Book your doorstep pickup now.",
    images: ["https://kaminari.vercel.app/og.png"],
  },

  // ── Icons / theme color (optional; safe to keep)
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceMono.className}>
        <Provider attribute="class" defaultTheme="system" enableSystem>
          <main
            className={`flex min-h-screen w-full flex-col bg-white text-zinc-700 dark:bg-black dark:text-zinc-400`}
          >
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
