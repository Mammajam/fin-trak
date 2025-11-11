import { randomUUID } from "crypto";

import {
  ComplianceAlert,
  Customer,
  CustomerDocument,
  CustomerFilter,
  CustomerListEntry,
  CustomerRelationship,
  CustomerSnapshot,
  DashboardSnapshot,
  DecisionStatus,
  JurisdictionRisk,
  NewScreeningInput,
  NewTransactionInput,
  RiskLevel,
  RiskSettings,
  RiskSettingsPatch,
  ScreeningResult,
  TrendPoint,
  Transaction,
  TransactionScreening,
} from "@/types/kyc";

const riskOrder: RiskLevel[] = ["low", "moderate", "high", "critical"];
const decisionOrder: DecisionStatus[] = [
  "clear",
  "requires_review",
  "escalated",
  "blocked",
];

const clone = <T>(value: T): T =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : (JSON.parse(JSON.stringify(value)) as T);

const customers = new Map<string, Customer>([
  [
    "cust-001",
    {
      id: "cust-001",
      referenceId: "AEG-245781",
      fullName: "Lina Patel",
      legalEntityType: "individual",
      email: "lina.patel@aegiswallet.com",
      phone: "+1-917-555-0115",
      dateOfBirth: "1987-04-23",
      jurisdiction: "United States",
      countryCode: "US",
      segment: "retail",
      industry: "Digital Wallet",
      kycStatus: "monitoring",
      riskRating: "moderate",
      pepFlag: false,
      watchlistStatus: "clear",
      createdAt: "2025-01-12T10:15:00.000Z",
      updatedAt: "2025-11-08T09:35:00.000Z",
      lastScreenedAt: "2025-11-10T14:22:00.000Z",
      assignedAnalyst: "Daniel Chen",
      reviewCadence: "90d",
      tags: ["wallet", "high-volume"],
      preferredLanguage: "en-US",
    },
  ],
  [
    "cust-002",
    {
      id: "cust-002",
      referenceId: "AEG-193645",
      fullName: "Marcus Abebe",
      legalEntityType: "individual",
      email: "marcus.abebe@panora.io",
      phone: "+234-1-555-0042",
      dateOfBirth: "1991-09-14",
      jurisdiction: "Nigeria",
      countryCode: "NG",
      segment: "fintech",
      industry: "Cross-Border Payments",
      kycStatus: "in_review",
      riskRating: "high",
      pepFlag: true,
      watchlistStatus: "requires_review",
      createdAt: "2025-03-22T08:40:00.000Z",
      updatedAt: "2025-11-10T16:12:00.000Z",
      lastScreenedAt: "2025-11-10T16:10:00.000Z",
      assignedAnalyst: "Sophia Martins",
      reviewCadence: "30d",
      tags: ["cross-border", "pep"],
    },
  ],
  [
    "cust-003",
    {
      id: "cust-003",
      referenceId: "AEG-678512",
      fullName: "Emerald Capital Partners",
      legalEntityType: "business",
      email: "compliance@emeraldcap.co.uk",
      phone: "+44-20-7946-0020",
      incorporationDate: "2016-06-01",
      jurisdiction: "United Kingdom",
      countryCode: "GB",
      segment: "enterprise",
      industry: "Private Equity",
      kycStatus: "approved",
      riskRating: "moderate",
      pepFlag: false,
      watchlistStatus: "clear",
      createdAt: "2024-12-02T13:05:00.000Z",
      updatedAt: "2025-11-09T11:15:00.000Z",
      lastScreenedAt: "2025-11-09T11:05:00.000Z",
      assignedAnalyst: "Javier Ortega",
      reviewCadence: "180d",
      tags: ["funds", "enhanced-due-diligence"],
      preferredLanguage: "en-GB",
    },
  ],
  [
    "cust-004",
    {
      id: "cust-004",
      referenceId: "AEG-992304",
      fullName: "LatAm Remit Express",
      legalEntityType: "business",
      email: "ops@latamremit.express",
      phone: "+52-55-1234-7788",
      incorporationDate: "2019-03-11",
      jurisdiction: "Mexico",
      countryCode: "MX",
      segment: "sme",
      industry: "Remittance",
      kycStatus: "monitoring",
      riskRating: "critical",
      pepFlag: true,
      watchlistStatus: "escalated",
      createdAt: "2025-05-18T18:10:00.000Z",
      updatedAt: "2025-11-10T21:45:00.000Z",
      lastScreenedAt: "2025-11-10T21:30:00.000Z",
      assignedAnalyst: "Nora Singh",
      reviewCadence: "30d",
      tags: ["high-risk", "corridor"],
    },
  ],
]);

