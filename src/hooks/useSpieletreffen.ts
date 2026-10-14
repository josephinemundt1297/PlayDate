import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { initialSpieletreffen, type spieletreffen } from "../domain/spieletreffen";
import { createLocalRepository } from "../data/localRepository";

// Die User-ID steckt im Schlüssel, damit zwei Eltern nicht dieselben lokalen Daten sehen.
export const spieletreffenStorageKey = (userId: string) =>
  `spielZeit.spieletreffen.${userId}`;

export function readSpieletreffen(userId: string): spieletreffen[] {
  type legacySpieletreffen = Omit<spieletreffen, "children" | "friends"> & {
    child?: string;
    friend?: string;
    children?: string[];
  };
  const stored = createLocalRepository<Array<spieletreffen | legacySpieletreffen>>({
    key: spieletreffenStorageKey(userId),
    fallback: initialSpieletreffen,
  }).read();

  // Früher gab es für jede Seite nur einen Namen. Hier packen wir alte Werte in die neuen Listen.
  return stored.map((date) => ({
    ...date,
    children:
      date.children ?? ("child" in date && date.child ? [date.child] : []),
    friends: "friends" in date ? date.friends : date.friend ? [date.friend] : [],
  }));
}

export function useSpieletreffen() {
  const { user } = useUser();
  if (!user)
    throw new Error("SpielZeit-Daten dürfen nur angemeldet geladen werden");
  const [dates, setDates] = useState<spieletreffen[]>(() => readSpieletreffen(user.id));
  // State aktualisiert sofort die Ansicht, LocalStorage merkt sich alles nach dem Neuladen.
  const save = (next: spieletreffen[]) => {
    setDates(next);
    createLocalRepository({
      key: spieletreffenStorageKey(user.id),
      fallback: initialSpieletreffen,
    }).write(next);
  };
  return { dates, save };
}
