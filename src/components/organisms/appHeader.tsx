import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AppMenu } from "./appMenu";

// Der Header bündelt Navigation und Konto-Aktionen. Auf kleinen Geräten steckt alles im Aufklappmenü.
export function AppHeader() {
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
        <AppMenu />
      </div>
    </header>
  );
}
