import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fin-Trak",
    template: "%s — Fin-Trak",
  },
  description:
    "Fin-Trak is an API-first RegTech platform orchestrating automated KYC, AML, and transaction screening workflows for modern fintech teams.",
  keywords: [
    "Fin-Trak",
    "RegTech",
    "KYC",
    "AML",
    "transaction monitoring",
    "compliance automation",
    "risk management",
  ],
  applicationName: "Fin-Trak",
  category: "finance",
  authors: [{ name: "Fin-Trak" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-400/20 selection:text-emerald-100`}
      >
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.12),_transparent_55%)]" />
          <Header />
          <main className="pb-24 pt-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
