import type { ReactNode } from "react";

export type MetricTone = "default" | "success" | "warning" | "danger";

const toneStyles: Record<MetricTone, string> = {
  default: "border-slate-800/60 bg-slate-900/60 text-slate-100",
  success: "border-emerald-400/60 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-400/60 bg-amber-500/10 text-amber-100",
  danger: "border-rose-400/60 bg-rose-500/10 text-rose-100",
};

interface MetricCardProps {
  title: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  tone?: MetricTone;
}

export function MetricCard({
  title,
  value,
  hint,
  icon,
  tone = "default",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-3xl border px-6 py-5 shadow-inner shadow-slate-900/40 ${toneStyles[tone]}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
          {title}
        </p>
        {icon ? <span className="text-slate-400">{icon}</span> : null}
      </div>
      <p className="mt-3 text-2xl font-semibold">
        {typeof value === "number" ? value.toLocaleString("en-US") : value}
      </p>
      {hint ? (
        <p className="mt-2 text-xs text-slate-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
