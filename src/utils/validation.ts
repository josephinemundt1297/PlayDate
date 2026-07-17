import type { childProfile } from "../domain/family";
import type { playDate } from "../domain/playdates";

export type validationErrors = Record<string, string>;
const clean = (value: string) => value.trim();
const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T12:00:00`).getTime());

export function validatePlayDate(date: playDate, childNames: string[], allowPast = false, today = new Date()): validationErrors {
  const errors: validationErrors = {};
  if (clean(date.title).length < 3) errors.title = "Der Titel braucht mindestens 3 Zeichen.";
  if (clean(date.title).length > 80) errors.title = "Der Titel darf höchstens 80 Zeichen haben.";
  if (!childNames.includes(date.child)) errors.child = "Bitte wähle ein Kind aus deinem Familienprofil.";
  if (clean(date.friend).length < 2) errors.friend = "Bitte gib einen Namen mit mindestens 2 Zeichen ein.";
  if (!validDate(date.date)) errors.date = "Bitte wähle ein gültiges Datum.";
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (!allowPast && validDate(date.date) && date.date < todayKey) errors.date = "Ein neues PlayDate kann nicht in der Vergangenheit liegen.";
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(date.time)) errors.time = "Bitte wähle eine gültige Uhrzeit.";
  if (clean(date.location).length < 3) errors.location = "Der Treffpunkt braucht mindestens 3 Zeichen.";
  if (date.bring.length > 500) errors.bring = "Mitbringsel dürfen höchstens 500 Zeichen lang sein.";
  return errors;
}

export function validateFamily(familyName: string, children: childProfile[], today = new Date()): validationErrors {
  const errors: validationErrors = {};
  const names = children.map((child) => clean(child.name)).filter(Boolean);
  if (clean(familyName).length < 2) errors.familyName = "Bitte gib einen Familiennamen mit mindestens 2 Zeichen ein.";
  if (!names.length) errors.children = "Lege mindestens ein Kind an.";
  const normalized = names.map((name) => name.toLocaleLowerCase("de-DE"));
  if (new Set(normalized).size !== normalized.length) errors.children = "Jeder Kindername darf nur einmal vorkommen.";
  const todayKey = today.toISOString().slice(0, 10);
  children.forEach((child) => {
    if (child.name.trim().length === 1) errors[`child-${child.id}`] = "Ein Name braucht mindestens 2 Zeichen.";
    if (child.birthday && (!validDate(child.birthday) || child.birthday > todayKey)) errors[`birthday-${child.id}`] = "Der Geburtstag muss gültig sein und darf nicht in der Zukunft liegen.";
    if (child.shareBirthday && !child.birthday) errors[`birthday-${child.id}`] = "Trage erst einen Geburtstag ein, bevor du ihn teilst.";
  });
  return errors;
}
