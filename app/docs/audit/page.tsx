import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const artefacts = [
  {
    title: "Case timelines",
    description:
      "Chronological history of decisions, reviewer assignments, and supporting evidence.",
  },
  {
    title: "Policy variance logs",
    description:
      "Track documented exceptions, approvals, and compensating controls for regulator review.",
  },
  {
    title: "Screening evidence",
    description:
      "Downloadable watchlist matches, adverse media summaries, and jurisdictional risk inputs.",
  },
  {
    title: "Regulator exports",
    description:
      "Generate formatted exports for FINTRAC, MAS, FCA, and other supervisory authorities.",
  },
];

export default function AuditPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Audit Trail"
        title="Defend every compliance decision."
        description="Fin-Trak automatically captures evidence, reviewer activity, and policy context to satisfy regulators and internal audit."
      />

      <InfoSection
        title="Audit artefacts"
        description="Use these exports to respond to regulatory exams or board-level reporting."
        columns={2}
      >
        {artefacts.map((item) => (
          <HighlightCard key={item.title} title={item.title} description={item.description} />
        ))}
      </InfoSection>
    </div>
  );
}