const documents: CustomerDocument[] = [
  {
    id: "doc-001",
    customerId: "cust-001",
    type: "passport",
    issuingCountry: "US",
    referenceNumber: "550211947",
    status: "clear",
    verifiedAt: "2025-01-12T11:00:00.000Z",
    reviewer: "Daniel Chen",
  },
  {
    id: "doc-002",
    customerId: "cust-003",
    type: "business_registration",
    issuingCountry: "GB",
    referenceNumber: "COMP-0457811",
    status: "clear",
    verifiedAt: "2024-12-05T10:00:00.000Z",
    reviewer: "Javier Ortega",
  },
  {
    id: "doc-003",
    customerId: "cust-004",
    type: "business_registration",
    issuingCountry: "MX",
    referenceNumber: "RFC-LR990112",
    status: "requires_review",
    verifiedAt: "2025-05-19T09:45:00.000Z",
    reviewer: "Nora Singh",
  },
];

const relationships: CustomerRelationship[] = [
  {
    id: "rel-001",
    customerId: "cust-003",
    entityName: "James Olukoya",
    role: "beneficial_owner",
    jurisdiction: "Nigeria",
    risk: "high",
    ownershipPercentage: 28,
  },
  {
    id: "rel-002",
    customerId: "cust-004",
    entityName: "Sofía Márquez",
    role: "authorized_signer",
    jurisdiction: "Mexico",
    risk: "moderate",
  },
  {
    id: "rel-003",
    customerId: "cust-002",
    entityName: "Panora Labs Ltd.",
    role: "related_account",
    jurisdiction: "United Kingdom",
    risk: "high",
  },
];

const screenings: ScreeningResult[] = [
  {
    id: "scr-001",
    customerId: "cust-001",
    type: "ongoing",
    runAt: "2025-11-10T14:22:00.000Z",
    runBy: "Automated Screening",
    status: "clear",
    riskScore: 18,
    notes: "No new watchlist matches detected.",
    hits: [],
  },
  {
    id: "scr-002",
    customerId: "cust-002",
    type: "kyc",
    runAt: "2025-11-10T16:10:00.000Z",
    runBy: "Sophia Martins",
    status: "requires_review",
    riskScore: 72,
    notes: "Potential match to PEP database. Awaiting secondary verification.",
    hits: [
      {
        id: "hit-001",
        list: "World-Check",
        matchName: "Marcus Abebe",
        category: "pep",
        confidence: 0.78,
        risk: "high",
        url: "https://demo.watchlist.provider/marcus-abebe",
      },
    ],
  },
  {
    id: "scr-003",
    customerId: "cust-004",
    type: "ongoing",
    runAt: "2025-11-10T21:30:00.000Z",
    runBy: "Automated Screening",
    status: "escalated",
    riskScore: 89,
    notes:
      "Multiple large-value wires to sanctioned jurisdictions detected in the last 24h.",
    hits: [
      {
        id: "hit-002",
        list: "OFAC SDN",
        matchName: "LatAm Logistics Holdings",
        category: "sanctions",
        confidence: 0.64,
        risk: "critical",
      },
      {
        id: "hit-003",
        list: "Negative Media - Global",
        matchName: "LatAm Remit Express",
        category: "adverse_media",
        confidence: 0.82,
        risk: "high",
      },
    ],
  },
  {
    id: "scr-004",
    customerId: "cust-003",
    type: "ongoing",
    runAt: "2025-11-09T11:05:00.000Z",
    runBy: "Automated Screening",
    status: "clear",
    riskScore: 24,
    hits: [],
  },
];

