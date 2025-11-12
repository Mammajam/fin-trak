import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const stages = [
  {
    title: "Initial onboarding",
    description:
      "Collect identity attributes, required documents, and risk questionnaire responses for individuals or entities.",
  },
  {
    title: "Enhanced due diligence",
    description:
      "Trigger enhanced workflows for high-risk segments with additional document capture and manual review.",
  },
  {
    title: "Ongoing monitoring",
    description:
      "Schedule periodic screenings and automate reviews based on jurisdiction, segment, or triggered alerts.",
  },
];

const bestPractices = [
  "Map Fin-Trak risk levels to your policy thresholds for consistency across teams.",
  "Use tags and review cadence metadata to prioritize analyst workloads.",
  "Leverage webhook notifications to update downstream CRMs or internal systems when KYC status changes.",
  "Store Fin-Trak screening IDs in your core banking or ledger systems for audit trails.",
];

export default function KycPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="KYC / KYB"
        title="Design adaptive identity workflows."
        description="Fin-Trak supports consumer, SME, and enterprise onboarding with configurable evidence capture, screening, and review cycles."
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          {bestPractices.map((tip) => (
            <li key={tip} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <InfoSection
        title="Lifecycle stages"
        description="Standardize KYC / KYB across onboarding, enhanced diligence, and monitoring."
        columns={3}
      >
        {stages.map((stage) => (
          <HighlightCard key={stage.title} title={stage.title} description={stage.description} />
        ))}
      </InfoSection>
    </div>
  );
}

