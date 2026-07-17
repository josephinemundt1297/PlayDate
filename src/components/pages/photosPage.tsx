import { Camera, KeyRound, Server, ShieldCheck, UserCheck } from "lucide-react";

export function PhotosPage() {
  return (
    <div className="page-wrap photos-page">
      <p className="eyebrow">Private Erinnerungen</p>
      <h1>Fotos sicher mit eingeladenen Familien teilen</h1>
      <section className="card bg-base-100 photo-intro">
        <span className="photo-icon"><Camera /></span>
        <div>
          <h2>Der sichere Fotobereich wird vorbereitet</h2>
          <p>
            Foto-Uploads sind bewusst noch gesperrt. Eine Verschlüsselung nur im Browser
            würde Schutz vortäuschen, solange Backend, Empfängerprüfung und Widerruf fehlen.
          </p>
        </div>
      </section>
      <h2>So muss ein sicherer Fotolink funktionieren</h2>
      <ol className="photo-security-steps">
        <li><UserCheck /><span><strong>Empfänger festlegen</strong>Nur eingeladene, angemeldete Familien erhalten Zugriff.</span></li>
        <li><KeyRound /><span><strong>Kurzlebiger Link</strong>Der Link enthält ein zufälliges, widerrufbares Token und läuft automatisch ab.</span></li>
        <li><Server /><span><strong>Server prüft jeden Aufruf</strong>Der Link allein reicht nicht; die Berechtigung wird bei jedem Foto erneut geprüft.</span></li>
        <li><ShieldCheck /><span><strong>Verschlüsselt speichern</strong>Transport, Dateispeicher und Backups werden verschlüsselt; Schlüssel liegen nicht im Link.</span></li>
      </ol>
      <div className="alert alert-info">
        Bis diese Schutzmaßnahmen serverseitig umgesetzt und getestet sind, nimmt PlayDate
        keine Kinderfotos entgegen.
      </div>
    </div>
  );
}
