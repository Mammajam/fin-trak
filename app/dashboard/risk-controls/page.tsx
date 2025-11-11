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
      <header className="space-y-4 border-b border-slate-800/70 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">
          Risk Controls
        </p>
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">
            Policy thresholds & automated rules
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Tune how Fin-Trak scores transactions and customer profiles. Values
            here drive the API responses and analyst work queues. Changes are
            auditable and sync to downstream case management tooling.
          </p>
        </div>
        <p className="text-xs text-slate-500">
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
        <div className="rounded-3xl border border-emerald-400/60 bg-emerald-500/10 p-6 text-sm text-emerald-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">
            High-value outbound
          </p>
          <p className="mt-3 text-2xl font-semibold text-emerald-100">
            {numberFormat.format(settings.transactionThresholds.highValueUsd)}
          </p>
          <p className="mt-2 text-emerald-200/80">
            Transactions above this value trigger enhanced monitoring rules and
            escalate to Tier 2 automatically.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 text-sm text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Manual review threshold
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-100">
            {numberFormat.format(settings.transactionThresholds.manualReviewUsd)}
          </p>
          <p className="mt-2">
            Above this amount, the screening engine routes alerts to Tier 1 for
            manual attestation before release.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 text-sm text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Daily volume ceiling
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-100">
            {numberFormat.format(settings.transactionThresholds.dailyVolumeUsd)}
          </p>
          <p className="mt-2">
            Breaches initiate corridor-specific suspension workflows and notify
            your risk leads.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Screening Parameters
          </h2>
          <dl className="mt-4 grid gap-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                PEP Sensitivity
              </dt>
              <dd className="text-base font-semibold text-slate-100">
                {settings.screeningParameters.pepSensitivity.toUpperCase()}
              </dd>
              <p className="mt-1 text-xs text-slate-400">
                Controls threshold for potential match confidence scoring.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Adverse Media Coverage
              </dt>
              <dd className="text-base font-semibold text-slate-100">
                {settings.screeningParameters.adverseMediaCoverage.toUpperCase()}
              </dd>
              <p className="mt-1 text-xs text-slate-400">
                Dictates which media tiers are included in ongoing screening.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Sanctions Auto-Block Score
              </dt>
              <dd className="text-base font-semibold text-rose-200">
                {settings.screeningParameters.sanctionsAutoBlockScore}
              </dd>
              <p className="mt-1 text-xs text-slate-400">
                Alerts above this score block automatically and notify Tier 3.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Transaction Auto-Block Score
              </dt>
              <dd className="text-base font-semibold text-rose-200">
                {settings.screeningParameters.transactionAutoBlockScore}
              </dd>
              <p className="mt-1 text-xs text-slate-400">
                Combined rule score to automatically quarantine transactions.
              </p>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Jurisdiction Overrides
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {overrides.map((override) => (
              <li
                key={override.isoCode}
                className="flex items-start justify-between rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-3"
              >
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-100">
                    {override.country}
                  </p>
                  <p className="text-xs text-slate-400">{override.rationale}</p>
                </div>
                <RiskBadge level={override.inherentRisk} />
              </li>
            ))}
            {overrides.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-slate-800/60 px-4 py-3 text-xs text-slate-400">
                No jurisdiction-specific overrides configured.
              </li>
            ) : null}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Active Rules
          </h2>
          <span className="text-xs text-slate-500">
            {settings.rules.length} total
          </span>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-800/60">
          <div className="grid grid-cols-[1.1fr,0.9fr,0.5fr,0.6fr] gap-6 border-b border-slate-800/60 bg-slate-900/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <span>Rule</span>
            <span>Description</span>
            <span>Weight</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-slate-800/60 text-sm">
            {settings.rules.map((rule) => (
              <div
                key={rule.id}
                className="grid grid-cols-[1.1fr,0.9fr,0.5fr,0.6fr] items-start gap-6 px-6 py-4"
              >
                <div>
                  <p className="text-base font-semibold text-slate-100">
                    {rule.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Category: {rule.category.toUpperCase()}
                  </p>
                </div>
                <p className="text-xs text-slate-400">{rule.description}</p>
                <p className="text-base font-semibold text-slate-100">
                  {rule.riskWeight}
                </p>
                <span
                  className={[
                    "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
                    rule.enabled
                      ? "bg-emerald-500/20 text-emerald-100"
                      : "bg-slate-700/40 text-slate-200",
                  ].join(" ")}
                >
                  {rule.enabled ? "Active" : "Paused"}
                </span>
              </div>
            ))}
            {settings.rules.length === 0 ? (
              <div className="px-6 py-4 text-sm text-slate-400">
                No rules configured.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

