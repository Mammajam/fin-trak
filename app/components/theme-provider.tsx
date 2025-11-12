"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

type ThemeContextValue = {
  themePreference: ThemePreference;
  resolvedTheme: Theme;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "fintrak-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const canUseDOM = () => typeof window !== "undefined" && typeof document !== "undefined";

const getSystemTheme = (): Theme => {
  if (!canUseDOM()) return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const loadStoredTheme = (): ThemePreference | null => {
  if (!canUseDOM()) return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return null;
};

const getInitialThemePreference = (): ThemePreference => {
  if (!canUseDOM()) return "system";
  // Always check localStorage first - it's the source of truth for user preference
  const stored = loadStoredTheme();
  if (stored) return stored;
  // If no stored preference, default to "system"
  // The script will have set the dataset theme based on system preference
  return "system";
};

const getInitialResolvedTheme = (): Theme => {
  if (!canUseDOM()) return "dark";
  // Read from dataset attribute set by the blocking script
  const datasetTheme = document.documentElement.dataset.theme;
  if (datasetTheme === "light" || datasetTheme === "dark") {
    return datasetTheme;
  }
  return getSystemTheme();
};

const applyTheme = (theme: Theme) => {
  if (!canUseDOM()) return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(() => {
    return getInitialThemePreference();
  });

  const [systemTheme, setSystemTheme] = useState<Theme>(() => getInitialResolvedTheme());

  const resolvedTheme = useMemo<Theme>(() => {
    if (themePreference === "system") {
      return systemTheme;
    }
    return themePreference;
  }, [themePreference, systemTheme]);

  useEffect(() => {
    applyTheme(resolvedTheme);
    if (canUseDOM()) {
      window.localStorage.setItem(STORAGE_KEY, themePreference);
    }
  }, [resolvedTheme, themePreference]);

  useEffect(() => {
    if (!canUseDOM()) {
      return;
    }
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (event: MediaQueryListEvent) => {
      const newSystemTheme = event.matches ? "light" : "dark";
      setSystemTheme(newSystemTheme);
      if (themePreference === "system") {
        applyTheme(newSystemTheme);
      }
    };

    // Update system theme on mount
    setSystemTheme(getSystemTheme());

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [themePreference]);

  const setTheme = useCallback((next: ThemePreference) => {
    setThemePreferenceState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemePreferenceState((prev) => {
      if (prev === "dark") return "light";
      if (prev === "light") return "system";
      return "dark";
    });
  }, []);

  const value = useMemo(
    () => ({
      themePreference,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [themePreference, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};


