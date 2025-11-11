import Link from "next/link";
import type { ReactNode } from "react";

const docsNav = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/webhooks", label: "Webhooks" },
  { href: "/docs/data-model", label: "Data Model" },
  { href: "/docs/integrations", label: "Integrations" },
  { href: "/docs/kyc", label: "KYC / KYB" },
  { href: "/docs/aml", label: "AML Playbook" },
  { href: "/docs/audit", label: "Audit Trail" },
  { href: "/docs/regulations", label: "Regulatory Coverage" },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-220px)] max-w-6xl flex-col gap-8 px-6 pb-20 pt-6 sm:px-10 lg:flex-row">
      <aside className="lg:w-64 lg:flex-shrink-0">
        <nav className="sticky top-28 space-y-2 rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 text-sm text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Documentation
          </p>
          <ul className="mt-4 space-y-2">
            {docsNav.map((item) => (
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