const transactions: Transaction[] = [
  {
    id: "txn-1001",
    customerId: "cust-001",
    reference: "WALLET-66781",
    amount: 15250,
    currency: "USD",
    counterparty: "Velocity Ventures",
    counterpartyCountry: "US",
    channel: "wire",
    direction: "credit",
    occurredAt: "2025-11-10T12:05:00.000Z",
    screening: {
      status: "clear",
      riskScore: 12,
      triggeredRules: [],
    },
  },
  {
    id: "txn-1002",
    customerId: "cust-002",
    reference: "PAN-OUT-994",
    amount: 48000,
    currency: "USD",
    counterparty: "Riverside Commodities",
    counterpartyCountry: "AE",
    channel: "wire",
    direction: "debit",
    occurredAt: "2025-11-10T14:50:00.000Z",
    screening: {
      status: "requires_review",
      riskScore: 68,
      triggeredRules: ["high-value-outbound", "jurisdiction-watchlist"],
      analyst: "Sophia Martins",
    },
  },
  {
    id: "txn-1003",
    customerId: "cust-004",
    reference: "LR-CRT-208",
    amount: 125000,
    currency: "USD",
    counterparty: "Andes Transfer LLP",
    counterpartyCountry: "VE",
    channel: "wire",
    direction: "debit",
    occurredAt: "2025-11-10T19:25:00.000Z",
    screening: {
      status: "escalated",
      riskScore: 91,
      triggeredRules: [
        "sanctioned-counterparty",
        "high-value-outbound",
        "rapid-sequence-wires",
      ],
      analyst: "Nora Singh",
      notes: "Escalated to Tier 2 for urgent review.",
    },
  },
  {
    id: "txn-1004",
    customerId: "cust-003",
    reference: "EMP-FUND-311",
    amount: 780000,
    currency: "GBP",
    counterparty: "GreenLine Asset Custody",
    counterpartyCountry: "GB",
    channel: "wire",
    direction: "debit",
    occurredAt: "2025-11-09T15:40:00.000Z",
    screening: {
      status: "clear",
      riskScore: 21,
      triggeredRules: ["high-value-outbound"],
    },
  },
  {
    id: "txn-1005",
    customerId: "cust-002",
    reference: "PAN-IN-774",
    amount: 9600,
    currency: "USD",
    counterparty: "StratoPay LLC",
    counterpartyCountry: "US",
    channel: "ach",
    direction: "credit",
    occurredAt: "2025-11-09T09:05:00.000Z",
    screening: {
      status: "clear",
      riskScore: 18,
      triggeredRules: [],
    },
  },
  {
    id: "txn-1006",
    customerId: "cust-004",
    reference: "LR-ACH-102",
    amount: 5500,
    currency: "USD",
    counterparty: "Remesa Facil SA",
    counterpartyCountry: "MX",
    channel: "ach",
    direction: "credit",
    occurredAt: "2025-11-08T20:10:00.000Z",
    screening: {
      status: "requires_review",
      riskScore: 55,
      triggeredRules: ["rapid-sequence-wires"],
    },
  },
];

const alerts: ComplianceAlert[] = [
  {
    id: "alert-001",
    customerId: "cust-002",
    type: "watchlist",
    summary: "Possible PEP match awaiting secondary verification.",
    createdAt: "2025-11-10T16:12:00.000Z",
    status: "requires_review",
    risk: "high",
    queue: "tier_1",
  },
  {
    id: "alert-002",
    customerId: "cust-004",
    type: "transaction",
    summary:
      "High-value outbound wires to sanctioned jurisdictions detected (3 in 12h).",
    createdAt: "2025-11-10T21:35:00.000Z",
    status: "escalated",
    risk: "critical",
    queue: "tier_2",
  },
  {
    id: "alert-003",
    customerId: "cust-004",
    type: "profile",
    summary: "Beneficial owner match on OFAC consolidated list.",
    createdAt: "2025-11-09T18:15:00.000Z",
    status: "escalated",
    risk: "high",
    queue: "tier_3",
  },
];

