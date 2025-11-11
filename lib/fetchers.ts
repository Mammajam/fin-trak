import type {
  CustomerListEntry,
  CustomerSnapshot,
  DashboardSnapshot,
  NewScreeningInput,
  NewTransactionInput,
  RiskSettings,
  RiskSettingsPatch,
  ScreeningResult,
  Transaction,
} from "@/types/kyc";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

const buildUrl = (path: string, search?: URLSearchParams) => {
  const url = new URL(path, API_BASE || "http://localhost");
  if (search) {
    url.search = search.toString();
  }
  if (!API_BASE) {
    return `${path}${search?.toString() ? `?${search.toString()}` : ""}`;
  }
  return url.toString();
};

const readErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.clone().json()) as { error?: string };
    if (payload?.error) return payload.error;
  } catch {
    // ignore parse failure
  }
  return response.statusText || "Unknown error";
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
  const payload = (await response.json()) as { data: T };
  return payload.data;
};

const baseHeaders = {
  "Content-Type": "application/json",
};

export async function fetchDashboardSnapshot(
  init?: RequestInit,
): Promise<DashboardSnapshot> {
  const response = await fetch(buildUrl("/api/dashboard"), {
    cache: "no-store",
    ...init,
  });
  return handleResponse<DashboardSnapshot>(response);
}

export async function fetchCustomers(
  params?: URLSearchParams,
  init?: RequestInit,
): Promise<CustomerListEntry[]> {
  const response = await fetch(buildUrl("/api/customers", params), {
    cache: "no-store",
    ...init,
  });
  return handleResponse<CustomerListEntry[]>(response);
}

export async function fetchCustomerSnapshot(
  customerId: string,
  init?: RequestInit,
): Promise<CustomerSnapshot> {
  const response = await fetch(buildUrl(`/api/customers/${customerId}`), {
    cache: "no-store",
    ...init,
  });
  return handleResponse<CustomerSnapshot>(response);
}

export async function createTransaction(
  customerId: string,
  input: NewTransactionInput,
  init?: RequestInit,
): Promise<Transaction> {
  const response = await fetch(
    buildUrl(`/api/customers/${customerId}/transactions`),
    {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify(input),
      ...init,
    },
  );
  return handleResponse<Transaction>(response);
}

export async function recordScreeningResult(
  customerId: string,
  input: NewScreeningInput,
  init?: RequestInit,
): Promise<ScreeningResult> {
  const response = await fetch(buildUrl(`/api/customers/${customerId}`), {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify(input),
    ...init,
  });
  return handleResponse<ScreeningResult>(response);
}

export async function fetchRiskSettings(init?: RequestInit): Promise<RiskSettings> {
  const response = await fetch(buildUrl("/api/risk-settings"), {
    cache: "no-store",
    ...init,
  });
  return handleResponse<RiskSettings>(response);
}

export async function patchRiskSettings(
  patch: RiskSettingsPatch,
  init?: RequestInit,
): Promise<RiskSettings> {
  const response = await fetch(buildUrl("/api/risk-settings"), {
    method: "PATCH",
    headers: baseHeaders,
    body: JSON.stringify(patch),
    ...init,
  });
  return handleResponse<RiskSettings>(response);
}

