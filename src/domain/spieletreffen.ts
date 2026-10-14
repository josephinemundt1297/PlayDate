// Der gemeinsame Bauplan für ein Spieletreffen. So wissen alle Dateien, welche Felder vorhanden sind.
export type spieletreffen = {
  id: number;
  title: string;
  // Listen erlauben Treffen mit mehreren Kindern auf beiden Seiten.
  children: string[];
  friends: string[];
  date: string;
  time: string;
  location: string;
  bring: string;
  status: "Bestätigt" | "Ausstehend" | "Abgesagt";
  color: "mint" | "peach" | "lilac";
  reminder?: "Keine" | "24 Stunden vorher";
  emailReminder?: boolean;
  bringOwner?: "Wir" | "Andere Familie" | "Gemeinsam";
  activity?: spieletreffenActivity[];
  comments?: spieletreffenComment[];
};
export type spieletreffenActivity = {
  id: string;
  message: string;
  createdAt: string;
};
export type spieletreffenComment = {
  id: string;
  text: string;
  createdAt: string;
};

export function cancelSpieletreffen(date: spieletreffen): spieletreffen {
  // Absagen bleiben im Verlauf sichtbar. Löschen würde die Geschichte des Termins verlieren.
  return {
    ...date,
    status: "Abgesagt",
    reminder: "Keine",
    emailReminder: false,
    activity: [
      ...(date.activity ?? []),
      { id: crypto.randomUUID(), message: "Spieletreffen abgesagt", createdAt: new Date().toISOString() },
    ],
  };
}

export function addSpieletreffenComment(date: spieletreffen, text: string): spieletreffen {
  // Wir bauen ein neues Objekt, damit React die Änderung sicher erkennt.
  return {
    ...date,
    comments: [
      ...(date.comments ?? []),
      { id: crypto.randomUUID(), text, createdAt: new Date().toISOString() },
    ],
    activity: [
      ...(date.activity ?? []),
      { id: crypto.randomUUID(), message: "Kommentar ergänzt", createdAt: new Date().toISOString() },
    ],
  };
}

// Nur Startdaten für den Prototyp. Echte Termine kommen später aus dem Backend.
export const initialSpieletreffen: spieletreffen[] = [
  {
    id: 1,
    title: "Abenteuer im Stadtpark",
    children: ["Mila"],
    friends: ["Noah"],
    date: "2026-07-18",
    time: "15:00",
    location: "Volkspark, Spielplatz West",
    bring: "Picknickdecke & Trauben",
    status: "Bestätigt",
    color: "mint",
    reminder: "24 Stunden vorher",
    emailReminder: false,
    bringOwner: "Gemeinsam",
    activity: [],
    comments: [],
  },
  {
    id: 2,
    title: "Kreativnachmittag",
    children: ["Mila"],
    friends: ["Leni"],
    date: "2026-07-22",
    time: "16:00",
    location: "Bei Familie Berger",
    bring: "Malkittel",
    status: "Ausstehend",
    color: "peach",
    reminder: "24 Stunden vorher",
    emailReminder: false,
    bringOwner: "Wir",
    activity: [],
    comments: [],
  },
  {
    id: 3,
    title: "Planschen & Eis",
    children: ["Jonas"],
    friends: ["Emil"],
    date: "2026-07-27",
    time: "14:30",
    location: "Freibad Pankow",
    bring: "Sonnencreme",
    status: "Bestätigt",
    color: "lilac",
    reminder: "Keine",
    emailReminder: false,
    bringOwner: "Andere Familie",
    activity: [],
    comments: [],
  },
];
