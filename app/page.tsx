import Link from "next/link";

const features = [
  {
    title: "Identity Intelligence",
    description:
      "Fin-Trak automates onboarding and periodic reviews with structured evidence capture, adverse media enrichment, and live policy guidance.",
    highlights: [
      "Flexible KYC/KYB profiles with adaptive risk questions",
      "Consolidated watchlist evidence and analyst annotations",
      "Risk-weighted scoring calibrated to each jurisdiction",
    ],
  },
  {
    title: "Transaction Screening",
    description:
      "Surface the riskiest flows instantly with tunable rules, audit-grade explanations, and escalation queues mapped to your operating model.",
    highlights: [
      "High-velocity scoring pipeline with explainable triggers",
      "Tiered alert queues aligned to risk operations workflows",
      "Fine-grained thresholds across corridor, currency, and channel",
    ],
  },
  {
    title: "Regulatory Coverage",
    description:
      "Meet global compliance obligations through automated audit trails, policy variance tracking, and regulator-ready reporting artifacts.",
    highlights: [
      "Regulation-aware templates across FATF, MAS, FCA, BSA",
      "Change management workflows with attestation history",
      "Exportable regulator and board-ready reporting packs",
    ],
  },
];

const stats = [
  { label: "Customers Monitored", value: "2.4k+" },
  { label: "High-Risk Alerts Resolved", value: "98%" },
  { label: "Screening Throughput", value: "12ms" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-accent/10 via-accent/5 to-transparent blur-3xl [data-theme='dark']:from-emerald-500/20 [data-theme='dark']:via-emerald-500/10" />
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-20 px-6 pb-24 pt-28 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/10 px-4 py-1 text-sm font-medium uppercase tracking-wide text-accent">
              RegTech / Security & Compliance
            </span>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Fin-Trak unifies API-first identity and transaction screening.
          </h1>
              <p className="max-w-2xl text-lg leading-8 text-foreground/80">
                Fin-Trak centralizes automated KYC, AML, and fraud controls into a
                single workflow. Orchestrate customer onboarding, ongoing monitoring,
                and real-time transaction risk decisions with audit-ready evidence for
                global regulators.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-400 px-6 font-semibold text-slate-900 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                Launch Screening Console
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 font-semibold text-foreground transition hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Explore the API
              </Link>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-border bg-card p-8 shadow-[0_45px_120px_-60px_rgba(5,150,105,0.15)] backdrop-blur [data-theme='dark']:shadow-[0_45px_120px_-60px_rgba(34,197,94,0.35)]">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent/80">
              Platform Clarity
            </p>
            <p className="text-lg leading-7 text-foreground/90">
              Centralize customer risk posture, live transaction screenings, and policy
              controls. Align analysts and engineering with one source of truth built for
              regulator scrutiny.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-surface px-5 py-4 text-center shadow-inner shadow-black/5 [data-theme='dark']:shadow-slate-900/40"
                >
                  <p className="text-2xl font-semibold text-foreground">
                    {item.value}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-8 shadow-[0_40px_120px_-80px_rgba(5,150,105,0.1)] backdrop-blur transition hover:border-accent/60 [data-theme='dark']:shadow-[0_40px_120px_-80px_rgba(14,165,233,0.4)]"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h2>
                <p className="text-sm leading-6 text-foreground/80">
                  {feature.description}
          </p>
        </div>
              <ul className="mt-2 space-y-2 text-sm text-foreground/80">
                {feature.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-transparent bg-surface px-4 py-3 text-foreground/90 transition group-hover:border-accent/40"
                  >
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <footer className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 text-sm text-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-foreground">
              Ready to orchestrate compliance at scale?
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Deploy Fin-Trak as a managed SaaS or run it within your cloud perimeter.
              Start with the mock data workspace and graduate to Prisma + Postgres when
              you connect production systems.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full border border-accent/80 px-6 font-semibold text-accent transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Enter the Console
          </Link>
        </footer>
      </section>
      </main>
  );
}
