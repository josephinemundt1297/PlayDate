import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";
type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
};
const themeContext = createContext<ThemeContextValue | null>(null);
const themeKey = "playDate.theme";
const legacyThemeKey = "playpal.theme";

// Der Provider hält das Farbschema zentral. Einzelne Komponenten müssen so nicht selbst herumrechnen.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(
    () => {
      const saved = (localStorage.getItem(themeKey) ??
        localStorage.getItem(legacyThemeKey)) as Theme | null;
      if (saved && !localStorage.getItem(themeKey)) {
        localStorage.setItem(themeKey, saved);
      }
      return saved || "system";
    },
  );
  const [systemDark, setSystemDark] = useState(
    () => matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const resolvedTheme =
    theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: MediaQueryListEvent) =>
      setSystemDark(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  // data-theme landet am <html>-Element. Unsere CSS-Variablen reagieren direkt darauf.
  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem(themeKey, next);
  };
  return (
    <themeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(themeContext);
  if (!value)
    throw new Error(
      "useTheme muss innerhalb des ThemeProvider verwendet werden",
    );
  return value;
}
