import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { ThemeProvider } from "@/app/components/theme-provider";

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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased selection:bg-accent/20 selection:text-foreground [data-theme='dark']:selection:bg-emerald-400/20 [data-theme='dark']:selection:text-emerald-100`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const STORAGE_KEY = 'fintrak-theme';
                const stored = localStorage.getItem(STORAGE_KEY);
                let theme = 'dark';
                
                if (stored === 'light' || stored === 'dark') {
                  theme = stored;
                } else if (stored === 'system' || !stored) {
                  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  theme = prefersLight ? 'light' : 'dark';
                }
                
                document.documentElement.dataset.theme = theme;
                document.documentElement.style.colorScheme = theme;
              })();
            `,
          }}
        />
        <ThemeProvider>
          <div className="relative min-h-screen bg-background">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(5,150,105,0.06),_transparent_55%)] [data-theme='dark']:bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.12),_transparent_55%)]"></div>
            <Header />
            <main className="pb-24 pt-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
