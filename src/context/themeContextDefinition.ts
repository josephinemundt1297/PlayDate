import { createContext } from "react";

// Hier steht nur der gemeinsame Vertrag. Provider und Hook können ihn so beide benutzen.
export type theme = "light" | "dark" | "system";

export type themeContextValue = {
  theme: theme;
  setTheme: (theme: theme) => void;
  resolvedTheme: "light" | "dark";
};

export const themeContext = createContext<themeContextValue | null>(null);
