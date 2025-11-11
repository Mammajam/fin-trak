import { NextRequest, NextResponse } from "next/server";

import { getRiskSettings, updateRiskSettings } from "@/lib/mockStore";
import type {
  JurisdictionRisk,
  RiskLevel,
  RiskRule,
  RiskSettingsPatch,
} from "@/types/kyc";

export const dynamic = "force-dynamic";

const pepSensitivityOptions = ["standard", "enhanced"] as const;
const adverseMediaOptions = ["basic", "expanded"] as const;
const riskLevels: RiskLevel[] = ["low", "moderate", "high", "critical"];

const toNumber = (value: unknown) =>
  typeof value === "number" && !Number.isNaN(value) ? value : undefined;

const parseJurisdictionOverrides = (value: unknown) => {
  if (!Array.isArray(value)) return undefined;
  const overrides: JurisdictionRisk[] = [];

  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    const item = entry as Partial<JurisdictionRisk>;
    if (
      typeof item.country !== "string" ||
      typeof item.isoCode !== "string" ||
      typeof item.inherentRisk !== "string" ||
      !riskLevels.includes(item.inherentRisk as RiskLevel) ||
      typeof item.rationale !== "string"
    ) {
      return;
    }

    overrides.push({
      country: item.country,
      isoCode: item.isoCode,
      inherentRisk: item.inherentRisk as RiskLevel,
      rationale: item.rationale,
    });
  });

  return overrides.length > 0 ? overrides : undefined;
};

const parseRules = (value: unknown) => {
  if (!Array.isArray(value)) return undefined;
  const rules: RiskRule[] = [];

  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    const item = entry as Partial<RiskRule>;
    if (
      typeof item.id !== "string" ||
      typeof item.name !== "string" ||
      typeof item.category !== "string" ||
      typeof item.description !== "string" ||
      typeof item.enabled !== "boolean" ||
      typeof item.riskWeight !== "number" ||
      typeof item.severity !== "string" ||
      !riskLevels.includes(item.severity as RiskLevel)
    ) {
      return;
    }

    rules.push({
      id: item.id,
      name: item.name,
      category: item.category as RiskRule["category"],
      description: item.description,
      enabled: item.enabled,
      riskWeight: item.riskWeight,
      severity: item.severity as RiskLevel,
    });
  });

  return rules.length > 0 ? rules : undefined;
};

const parseRiskSettingsPatch = async (
  request: NextRequest,
): Promise<RiskSettingsPatch | undefined> => {
  const payload = await request.json();
  if (!payload || typeof payload !== "object") return undefined;

  if (typeof (payload as { updatedBy?: unknown }).updatedBy !== "string") {
    return undefined;
  }

  const patch: RiskSettingsPatch = {
    updatedBy: (payload as { updatedBy: string }).updatedBy,
  };

  if ("transactionThresholds" in payload) {
    const thresholds = (payload as { transactionThresholds?: unknown })
      .transactionThresholds;
    if (thresholds && typeof thresholds === "object") {
      const draft = thresholds as Record<string, unknown>;
      patch.transactionThresholds = {};

      const highValue = toNumber(draft.highValueUsd);
      if (typeof highValue === "number") {
        patch.transactionThresholds.highValueUsd = highValue;
      }

      const manualReview = toNumber(draft.manualReviewUsd);
      if (typeof manualReview === "number") {
        patch.transactionThresholds.manualReviewUsd = manualReview;
      }

      const dailyVolume = toNumber(draft.dailyVolumeUsd);
      if (typeof dailyVolume === "number") {
        patch.transactionThresholds.dailyVolumeUsd = dailyVolume;
      }

      if (Object.keys(patch.transactionThresholds).length === 0) {
        delete patch.transactionThresholds;
      }
    }
  }

  if ("screeningParameters" in payload) {
    const parameters = (payload as { screeningParameters?: unknown })
      .screeningParameters;
    if (parameters && typeof parameters === "object") {
      const draft = parameters as Record<string, unknown>;
      patch.screeningParameters = {};

      if (
        typeof draft.pepSensitivity === "string" &&
        pepSensitivityOptions.includes(draft.pepSensitivity as typeof pepSensitivityOptions[number])
      ) {
        patch.screeningParameters.pepSensitivity = draft.pepSensitivity as
          | "standard"
          | "enhanced";
      }

      if (
        typeof draft.adverseMediaCoverage === "string" &&
        adverseMediaOptions.includes(draft.adverseMediaCoverage as typeof adverseMediaOptions[number])
      ) {
        patch.screeningParameters.adverseMediaCoverage =
          draft.adverseMediaCoverage as "basic" | "expanded";
      }

      const sanctionsAutoBlock = toNumber(draft.sanctionsAutoBlockScore);
      if (typeof sanctionsAutoBlock === "number") {
        patch.screeningParameters.sanctionsAutoBlockScore = sanctionsAutoBlock;
      }

      const transactionAutoBlock = toNumber(draft.transactionAutoBlockScore);
      if (typeof transactionAutoBlock === "number") {
        patch.screeningParameters.transactionAutoBlockScore =
          transactionAutoBlock;
      }

      if (Object.keys(patch.screeningParameters).length === 0) {
        delete patch.screeningParameters;
      }
    }
  }

  const overrides = parseJurisdictionOverrides(
    (payload as { jurisdictionOverrides?: unknown }).jurisdictionOverrides,
  );
  if (overrides) {
    patch.jurisdictionOverrides = overrides;
  }

  const rules = parseRules((payload as { rules?: unknown }).rules);
  if (rules) {
    patch.rules = rules;
  }

  return patch;
};

export async function GET() {
  try {
    return NextResponse.json({ data: getRiskSettings() }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch risk settings", error);
    return NextResponse.json(
      { error: "Unable to retrieve risk settings." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const patch = await parseRiskSettingsPatch(request);
    if (!patch) {
      return NextResponse.json(
        {
          error:
            "Invalid risk settings payload. Please include an updatedBy field.",
        },
        { status: 400 },
      );
    }

    const settings = updateRiskSettings(patch);
    return NextResponse.json({ data: settings }, { status: 200 });
  } catch (error) {
    console.error("Failed to update risk settings", error);
    return NextResponse.json(
      { error: "Unable to update risk settings." },
      { status: 500 },
    );
  }
}

