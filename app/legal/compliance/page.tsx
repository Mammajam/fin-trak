import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const statements = [
  {
    title: "Sanctions screening",
    description:
      "Fin-Trak leverages multiple global watchlists, including OFAC, UN, EU, and HMT, refreshed daily.",
  },
  {
    title: "Transaction monitoring",
    description:
      "Rules and machine learning models cover velocity, structuring, corridor risk, and high-risk counterparties.",
  },
  {
    title: "Record retention",
    description:
      "Audit logs retained for a minimum of 7 years with configurable policies per jurisdiction.",
  },
  {
    title: "Policy reviews",
    description:
      "Fin-Trak compliance council reviews all managed content quarterly to match regulatory updates.",
  },
];

export default function ComplianceStatementsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Compliance Statements"
        title="Fin-Trak commitments to regulators and customers."
        description="These statements summarize how Fin-Trak meets core regulatory obligations. Detailed attestations available under NDA."
      />

      <InfoSection
        title="Assurance highlights"
        description="Core capabilities supporting your compliance program."
        columns={2}
      >
        {statements.map((statement) => (
          <HighlightCard
            key={statement.title}
            title={statement.title}
            description={statement.description}
          />
        ))}
      </InfoSection>
    </div>
  );
}

