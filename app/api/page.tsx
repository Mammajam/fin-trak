import Link from "next/link";

import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const resources = [
  {
    title: "Authentication",
    description:
      "Use service tokens with granular scopes mapped to your environments. Rotate keys through the Fin-Trak console or API.",
    footer: (
      <Link href="/docs/integrations" className="hover:underline">
        Integration guide →
      </Link>
    ),
  },
  {
    title: "Sandboxes",
    description:
      "Access global watchlists, jurisdiction risk scores, and synthetic customer personas for staging environments.",
    footer: (
      <Link href="/docs/data-model" className="hover:underline">
        Data model →
      </Link>
    ),
  },
  {
    title: "Rate Limits",
    description:
      "Default throughput is 500 requests/min. Contact us to burst for bulk migrations or high-volume transaction screening.",
    footer: (
      <Link href="/contact" className="hover:underline">
        Request increase →
      </Link>
    ),
  },
];

const endpoints = [
  {
    title: "Customers API",
    description: "Create and manage customers, collect documents, initiate screenings.",
  },
  {
    title: "Screenings API",
    description: "Trigger KYC, AML, and transaction monitoring runs via unified requests.",
  },
  {
    title: "Alerts API",
    description: "Retrieve escalations, update dispositions, and sync evidence to case systems.",
  },
  {
    title: "Risk Settings API",
    description: "Programmatically adjust thresholds, rule weights, and jurisdiction overrides.",
  },
];

export default function ApiOverviewPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 pb-20 pt-6 sm:px-10">
      <PageHero
        eyebrow="API Reference"
        title="Automate compliance with Fin-Trak APIs."
        description="All Fin-Trak platform capabilities—KYC/KYB onboarding, screening, alerting, and reporting—are accessible via secure REST APIs."
        actions={
          <>
            <Link
              href="https://api.fin-trak.io/docs"
              className="rounded-full border border-accent/60 bg-accent/10 px-4 py-2 text-accent hover:bg-accent/20"
            >
              API Explorer
            </Link>
            <Link
              href="/docs/webhooks"
              className="rounded-full border border-border px-4 py-2 text-foreground hover:border-accent/60 hover:text-accent"
            >
              Webhook events
            </Link>
          </>
        }
      >
        <p>
          Base URL: <code className="rounded bg-surface px-2 py-1">https://api.fin-trak.io/v1</code>
        </p>
      </PageHero>

      <InfoSection
        title="Core endpoints"
        description="Use these resources to orchestrate identity and transaction screening workflows."
        columns={2}
      >
        {endpoints.map((endpoint) => (
          <HighlightCard
            key={endpoint.title}
            title={endpoint.title}
            description={endpoint.description}
          />
        ))}
      </InfoSection>

      <InfoSection
        title="Essential resources"
        description="Review these topics before promoting Fin-Trak integrations to production."
        columns={3}
      >
        {resources.map((resource) => (
          <HighlightCard
            key={resource.title}
            title={resource.title}
            description={resource.description}
            footer={resource.footer}
          />
        ))}
      </InfoSection>
    </div>
  );
}

