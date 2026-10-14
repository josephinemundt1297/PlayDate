// Diese kleine Schicht hält localStorage aus unseren Komponenten heraus.
// Später könnte hier eine API stehen, ohne dass jede Page neu gebaut werden muss.
export type localRepository<data> = {
  read: () => data;
  write: (value: data) => void;
  remove: () => void;
};

export function createLocalRepository<data>({
  key,
  fallback,
  legacyKeys = [],
}: {
  key: string;
  fallback: data;
  legacyKeys?: string[];
}): localRepository<data> {
  const read = () => {
    // Zuerst suchen wir unter dem aktuellen Schlüssel. Alte Schlüssel dienen nur als Umzugshilfe.
    const current = localStorage.getItem(key);
    const legacy = legacyKeys
      .map((legacyKey) => localStorage.getItem(legacyKey))
      .find((value): value is string => value !== null);
    const stored = current ?? legacy ?? null;

    // Noch nie gespeichert? Dann bekommt die aufrufende Stelle einen sicheren Startwert zurück.
    if (stored === null) return fallback;

    try {
      const parsed = JSON.parse(stored) as data;

      // Beim ersten Lesen ziehen wir alte Daten unter den neuen Namen um.
      if (current === null) localStorage.setItem(key, stored);
      return parsed;
    } catch {
      // Kaputte Browserdaten sollen eine verständliche leere Ansicht statt eines Absturzes liefern.
      return fallback;
    }
  };

  return {
    read,
    // JSON macht aus Arrays und Objekten einen Text, den localStorage speichern kann.
    write: (value) => localStorage.setItem(key, JSON.stringify(value)),
    // remove löscht nur genau diesen Bereich und niemals pauschal den ganzen Browserspeicher.
    remove: () => localStorage.removeItem(key),
  };
}
