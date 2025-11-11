import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const controls = [
  {
    title: "Data protection",
    description:
      "Customer data encrypted in transit (TLS 1.3) and at rest (AES-256). Regional deployment options for EU, US, and APAC.",
  },
  {
    title: "Access management",
    description:
      "SSO with SCIM provisioning, role-based permissions, and granular API scopes.",
  },
  {
    title: "Infrastructure",
    description:
      "Isolated VPCs, automated patch management, and continuous vulnerability scanning.",
  },
  {
    title: "Monitoring & response",
    description:
      "24/7 security operations with automated anomaly detection and incident playbooks.",
  },
];

const certifications = [
  {
    title: "SOC 2 Type II",
    description: "Independent audits covering security, availability, and confidentiality.",
  },
  {
    title: "ISO 27001",
    description: "Information security management system aligned with global standards.",
  },
  {
    title: "GDPR Compliance",
    description: "Data processing agreements and customer controls for EU residents.",
  },
];

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 pb-20 pt-6 sm:px-10">
      <PageHero
        eyebrow="Security"
        title="Security first by design."
        description="Fin-Trak protects sensitive identity and transaction data with layered security practices, certifications, and monitoring."
      />

      <InfoSection
        title="Security controls"
        description="Key components of Fin-Trak's defense-in-depth strategy."
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

      <InfoSection
        title="Certifications & attestations"
        description="Third-party validations of Fin-Trak's security posture."
        columns={3}
      >
        {certifications.map((cert) => (
          <HighlightCard
            key={cert.title}
            title={cert.title}
            description={cert.description}
          />
        ))}
      </InfoSection>
    </div>
  );
}

