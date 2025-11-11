import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const integrationSteps = [
  {
    title: "1. Provision environments",
    description:
      "Create sandbox and production workspaces. Generate API tokens with environment-specific scopes.",
  },
  {
    title: "2. Sync customers",
    description:
      "Use the Customers API to push onboarding data, attach documents, and schedule periodic reviews.",
  },
  {
    title: "3. Configure monitoring",
    description:
      "Enable transaction screening, define risk thresholds, and subscribe to webhook events.",
  },
  {
    title: "4. Route alerts",
    description:
      "Connect Fin-Trak alerts to your case management tooling or shared inbox with tiered queues.",
  },
];

const sdkSupport = [
  {
    title: "TypeScript SDK",
    description: "Typed client for browser and server runtimes. Handles auth and retries.",
  },
  {
    title: "Python SDK",
    description: "Ideal for backend services and data pipelines needing Fin-Trak integration.",
  },
  {
    title: "Java SDK",
    description: "Supports enterprise integration platforms and Android onboarding workflows.",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Integrations"
        title="Launch Fin-Trak with minimal effort."
        description="Bring Fin-Trak into your identity workflows, transaction monitoring stack, or internal tooling using our integration playbooks."
      />

      <InfoSection
        title="Implementation path"
        description="Follow this sequence to move from sandbox experimentation to production deployment."
        columns={2}
      >
        {integrationSteps.map((step) => (
          <HighlightCard
            key={step.title}
            title={step.title}
            description={step.description}
          />
        ))}
      </InfoSection>

      <InfoSection
        title="SDKs and tooling"
        description="Accelerate adoption with official Fin-Trak SDKs."
        columns={3}
      >
        {sdkSupport.map((sdk) => (
          <HighlightCard key={sdk.title} title={sdk.title} description={sdk.description} />
        ))}
      </InfoSection>
    </div>
  );
}

