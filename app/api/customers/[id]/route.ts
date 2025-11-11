import { NextRequest, NextResponse } from "next/server";

import { getCustomerSnapshot, recordScreening } from "@/lib/mockStore";
import type {
  DecisionStatus,
  NewScreeningInput,
  ScreeningType,
  WatchlistHit,
} from "@/types/kyc";

export const dynamic = "force-dynamic";

const screeningTypes: ScreeningType[] = ["kyc", "ongoing", "transaction"];
const decisionStatuses: DecisionStatus[] = [
  "clear",
  "requires_review",
  "escalated",
  "blocked",
];

const parseHits = (value: unknown): WatchlistHit[] | undefined => {
  if (!value) return undefined;
  if (!Array.isArray(value)) return undefined;

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return undefined;
      }
      const hit = entry as Partial<WatchlistHit>;
      if (
        !hit.id ||
        !hit.list ||
        !hit.matchName ||
        !hit.category ||
        !hit.risk ||
        typeof hit.id !== "string" ||
        typeof hit.list !== "string" ||
        typeof hit.matchName !== "string" ||
        typeof hit.category !== "string" ||
        typeof hit.risk !== "string"
      ) {
        return undefined;
      }

      return {
        id: hit.id,
        list: hit.list,
        matchName: hit.matchName,
        category: hit.category,
        risk: hit.risk,
        confidence: typeof hit.confidence === "number" ? hit.confidence : 0,
        url: hit.url,
      } satisfies WatchlistHit;
    })
    .filter((entry): entry is WatchlistHit => Boolean(entry));
};

const parseScreeningPayload = async (
  request: NextRequest,
): Promise<NewScreeningInput | undefined> => {
  const payload = await request.json();

  const { type, runBy, status, riskScore } = payload ?? {};

  if (!type || typeof type !== "string" || !screeningTypes.includes(type)) {
    return undefined;
  }

  if (!runBy || typeof runBy !== "string") {
    return undefined;
  }

  if (
    !status ||
    typeof status !== "string" ||
    !decisionStatuses.includes(status as DecisionStatus)
  ) {
    return undefined;
  }

  if (typeof riskScore !== "number" || Number.isNaN(riskScore)) {
    return undefined;
  }

  const screening: NewScreeningInput = {
    type,
    runBy,
    status,
    riskScore,
    notes: typeof payload.notes === "string" ? payload.notes : undefined,
    hits: parseHits(payload.hits),
    runAt:
      typeof payload.runAt === "string" && payload.runAt
        ? payload.runAt
        : undefined,
  };

  return screening;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const snapshot = getCustomerSnapshot(params.id);

  if (!snapshot) {
    return NextResponse.json(
      { error: `Customer ${params.id} was not found.` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: snapshot }, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const screening = await parseScreeningPayload(request);
    if (!screening) {
      return NextResponse.json(
        {
          error:
            "Invalid screening payload. Please include type, runBy, status, and riskScore.",
        },
        { status: 400 },
      );
    }

    const result = recordScreening(params.id, screening);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("does not exist")) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    console.error(`Failed to record screening for customer ${params.id}`, error);
    return NextResponse.json(
      { error: "Unable to record screening result." },
      { status: 500 },
    );
  }
}

