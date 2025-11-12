import Link from "next/link";
import { notFound } from "next/navigation";

import { RiskBadge, StatusBadge } from "@/app/dashboard/components/status-badge";
import { getCustomerSnapshot } from "@/lib/mockStore";

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDate = (value: string | undefined) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const currencyFormat = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

export default async function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const snapshot = getCustomerSnapshot(params.id);
  if (!snapshot) {
    notFound();
  }

  const latestScreening = snapshot.screenings[0];
  const totalTransactions = snapshot.transactions.length;
  const totalVolume = snapshot.transactions.reduce(
    (acc, transaction) => acc + Math.abs(transaction.amount),
    0,
  );
  const latestTransaction = snapshot.transactions[0];

  return (
    <div className="space-y-8">
      <Link
        href="/dashboard/customers"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted transition hover:text-accent"
      >
        ← All customers
      </Link>

      <header className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Customer Profile
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            {snapshot.customer.fullName}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs text-muted">
            <span>Reference: {snapshot.customer.referenceId}</span>
            <span>•</span>
            <span>{snapshot.customer.jurisdiction}</span>
            <span>•</span>
            <span>Segment: {snapshot.customer.segment.toUpperCase()}</span>
            <span>•</span>
            <span>Analyst: {snapshot.customer.assignedAnalyst}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <RiskBadge
              level={snapshot.customer.riskRating}
              label={`Risk · ${snapshot.customer.riskRating.toUpperCase()}`}
            />
            <StatusBadge
              status={snapshot.customer.kycStatus}
              label={`KYC · ${snapshot.customer.kycStatus.replace("_", " ").toUpperCase()}`}
            />
            <StatusBadge
              status={snapshot.customer.watchlistStatus}
              label={`Watchlist · ${snapshot.customer.watchlistStatus.replace("_", " ").toUpperCase()}`}
            />
          </div>
        </div>
        <div className="space-y-3 text-sm text-foreground/80">
          <div className="rounded-2xl border border-accent/60 bg-accent/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Latest Screening
            </p>
            {latestScreening ? (
              <div className="mt-2 space-y-1 text-xs">
                <p>
                  Type: <span className="text-foreground">{latestScreening.type.toUpperCase()}</span>
                </p>
                <p className="flex items-center gap-2">
                  Status: <StatusBadge status={latestScreening.status} />
                </p>
                <p>Score: {latestScreening.riskScore}</p>
                <p>Run at: {formatDateTime(latestScreening.runAt)}</p>
              </div>
            ) : (
              <p className="text-xs text-muted">No screenings recorded.</p>
            )}
          </div>
          <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-muted">
            <p>Created: {formatDate(snapshot.customer.createdAt)}</p>
            <p>Last update: {formatDateTime(snapshot.customer.updatedAt)}</p>
            <p>Review cadence: {snapshot.customer.reviewCadence}</p>
            <p>Tags: {snapshot.customer.tags.join(", ")}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Documentation
          </h2>
          <ul className="mt-4 space-y-3 text-xs">
            {snapshot.documents.map((document) => (
              <li
                key={document.id}
                className="space-y-1 rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <p className="text-sm font-semibold text-foreground">
                  {document.type.replace("_", " ")}
                </p>
                <p className="text-muted">Reference: {document.referenceNumber}</p>
                <p className="flex items-center gap-2 text-muted">
                  Status: <StatusBadge status={document.status} />
                </p>
                <p className="text-muted">
                  Verified: {formatDate(document.verifiedAt)}
                </p>
              </li>
            ))}
            {snapshot.documents.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-border px-4 py-3 text-muted">
                No documents uploaded.
              </li>
            ) : null}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Counterparty Relationships
          </h2>
          <ul className="mt-4 space-y-3 text-xs">
            {snapshot.relationships.map((relationship) => (
              <li
                key={relationship.id}
                className="rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <p className="text-sm font-semibold text-foreground">
                  {relationship.entityName}
                </p>
                <p className="text-muted">
                  Role: {relationship.role.replace("_", " ")} · Jurisdiction:{" "}
                  {relationship.jurisdiction}
                </p>
                <p className="flex items-center gap-2 text-muted">
                  Risk: <RiskBadge level={relationship.risk} />
                </p>
                {relationship.ownershipPercentage ? (
                  <p className="text-muted">
                    Ownership: {relationship.ownershipPercentage}%
                  </p>
                ) : null}
                {relationship.notes ? (
                  <p className="text-muted">Notes: {relationship.notes}</p>
                ) : null}
              </li>
            ))}
            {snapshot.relationships.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-border px-4 py-3 text-muted">
                No related parties registered.
              </li>
            ) : null}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Risk Summary
          </h2>
          <div className="mt-4 space-y-3 text-xs text-foreground/80">
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-muted">Outstanding alerts</p>
              <p className="text-2xl font-semibold text-amber-200">
                {
                  snapshot.alerts.filter((alert) => alert.status !== "clear")
                    .length
                }
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-muted">Transactions observed</p>
              <p className="text-2xl font-semibold text-foreground">
                {totalTransactions}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-muted">Aggregate volume</p>
              <p className="text-2xl font-semibold text-foreground">
                {currencyFormat(
                  totalVolume,
                  latestTransaction?.currency ?? "USD",
                )}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-muted">Last transaction</p>
              <p className="text-sm text-foreground">
                {latestTransaction
                  ? `${currencyFormat(
                      latestTransaction.amount,
                      latestTransaction.currency,
                    )} → ${latestTransaction.counterparty} (${latestTransaction.counterpartyCountry})`
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Screening History
          </h2>
          <span className="text-xs text-muted">
            {snapshot.screenings.length} records
          </span>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border">
          <div className="grid grid-cols-[0.7fr,0.7fr,1fr,0.9fr] gap-6 border-b border-border bg-surface px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            <span>Type</span>
            <span>Status</span>
            <span>Notes</span>
            <span>Run</span>
          </div>
          <div className="divide-y divide-border text-sm">
            {snapshot.screenings.map((screening) => (
              <div
                key={screening.id}
                className="grid grid-cols-[0.7fr,0.7fr,1fr,0.9fr] items-start gap-6 px-6 py-4"
              >
                <span className="text-foreground">{screening.type}</span>
                <StatusBadge status={screening.status} />
                <span className="text-xs text-muted">
                  {screening.notes ?? "—"}
                </span>
                <div className="text-xs text-muted">
                  <p>{formatDateTime(screening.runAt)}</p>
                  <p>By: {screening.runBy}</p>
                  <p>Score: {screening.riskScore}</p>
                </div>
              </div>
            ))}
            {snapshot.screenings.length === 0 ? (
              <div className="px-6 py-4 text-sm text-muted">
                No screening records available.
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Recent Transactions
          </h2>
          <span className="text-xs text-muted">
            {snapshot.transactions.length} recorded
          </span>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border">
          <div className="grid grid-cols-[1.1fr,0.8fr,0.8fr,0.7fr] gap-6 border-b border-border bg-surface px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            <span>Reference</span>
            <span>Counterparty</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-border text-sm">
            {snapshot.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-[1.1fr,0.8fr,0.8fr,0.7fr] items-center gap-6 px-6 py-4"
              >
                <div>
                  <p className="text-foreground">{transaction.reference}</p>
                  <p className="text-xs text-muted">
                    {transaction.direction.toUpperCase()} ·{" "}
                    {transaction.channel.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted">
                    {formatDateTime(transaction.occurredAt)}
                  </p>
                </div>
                <div className="text-xs text-muted">
                  <p className="text-sm text-foreground">
                    {transaction.counterparty}
                  </p>
                  <p>{transaction.counterpartyCountry}</p>
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {currencyFormat(transaction.amount, transaction.currency)}
                </div>
                <div className="space-y-1 text-xs text-muted">
                  <StatusBadge status={transaction.screening.status} />
                  <p>
                    Rules:{" "}
                    {transaction.screening.triggeredRules.length > 0
                      ? transaction.screening.triggeredRules.join(", ")
                      : "None"}
                  </p>
                  <p>Score: {transaction.screening.riskScore}</p>
                </div>
              </div>
            ))}
            {snapshot.transactions.length === 0 ? (
              <div className="px-6 py-4 text-sm text-muted">
                No transactions recorded.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

