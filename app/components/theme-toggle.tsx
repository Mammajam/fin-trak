"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";

import { useTheme } from "@/app/components/theme-provider";

type ThemeToggleVariant = "desktop" | "mobile";

type ThemeToggleProps = {
  variant?: ThemeToggleVariant;
  className?: string;
};

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95 5.636 18.364m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <path d="M21 12.79A9 9 0 0 1 11.21 3 7.5 7.5 0 0 0 12 18a7.5 7.5 0 0 0 9-5.21Z" />
  </svg>
);

const SystemIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

export function ThemeToggle({ variant = "desktop", className }: ThemeToggleProps) {
  const { themePreference, resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { displayLabel, ariaLabel, icon } = useMemo(() => {
    let nextPreference: string;
    if (themePreference === "dark") {
      nextPreference = "light";
    } else if (themePreference === "light") {
      nextPreference = "system";
    } else {
      nextPreference = "dark";
    }

    let label: string;
    if (variant === "mobile") {
      label = `Switch to ${nextPreference} mode`;
    } else {
      if (themePreference === "system") {
        label = "System Mode";
      } else {
        label = `${resolvedTheme === "dark" ? "Dark" : "Light"} Mode`;
      }
    }

    let iconElement: React.ReactNode;
    if (themePreference === "system") {
      iconElement = <SystemIcon className="h-4 w-4" />;
    } else if (resolvedTheme === "dark") {
      iconElement = <MoonIcon className="h-4 w-4" />;
    } else {
      iconElement = <SunIcon className="h-4 w-4" />;
    }

    return {
      displayLabel: label,
      ariaLabel: `Switch to ${nextPreference} mode`,
      icon: iconElement,
    };
  }, [themePreference, resolvedTheme, variant]);

  const baseDesktopClasses =
    "hidden items-center gap-2 rounded-full border border-[var(--border)] bg-transparent px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:border-emerald-400/60 hover:text-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200 lg:inline-flex";

  const baseMobileClasses =
    "flex w-full items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground)] transition-colors hover:border-emerald-400/40 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200";

  const classes = [
    variant === "mobile" ? baseMobileClasses : baseDesktopClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconContainerClasses = [
    "flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--accent)] transition-colors",
    variant === "mobile" ? "" : "shadow-inner shadow-black/20",
  ]
    .filter(Boolean)
    .join(" ");

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <button
        type="button"
        className={classes}
        aria-label="Theme toggle"
        disabled
      >
        <span className="flex items-center gap-2">
          <span className={iconContainerClasses}>
            <div className="h-4 w-4" />
          </span>
          <span>Theme</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={classes}
      aria-label={ariaLabel}
      aria-pressed={themePreference === "light"}
    >
      <span className="flex items-center gap-2">
        <span className={iconContainerClasses}>{icon}</span>
        <span>{displayLabel}</span>
      </span>
    </button>
  );
}
