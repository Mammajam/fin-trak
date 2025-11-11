import type {
  CustomerFilter,
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

type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

const toQueryString = (filter: CustomerFilter = {}) => {
  const params = new URLSearchParams();

  if (filter.search) params.set("search", filter.search);
  filter.risk?.forEach((value) => params.append("risk", value));
  filter.status?.forEach((value) => params.append("status", value));
  filter.jurisdiction?.forEach((value) => params.append("jurisdiction", value));
  filter.tags?.forEach((value) => params.append("tag", value));
  filter.analyst?.forEach((value) => params.append("analyst", value));

  const query = params.toString();
  return query ? `?${query}` : "";
};

async function handleResponse<T>(response: Response): Promise<T> {
  let payload: ApiResponse<T> | { error?: string };

  try {
    payload = await response.json();
  } catch {
    throw new Error("Unable to read API response.");
  }

  if (!response.ok) {
    const message =
      "error" in payload && payload.error
        ? payload.error
        : `API request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (!("data" in payload)) {
    throw new Error("API response missing data payload.");
  }

  return payload.data;
}

const apiFetch = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  return handleResponse<T>(response);
};

export const fetchDashboardSnapshot = () =>
  apiFetch<DashboardSnapshot>("/api/dashboard");

export const fetchCustomers = (filter?: CustomerFilter) =>
  apiFetch<CustomerListEntry[]>(`/api/customers${toQueryString(filter)}`);

export const fetchCustomerSnapshot = (id: string) =>
  apiFetch<CustomerSnapshot>(`/api/customers/${id}`);

export const fetchCustomerTransactions = (id: string) =>
  apiFetch<Transaction[]>(`/api/customers/${id}/transactions`);

export const createCustomerScreening = (
  id: string,
  payload: NewScreeningInput,
) =>
  apiFetch<ScreeningResult>(`/api/customers/${id}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const createCustomerTransaction = (
  id: string,
  payload: NewTransactionInput,
) =>
  apiFetch<Transaction>(`/api/customers/${id}/transactions`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const fetchRiskSettings = () =>
  apiFetch<RiskSettings>("/api/risk-settings");

export const updateRiskSettingsRequest = (payload: RiskSettingsPatch) =>
  apiFetch<RiskSettings>("/api/risk-settings", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
import {
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

