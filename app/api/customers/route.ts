import { NextRequest, NextResponse } from "next/server";

import { listCustomers } from "@/lib/mockStore";
import type { CustomerFilter, KycStatus, RiskLevel } from "@/types/kyc";

export const dynamic = "force-dynamic";

const riskLevels: RiskLevel[] = ["low", "moderate", "high", "critical"];
const kycStatuses: KycStatus[] = [
  "pending",
  "in_review",
  "approved",
  "rejected",
  "monitoring",
];

const parseMultiValue = (params: URLSearchParams, key: string) => {
  const values = params.getAll(key);
  if (values.length > 0) {
    return values.flatMap((value) =>
      value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean),
    );
  }

  const single = params.get(key);
  return single
    ? single
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];
};

const intersect = <T extends string>(allowed: T[], values: string[]) =>
  values.filter((value): value is T => allowed.includes(value as T));

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;

  const filter: CustomerFilter = {
    search: searchParams.get("search") ?? undefined,
    risk: intersect(riskLevels, parseMultiValue(searchParams, "risk")),
    status: intersect(kycStatuses, parseMultiValue(searchParams, "status")),
    jurisdiction: parseMultiValue(searchParams, "jurisdiction"),
    tags: parseMultiValue(searchParams, "tag"),
    analyst: parseMultiValue(searchParams, "analyst"),
  };

  try {
    const customers = listCustomers(filter);
    return NextResponse.json(
      {
        data: customers,
        meta: {
          count: customers.length,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to list customers", error);
    return NextResponse.json(
      { error: "Unable to retrieve customers." },
      { status: 500 },
    );
  }
}

