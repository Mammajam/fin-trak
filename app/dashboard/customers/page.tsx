import Link from "next/link";

import { RiskBadge, StatusBadge } from "@/app/dashboard/components/status-badge";
import { listCustomers } from "@/lib/mockStore";
import type { CustomerListEntry } from "@/types/kyc";

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatDate = (value: string) =>
  new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

export default async function CustomersPage() {
  const customers = listCustomers();

  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
          Customers
        </p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">
              Customer screenings & monitoring
            </h1>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              Review onboarding status, risk posture, and alert load for every
              customer. Upgrade to the API to automate case routing and analyst SLA
              tracking.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card px-5 py-4 text-xs text-muted">
            <p className="font-semibold uppercase tracking-[0.18em] text-accent">
              Snapshot
            </p>
            <p>Active records: {numberFormatter.format(customers.length)}</p>
            <p>
              High risk:{" "}
              {
                customers.filter((customer) =>
                  ["high", "critical"].includes(customer.riskRating),
                ).length
              }
            </p>
            <p>
              Pending review:{" "}
              {
                customers.filter((customer) =>
                  ["pending", "in_review"].includes(customer.kycStatus),
                ).length
              }
            </p>
          </div>
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-border">
        <div className="grid grid-cols-[1.6fr,0.9fr,0.7fr,0.7fr,0.7fr] gap-6 border-b border-border bg-surface px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <span>Customer</span>
          <span>Risk</span>
          <span>KYC Status</span>
          <span>Alerts</span>
          <span>30d Volume</span>
        </div>
        <div className="divide-y divide-border">
          {customers.map((customer: CustomerListEntry) => (
            <div
              key={customer.id}
              className="grid grid-cols-[1.6fr,0.9fr,0.7fr,0.7fr,0.7fr] items-center gap-6 px-6 py-5 text-sm transition hover:bg-surface"
            >
              <div className="space-y-1 text-sm">
                <Link
                  href={`/dashboard/customers/${customer.id}`}
                  className="text-base font-semibold text-foreground transition hover:text-accent"
                >
                  {customer.fullName}
                </Link>
                <div className="text-xs text-muted">
                  <span>{customer.referenceId}</span> ·{" "}
                  <span>{customer.jurisdiction}</span>
                </div>
                <div className="text-xs text-muted">
                  Last screened: {formatDate(customer.lastScreenedAt)}
                </div>
              </div>
              <div>
                <RiskBadge level={customer.riskRating} />
              </div>
              <div>
                <StatusBadge status={customer.kycStatus} />
              </div>
              <div className="text-sm text-foreground">
                {customer.outstandingAlerts > 0 ? (
                  <span className="font-semibold text-amber-200">
                    {customer.outstandingAlerts} open
                  </span>
                ) : (
                  <span className="text-muted">None</span>
                )}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {moneyFormatter.format(customer.totalVolume30d)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

