import { UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { Download, Menu, Settings, X } from "lucide-react";
import { useState } from "react";
import { useInstallApp } from "../../hooks/useInstallApp";
import { ThemeToggle } from "../atoms/themeToggle";

// Ein eigener Schalter ist hier verlässlicher als Browser-Sonderverhalten von <details>.
export function AppMenu() {
  const [open, setOpen] = useState(false);
  const { canInstall, installed, install } = useInstallApp();

  return (
    <div className="header-menu">
      <button
        className="btn btn-ghost btn-square header-menu-toggle"
        type="button"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-controls="app-menu-panel"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <div
        id="app-menu-panel"
        className="header-menu-panel card bg-base-100"
        hidden={!open}
      >
        <p className="header-menu-title">Menü</p>
        <div className="header-menu-theme">
          <span>Darstellung</span>
          <ThemeToggle />
        </div>
        <button
          className="btn btn-ghost header-menu-link"
          type="button"
          onClick={install}
          disabled={installed}
          title={
            installed
              ? "App ist installiert"
              : canInstall
                ? "PlayDate installieren"
                : "PlayDate-Website als Verknüpfung herunterladen"
          }
        >
          <Download />
          <span>{installed ? "Installiert" : "App laden"}</span>
        </button>
        <Link
          to="/settings"
          className="btn btn-ghost header-menu-link"
          onClick={() => setOpen(false)}
        >
          <Settings />
          Einstellungen
        </Link>
        <div className="header-menu-account">
          <span>Clerk-Konto</span>
          <UserButton />
        </div>
      </div>
    </div>
  );
}
