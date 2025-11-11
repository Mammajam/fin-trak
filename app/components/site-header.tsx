"use client";

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

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-slate-800/60 bg-slate-950/80">
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

        <nav className="hidden items-center gap-1 rounded-full border border-slate-800/60 bg-slate-900/60 px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 shadow-inner shadow-slate-900/40 sm:flex">
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
            className="hidden rounded-full border border-slate-800/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 transition hover:border-emerald-400/60 hover:text-emerald-100 sm:inline-flex"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-900 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
          >
            Launch
          </Link>
        </div>
      </div>
    </header>
  );
}

