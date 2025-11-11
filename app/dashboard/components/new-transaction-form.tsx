"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createTransaction } from "@/lib/fetchers";
import type {
  TransactionChannel,
  TransactionDirection,
} from "@/types/kyc";

interface QuickTransactionFormProps {
  customerId: string;
}

const channels: TransactionChannel[] = ["wire", "ach", "card", "crypto", "cash"];
const directions: TransactionDirection[] = ["credit", "debit"];

export function QuickTransactionForm({ customerId }: QuickTransactionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [amount, setAmount] = useState("5000");
  const [currency, setCurrency] = useState("USD");
  const [counterparty, setCounterparty] = useState("Risk Test Ltd.");
  const [counterpartyCountry, setCounterpartyCountry] = useState("US");
  const [channel, setChannel] = useState<TransactionChannel>("wire");
  const [direction, setDirection] = useState<TransactionDirection>("debit");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    setSuccess(undefined);

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Enter a valid transaction amount.");
      return;
    }

    startTransition(async () => {
      try {
        await createTransaction(customerId, {
          amount: numericAmount,
          currency,
          counterparty,
          counterpartyCountry,
          channel,
          direction,
        });
        setSuccess("Transaction recorded successfully.");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to record transaction.",
        );
      }
    });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-3xl border border-slate-800/60 bg-slate-900/60 p-5"
    >
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          Quick Transaction Test
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Inject a synthetic transaction into the mock store to exercise Fin-Trak
          API endpoints.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Amount (USD)
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-2xl border border-slate-800/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/80"
            placeholder="5000"
            inputMode="decimal"
          />
        </label>
        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Currency
          <input
            value={currency}
            onChange={(event) => setCurrency(event.target.value.toUpperCase())}
            className="w-full rounded-2xl border border-slate-800/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/80"
            placeholder="USD"
            maxLength={3}
          />
        </label>
        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Counterparty
          <input
            value={counterparty}
            onChange={(event) => setCounterparty(event.target.value)}
            className="w-full rounded-2xl border border-slate-800/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/80"
            placeholder="Company name"
          />
        </label>
        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Counterparty Country
          <input
            value={counterpartyCountry}
            onChange={(event) =>
              setCounterpartyCountry(event.target.value.toUpperCase())
            }
            className="w-full rounded-2xl border border-slate-800/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/80"
            placeholder="US"
            maxLength={3}
          />
        </label>
        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Channel
          <select
            value={channel}
            onChange={(event) => setChannel(event.target.value as TransactionChannel)}
            className="w-full rounded-2xl border border-slate-800/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/80"
          >
            {channels.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Direction
          <select
            value={direction}
            onChange={(event) =>
              setDirection(event.target.value as TransactionDirection)
            }
            className="w-full rounded-2xl border border-slate-800/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/80"
          >
            {directions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error ? (
        <p className="text-xs font-semibold text-rose-200">{error}</p>
      ) : null}
      {success ? (
        <p className="text-xs font-semibold text-emerald-200">{success}</p>
      ) : null}
      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
        disabled={isPending}
      >
        {isPending ? "Recording..." : "Create Transaction"}
      </button>
    </form>
  );
}

