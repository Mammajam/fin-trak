"use client";

import type { DecisionStatus, KycStatus, RiskLevel } from "@/types/kyc";

const compose = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]";

const riskTone: Record<RiskLevel, string> = {
  low: "bg-emerald-500/20 text-emerald-100",
  moderate: "bg-sky-500/20 text-sky-100",
  high: "bg-amber-500/20 text-amber-100",
  critical: "bg-rose-500/20 text-rose-100",
};

const kycTone: Record<KycStatus, string> = {
  pending: "bg-slate-700/40 text-slate-200",
  in_review: "bg-amber-500/20 text-amber-100",
  approved: "bg-emerald-500/20 text-emerald-100",
  rejected: "bg-rose-500/30 text-rose-100",
  monitoring: "bg-sky-500/20 text-sky-100",
};

const decisionTone: Record<DecisionStatus, string> = {
  clear: "bg-emerald-500/20 text-emerald-100",
  requires_review: "bg-amber-500/20 text-amber-100",
  escalated: "bg-rose-500/20 text-rose-100",
  blocked: "bg-rose-500/30 text-rose-100",
};

export function RiskBadge({
  value,
  className,
}: {
  value: RiskLevel;
  className?: string;
}) {
  return (
    <span className={compose(baseClasses, riskTone[value], className)}>
      {value}
    </span>
  );
}

export function KycStatusBadge({
  value,
  className,
}: {
  value: KycStatus;
  className?: string;
}) {
  return (
    <span className={compose(baseClasses, kycTone[value], className)}>
      {value.replace("_", " ")}
    </span>
  );
}

export function DecisionStatusBadge({
  value,
  className,
}: {
  value: DecisionStatus;
  className?: string;
}) {
  return (
    <span className={compose(baseClasses, decisionTone[value], className)}>
      {value.replace("_", " ")}
    </span>
  );
}

