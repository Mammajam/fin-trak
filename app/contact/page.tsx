import Link from "next/link";

import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const contactChannels = [
  {
    title: "Sales & Partnerships",
    description:
      "Discuss enterprise onboarding, regional data residency, and bespoke risk requirements.",
    badge: "Business",
    footer: (
      <Link href="mailto:partners@fin-trak.io" className="hover:underline">
        partners@fin-trak.io
      </Link>
    ),
  },
  {
    title: "Compliance Advisory",
    description:
      "Engage Fin-Trak compliance specialists for policy reviews, audits, and regulator responses.",
    badge: "Compliance",
    footer: (
      <Link href="mailto:compliance@fin-trak.io" className="hover:underline">
        compliance@fin-trak.io
      </Link>
    ),
  },
  {
    title: "Technical Support",
    description:
      "Open tickets for API questions, webhook troubleshooting, or sandbox environment access.",
    badge: "Support",
    footer: (
      <Link href="https://support.fin-trak.io" className="hover:underline">
        support.fin-trak.io
      </Link>
    ),
  },
];

const officeLocations = [
  {
    title: "New York, USA",
    description: "350 Hudson Street, 7th Floor, New York, NY 10014",
  },
  {
    title: "London, UK",
    description: "9 Appold Street, London EC2A 2AP",
  },
  {
    title: "Singapore",
    description: "9 Straits View, Marina One West Tower, #05-07, Singapore 018937",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 pb-20 pt-6 sm:px-10">
      <PageHero
        eyebrow="Contact"
        title="Connect with Fin-Trak teams."
        description="Whether you are designing a compliance program, scaling globally, or need engineering support, Fin-Trak teams are ready to help."
      >
        <p className="text-sm text-slate-300">
          Typical response time: <span className="text-emerald-200">under 12 hours</span>{" "}
          during business days.
        </p>
      </PageHero>

      <InfoSection title="Choose a channel" columns={3}>
        {contactChannels.map((channel) => (
          <HighlightCard
            key={channel.title}
            title={channel.title}
            description={channel.description}
            badge={channel.badge}
            footer={channel.footer}
          />
        ))}
      </InfoSection>

      <InfoSection
        title="Visit us"
        description="Schedule an on-site session with compliance and technical specialists."
        columns={3}
      >
        {officeLocations.map((office) => (
          <HighlightCard
            key={office.title}
            title={office.title}
            description={office.description}
          />
        ))}
      </InfoSection>
    </div>
  );
}

