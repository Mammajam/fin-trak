import { NextRequest, NextResponse } from "next/server";

import {
  appendTransaction,
  getCustomerById,
  getCustomerTransactions,
} from "@/lib/mockStore";
import type {
  DecisionStatus,
  NewTransactionInput,
  TransactionChannel,
  TransactionDirection,
  TransactionScreening,
} from "@/types/kyc";

export const dynamic = "force-dynamic";

const channels: TransactionChannel[] = ["wire", "ach", "card", "crypto", "cash"];
const directions: TransactionDirection[] = ["credit", "debit"];
const decisionStatuses: DecisionStatus[] = [
  "clear",
  "requires_review",
  "escalated",
  "blocked",
];

const parseScreening = (
  value: unknown,
): Partial<TransactionScreening> | undefined => {
  if (!value || typeof value !== "object") return undefined;
  const screening = value as Partial<TransactionScreening>;

  const parsed: Partial<TransactionScreening> = {};

  if (
    screening.status &&
    typeof screening.status === "string" &&
    decisionStatuses.includes(screening.status)
  ) {
    parsed.status = screening.status;
  }

  if (
    typeof screening.riskScore === "number" &&
    !Number.isNaN(screening.riskScore)
  ) {
    parsed.riskScore = screening.riskScore;
  }

  if (Array.isArray(screening.triggeredRules)) {
    parsed.triggeredRules = screening.triggeredRules
      .filter((value): value is string => typeof value === "string")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  if (screening.analyst && typeof screening.analyst === "string") {
    parsed.analyst = screening.analyst;
  }

  if (screening.reviewedAt && typeof screening.reviewedAt === "string") {
    parsed.reviewedAt = screening.reviewedAt;
  }

  if (screening.notes && typeof screening.notes === "string") {
    parsed.notes = screening.notes;
  }

  return Object.keys(parsed).length > 0 ? parsed : undefined;
};

const parseTransactionPayload = async (
  request: NextRequest,
): Promise<NewTransactionInput | undefined> => {
  const payload = await request.json();
  if (!payload || typeof payload !== "object") return undefined;

  const {
    amount,
    currency,
    counterparty,
    counterpartyCountry,
    channel,
    direction,
  } = payload as Record<string, unknown>;

  if (typeof amount !== "number" || Number.isNaN(amount)) return undefined;
  if (!currency || typeof currency !== "string") return undefined;
  if (!counterparty || typeof counterparty !== "string") return undefined;
  if (!counterpartyCountry || typeof counterpartyCountry !== "string")
    return undefined;

  if (
    !channel ||
    typeof channel !== "string" ||
    !channels.includes(channel as TransactionChannel)
  ) {
    return undefined;
  }

  if (
    !direction ||
    typeof direction !== "string" ||
    !directions.includes(direction as TransactionDirection)
  ) {
    return undefined;
  }

  const input: NewTransactionInput = {
    amount,
    currency,
    counterparty,
    counterpartyCountry,
    channel: channel as TransactionChannel,
    direction: direction as TransactionDirection,
    reference:
      typeof payload.reference === "string" ? payload.reference : undefined,
    occurredAt:
      typeof payload.occurredAt === "string" ? payload.occurredAt : undefined,
    screening: parseScreening(payload.screening),
  };

  return input;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const customer = getCustomerById(id);
  if (!customer) {
    return NextResponse.json(
      { error: `Customer ${id} was not found.` },
      { status: 404 },
    );
  }

  const transactions = getCustomerTransactions(id);
  return NextResponse.json({ data: transactions }, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const payload = await parseTransactionPayload(request);
    if (!payload) {
      return NextResponse.json(
        {
          error:
            "Invalid transaction payload. Ensure amount, currency, counterparty, counterpartyCountry, channel, and direction are provided.",
        },
        { status: 400 },
      );
    }

    const transaction = appendTransaction(id, payload);
    return NextResponse.json({ data: transaction }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("does not exist")) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    console.error(
      `Failed to append transaction for customer ${id}`,
      error,
    );
    return NextResponse.json(
      { error: "Unable to append transaction." },
      { status: 500 },
    );
  }
}

