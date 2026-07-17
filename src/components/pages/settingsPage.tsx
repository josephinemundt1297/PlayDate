import { useState } from "react";
import { Download, FileJson, Trash2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { ThemeToggle } from "../atoms/themeToggle";
import { useInstallApp } from "../../hooks/useInstallApp";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { downloadLocalData, removeLocalData } from "../../utils/privacyData";
// Alles, was die Darstellung oder Installation betrifft, landet gesammelt auf dieser Seite.
export function SettingsPage() {
  const { canInstall, installed, install } = useInstallApp();
  const { user } = useUser();
  const [privacyStatus, setPrivacyStatus] = useState("");

  if (!user) throw new Error("Anmeldung erforderlich");

  const deleteTrainingData = () => {
    const confirmed = window.confirm(
      "Wirklich alle lokalen PlayDate-Trainingsdaten in diesem Browser löschen? Dein Clerk-Konto bleibt bestehen.",
    );
    if (!confirmed) return;

    removeLocalData(user.id);
    setPrivacyStatus("Lokale Trainingsdaten wurden gelöscht.");
  };
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
          <h2>Datenschutz</h2>
          <p>Sieh nach, welche Daten der Prototyp speichert und welche Schutzmaßnahmen noch fehlen.</p>
        </div>
        <Link className="btn btn-outline" to="/privacy"><ShieldCheck /> Datenschutz öffnen</Link>
      </section>
      <section className="card bg-base-100 border border-base-300 settings-card local-data-settings">
        <div>
          <h2>Meine lokalen Trainingsdaten</h2>
          <p>
            Lade Familienprofil und PlayDates als JSON herunter oder entferne sie
            vollständig aus diesem Browser. Das Clerk-Login wird dabei nicht gelöscht.
          </p>
          <p className="privacy-caption" aria-live="polite">{privacyStatus}</p>
        </div>
        <div className="settings-actions">
          <button className="btn btn-outline" type="button" onClick={() => {
            downloadLocalData(user.id);
            setPrivacyStatus("Datendatei wurde erstellt.");
          }}>
            <FileJson /> Daten exportieren
          </button>
          <button className="btn btn-error" type="button" onClick={deleteTrainingData}>
            <Trash2 /> Lokale Daten löschen
          </button>
        </div>
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
          disabled={installed}
        >
          <Download />
          {installed
            ? "Bereits installiert"
            : canInstall
              ? "App installieren"
              : "Website-Link herunterladen"}
        </button>
      </section>
    </div>
  );
}
