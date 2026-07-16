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
  status: "Bestätigt" | "Ausstehend";
  color: "mint" | "peach" | "lilac";
};

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
  },
];
