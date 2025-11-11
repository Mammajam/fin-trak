import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
  actions?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  actions,
}: PageHeroProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-800/60 bg-slate-900/60 px-8 py-10 shadow-[0_40px_160px_-90px_rgba(6,182,212,0.45)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          {eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
              {eyebrow}
            </span>
          ) : null}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-300">
              {description}
            </p>
          </div>
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-col gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            {actions}
          </div>
        ) : null}
      </div>
      {children ? <div className="text-sm text-slate-200">{children}</div> : null}
    </section>
  );
}

