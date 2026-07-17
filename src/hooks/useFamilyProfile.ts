import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  emptyFamilyProfile,
  birthdaysFromConnections,
  type childProfile,
  type familyProfile,
  type sharedBirthday,
} from "../domain/family";
import { createLocalRepository } from "../data/localRepository";
import { readFamilyConnections } from "./useFamilyConnections";

const keyFor = (userId: string) => `playDate.family.${userId}`;
const connectionsKey = (userId: string) =>
  `playDate.sharedBirthdays.${userId}`;
const legacyKeyFor = (userId: string) => `playpal.family.${userId}`;
const legacyConnectionsKey = (userId: string) =>
  `playpal.shared-birthdays.${userId}`;
// Alte Profile hatten nur Namen als Text. Beim Lesen bauen wir daraus automatisch das neue Format.
export function readFamilyProfile(userId: string): familyProfile {
  const parsed = createLocalRepository<
    | familyProfile
    | { familyName: string; children: string[] }
  >({
    key: keyFor(userId),
    legacyKeys: [legacyKeyFor(userId)],
    fallback: emptyFamilyProfile,
  }).read();
  const children: childProfile[] = parsed.children.map((child) =>
    typeof child === "string"
      ? {
          id: crypto.randomUUID(),
          name: child,
          birthday: "",
          shareBirthday: true,
        }
      : child,
  );
  return {
    ...parsed,
    children,
    caregivers: "caregivers" in parsed ? parsed.caregivers ?? [] : [],
  };
}
// Hier landen später die freigegebenen Geburtstage aus echten Familienverbindungen.
export function readSharedBirthdays(userId: string): sharedBirthday[] {
  return createLocalRepository<sharedBirthday[]>({
    key: connectionsKey(userId),
    legacyKeys: [legacyConnectionsKey(userId)],
    fallback: [],
  }).read();
}
export function useFamilyProfile() {
  const { user } = useUser();
  if (!user) throw new Error("Anmeldung erforderlich");
  const [profile, setProfile] = useState<familyProfile>(() =>
    readFamilyProfile(user.id),
  );
  const save = (next: familyProfile) => {
    setProfile(next);
    createLocalRepository({
      key: keyFor(user.id),
      legacyKeys: [legacyKeyFor(user.id)],
      fallback: emptyFamilyProfile,
    }).write(next);
  };
  const sharedBirthdays = [
    ...readSharedBirthdays(user.id),
    ...birthdaysFromConnections(readFamilyConnections(user.id)),
  ];
  return { profile, save, sharedBirthdays };
}
