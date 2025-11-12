import type { ReactNode } from "react";

interface InfoSectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
  columns?: 1 | 2 | 3;
}

export function InfoSection({
  title,
  description,
  children,
  columns = 2,
}: InfoSectionProps) {
  const columnClass =
    columns === 3
      ? "lg:grid-cols-3"
      : columns === 1
        ? "lg:grid-cols-1"
        : "lg:grid-cols-2";

  return (
    <section className="space-y-4 rounded-3xl border border-border bg-card px-8 py-10">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-muted">{description}</p>
        ) : null}
      </div>
      <div className={`grid gap-4 ${columnClass}`}>{children}</div>
    </section>
  );
}

