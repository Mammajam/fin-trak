import type { ReactNode } from "react";

interface HighlightCardProps {
  title: string;
  description?: string;
  badge?: string;
  footer?: ReactNode;
  children?: ReactNode;
}

export function HighlightCard({
  title,
  description,
  badge,
  footer,
  children,
}: HighlightCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-slate-800/60 bg-slate-900/60 px-6 py-5 shadow-inner shadow-slate-900/40 transition hover:border-emerald-400/50">
      <div className="space-y-3">
        {badge ? (
          <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            {badge}
          </span>
        ) : null}
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        {description ? (
          <p className="text-sm leading-6 text-slate-400">{description}</p>
        ) : null}
        {children ? <div className="text-sm text-slate-300">{children}</div> : null}
      </div>
      {footer ? (
        <div className="mt-auto text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          {footer}
        </div>
      ) : null}
    </article>
  );
}

