export type localDataExport = {
  exportedAt: string;
  family: unknown;
  sharedBirthdays: unknown;
  connections: unknown;
  playDates: unknown;
};

const keysFor = (userId: string) => ({
  family: `playDate.family.${userId}`,
  sharedBirthdays: `playDate.sharedBirthdays.${userId}`,
  connections: `playDate.connections.${userId}`,
  playDates: `playDate.playDates.${userId}`,
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
  return {
    exportedAt: new Date().toISOString(),
    family: readJson(keys.family),
    sharedBirthdays: readJson(keys.sharedBirthdays),
    connections: readJson(keys.connections),
    playDates: readJson(keys.playDates),
  };
}

export function removeLocalData(userId: string) {
  Object.values(keysFor(userId)).forEach((key) => localStorage.removeItem(key));
}

export function downloadLocalData(userId: string) {
  const file = new Blob([JSON.stringify(collectLocalData(userId), null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "playDate-meine-daten.json";
  link.click();
  URL.revokeObjectURL(url);
}
