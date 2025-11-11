import Link from "next/link";
import type { ReactNode } from "react";

const legalNav = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/compliance", label: "Compliance Statements" },
];

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-220px)] max-w-5xl flex-col gap-8 px-6 pb-20 pt-6 sm:px-10 lg:flex-row">
      <aside className="lg:w-56 lg:flex-shrink-0">
        <nav className="sticky top-28 space-y-2 rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 text-sm text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Legal
          </p>
          <ul className="mt-4 space-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl border border-transparent px-4 py-2 transition hover:border-emerald-400/50 hover:text-emerald-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 space-y-8">{children}</main>
    </div>
  );
}

