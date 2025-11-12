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
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent transition hover:opacity-80"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/70 bg-accent/10 text-base font-bold text-accent shadow-[0_0_35px_rgba(5,150,105,0.25)] [data-theme='dark']:shadow-[0_0_35px_rgba(16,185,129,0.35)]">
              FT
            </span>
            Fin-Trak
          </Link>
          <p className="max-w-xl text-sm leading-6 text-foreground/80">
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
                className="rounded-2xl border border-border bg-surface px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted transition hover:border-accent/60 hover:text-accent"
              >
                <span className="block text-muted">{contact.label}</span>
                <span className="mt-1 block text-sm font-semibold text-foreground">
                  {contact.value}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {section.title}
              </p>
              <ul className="space-y-3 text-sm text-foreground/80">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-accent"
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

      <div className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} Fin-Trak Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/legal/privacy" className="transition hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="transition hover:text-accent">
              Terms of Service
            </Link>
            <Link href="/legal/compliance" className="transition hover:text-accent">
              Compliance Statements
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