let riskSettings: RiskSettings = {
  id: "default-risk-settings",
  updatedAt: "2025-11-10T15:00:00.000Z",
  updatedBy: "Laura King",
  transactionThresholds: {
    highValueUsd: 25000,
    manualReviewUsd: 10000,
    dailyVolumeUsd: 150000,
  },
  screeningParameters: {
    pepSensitivity: "enhanced",
    adverseMediaCoverage: "expanded",
    sanctionsAutoBlockScore: 85,
    transactionAutoBlockScore: 90,
  },
  jurisdictionOverrides: [
    {
      country: "Nigeria",
      isoCode: "NG",
      inherentRisk: "high",
      rationale: "FATF grey list; cross-border fintech corridor.",
    },
    {
      country: "Mexico",
      isoCode: "MX",
      inherentRisk: "high",
      rationale: "High remittance risk; ongoing sanctions concerns.",
    },
    {
      country: "United States",
      isoCode: "US",
      inherentRisk: "moderate",
      rationale: "Stable regulatory environment.",
    },
  ],
  rules: [
    {
      id: "rule-txn-001",
      name: "High-Value Outbound Wire",
      category: "transaction",
      description:
        "Flags outbound wires exceeding the configured high value threshold.",
      enabled: true,
      riskWeight: 25,
      severity: "high",
    },
    {
      id: "rule-watch-002",
      name: "PEP Potential Match",
      category: "watchlist",
      description:
        "Escalates customers with potential Politically Exposed Person matches.",
      enabled: true,
      riskWeight: 35,
      severity: "critical",
    },
    {
      id: "rule-customer-003",
      name: "High-Risk Jurisdiction",
      category: "customer",
      description:
        "Applies enhanced due diligence for customers operating in high-risk jurisdictions.",
      enabled: true,
      riskWeight: 20,
      severity: "moderate",
    },
  ],
};

const days = 10;
const riskTrend: TrendPoint[] = Array.from({ length: days }).map((_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - (days - 1 - index));
  const baseValue = 42 + index * 1.8;
  const seasonalAdjustment = Math.sin(index / 2) * 4;
  const value = Math.max(
    12,
    Math.round(baseValue + seasonalAdjustment + (index % 3 === 0 ? 8 : 0)),
  );

  return {
    date: date.toISOString(),
    value,
    label: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  };
});

const topJurisdictions = (): DashboardSnapshot["topJurisdictions"] => {
  const counts = new Map<string, { country: string; risk: RiskLevel; total: number }>();
  customers.forEach((customer) => {
    const previous = counts.get(customer.countryCode);
    const total = previous ? previous.total + 1 : 1;
    const risk =
      previous && riskOrder.indexOf(previous.risk) > riskOrder.indexOf(customer.riskRating)
        ? previous.risk
        : customer.riskRating;
    counts.set(customer.countryCode, {
      country: customer.jurisdiction,
      risk,
      total,
    });
  });

  return Array.from(counts.entries())
    .map(([isoCode, details]) => ({
      isoCode,
      country: details.country,
      customers: details.total,
      risk: details.risk,
    }))
    .sort((a, b) => b.customers - a.customers)
    .slice(0, 6);
};

const sortByRecency = <T extends { occurredAt?: string; createdAt?: string }>(
  records: T[],
) =>
  records.slice().sort((a, b) => {
    const aTime = new Date(a.occurredAt ?? a.createdAt ?? 0).getTime();
    const bTime = new Date(b.occurredAt ?? b.createdAt ?? 0).getTime();
    return bTime - aTime;
  });

const matchesSearch = (customer: Customer, term: string) => {
  const target = term.trim().toLowerCase();
  if (!target) return true;
  return [
    customer.fullName,
    customer.referenceId,
    customer.email,
    customer.jurisdiction,
  ]
    .filter(Boolean)
    .some((value) => value!.toLowerCase().includes(target));
};

const withinHours = (timestamp: string, hours: number) => {
  const now = Date.now();
  const delta = now - new Date(timestamp).getTime();
  return delta <= hours * 60 * 60 * 1000;
};

const calculateVolume = (customerId: string, days: number) => {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return transactions
    .filter((transaction) => transaction.customerId === customerId)
    .filter((transaction) => new Date(transaction.occurredAt).getTime() >= cutoff)
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);
};

const countTransactionsWithin = (customerId: string, hours: number) =>
  transactions
    .filter((transaction) => transaction.customerId === customerId)
    .filter((transaction) => withinHours(transaction.occurredAt, hours)).length;

const riskRank = (risk: RiskLevel) => riskOrder.indexOf(risk);

