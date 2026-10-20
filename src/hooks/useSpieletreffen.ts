import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  isSpieletreffenList,
  type spieletreffen,
} from "../domain/spieletreffen";
import { createLocalRepository } from "../data/localRepository";

export const spieletreffenStorageKey = (userId: string) =>
  `spielZeit.spieletreffen.${userId}`;

export function readSpieletreffen(userId: string): spieletreffen[] {
  const stored = createLocalRepository<unknown>({
    key: spieletreffenStorageKey(userId),
    fallback: [],
    rejectInvalidJson: true,
  }).read();

  if (!Array.isArray(stored)) {
    throw new Error("Die gespeicherten Termine sind keine Liste.");
  }

  // Erst alte Einträge umwandeln, dann ihre Struktur prüfen.
  const migrated = stored.map((item: unknown) => {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      throw new Error("Ein gespeicherter Termin ist ungültig.");
    }

    const date = item as Record<string, unknown>;

    return {
      ...date,
      children:
        date.children ??
        (typeof date.child === "string" && date.child ? [date.child] : []),
      friends:
        date.friends ??
        (typeof date.friend === "string" && date.friend ? [date.friend] : []),
    };
  });

  if (!isSpieletreffenList(migrated)) {
    throw new Error("Die gespeicherten Termine enthalten ungültige Daten.");
  }

  return migrated;
}

export function useSpieletreffen() {
  const { user } = useUser();

  if (!user) {
    throw new Error("SpielZeit-Daten dürfen nur angemeldet geladen werden.");
  }

  const userId = user.id;
  const [dates, setDates] = useState<spieletreffen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadDates() {
      setLoading(true);
      setError("");

      try {
        const key = spieletreffenStorageKey(userId);

        if (localStorage.getItem(key) === null) {
          const response = await fetch("/demoSpieletreffen.json", {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(
              "Die Beispieltermine konnten nicht geladen werden.",
            );
          }

          const data: unknown = await response.json();

          if (!isSpieletreffenList(data)) {
            throw new Error("Die Beispieltermine enthalten ungültige Daten.");
          }

          if (!active) return;

          // Ein inzwischen gespeicherter Stand darf nicht überschrieben werden.
          if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, JSON.stringify(data));
          }
        }

        const storedDates = readSpieletreffen(userId);

        if (active) {
          setDates(storedDates);
        }
      } catch {
        if (active) {
          setError(
            "Die Spieletreffen konnten nicht geladen werden. Bitte versuche es erneut.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDates();

    return () => {
      active = false;
      controller.abort();
    };
  }, [userId, attempt]);

  const save = (next: spieletreffen[]) => {
    createLocalRepository<spieletreffen[]>({
      key: spieletreffenStorageKey(userId),
      fallback: [],
    }).write(next);

    setDates(next);
  };

  const retry = () => {
    setAttempt((current) => current + 1);
  };

  return { dates, save, loading, error, retry };
}
