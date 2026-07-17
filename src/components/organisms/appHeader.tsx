import { Download, Menu, Settings, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "../atoms/themeToggle";
import { useInstallApp } from "../../hooks/useInstallApp";

// Der Header bündelt Navigation und Konto-Aktionen. Auf kleinen Geräten steckt alles im Aufklappmenü.
export function AppHeader() {
  const { canInstall, installed, install } = useInstallApp();
  return (
    <header className="navbar topbar">
      <Link to="/" className="brand" aria-label="PlayDate Startseite">
        <span className="brand-mark">
          <Sparkles size={20} />
        </span>
        <span>
          Play<span>Date</span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Hauptnavigation">
        <Link to="/" activeProps={{ className: "active" }}>
          Übersicht
        </Link>
        <Link to="/playdates" activeProps={{ className: "active" }}>
          PlayDates
        </Link>
        <Link to="/calendar" activeProps={{ className: "active" }}>
          Kalender
        </Link>
        <Link to="/families" activeProps={{ className: "active" }}>
          Familien
        </Link>
        <Link to="/photos" activeProps={{ className: "active" }}>
          Fotos
        </Link>
      </nav>
      <div className="header-actions">
        <details className="header-menu dropdown dropdown-end">
          <summary className="btn btn-ghost btn-square" aria-label="Menü öffnen">
            <Menu />
          </summary>
          <div className="dropdown-content header-menu-panel card bg-base-100">
            <p className="header-menu-title">Menü</p>
            <div className="header-menu-theme">
              <span>Darstellung</span>
              <ThemeToggle />
            </div>
            <button
              className="btn btn-ghost header-menu-link"
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
            <Link to="/settings" className="btn btn-ghost header-menu-link">
              <Settings />
              Einstellungen
            </Link>
            <div className="header-menu-account">
              <span>Clerk-Konto</span>
              <UserButton />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
