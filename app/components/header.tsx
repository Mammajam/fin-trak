"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200 transition hover:text-emerald-100"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 text-base font-bold text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.35)]">
              FT
            </span>
            Fin-Trak
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-slate-800/60 bg-slate-900/60 px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 shadow-inner shadow-slate-900/40 lg:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-full px-4 py-2 transition",
                    active
                      ? "bg-emerald-500/20 text-emerald-100 shadow-[0_0_25px_rgba(52,211,153,0.3)]"
                      : "hover:text-emerald-100",
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
              className="hidden rounded-full border border-slate-800/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 transition hover:border-emerald-400/60 hover:text-emerald-100 lg:inline-flex"
            >
              Contact
            </Link>
            <Link
              href="/dashboard"
              className="hidden items-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-900 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200 lg:inline-flex"
            >
              Launch
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/60 bg-slate-900/60 text-emerald-200 transition hover:border-emerald-400/60 hover:text-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200 lg:hidden"
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
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-4 top-24 z-50 rounded-3xl border border-slate-800/60 bg-slate-950/95 p-6 shadow-2xl">
            <nav
              id="mobile-primary-navigation"
              className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200"
            >
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "rounded-2xl border px-4 py-3 text-center transition",
                      active
                        ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-100"
                        : "border-slate-800/60 bg-slate-900/60 hover:border-emerald-400/40 hover:text-emerald-100",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-3 text-center transition hover:border-emerald-400/40 hover:text-emerald-100"
              >
                Contact
              </Link>
              <Link
                href="/dashboard"
                className="rounded-2xl border border-emerald-400/60 bg-emerald-500/10 px-4 py-3 text-center text-emerald-100 transition hover:bg-emerald-500/20"
              >
                Launch Console
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

