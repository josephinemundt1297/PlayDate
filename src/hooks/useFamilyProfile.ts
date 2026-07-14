import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  emptyFamilyProfile,
  type ChildProfile,
  type FamilyProfile,
  type SharedBirthday,
} from "../domain/family";

const keyFor = (userId: string) => `playDate.family.${userId}`;
const connectionsKey = (userId: string) =>
  `playDate.sharedBirthdays.${userId}`;
const legacyKeyFor = (userId: string) => `playpal.family.${userId}`;
const legacyConnectionsKey = (userId: string) =>
  `playpal.shared-birthdays.${userId}`;
// Alte Profile hatten nur Namen als Text. Beim Lesen bauen wir daraus automatisch das neue Format.
export function readFamilyProfile(userId: string): FamilyProfile {
  const value =
    localStorage.getItem(keyFor(userId)) ??
    localStorage.getItem(legacyKeyFor(userId));
  if (!value) return emptyFamilyProfile;
  if (!localStorage.getItem(keyFor(userId))) {
    localStorage.setItem(keyFor(userId), value);
  }
  const parsed = JSON.parse(value) as
    | FamilyProfile
    | { familyName: string; children: string[] };
  const children: ChildProfile[] = parsed.children.map((child) =>
    typeof child === "string"
      ? {
          id: crypto.randomUUID(),
          name: child,
          birthday: "",
          shareBirthday: true,
        }
      : child,
  );
  return { ...parsed, children };
}
// Hier landen später die freigegebenen Geburtstage aus echten Familienverbindungen.
export function readSharedBirthdays(userId: string): SharedBirthday[] {
  const value =
    localStorage.getItem(connectionsKey(userId)) ??
    localStorage.getItem(legacyConnectionsKey(userId));
  if (value && !localStorage.getItem(connectionsKey(userId))) {
    localStorage.setItem(connectionsKey(userId), value);
  }
  return value ? JSON.parse(value) : [];
}
export function useFamilyProfile() {
  const { user } = useUser();
  if (!user) throw new Error("Anmeldung erforderlich");
  const [profile, setProfile] = useState<FamilyProfile>(() =>
    readFamilyProfile(user.id),
  );
  const save = (next: FamilyProfile) => {
    setProfile(next);
    localStorage.setItem(keyFor(user.id), JSON.stringify(next));
  };
  return { profile, save, sharedBirthdays: readSharedBirthdays(user.id) };
}
