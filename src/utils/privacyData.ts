import type { familyInvitation } from "../domain/family";

export type localDataExport = {
  exportedAt: string;
  family: unknown;
  sharedBirthdays: unknown;
  connections: unknown;
  spieletreffen: unknown;
  trainingInvitations: familyInvitation[];
};

const invitationKey = "spielZeit.trainingInvitations";

const keysFor = (userId: string) => ({
  family: `spielZeit.family.${userId}`,
  sharedBirthdays: `spielZeit.sharedBirthdays.${userId}`,
  connections: `spielZeit.connections.${userId}`,
  spieletreffen: `spielZeit.spieletreffen.${userId}`,
});

const readJson = (key: string) => {
  const value = localStorage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
};

export function collectLocalData(userId: string): localDataExport {
  const keys = keysFor(userId);
  const invitations = readJson(invitationKey);
  return {
    exportedAt: new Date().toISOString(),
    family: readJson(keys.family),
    sharedBirthdays: readJson(keys.sharedBirthdays),
    connections: readJson(keys.connections),
    spieletreffen: readJson(keys.spieletreffen),
    trainingInvitations: Array.isArray(invitations)
      ? invitations.filter((item) => item?.createdBy === userId)
      : [],
  };
}

export function removeLocalData(userId: string) {
  Object.values(keysFor(userId)).forEach((key) => localStorage.removeItem(key));
  const invitations = readJson(invitationKey);
  if (!Array.isArray(invitations)) return;

  const remaining = invitations.filter((item) => item?.createdBy !== userId);
  if (remaining.length) localStorage.setItem(invitationKey, JSON.stringify(remaining));
  else localStorage.removeItem(invitationKey);
}

export function downloadLocalData(userId: string) {
  const file = new Blob([JSON.stringify(collectLocalData(userId), null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "spielZeit-meine-daten.json";
  link.click();
  URL.revokeObjectURL(url);
}
