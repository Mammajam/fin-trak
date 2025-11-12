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
    <section className="space-y-6 rounded-3xl border border-border bg-card px-8 py-10 shadow-[0_40px_160px_-90px_rgba(5,150,105,0.15)] backdrop-blur [data-theme='dark']:shadow-[0_40px_160px_-90px_rgba(6,182,212,0.45)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          {eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {eyebrow}
            </span>
          ) : null}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-foreground/80">
              {description}
            </p>
          </div>
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-col gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {actions}
          </div>
        ) : null}
      </div>
      {children ? <div className="text-sm text-foreground/80">{children}</div> : null}
    </section>
  );
}

