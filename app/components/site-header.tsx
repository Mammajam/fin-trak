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
    <header className="sticky top-0 z-50 backdrop-blur border-b border-border bg-card/80">
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

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted shadow-inner shadow-black/5 [data-theme='dark']:shadow-slate-900/40 sm:flex">
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
            className="hidden rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition hover:border-accent/60 hover:text-accent sm:inline-flex"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Launch
          </Link>
        </div>
      </div>
    </header>
  );
}

