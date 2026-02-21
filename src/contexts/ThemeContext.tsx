import { createContext, useContext, useEffect, useState } from "react";

// 1. Define available themes and contrast colors
export type Theme = "dark" | "light" | "high-contrast";
export type ContrastColor = "white" | "yellow" | "green" | "amber" | "black";

interface ThemeContextType {
  theme: Theme;
  contrastColor: ContrastColor;
  setTheme: (theme: Theme) => void;
  setContrastColor: (color: ContrastColor) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 2. Initialize state from localStorage or defaults
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  const [contrastColor, setContrastColorState] = useState<ContrastColor>(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("contrast-color") as ContrastColor) || "white"
      );
    }
    return "white";
  });

  // 3. Sync with DOM and LocalStorage whenever state changes
  useEffect(() => {
    const root = document.documentElement;

    // Apply Base Theme
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Apply Contrast Color (Only relevant for high-contrast, but safe to always set)
    if (theme === "high-contrast") {
      root.setAttribute("data-contrast-color", contrastColor);
    } else {
      root.removeAttribute("data-contrast-color");
    }
    localStorage.setItem("contrast-color", contrastColor);

    // Handle standard CSS classes for Tailwind (dark/light)
    if (
      theme === "dark" ||
      (theme === "high-contrast" && contrastColor !== "black")
    ) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme, contrastColor]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setContrastColor = (color: ContrastColor) => {
    setContrastColorState(color);
    // Automatically switch to high-contrast mode if a color is selected
    if (theme !== "high-contrast") {
      setThemeState("high-contrast");
    }
  };

  const toggle = () => {
    const cycle: Theme[] = ["light", "dark", "high-contrast"];
    const nextIndex = (cycle.indexOf(theme) + 1) % cycle.length;
    setThemeState(cycle[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, contrastColor, setTheme, setContrastColor, toggle }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
