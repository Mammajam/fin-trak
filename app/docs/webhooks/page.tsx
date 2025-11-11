import { HighlightCard } from "@/app/components/highlight-card";
import { InfoSection } from "@/app/components/info-section";
import { PageHero } from "@/app/components/hero";

const webhookEvents = [
  {
    title: "screening.completed",
    description:
      "Triggered when a KYC, AML, or transaction screening finishes with a decision payload.",
  },
  {
    title: "alert.escalated",
    description:
      "Published when an alert transitions to requires_review, escalated, or blocked.",
  },
  {
    title: "risk-settings.updated",
    description:
      "Broadcast whenever thresholds, rule weights, or jurisdiction overrides change.",
  },
  {
    title: "customer.updated",
    description:
      "Sent when core customer attributes or document statuses are modified.",
  },
];

const deliveryGuidelines = [
  "Webhooks are delivered over HTTPS with mutual TLS optional.",
  "Events are signed with an HMAC SHA-256 signature. Validate headers before processing.",
  "Retries follow exponential backoff for up to 24 hours. Return a 2xx status to acknowledge.",
  "Use idempotency keys provided in webhook payloads to avoid duplicate processing.",
];

export default function WebhooksPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Webhooks"
        title="Receive Fin-Trak updates in real time."
        description="Subscribe to webhook events to keep downstream systems such as case managers, CRMs, and data warehouses synchronized with Fin-Trak activity."
      >
        <ul className="space-y-2 text-sm text-slate-300">
          {deliveryGuidelines.map((tip) => (
            <li key={tip} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <InfoSection
        title="Event catalog"
        description="Each event payload follows the Fin-Trak signing specification and contains resource snapshots."
        columns={2}
      >
        {webhookEvents.map((event) => (
          <HighlightCard
            key={event.title}
            title={event.title}
            description={event.description}
          />
        ))}
      </InfoSection>
    </div>
  );
}

