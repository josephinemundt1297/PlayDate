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
      {
        id: crypto.randomUUID(),
        message: "Spieletreffen abgesagt",
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

export function addSpieletreffenComment(
  date: spieletreffen,
  text: string,
): spieletreffen {
  // Wir bauen ein neues Objekt, damit React die Änderung sicher erkennt.
  return {
    ...date,
    comments: [
      ...(date.comments ?? []),
      { id: crypto.randomUUID(), text, createdAt: new Date().toISOString() },
    ],
    activity: [
      ...(date.activity ?? []),
      {
        id: crypto.randomUUID(),
        message: "Kommentar ergänzt",
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

// Nur Startdaten für den Prototyp. Echte Termine kommen später aus dem Backend.
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTextList(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item: unknown) => typeof item === "string")
  );
}

function isHistoryList(value: unknown, textField: "text" | "message") {
  return (
    value === undefined ||
    (Array.isArray(value) &&
      value.every(
        (item: unknown) =>
          isRecord(item) &&
          typeof item.id === "string" &&
          typeof item[textField] === "string" &&
          typeof item.createdAt === "string",
      ))
  );
}

// Browserdaten und JSON-Antworten müssen auch zur Laufzeit geprüft werden.
export function isSpieletreffenList(value: unknown): value is spieletreffen[] {
  if (!Array.isArray(value)) return false;

  return value.every((item: unknown) => {
    if (!isRecord(item)) return false;

    return (
      typeof item.id === "number" &&
      Number.isSafeInteger(item.id) &&
      typeof item.title === "string" &&
      isTextList(item.children) &&
      isTextList(item.friends) &&
      typeof item.date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
      !Number.isNaN(new Date(`${item.date}T12:00:00`).getTime()) &&
      typeof item.time === "string" &&
      /^([01]\d|2[0-3]):[0-5]\d$/.test(item.time) &&
      typeof item.location === "string" &&
      typeof item.bring === "string" &&
      typeof item.status === "string" &&
      ["Bestätigt", "Ausstehend", "Abgesagt"].includes(item.status) &&
      typeof item.color === "string" &&
      ["mint", "peach", "lilac"].includes(item.color) &&
      (item.reminder === undefined ||
        item.reminder === "Keine" ||
        item.reminder === "24 Stunden vorher") &&
      (item.emailReminder === undefined ||
        typeof item.emailReminder === "boolean") &&
      (item.bringOwner === undefined ||
        item.bringOwner === "Wir" ||
        item.bringOwner === "Andere Familie" ||
        item.bringOwner === "Gemeinsam") &&
      isHistoryList(item.activity, "message") &&
      isHistoryList(item.comments, "text")
    );
  });
}
