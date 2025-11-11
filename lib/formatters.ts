type DateInput = string | number | Date;

const withDate = (value: DateInput) =>
  value instanceof Date ? value : new Date(value);

export const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {},
) => new Intl.NumberFormat("en-US", options).format(value);

export const formatCurrency = (
  value: number,
  currency = "USD",
  options: Intl.NumberFormatOptions = {},
) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    ...options,
  }).format(value);

export const formatDate = (
  value: DateInput,
  options: Intl.DateTimeFormatOptions = {},
) =>
  withDate(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...options,
  });

export const formatDateTime = (
  value: DateInput,
  options: Intl.DateTimeFormatOptions = {},
) =>
  withDate(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  });

