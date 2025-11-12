import { PageHero } from "@/app/components/hero";

const clauses = [
  {
    title: "1. Agreement",
    body: "By accessing Fin-Trak you accept these terms on behalf of your organization. Custom MSAs supersede where applicable.",
  },
  {
    title: "2. Services",
    body: "Fin-Trak provides compliance tooling, APIs, and managed infrastructure for KYC/AML programs.",
  },
  {
    title: "3. Customer Responsibilities",
    body: "You maintain responsibility for end-user notifications, regulatory filings, and policy decisions implemented using Fin-Trak.",
  },
  {
    title: "4. Acceptable Use",
    body: "Do not use Fin-Trak for unlawful activities. Automated scraping, abusive traffic, or attempts to circumvent security are prohibited.",
  },
  {
    title: "5. Liability",
    body: "Fin-Trak is provided as-is subject to contractual warranties. We are not liable for indirect or consequential damages.",
  },
  {
    title: "6. Termination",
    body: "Either party may terminate on 30 days' notice. We may suspend access for security incidents or policy breaches.",
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Terms of Service"
        title="Understand your obligations using Fin-Trak."
        description="These high-level terms govern use of Fin-Trak offerings. Seek legal review before production deployment."
      />

      <section className="space-y-6 rounded-3xl border border-border bg-card px-8 py-10 text-sm leading-6 text-foreground/80">
        {clauses.map((clause) => (
          <div key={clause.title} className="space-y-2">
            <h2 className="text-base font-semibold text-foreground">{clause.title}</h2>
            <p>{clause.body}</p>
          </div>
        ))}
      </section>

      <p className="text-xs text-muted">
        Questions? Contact{" "}
        <a className="text-accent hover:underline" href="mailto:legal@fin-trak.io">
          legal@fin-trak.io
        </a>
        .
      </p>
    </div>
  );
}

