import { Database, Eye, LockKeyhole, Trash2 } from "lucide-react";
import { SafetyPage, type safetyPageItem } from "../templates/safetyPage";

const privacyTopics: safetyPageItem[] = [
  { icon: Database, title: "Welche Daten speichert der Prototyp?", text: "Familienprofil, Kinder, Geburtstage und Spieletreffen liegen derzeit nur im LocalStorage dieses Browsers. Die Clerk User-ID trennt die lokalen Datensätze voneinander." },
  { icon: Eye, title: "Wer sieht die Daten?", text: "Die App rendert private Inhalte erst nach dem Clerk-Login. Echte Familienfreigaben und serverseitige Rollen gibt es im Prototyp noch nicht." },
  { icon: LockKeyhole, title: "Was wird nicht öffentlich geteilt?", text: "Kinder-, Termin- und Fotodaten dürfen nicht in öffentliche Links gelangen. WhatsApp-Texte sollten deshalb immer vor dem Senden geprüft werden." },
  { icon: Trash2, title: "Löschen und widerrufen", text: "Spieletreffen können lokal gelöscht und Geburtstagsfreigaben abgeschaltet werden. Eine vollständige Kontoauskunft und serverseitige Löschung fehlen noch." },
];

export function PrivacyPage() {
  return (
    <SafetyPage
      eyebrow="Datenschutz bei SpielZeit"
      title="Deine Daten sollen nachvollziehbar geschützt sein"
      notice="Dies ist eine technische Übersicht des Frontend-Prototyps und noch keine vollständige Datenschutzinformation oder Rechtsberatung."
      sectionTitle="So geht SpielZeit mit deinen Daten um"
      items={privacyTopics}
      footer={<><h2>Vor dem Produktivstart noch erforderlich</h2><p>Verantwortliche Stelle und Kontakt, Rechtsgrundlagen, Auftragsverarbeiter, Speicherfristen, Betroffenenrechte und eine fachkundige Prüfung für Kinderdaten müssen ergänzt werden.</p></>}
    />
  );
}
