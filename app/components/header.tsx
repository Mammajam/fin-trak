"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/app/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/customers", label: "Customers" },
  { href: "/dashboard/risk-controls", label: "Risk Controls" },
  { href: "/api", label: "API" },
];

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent transition hover:opacity-80"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/70 bg-accent/10 text-base font-bold text-accent shadow-[0_0_30px_rgba(5,150,105,0.25)] [data-theme='dark']:shadow-[0_0_30px_rgba(16,185,129,0.35)]">
            FT
          </span>
          Fin-Trak
        </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted shadow-inner shadow-black/5 [data-theme='dark']:shadow-slate-900/40 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                  className={[
                  "rounded-full px-4 py-2 transition",
                  active
                    ? "bg-accent/20 text-accent shadow-[0_0_25px_rgba(5,150,105,0.2)] [data-theme='dark']:shadow-[0_0_25px_rgba(52,211,153,0.3)]"
                    : "hover:text-accent",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
              className="hidden rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition hover:border-accent/60 hover:text-accent lg:inline-flex"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
              className="hidden items-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-900 transition hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200 lg:inline-flex"
          >
            Launch
          </Link>
          <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-accent transition hover:border-accent/60 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-primary-navigation"
            >
              <span className="flex flex-col items-center justify-center">
                <span
                  className={`h-0.5 w-5 origin-center transform rounded-full bg-current transition ${isMenuOpen ? "translate-y-[5px] rotate-45" : "-translate-y-1.5"}`}
                />
                <span
                  className={`h-0.5 w-5 transform rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`h-0.5 w-5 origin-center transform rounded-full bg-current transition ${isMenuOpen ? "-translate-y-[5px] -rotate-45" : "translate-y-1.5"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-4 top-24 z-50 rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <nav
              id="mobile-primary-navigation"
              className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground"
            >
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={[
                      "rounded-2xl border px-4 py-3 text-center transition",
                      active
                        ? "border-accent/60 bg-accent/10 text-accent"
                        : "border-border bg-surface hover:border-accent/40 hover:text-accent",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="rounded-2xl border border-border bg-surface px-4 py-3 text-center transition hover:border-accent/40 hover:text-accent"
              >
                Contact
              </Link>
              <Link
                href="/dashboard"
                onClick={handleLinkClick}
                className="rounded-2xl border border-accent/60 bg-accent/10 px-4 py-3 text-center text-accent transition hover:bg-accent/20"
              >
                Launch Console
              </Link>
              <ThemeToggle variant="mobile" />
            </nav>
        </div>
      </div>
      ) : null}
    </>
  );
}

