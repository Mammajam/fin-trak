import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const leadership = [
  {
    title: "Amira Patel — CEO",
    description:
      "Former regulator and founder of multiple compliance startups. Leads product vision and policy alignment.",
  },
  {
    title: "Javier Ortega — CTO",
    description:
      "Ex-identity engineering lead at global bank. Oversees platform scalability and data security.",
  },
  {
    title: "Sophia Martins — Chief Compliance Officer",
    description:
      "Managed AML programs across LATAM and EMEA. Heads Fin-Trak’s regulatory partnerships.",
  },
];

const milestones = [
  {
    title: "2023",
    description: "Fin-Trak founded to modernize RegTech infrastructure.",
  },
  {
    title: "2024",
    description:
      "Launches identity and transaction screening APIs with global data coverage.",
  },
  {
    title: "2025",
    description:
      "Expands to 3 continents with cloud-deployable and managed SaaS offerings.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 pb-20 pt-6 sm:px-10">
      <PageHero
        eyebrow="About Fin-Trak"
        title="Fin-Trak exists to safeguard global financial systems."
        description="We build compliance infrastructure that empowers fintechs and financial institutions to scale responsibly without compromising on regulatory obligations."
      />

      <InfoSection
        title="Leadership"
        description="Our leadership team blends regulatory, engineering, and risk operations expertise."
      >
        {leadership.map((leader) => (
          <HighlightCard
            key={leader.title}
            title={leader.title}
            description={leader.description}
          />
        ))}
      </InfoSection>

      <InfoSection
        title="Milestones"
        description="Key moments in Fin-Trak’s journey."
        columns={3}
      >
        {milestones.map((milestone) => (
          <HighlightCard
            key={milestone.title}
            title={milestone.title}
            description={milestone.description}
          />
        ))}
      </InfoSection>
    </div>
  );
}

