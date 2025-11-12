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
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card px-6 py-5 shadow-inner shadow-black/5 transition hover:border-accent/50 [data-theme='dark']:shadow-slate-900/40">
      <div className="space-y-3">
        {badge ? (
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
            {badge}
          </span>
        ) : null}
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="text-sm leading-6 text-muted">{description}</p>
        ) : null}
        {children ? <div className="text-sm text-foreground/80">{children}</div> : null}
      </div>
      {footer ? (
        <div className="mt-auto text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {footer}
        </div>
      ) : null}
    </article>
  );
}

