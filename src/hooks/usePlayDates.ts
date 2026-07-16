import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { initialPlayDates, type playDate } from "../domain/playdates";

// Die User-ID steckt im Schlüssel, damit zwei Eltern nicht dieselben lokalen Daten sehen.
export const playDatesStorageKey = (userId: string) =>
  `playDate.playDates.${userId}`;
const legacyStorageKey = (userId: string) => `playpal.playdates.${userId}`;

export function readPlayDates(userId: string): playDate[] {
  // LocalStorage reicht für den Prototyp. In Produktion gehört das in eine geschützte Datenbank.
  const stored =
    localStorage.getItem(playDatesStorageKey(userId)) ??
    localStorage.getItem(legacyStorageKey(userId));
  // Wer die App schon genutzt hat, behält seine Daten trotz des neuen Namens.
  if (stored && !localStorage.getItem(playDatesStorageKey(userId))) {
    localStorage.setItem(playDatesStorageKey(userId), stored);
  }
  return stored ? JSON.parse(stored) : initialPlayDates;
}

export function usePlayDates() {
  const { user } = useUser();
  if (!user)
    throw new Error("PlayDate-Daten dürfen nur angemeldet geladen werden");
  const [dates, setDates] = useState<playDate[]>(() => readPlayDates(user.id));
  // State aktualisiert sofort die Ansicht, LocalStorage merkt sich alles nach dem Neuladen.
  const save = (next: playDate[]) => {
    setDates(next);
    localStorage.setItem(playDatesStorageKey(user.id), JSON.stringify(next));
  };
  return { dates, save };
}
