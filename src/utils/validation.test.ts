import { describe, expect, it } from "vitest";
import type { childProfile } from "../domain/family";
import type { playDate } from "../domain/playdates";
import { validateFamily, validatePlayDate } from "./validation";

const validDate: playDate = { id: 1, title: "Treffen im Park", child: "Mila", friend: "Noah", date: "2026-08-20", time: "15:00", location: "Stadtpark", bring: "Wasser", status: "Ausstehend", color: "mint" };
const child = (patch: Partial<childProfile> = {}): childProfile => ({ id: "1", name: "Mila", birthday: "2020-03-02", shareBirthday: false, ...patch });

describe("Formularvalidierung", () => {
  it("akzeptiert ein vollständiges PlayDate", () => {
    expect(validatePlayDate(validDate, ["Mila"], false, new Date(2026, 6, 17))).toEqual({});
  });
  it("weist vergangene Termine und fremde Kinder zurück", () => {
    const errors = validatePlayDate({ ...validDate, child: "Unbekannt", date: "2025-01-01" }, ["Mila"], false, new Date(2026, 6, 17));
    expect(errors.child).toBeDefined();
    expect(errors.date).toContain("Vergangenheit");
  });
  it("begrenzt lange Texte", () => {
    expect(validatePlayDate({ ...validDate, bring: "x".repeat(501) }, ["Mila"]).bring).toBeDefined();
  });
  it("verlangt Familienname und mindestens ein Kind", () => {
    expect(validateFamily("", [])).toMatchObject({ familyName: expect.any(String), children: expect.any(String) });
  });
  it("erkennt doppelte Kindernamen unabhängig von Großschreibung", () => {
    expect(validateFamily("Muster", [child(), child({ id: "2", name: "mila" })]).children).toContain("nur einmal");
  });
  it("verhindert Geburtstagsteilung ohne Geburtstag", () => {
    expect(validateFamily("Muster", [child({ birthday: "", shareBirthday: true })])["birthday-1"]).toBeDefined();
  });
});
