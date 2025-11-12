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
      <header className="flex flex-col gap-3 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
          Overview
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">
            Live screening operations
          </h1>
          <p className="text-sm leading-6 text-foreground/80">
            Monitor customer risk posture, outstanding escalations, and the
            ruleset driving real-time transaction decisions.
          </p>
        </div>
        <p className="text-xs text-muted">
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
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
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
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Risk Trend (10-day)
            </h2>
            <span className="text-xs text-muted">
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
                  <div className="flex h-40 w-full items-end rounded-full bg-surface">
                    <div
                      className="w-full rounded-full bg-gradient-to-t from-accent/90 via-accent/80 to-teal-300/70 shadow-[0_12px_35px_-16px_rgba(5,150,105,0.4)] [data-theme='dark']:shadow-[0_12px_35px_-16px_rgba(45,212,191,0.65)] transition will-change-transform hover:scale-[1.02]"
                      style={{ height }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted">
                    {point.label}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {point.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Top Jurisdictions
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {snapshot.topJurisdictions.map((item) => (
              <li
                key={item.isoCode}
                className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground">
                    {item.country}
                  </span>
                  <RiskBadge level={item.risk} />
                </div>
                <span className="text-base font-semibold text-foreground">
                  {item.customers}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Escalation Queue
            </h2>
            <span className="text-xs text-muted">
              {snapshot.alertQueue.length} open cases
            </span>
          </div>
          <div className="mt-4 divide-y divide-border text-sm">
            {snapshot.alertQueue.map((alert) => (
              <div
                key={alert.id}
                className="grid gap-2 py-4 sm:grid-cols-[1.4fr,1fr,0.6fr]"
              >
                <div>
                  <p className="font-semibold text-foreground">{alert.summary}</p>
                  <p className="text-xs text-muted">
                    Queue: {alert.queue.toUpperCase()}
                  </p>
                </div>
                <div className="space-y-1 text-xs text-muted">
                  <p>
                    Customer: <span className="text-foreground">{alert.customerId}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    Status: <StatusBadge status={alert.status} />
                  </p>
                </div>
                <div className="text-xs text-right text-muted">
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
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Recent Transactions
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {snapshot.recentTransactions.map((transaction) => {
              const formatter = currencyFormatter(transaction.currency);
              return (
                <li
                  key={transaction.id}
                  className="flex flex-col gap-1 rounded-2xl border border-border bg-surface px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                      {transaction.reference}
                    </span>
                    <StatusBadge status={transaction.screening.status} />
                  </div>
                  <div className="flex items-center justify-between text-foreground">
                    <span className="text-base font-semibold">
                      {formatter.format(transaction.amount)}
                    </span>
                    <span className="text-xs text-muted">
                      {transaction.counterparty} · {transaction.counterpartyCountry}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted">
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

