import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/dashboard" },
      { label: "Customers", href: "/dashboard/customers" },
      { label: "Risk Controls", href: "/dashboard/risk-controls" },
      { label: "Transaction Screening", href: "/dashboard#transactions" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "API Reference", href: "/api" },
      { label: "Webhooks", href: "/docs/webhooks" },
      { label: "Data Model", href: "/docs/data-model" },
      { label: "Integration Guide", href: "/docs/integrations" },
    ],
  },
  {
    title: "Compliance",
    links: [
      { label: "KYC/KYB Workflows", href: "/docs/kyc" },
      { label: "AML Policies", href: "/docs/aml" },
      { label: "Audit Trail", href: "/docs/audit" },
      { label: "Regulatory Coverage", href: "/docs/regulations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Fin-Trak", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

const contactDetails = [
  { label: "Email", value: "compliance@fin-trak.io", href: "mailto:compliance@fin-trak.io" },
  { label: "Security Reports", value: "security@fin-trak.io", href: "mailto:security@fin-trak.io" },
  { label: "Support Desk", value: "support.fin-trak.io", href: "https://support.fin-trak.io" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950/90">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200 transition hover:text-emerald-100"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 text-base font-bold text-emerald-100 shadow-[0_0_35px_rgba(16,185,129,0.35)]">
              FT
            </span>
            Fin-Trak
          </Link>
          <p className="max-w-xl text-sm leading-6 text-slate-300">
            Fin-Trak accelerates regulatory compliance teams with automated identity
            verification, ongoing monitoring, and real-time transaction screening.
            Deploy as a comprehensive console or integrate the APIs directly into your
            risk operations stack.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {contactDetails.map((contact) => (
              <Link
                key={contact.label}
                href={contact.href}
                className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400 transition hover:border-emerald-400/60 hover:text-emerald-100"
              >
                <span className="block text-slate-500">{contact.label}</span>
                <span className="mt-1 block text-sm font-semibold text-slate-200">
                  {contact.value}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {section.title}
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-emerald-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} Fin-Trak Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/legal/privacy" className="transition hover:text-emerald-200">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="transition hover:text-emerald-200">
              Terms of Service
            </Link>
            <Link href="/legal/compliance" className="transition hover:text-emerald-200">
              Compliance Statements
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

