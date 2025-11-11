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
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent blur-3xl" />
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-20 px-6 pb-24 pt-28 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-1 text-sm font-medium uppercase tracking-wide text-emerald-200">
              RegTech / Security & Compliance
            </span>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
                Fin-Trak unifies API-first identity and transaction screening.
          </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
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
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700/70 px-6 font-semibold text-slate-200 transition hover:border-emerald-400/60 hover:text-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                Explore the API
              </Link>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-slate-800/60 bg-slate-900/50 p-8 shadow-[0_45px_120px_-60px_rgba(34,197,94,0.35)] backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-200/80">
              Platform Clarity
            </p>
            <p className="text-lg leading-7 text-slate-200">
              Centralize customer risk posture, live transaction screenings, and policy
              controls. Align analysts and engineering with one source of truth built for
              regulator scrutiny.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/80 px-5 py-4 text-center shadow-inner shadow-slate-900/40"
                >
                  <p className="text-2xl font-semibold text-slate-50">
                    {item.value}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
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
              className="group flex flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/50 p-8 shadow-[0_40px_120px_-80px_rgba(14,165,233,0.4)] backdrop-blur transition hover:border-emerald-400/60"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-100">
                  {feature.title}
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  {feature.description}
          </p>
        </div>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {feature.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-transparent bg-slate-900/60 px-4 py-3 text-slate-200 transition group-hover:border-emerald-400/40"
                  >
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <footer className="flex flex-col gap-6 rounded-3xl border border-slate-800/70 bg-slate-900/60 p-8 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-slate-100">
              Ready to orchestrate compliance at scale?
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
              Deploy Fin-Trak as a managed SaaS or run it within your cloud perimeter.
              Start with the mock data workspace and graduate to Prisma + Postgres when
              you connect production systems.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full border border-emerald-400/80 px-6 font-semibold text-emerald-200 transition hover:bg-emerald-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            Enter the Console
          </Link>
        </footer>
      </section>
      </main>
  );
}
