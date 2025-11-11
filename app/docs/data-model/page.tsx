import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const entities = [
  {
    title: "Customer",
    description:
      "Represents an individual or business with KYC/KYB data, risk scores, tags, and jurisdiction metadata.",
  },
  {
    title: "Document",
    description:
      "Evidence gathered during onboarding. Stores type, issuing country, reference numbers, and review outcomes.",
  },
  {
    title: "Relationship",
    description:
      "Captures beneficial owners, directors, and related accounts with associated risk weightings.",
  },
  {
    title: "Screening",
    description:
      "Immutable record of checks performed, including scoring, triggered rules, and analyst notes.",
  },
  {
    title: "Transaction",
    description:
      "Payment or transfer evaluated by transaction monitoring. Links to screenings and alerts.",
  },
  {
    title: "Alert",
    description:
      "Work item assigned to analysts with dispositions, escalation tiers, and evidence history.",
  },
];

const modellingNotes = [
  "UUIDs are used across all primary keys for safe replication across regions.",
  "Timestamps are ISO 8601 strings stored in UTC. Use the `lastModifiedAt` attribute for sync cursors.",
  "Enumerations map to Fin-Trak risk vocabularies (risk level, decision status, screening type).",
  "Financial amounts are stored as minor units (cents) alongside currency codes for precision.",
];

export default function DataModelPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Data Model"
        title="Understand Fin-Trak entities."
        description="Design integrations or warehouse pipelines backed by Fin-Trak's canonical data contracts."
      >
        <ul className="space-y-2 text-sm text-slate-300">
          {modellingNotes.map((note) => (
            <li key={note} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <InfoSection
        title="Core entities"
        description="These resources power APIs, webhooks, and the Fin-Trak dashboard."
        columns={3}
      >
        {entities.map((entity) => (
          <HighlightCard
            key={entity.title}
            title={entity.title}
            description={entity.description}
          />
        ))}
      </InfoSection>
    </div>
  );
}

