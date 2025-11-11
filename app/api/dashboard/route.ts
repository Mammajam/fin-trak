import { NextResponse } from "next/server";

import { getDashboardSnapshot } from "@/lib/mockStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapshot = getDashboardSnapshot();
    return NextResponse.json({ data: snapshot }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch dashboard snapshot", error);
    return NextResponse.json(
      { error: "Unable to retrieve dashboard metrics." },
      { status: 500 },
    );
  }
}

