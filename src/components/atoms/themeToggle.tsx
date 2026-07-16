import { Laptop, Moon, Sun } from "lucide-react";
import type { theme } from "../../context/themeContextDefinition";
import { useTheme } from "../../hooks/useTheme";

const options: { value: theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Helles Design", icon: Sun },
  { value: "dark", label: "Dunkles Design", icon: Moon },
  { value: "system", label: "Systemeinstellung", icon: Laptop },
];
// Ein Atom bleibt klein: Es kennt nur die drei theme-Optionen und ändert den gemeinsamen Context.
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="join theme-toggle" role="group" aria-label="Farbschema wählen">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          className={`btn btn-sm btn-ghost join-item ${theme === value ? "active btn-active" : ""}`}
          onClick={() => setTheme(value)}
          aria-label={label}
          aria-pressed={theme === value}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}
