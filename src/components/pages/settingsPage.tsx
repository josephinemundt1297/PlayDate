import { Download } from "lucide-react";
import { ThemeToggle } from "../atoms/themeToggle";
import { useInstallApp } from "../../hooks/useInstallApp";
// Alles, was die Darstellung oder Installation betrifft, landet gesammelt auf dieser Seite.
export function SettingsPage() {
  const { canInstall, installed, install } = useInstallApp();
  return (
    <div className="settings-page">
      <p className="eyebrow">Darstellung & Gerät</p>
      <h1>Einstellungen</h1>
      <section className="card bg-base-100 border border-base-300 settings-card">
        <div>
          <h2>Farbschema</h2>
          <p>
            Wähle Light Mode, Dark Mode oder übernimm deine Systemeinstellung.
          </p>
        </div>
        <ThemeToggle />
      </section>
      <section className="card bg-base-100 border border-base-300 settings-card">
        <div>
          <h2>PlayDate herunterladen</h2>
          <p>
            Installiere die App auf deinem Gerät. Danach kannst du sie wie eine
            normale App vom Startbildschirm öffnen.
          </p>
        </div>
        <button
          className="btn btn-primary primary-button"
          onClick={install}
          disabled={!canInstall || installed}
        >
          <Download />
          {installed
            ? "Bereits installiert"
            : canInstall
              ? "App installieren"
              : "Im Browsermenü installieren"}
        </button>
      </section>
    </div>
  );
}
