import Link from "next/link";

import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const quickStarts = [
  {
    title: "REST API",
    description:
      "Create customers, trigger screenings, and retrieve risk decisions with Fin-Trak's unified REST interface.",
    href: "/api",
  },
  {
    title: "Webhook Listeners",
    description:
      "Subscribe to screening completions, alert escalations, and rule updates via signed webhooks.",
    href: "/docs/webhooks",
  },
  {
    title: "Data Contracts",
    description:
      "Understand entity schemas used across KYC profiles, transactions, and alerts when syncing to your warehouse.",
    href: "/docs/data-model",
  },
];

const complianceGuides = [
  {
    title: "KYC / KYB Playbook",
    description:
      "Build adaptive onboarding and periodic reviews with configurable evidence requirements.",
    href: "/docs/kyc",
  },
  {
    title: "AML Automation",
    description:
      "Create risk rules, thresholds, and escalation workflows aligned to your regulatory posture.",
    href: "/docs/aml",
  },
  {
    title: "Audit & Reporting",
    description:
      "Export immutable timelines, approvals, and policy variance data during regulator examinations.",
    href: "/docs/audit",
  },
];

export default function DocsHomePage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Fin-Trak Docs"
        title="Build compliant identity and transaction workflows fast."
        description="Reference guides for engineering and compliance teams launching Fin-Trak across onboarding, screening, monitoring, and reporting surfaces."
      >
        <ul className="flex flex-wrap gap-4 text-xs text-foreground/80">
          <li className="rounded-full border border-border px-4 py-2">
            Versioned API contracts
          </li>
          <li className="rounded-full border border-border px-4 py-2">
            Compliance-first workflows
          </li>
          <li className="rounded-full border border-border px-4 py-2">
            Sandbox + production guidance
          </li>
        </ul>
      </PageHero>

      <InfoSection
        title="Start here"
        description="Kick off integrations across Fin-Trak platform surfaces."
        columns={3}
      >
        {quickStarts.map((item) => (
          <HighlightCard
            key={item.title}
            title={item.title}
            description={item.description}
            footer={
              <Link href={item.href} className="hover:underline">
                View guide →
              </Link>
            }
          />
        ))}
      </InfoSection>

      <InfoSection
        title="Operational guides"
        description="Blend automation with human review using Fin-Trak best practices."
        columns={3}
      >
        {complianceGuides.map((item) => (
          <HighlightCard
            key={item.title}
            title={item.title}
            description={item.description}
            footer={
              <Link href={item.href} className="hover:underline">
                Explore playbook →
              </Link>
            }
          />
        ))}
      </InfoSection>
    </div>
  );
}

