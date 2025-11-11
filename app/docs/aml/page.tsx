import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const controls = [
  {
    title: "Rule engine",
    description:
      "Compose rules blending heuristics, velocity patterns, and jurisdictional risk scoring.",
  },
  {
    title: "Alert queues",
    description:
      "Route alerts to tiered queues with SLA tracking and escalation to compliance leadership.",
  },
  {
    title: "Evidence management",
    description:
      "Attach watchlist matches, transaction history, and analyst notes to every decision.",
  },
  {
    title: "Regulator reporting",
    description:
      "Generate SAR/STR narratives and export structured data for FATF, FinCEN, or FCA filings.",
  },
];

export default function AmlPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="AML Playbook"
        title="Automate anti-money laundering protections."
        description="Fin-Trak transaction monitoring and alert management features help your teams meet global AML obligations."
      />

      <InfoSection
        title="Core controls"
        description="Combine automation with analyst oversight to meet AML program requirements."
        columns={2}
      >
        {controls.map((control) => (
          <HighlightCard
            key={control.title}
            title={control.title}
            description={control.description}
          />
        ))}
      </InfoSection>
    </div>
  );
}

