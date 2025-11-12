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
          className="flex items-center gap-3 rounded-3xl border border-border bg-card px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.3em] text-foreground transition hover:border-accent/60 hover:text-accent"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/70 bg-accent/10 text-base font-bold text-accent">
            FT
          </span>
          Fin-Trak
        </Link>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_40px_120px_-80px_rgba(5,150,105,0.1)] backdrop-blur [data-theme='dark']:shadow-[0_40px_120px_-80px_rgba(45,212,191,0.45)]">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Command Center
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              Regulatory posture at a glance
            </h2>
            <p className="text-sm leading-6 text-muted">
              Navigate between live risk telemetry, customer screenings, and the control
              stack powering your compliance program.
            </p>
          </div>
          <div className="mt-6">
            <SidebarNav items={navigation} />
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-5 text-xs text-muted backdrop-blur">
          <p className="font-semibold uppercase tracking-[0.16em] text-accent">
            Compliance SLOs
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <span>Case closure (Median)</span>
              <span className="font-semibold text-foreground">37m</span>
            </li>
            <li className="flex justify-between">
              <span>Escalation SLA</span>
              <span className="font-semibold text-foreground">96%</span>
            </li>
            <li className="flex justify-between">
              <span>Policy variance YTD</span>
              <span className="font-semibold text-accent">1.2%</span>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[0_40px_160px_-90px_rgba(5,150,105,0.1)] backdrop-blur [data-theme='dark']:shadow-[0_40px_160px_-90px_rgba(6,182,212,0.45)]">
          {children}
        </div>
      </main>
    </div>
  );
}

