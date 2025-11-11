import Link from "next/link";
import type { ReactNode } from "react";

import { SidebarNav } from "@/app/dashboard/components/sidebar-nav";

const navigation = [
  {
    href: "/dashboard",
    label: "Overview",
    description: "Risk posture, alerts, and live transactions",
  },
  {
    href: "/dashboard/customers",
    label: "Customers",
    description: "KYC/AML profiles and screening history",
  },
  {
    href: "/dashboard/risk-controls",
    label: "Risk Controls",
    description: "Thresholds, rules, and jurisdiction overrides",
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 pb-16 pt-10 sm:px-10 lg:flex-row">
      <aside className="w-full max-w-xs shrink-0 space-y-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-900/70 px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-emerald-400/60 hover:text-emerald-100"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 text-base font-bold text-emerald-200">
            FT
          </span>
          Fin-Trak
        </Link>
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-[0_40px_120px_-80px_rgba(45,212,191,0.45)] backdrop-blur">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Command Center
            </p>
            <h2 className="text-lg font-semibold text-slate-100">
              Regulatory posture at a glance
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              Navigate between live risk telemetry, customer screenings, and the control
              stack powering your compliance program.
            </p>
          </div>
          <div className="mt-6">
            <SidebarNav items={navigation} />
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5 text-xs text-slate-400 backdrop-blur">
          <p className="font-semibold uppercase tracking-[0.16em] text-emerald-200">
            Compliance SLOs
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <span>Case closure (Median)</span>
              <span className="font-semibold text-slate-100">37m</span>
            </li>
            <li className="flex justify-between">
              <span>Escalation SLA</span>
              <span className="font-semibold text-slate-100">96%</span>
            </li>
            <li className="flex justify-between">
              <span>Policy variance YTD</span>
              <span className="font-semibold text-emerald-200">1.2%</span>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1">
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/50 p-8 shadow-[0_40px_160px_-90px_rgba(6,182,212,0.45)] backdrop-blur">
          {children}
        </div>
      </main>
    </div>
  );
}

