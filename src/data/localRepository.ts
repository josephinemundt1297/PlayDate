// Diese Schicht bündelt das Lesen und Schreiben im Browser.
export type localRepository<data> = {
  read: () => data;
  write: (value: data) => void;
  remove: () => void;
};

export function createLocalRepository<data>({
  key,
  fallback,
  legacyKeys = [],
  rejectInvalidJson = false,
}: {
  key: string;
  fallback: data;
  legacyKeys?: string[];
  rejectInvalidJson?: boolean;
}): localRepository<data> {
  const read = () => {
    const current = localStorage.getItem(key);
    const legacy = legacyKeys
      .map((legacyKey) => localStorage.getItem(legacyKey))
      .find((value): value is string => value !== null);

    const stored = current ?? legacy ?? null;

    if (stored === null) return fallback;

    try {
      const parsed = JSON.parse(stored) as data;

      // Alte Speicherbereiche werden bei Bedarf übernommen.
      if (current === null) localStorage.setItem(key, stored);

      return parsed;
    } catch (error) {
      // Manche Aufrufer möchten einen Fehler anzeigen statt leer zu starten.
      if (rejectInvalidJson) throw error;

      return fallback;
    }
  };

  return {
    read,
    write: (value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: () => localStorage.removeItem(key),
  };
}
