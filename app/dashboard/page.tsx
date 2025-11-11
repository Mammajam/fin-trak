import { MetricCard, type MetricTone } from "@/app/dashboard/components/metric-card";
import { RiskBadge, StatusBadge } from "@/app/dashboard/components/status-badge";
import { getDashboardSnapshot } from "@/lib/mockStore";

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const currencyFormatter = (currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

const formatMetricKey = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());

const metricConfig: Record<
  string,
  { tone: MetricTone; hint?: string }
> = {
  totalCustomers: {
    tone: "default",
    hint: "Profiles actively monitored across all segments.",
  },
  highRiskCustomers: {
    tone: "warning",
    hint: "Customers currently classified as high or critical risk.",
  },
  pendingReviews: {
    tone: "warning",
    hint: "Screenings awaiting analyst decisioning.",
  },
  activeAlerts: {
    tone: "danger",
    hint: "Alerts open across Tier 1-3 escalation queues.",
  },
  flaggedTransactions24h: {
    tone: "warning",
    hint: "Transactions requiring manual adjudication in the last day.",
  },
};

export default async function DashboardOverviewPage() {
  const snapshot = getDashboardSnapshot();
  const metricsEntries = Object.entries(snapshot.metrics).filter(
    ([key]) => key !== "lastUpdated",
  );
  const trendMax = Math.max(
    ...snapshot.riskTrend.map((point) => point.value),
    1,
  );

  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-3 border-b border-slate-800/70 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">
          Overview
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-50">
            Live screening operations
          </h1>
          <p className="text-sm leading-6 text-slate-300">
            Monitor customer risk posture, outstanding escalations, and the
            ruleset driving real-time transaction decisions.
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Last synced:{" "}
          {new Date(snapshot.metrics.lastUpdated).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
            day: "numeric",
          })}
        </p>
      </header>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          Compliance Health
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metricsEntries.map(([key, value]) => {
            const config = metricConfig[key] ?? { tone: "default" as MetricTone };
            return (
              <MetricCard
                key={key}
                title={formatMetricKey(key)}
                value={numberFormatter.format(value as number)}
                tone={config.tone}
                hint={config.hint}
              />
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr,0.65fr]">
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Risk Trend (10-day)
            </h2>
            <span className="text-xs text-slate-500">
              Peak index: {numberFormatter.format(trendMax)}
            </span>
          </div>
          <div className="mt-6 flex items-end gap-3 overflow-x-auto pb-4">
            {snapshot.riskTrend.map((point) => {
              const height = Math.max((point.value / trendMax) * 160, 12);
              return (
                <div
                  key={point.date}
                  className="flex w-12 flex-col items-center gap-2"
                >
                  <div className="flex h-40 w-full items-end rounded-full bg-slate-900/70">
                    <div
                      className="w-full rounded-full bg-gradient-to-t from-emerald-500/90 via-emerald-400/80 to-teal-300/70 shadow-[0_12px_35px_-16px_rgba(45,212,191,0.65)] transition will-change-transform hover:scale-[1.02]"
                      style={{ height }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    {point.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    {point.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Top Jurisdictions
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {snapshot.topJurisdictions.map((item) => (
              <li
                key={item.isoCode}
                className="flex items-center justify-between rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-3"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-slate-100">
                    {item.country}
                  </span>
                  <RiskBadge level={item.risk} />
                </div>
                <span className="text-base font-semibold text-slate-200">
                  {item.customers}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Escalation Queue
            </h2>
            <span className="text-xs text-slate-500">
              {snapshot.alertQueue.length} open cases
            </span>
          </div>
          <div className="mt-4 divide-y divide-slate-800/60 text-sm">
            {snapshot.alertQueue.map((alert) => (
              <div
                key={alert.id}
                className="grid gap-2 py-4 sm:grid-cols-[1.4fr,1fr,0.6fr]"
              >
                <div>
                  <p className="font-semibold text-slate-100">{alert.summary}</p>
                  <p className="text-xs text-slate-500">
                    Queue: {alert.queue.toUpperCase()}
                  </p>
                </div>
                <div className="space-y-1 text-xs text-slate-400">
                  <p>
                    Customer: <span className="text-slate-200">{alert.customerId}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    Status: <StatusBadge status={alert.status} />
                  </p>
                </div>
                <div className="text-xs text-right text-slate-500">
                  {new Date(alert.createdAt).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Recent Transactions
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {snapshot.recentTransactions.map((transaction) => {
              const formatter = currencyFormatter(transaction.currency);
              return (
                <li
                  key={transaction.id}
                  className="flex flex-col gap-1 rounded-2xl border border-slate-800/60 bg-slate-900/70 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {transaction.reference}
                    </span>
                    <StatusBadge status={transaction.screening.status} />
                  </div>
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="text-base font-semibold">
                      {formatter.format(transaction.amount)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {transaction.counterparty} · {transaction.counterpartyCountry}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Rules:{" "}
                      {transaction.screening.triggeredRules.length > 0
                        ? transaction.screening.triggeredRules.join(", ")
                        : "None"}
                    </span>
                    <span>
                      {new Date(transaction.occurredAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

