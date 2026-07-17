// Kleine Datentypen zuerst: So sieht man direkt, was zum Kind und was zur Familie gehört.
export type childProfile = {
  id: string;
  name: string;
  birthday: string;
  shareBirthday: boolean;
};
export type familyProfile = {
  familyName: string;
  children: childProfile[];
  caregivers?: string[];
};
export type sharedBirthday = {
  id: string;
  childName: string;
  familyName: string;
  birthday: string;
};
export type connectionStatus = "Ausstehend" | "Verbunden" | "Blockiert";
export type familyConnection = {
  id: string;
  familyName: string;
  childName: string;
  birthday: string;
  status: connectionStatus;
};
export const emptyFamilyProfile: familyProfile = {
  familyName: "",
  children: [],
  caregivers: [],
};
// Für eine neue Formularzeile brauchen wir ein leeres Kind mit einer eindeutigen ID.
export const newChild = (): childProfile => ({
  id: crypto.randomUUID(),
  name: "",
  birthday: "",
  shareBirthday: true,
});

export function birthdaysFromConnections(
  connections: familyConnection[],
): sharedBirthday[] {
  return connections
    .filter((connection) => connection.status === "Verbunden" && connection.birthday)
    .map((connection) => ({
      id: connection.id,
      childName: connection.childName,
      familyName: connection.familyName,
      birthday: connection.birthday,
    }));
}
