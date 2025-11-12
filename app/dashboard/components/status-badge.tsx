import type {
  DecisionStatus,
  KycStatus,
  RiskLevel,
} from "@/types/kyc";

type StatusValue = KycStatus | DecisionStatus;

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]";

const riskStyles: Record<RiskLevel, string> = {
  low: "bg-emerald-500/20 text-emerald-100",
  moderate: "bg-sky-500/20 text-sky-100",
  high: "bg-amber-500/20 text-amber-100",
  critical: "bg-rose-500/25 text-rose-100",
};

const statusStyles: Partial<Record<StatusValue, string>> = {
  approved: "bg-emerald-500/20 text-emerald-100",
  clear: "bg-emerald-500/20 text-emerald-100",
  monitoring: "bg-sky-500/20 text-sky-100",
  pending: "bg-surface text-foreground/70",
  in_review: "bg-amber-500/20 text-amber-100",
  requires_review: "bg-amber-500/20 text-amber-100",
  escalated: "bg-rose-500/20 text-rose-100",
  blocked: "bg-rose-600/25 text-rose-100",
  rejected: "bg-rose-600/25 text-rose-100",
};

const fallbackStyle = "bg-surface text-foreground/70";

const toLabel = (value: string) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

interface RiskBadgeProps {
  level: RiskLevel;
  label?: string;
  className?: string;
}

export function RiskBadge({ level, label, className }: RiskBadgeProps) {
  return (
    <span className={`${baseClasses} ${riskStyles[level]} ${className ?? ""}`}>
      {label ?? toLabel(level)}
    </span>
  );
}

interface StatusBadgeProps {
  status: StatusValue;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const style = statusStyles[status] ?? fallbackStyle;
  return (
    <span className={`${baseClasses} ${style} ${className ?? ""}`}>
      {label ?? toLabel(status)}
    </span>
  );
}