export const listCustomers = (
  filter: CustomerFilter = {},
): CustomerListEntry[] => {
  const base = Array.from(customers.values()).filter((customer) => {
    const matchesRisk =
      !filter.risk || filter.risk.length === 0 || filter.risk.includes(customer.riskRating);
    const matchesStatus =
      !filter.status ||
      filter.status.length === 0 ||
      filter.status.includes(customer.kycStatus);
    const matchesJurisdiction =
      !filter.jurisdiction ||
      filter.jurisdiction.length === 0 ||
      filter.jurisdiction.includes(customer.countryCode);
    const matchesTags =
      !filter.tags ||
      filter.tags.length === 0 ||
      filter.tags.some((tag) => customer.tags.includes(tag));
    const matchesAnalyst =
      !filter.analyst ||
      filter.analyst.length === 0 ||
      filter.analyst.includes(customer.assignedAnalyst);

    return (
      matchesRisk &&
      matchesStatus &&
      matchesJurisdiction &&
      matchesTags &&
      matchesAnalyst &&
      matchesSearch(customer, filter.search ?? "")
    );
  });

  const enriched: CustomerListEntry[] = base.map((customer) => {
    const customerAlerts = alerts
      .filter(
        (alert) => alert.customerId === customer.id && alert.status !== "clear",
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    return {
      ...customer,
      outstandingAlerts: customerAlerts.length,
      lastAlertAt: customerAlerts[0]?.createdAt,
      transactions24h: countTransactionsWithin(customer.id, 24),
      totalVolume30d: calculateVolume(customer.id, 30),
    };
  });

  return enriched.sort((a, b) => {
    const riskComparison = riskRank(b.riskRating) - riskRank(a.riskRating);
    if (riskComparison !== 0) {
      return riskComparison;
    }
    const alertsComparison = b.outstandingAlerts - a.outstandingAlerts;
    if (alertsComparison !== 0) {
      return alertsComparison;
    }
    const dateComparison =
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return a.fullName.localeCompare(b.fullName);
  });
};

export const getCustomerById = (id: string) => customers.get(id);

export const getCustomerSnapshot = (id: string): CustomerSnapshot | undefined => {
  const customer = customers.get(id);
  if (!customer) return undefined;

  const customerDocuments = documents.filter(
    (document) => document.customerId === id,
  );

  const customerRelationships = relationships.filter(
    (relationship) => relationship.customerId === id,
  );

  const customerScreenings = screenings.filter(
    (screening) => screening.customerId === id,
  );

  const customerAlerts = alerts.filter((alert) => alert.customerId === id);

  const customerTransactions = transactions.filter(
    (transaction) => transaction.customerId === id,
  );

  return {
    customer: clone(customer),
    documents: clone(customerDocuments),
    relationships: clone(customerRelationships),
    screenings: clone(customerScreenings),
    alerts: clone(customerAlerts),
    transactions: clone(sortByRecency(customerTransactions)),
  };
};

export const getCustomerTransactions = (customerId: string) =>
  sortByRecency(
    transactions.filter((transaction) => transaction.customerId === customerId),
  );

const ensureTransactionScreening = (
  customerId: string,
  screening?: Partial<TransactionScreening>,
): TransactionScreening => {
  const defaultStatus: TransactionScreening = {
    status: "clear",
    riskScore: 10,
    triggeredRules: [],
  };

  const combined = { ...defaultStatus, ...screening };

  if (!decisionOrder.includes(combined.status)) {
    throw new Error(
      `Unsupported screening status "${combined.status}" for customer "${customerId}".`,
    );
  }

  return combined;
};

export const appendTransaction = (
  customerId: string,
  input: NewTransactionInput,
): Transaction => {
  const customer = customers.get(customerId);
  if (!customer) {
    throw new Error(`Customer "${customerId}" does not exist.`);
  }

  const transaction: Transaction = {
    id: randomUUID(),
    customerId,
    reference: input.reference ?? `GEN-${Date.now()}`,
    amount: input.amount,
    currency: input.currency,
    counterparty: input.counterparty,
    counterpartyCountry: input.counterpartyCountry,
    channel: input.channel,
    direction: input.direction,
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    screening: ensureTransactionScreening(customerId, input.screening),
  };

  transactions.unshift(transaction);
  customer.updatedAt = new Date().toISOString();

  if (
    ["requires_review", "escalated", "blocked"].includes(transaction.screening.status)
  ) {
    alerts.unshift({
      id: randomUUID(),
      customerId,
      type: "transaction",
      summary: `Transaction ${transaction.reference} flagged (${transaction.screening.status}).`,
      createdAt: transaction.occurredAt,
      status: transaction.screening.status,
      risk: transaction.screening.riskScore >= 85 ? "critical" : "high",
      queue: "tier_1",
    });
  }

  return clone(transaction);
};

export const recordScreening = (
  customerId: string,
  input: NewScreeningInput,
): ScreeningResult => {
  const customer = customers.get(customerId);
  if (!customer) {
    throw new Error(`Customer "${customerId}" does not exist.`);
  }

  const screening: ScreeningResult = {
    id: randomUUID(),
    customerId,
    type: input.type,
    runBy: input.runBy,
    runAt: input.runAt ?? new Date().toISOString(),
    status: input.status,
    riskScore: input.riskScore,
    notes: input.notes,
    hits: input.hits ?? [],
  };

  screenings.unshift(screening);
  customer.lastScreenedAt = screening.runAt;
  customer.updatedAt = new Date().toISOString();
  customer.watchlistStatus = input.status;
  customer.riskRating =
    input.riskScore >= 85
      ? "critical"
      : input.riskScore >= 60
        ? "high"
        : input.riskScore >= 40
          ? "moderate"
          : "low";

  if (input.status !== "clear") {
    alerts.unshift({
      id: randomUUID(),
      customerId,
      type: input.type === "transaction" ? "transaction" : "watchlist",
      summary: `Screening ${screening.id} recorded with status ${input.status}.`,
      createdAt: screening.runAt,
      status: input.status,
      risk: customer.riskRating,
      queue: input.status === "escalated" ? "tier_2" : "tier_1",
    });
  }

  return clone(screening);
};

export const listAlerts = () =>
  alerts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

export const updateAlertStatus = (
  alertId: string,
  status: DecisionStatus,
  notes?: string,
) => {
  const alert = alerts.find((entry) => entry.id === alertId);
  if (!alert) {
    throw new Error(`Alert "${alertId}" does not exist.`);
  }

  alert.status = status;
  if (notes) {
    alert.summary = `${alert.summary} (${notes})`;
  }
};

export const getRiskSettings = () => clone(riskSettings);

export const updateRiskSettings = (patch: RiskSettingsPatch) => {
  riskSettings = {
    ...riskSettings,
    ...patch,
    screeningParameters: patch.screeningParameters
      ? {
          ...riskSettings.screeningParameters,
          ...patch.screeningParameters,
        }
      : riskSettings.screeningParameters,
    transactionThresholds: patch.transactionThresholds
      ? {
          ...riskSettings.transactionThresholds,
          ...patch.transactionThresholds,
        }
      : riskSettings.transactionThresholds,
    jurisdictionOverrides: patch.jurisdictionOverrides ?? riskSettings.jurisdictionOverrides,
    rules: patch.rules ?? riskSettings.rules,
    updatedBy: patch.updatedBy,
    updatedAt: new Date().toISOString(),
  };

  return clone(riskSettings);
};

const flaggedTransactionCount = (hours: number) =>
  transactions.filter(
    (transaction) =>
      withinHours(transaction.occurredAt, hours) &&
      ["requires_review", "escalated", "blocked"].includes(
        transaction.screening.status,
      ),
  ).length;

const openAlerts = () =>
  alerts.filter((alert) => alert.status !== "clear").length;

const pendingReviews = () =>
  Array.from(customers.values()).filter(
    (customer) => customer.kycStatus === "pending" || customer.kycStatus === "in_review",
  ).length;

const highRiskCustomers = () =>
  Array.from(customers.values()).filter((customer) =>
    ["high", "critical"].includes(customer.riskRating),
  ).length;

export const getDashboardSnapshot = (): DashboardSnapshot => {
  const metrics = {
    totalCustomers: customers.size,
    highRiskCustomers: highRiskCustomers(),
    pendingReviews: pendingReviews(),
    activeAlerts: openAlerts(),
    flaggedTransactions24h: flaggedTransactionCount(24),
    lastUpdated: new Date().toISOString(),
  };

  const recentTransactions = sortByRecency(transactions).slice(0, 8);

  return {
    metrics,
    riskTrend,
    alertQueue: listAlerts().slice(0, 10),
    topJurisdictions: topJurisdictions(),
    recentTransactions: clone(recentTransactions),
  };
};

export const getJurisdictionRisks = (): JurisdictionRisk[] =>
  clone(riskSettings.jurisdictionOverrides);


