// Kleine Datentypen zuerst: So sieht man direkt, was zum Kind und was zur Familie gehört.
export type childProfile = {
  id: string;
  name: string;
  birthday: string;
  shareBirthday: boolean;
};
export type familyProfile = { familyName: string; children: childProfile[] };
export type sharedBirthday = {
  id: string;
  childName: string;
  familyName: string;
  birthday: string;
};
export const emptyFamilyProfile: familyProfile = {
  familyName: "",
  children: [],
};
// Für eine neue Formularzeile brauchen wir ein leeres Kind mit einer eindeutigen ID.
export const newChild = (): childProfile => ({
  id: crypto.randomUUID(),
  name: "",
  birthday: "",
  shareBirthday: true,
});
