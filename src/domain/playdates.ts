// Der gemeinsame Bauplan für ein PlayDate. So wissen alle Dateien, welche Felder vorhanden sind.
export type playDate = {
  id: number;
  title: string;
  child: string;
  friend: string;
  date: string;
  time: string;
  location: string;
  bring: string;
  status: "Bestätigt" | "Ausstehend" | "Abgesagt";
  color: "mint" | "peach" | "lilac";
  reminder?: "Keine" | "24 Stunden vorher";
  emailReminder?: boolean;
  bringOwner?: "Wir" | "Andere Familie" | "Gemeinsam";
  activity?: playDateActivity[];
  comments?: playDateComment[];
};
export type playDateActivity = {
  id: string;
  message: string;
  createdAt: string;
};
export type playDateComment = {
  id: string;
  text: string;
  createdAt: string;
};

export function cancelPlayDate(date: playDate): playDate {
  return {
    ...date,
    status: "Abgesagt",
    reminder: "Keine",
    emailReminder: false,
    activity: [
      ...(date.activity ?? []),
      { id: crypto.randomUUID(), message: "PlayDate abgesagt", createdAt: new Date().toISOString() },
    ],
  };
}

export function addPlayDateComment(date: playDate, text: string): playDate {
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
export const initialPlayDates: playDate[] = [
  {
    id: 1,
    title: "Abenteuer im Stadtpark",
    child: "Mila",
    friend: "Noah",
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
    child: "Mila",
    friend: "Leni",
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
    child: "Jonas",
    friend: "Emil",
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
