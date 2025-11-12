import { PageHero } from "@/app/components/hero";

const sections = [
  {
    title: "1. Data Collection",
    points: [
      "Identity information submitted by you or your customers.",
      "Device and usage logs for security monitoring.",
      "Support interactions and compliance audit trails.",
    ],
  },
  {
    title: "2. Data Usage",
    points: [
      "Provide and improve Fin-Trak services.",
      "Meet regulatory obligations, including KYC/AML requirements.",
      "Monitor platform performance and detect suspicious activity.",
    ],
  },
  {
    title: "3. Data Sharing",
    points: [
      "Trusted subprocessors under strict contractual obligations.",
      "Regulators or law enforcement when legally required.",
      "Your organization, based on configured permissions and roles.",
    ],
  },
  {
    title: "4. Your Rights",
    points: [
      "Access, rectify, or delete personal data where applicable.",
      "Request data portability for supported regions.",
      "Object to processing or lodge a complaint with data protection authorities.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Privacy Policy"
        title="Protecting your data is core to Fin-Trak."
        description="This summary outlines how Fin-Trak handles personal data. Full legal agreements are available upon request."
      />

      <section className="space-y-8 rounded-3xl border border-border bg-card px-8 py-10 text-sm leading-6 text-foreground/80">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
            <ul className="space-y-2">
              {section.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <p className="text-xs text-muted">
        Effective date: October 1, 2025 · Contact{" "}
        <a className="text-accent hover:underline" href="mailto:privacy@fin-trak.io">
          privacy@fin-trak.io
        </a>{" "}
        for detailed agreements.
      </p>
    </div>
  );
}

