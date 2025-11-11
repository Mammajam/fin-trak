import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const coverage = [
  {
    title: "FATF Recommendations",
    description:
      "Align screening, monitoring, and reporting requirements across FATF member jurisdictions.",
  },
  {
    title: "EU AMLD & UK FCA",
    description:
      "Implement risk-based controls, PEP handling, and suspicious activity reporting for EMEA.",
  },
  {
    title: "US BSA / FinCEN",
    description:
      "Support SAR filings, customer due diligence, and transaction monitoring mandates.",
  },
  {
    title: "APAC Coverage",
    description:
      "Out-of-the-box rules and risk scoring for MAS, AUSTRAC, and Hong Kong AMLO programs.",
  },
];

export default function RegulationsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Regulatory Coverage"
        title="Built for global compliance."
        description="Fin-Trak continuously updates risk policies and data sources to meet evolving regulatory obligations across major financial hubs."
      />

      <InfoSection
        title="Supported regimes"
        description="Region-specific coverage that ships with Fin-Trak managed content."
        columns={2}
      >
        {coverage.map((item) => (
          <HighlightCard key={item.title} title={item.title} description={item.description} />
        ))}
      </InfoSection>
    </div>
  );
}

