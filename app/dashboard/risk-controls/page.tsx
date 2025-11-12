import { RiskBadge } from "@/app/dashboard/components/status-badge";
import { getJurisdictionRisks, getRiskSettings } from "@/lib/mockStore";

const numberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function RiskControlsPage() {
  const settings = getRiskSettings();
  const overrides = getJurisdictionRisks();

  return (
    <div className="space-y-10">
      <header className="space-y-4 border-b border-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
          Risk Controls
        </p>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            Policy thresholds & automated rules
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/80">
            Tune how Fin-Trak scores transactions and customer profiles. Values
            here drive the API responses and analyst work queues. Changes are
            auditable and sync to downstream case management tooling.
          </p>
        </div>
        <p className="text-xs text-muted">
          Last updated {new Date(settings.updatedAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          by {settings.updatedBy}
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-accent/60 bg-accent/10 p-6 text-sm text-accent">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">
            High-value outbound
          </p>
          <p className="mt-3 text-2xl font-semibold text-accent">
            {numberFormat.format(settings.transactionThresholds.highValueUsd)}
          </p>
          <p className="mt-2 text-accent/80">
            Transactions above this value trigger enhanced monitoring rules and
            escalate to Tier 2 automatically.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 text-sm text-foreground/80">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Manual review threshold
          </p>
          <p className="mt-3 text-2xl font-semibold text-foreground">
            {numberFormat.format(settings.transactionThresholds.manualReviewUsd)}
          </p>
          <p className="mt-2">
            Above this amount, the screening engine routes alerts to Tier 1 for
            manual attestation before release.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 text-sm text-foreground/80">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Daily volume ceiling
          </p>
          <p className="mt-3 text-2xl font-semibold text-foreground">
            {numberFormat.format(settings.transactionThresholds.dailyVolumeUsd)}
          </p>
          <p className="mt-2">
            Breaches initiate corridor-specific suspension workflows and notify
            your risk leads.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Screening Parameters
          </h2>
          <dl className="mt-4 grid gap-3 text-sm text-foreground/80">
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                PEP Sensitivity
              </dt>
              <dd className="text-base font-semibold text-foreground">
                {settings.screeningParameters.pepSensitivity.toUpperCase()}
              </dd>
              <p className="mt-1 text-xs text-muted">
                Controls threshold for potential match confidence scoring.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                Adverse Media Coverage
              </dt>
              <dd className="text-base font-semibold text-foreground">
                {settings.screeningParameters.adverseMediaCoverage.toUpperCase()}
              </dd>
              <p className="mt-1 text-xs text-muted">
                Dictates which media tiers are included in ongoing screening.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                Sanctions Auto-Block Score
              </dt>
              <dd className="text-base font-semibold text-rose-200">
                {settings.screeningParameters.sanctionsAutoBlockScore}
              </dd>
              <p className="mt-1 text-xs text-muted">
                Alerts above this score block automatically and notify Tier 3.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                Transaction Auto-Block Score
              </dt>
              <dd className="text-base font-semibold text-rose-200">
                {settings.screeningParameters.transactionAutoBlockScore}
              </dd>
              <p className="mt-1 text-xs text-muted">
                Combined rule score to automatically quarantine transactions.
              </p>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Jurisdiction Overrides
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {overrides.map((override) => (
              <li
                key={override.isoCode}
                className="flex items-start justify-between rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground">
                    {override.country}
                  </p>
                  <p className="text-xs text-muted">{override.rationale}</p>
                </div>
                <RiskBadge level={override.inherentRisk} />
              </li>
            ))}
            {overrides.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-border px-4 py-3 text-xs text-muted">
                No jurisdiction-specific overrides configured.
              </li>
            ) : null}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Active Rules
          </h2>
          <span className="text-xs text-muted">
            {settings.rules.length} total
          </span>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border">
          <div className="grid grid-cols-[1.1fr,0.9fr,0.5fr,0.6fr] gap-6 border-b border-border bg-surface px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            <span>Rule</span>
            <span>Description</span>
            <span>Weight</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-border text-sm">
            {settings.rules.map((rule) => (
              <div
                key={rule.id}
                className="grid grid-cols-[1.1fr,0.9fr,0.5fr,0.6fr] items-start gap-6 px-6 py-4"
              >
                <div>
                  <p className="text-base font-semibold text-foreground">
                    {rule.name}
                  </p>
                  <p className="text-xs text-muted">
                    Category: {rule.category.toUpperCase()}
                  </p>
                </div>
                <p className="text-xs text-muted">{rule.description}</p>
                <p className="text-base font-semibold text-foreground">
                  {rule.riskWeight}
                </p>
                <span
                  className={[
                    "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
                    rule.enabled
                      ? "bg-accent/20 text-accent"
                      : "bg-surface text-foreground/60",
                  ].join(" ")}
                >
                  {rule.enabled ? "Active" : "Paused"}
                </span>
              </div>
            ))}
            {settings.rules.length === 0 ? (
              <div className="px-6 py-4 text-sm text-muted">
                No rules configured.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

