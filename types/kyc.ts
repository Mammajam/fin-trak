export type RiskLevel = "low" | "moderate" | "high" | "critical";

export type KycStatus =
  | "pending"
  | "in_review"
  | "approved"
  | "rejected"
  | "monitoring";

export type DecisionStatus =
  | "clear"
  | "requires_review"
  | "escalated"
  | "blocked";

export type ScreeningType = "kyc" | "ongoing" | "transaction";

export type TransactionChannel = "wire" | "ach" | "card" | "crypto" | "cash";

export type TransactionDirection = "credit" | "debit";

export interface JurisdictionRisk {
  country: string;
  isoCode: string;
  inherentRisk: RiskLevel;
  rationale: string;
}

export interface Customer {
  id: string;
  referenceId: string;
  fullName: string;
  legalEntityType: "individual" | "business";
  email: string;
  phone: string;
  dateOfBirth?: string;
  incorporationDate?: string;
  jurisdiction: string;
  countryCode: string;
  segment: "retail" | "sme" | "enterprise" | "fintech";
  industry: string;
  kycStatus: KycStatus;
  riskRating: RiskLevel;
  pepFlag: boolean;
  watchlistStatus: DecisionStatus;
  createdAt: string;
  updatedAt: string;
  lastScreenedAt: string;
  assignedAnalyst: string;
  reviewCadence: "30d" | "60d" | "90d" | "180d";
  tags: string[];
  preferredLanguage?: string;
}

export interface CustomerDocument {
  id: string;
  customerId: string;
  type: "passport" | "national_id" | "utility_bill" | "business_registration";
  issuingCountry: string;
  referenceNumber: string;
  status: DecisionStatus;
  expiresAt?: string;
  verifiedAt?: string;
  reviewer?: string;
  notes?: string;
}

export interface CustomerRelationship {
  id: string;
  customerId: string;
  entityName: string;
  role: "beneficial_owner" | "director" | "related_account" | "authorized_signer";
  jurisdiction: string;
  risk: RiskLevel;
  ownershipPercentage?: number;
  notes?: string;
}

export interface WatchlistHit {
  id: string;
  list: string;
  matchName: string;
  category: "sanctions" | "pep" | "adverse_media" | "law_enforcement";
  confidence: number;
  risk: RiskLevel;
  url?: string;
}

export interface ScreeningResult {
  id: string;
  customerId: string;
  type: ScreeningType;
  runBy: string;
  runAt: string;
  status: DecisionStatus;
  riskScore: number;
  notes?: string;
  hits: WatchlistHit[];
}

export interface TransactionScreening {
  status: DecisionStatus;
  riskScore: number;
  triggeredRules: string[];
  analyst?: string;
  reviewedAt?: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  reference: string;
  amount: number;
  currency: string;
  counterparty: string;
  counterpartyCountry: string;
  channel: TransactionChannel;
  direction: TransactionDirection;
  occurredAt: string;
  screening: TransactionScreening;
}

export interface ComplianceAlert {
  id: string;
  customerId: string;
  type: "transaction" | "profile" | "watchlist";
  summary: string;
  createdAt: string;
  status: DecisionStatus;
  risk: RiskLevel;
  queue: "tier_1" | "tier_2" | "tier_3";
}

export interface RiskRule {
  id: string;
  name: string;
  category: "transaction" | "customer" | "watchlist";
  description: string;
  enabled: boolean;
  riskWeight: number;
  severity: RiskLevel;
}

export interface RiskSettings {
  id: string;
  updatedAt: string;
  updatedBy: string;
  transactionThresholds: {
    highValueUsd: number;
    manualReviewUsd: number;
    dailyVolumeUsd: number;
  };
  screeningParameters: {
    pepSensitivity: "standard" | "enhanced";
    adverseMediaCoverage: "basic" | "expanded";
    sanctionsAutoBlockScore: number;
    transactionAutoBlockScore: number;
  };
  jurisdictionOverrides: JurisdictionRisk[];
  rules: RiskRule[];
}

export interface CustomerSnapshot {
  customer: Customer;
  documents: CustomerDocument[];
  relationships: CustomerRelationship[];
  screenings: ScreeningResult[];
  alerts: ComplianceAlert[];
  transactions: Transaction[];
}

export interface CustomerListEntry extends Customer {
  outstandingAlerts: number;
  lastAlertAt?: string;
  transactions24h: number;
  totalVolume30d: number;
}

export interface CustomerFilter {
  search?: string;
  risk?: RiskLevel[];
  status?: KycStatus[];
  jurisdiction?: string[];
  tags?: string[];
  analyst?: string[];
}

export interface TrendPoint {
  date: string;
  value: number;
  label?: string;
}

export interface DashboardMetrics {
  totalCustomers: number;
  highRiskCustomers: number;
  pendingReviews: number;
  activeAlerts: number;
  flaggedTransactions24h: number;
  lastUpdated: string;
}

export interface DashboardSnapshot {
  metrics: DashboardMetrics;
  riskTrend: TrendPoint[];
  alertQueue: ComplianceAlert[];
  topJurisdictions: Array<{
    isoCode: string;
    country: string;
    customers: number;
    risk: RiskLevel;
  }>;
  recentTransactions: Transaction[];
}

export interface NewTransactionInput {
  reference?: string;
  amount: number;
  currency: string;
  counterparty: string;
  counterpartyCountry: string;
  channel: TransactionChannel;
  direction: TransactionDirection;
  occurredAt?: string;
  screening?: Partial<TransactionScreening>;
}

export interface NewScreeningInput {
  type: ScreeningType;
  runBy: string;
  status: DecisionStatus;
  riskScore: number;
  notes?: string;
  hits?: WatchlistHit[];
  runAt?: string;
}

export type RiskSettingsPatch = Partial<Omit<RiskSettings, "id" | "updatedAt">> & {
  updatedBy: string;
};

