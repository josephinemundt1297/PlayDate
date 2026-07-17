import { Database, Eye, LockKeyhole, ShieldCheck, Trash2 } from "lucide-react";

const privacyTopics = [
  {
    icon: Database,
    title: "Welche Daten speichert der Prototyp?",
    text: "Familienprofil, Kinder, Geburtstage und PlayDates liegen derzeit nur im LocalStorage dieses Browsers. Die Clerk User-ID trennt die lokalen Datensätze voneinander.",
  },
  {
    icon: Eye,
    title: "Wer sieht die Daten?",
    text: "Die App rendert private Inhalte erst nach dem Clerk-Login. Echte Familienfreigaben und serverseitige Rollen gibt es im Prototyp noch nicht.",
  },
  {
    icon: LockKeyhole,
    title: "Was wird nicht öffentlich geteilt?",
    text: "Kinder-, Termin- und Fotodaten dürfen nicht in öffentliche Links gelangen. WhatsApp-Texte sollten deshalb immer vor dem Senden geprüft werden.",
  },
  {
    icon: Trash2,
    title: "Löschen und widerrufen",
    text: "PlayDates können lokal gelöscht und Geburtstagsfreigaben abgeschaltet werden. Eine vollständige Kontoauskunft und serverseitige Löschung fehlen noch.",
  },
];

export function PrivacyPage() {
  return (
    <div className="page-wrap privacy-page">
      <p className="eyebrow">Datenschutz bei PlayDate</p>
      <h1>Deine Daten sollen nachvollziehbar geschützt sein</h1>
      <div className="alert alert-warning privacy-warning">
        <ShieldCheck />
        <span>
          Dies ist eine technische Übersicht des Frontend-Prototyps und noch keine
          vollständige Datenschutzinformation oder Rechtsberatung.
        </span>
      </div>
      <div className="privacy-topic-grid">
        {privacyTopics.map(({ icon: Icon, title, text }) => (
          <section className="card bg-base-100 privacy-topic" key={title}>
            <Icon />
            <div><h2>{title}</h2><p>{text}</p></div>
          </section>
        ))}
      </div>
      <section className="card bg-base-100 privacy-contact">
        <h2>Vor dem Produktivstart noch erforderlich</h2>
        <p>
          Verantwortliche Stelle und Kontakt, Rechtsgrundlagen, Auftragsverarbeiter,
          Speicherfristen, Betroffenenrechte und eine fachkundige Prüfung für Kinderdaten
          müssen ergänzt werden.
        </p>
      </section>
    </div>
  );
}
