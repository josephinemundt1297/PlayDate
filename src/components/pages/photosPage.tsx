import { KeyRound, Server, ShieldCheck, UserCheck } from "lucide-react";
import { SafetyPage, type safetyPageItem } from "../templates/safetyPage";

const photoTopics: safetyPageItem[] = [
  { icon: UserCheck, title: "Empfänger festlegen", text: "Nur eingeladene, angemeldete Familien erhalten Zugriff." },
  { icon: KeyRound, title: "Kurzlebiger Link", text: "Der Link enthält ein zufälliges, widerrufbares Token und läuft automatisch ab." },
  { icon: Server, title: "Server prüft jeden Aufruf", text: "Der Link allein reicht nicht; die Berechtigung wird bei jedem Foto erneut geprüft." },
  { icon: ShieldCheck, title: "Verschlüsselt speichern", text: "Transport, Dateispeicher und Backups werden verschlüsselt; Schlüssel liegen nicht im Link." },
];

export function PhotosPage() {
  return (
    <SafetyPage
      eyebrow="Private Erinnerungen"
      title="Fotos sicher mit eingeladenen Familien teilen"
      notice="Foto-Uploads sind noch gesperrt. Bis alle Schutzmaßnahmen serverseitig umgesetzt und getestet sind, nimmt SpielZeit keine Kinderfotos entgegen."
      sectionTitle="So muss ein sicherer Fotolink funktionieren"
      items={photoTopics}
    />
  );
}
