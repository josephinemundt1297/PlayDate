import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { isSpieletreffenList } from "../domain/spieletreffen";

const demoData: unknown = JSON.parse(
  readFileSync(`${process.cwd()}/public/demoSpieletreffen.json`, "utf8"),
);

if (!isSpieletreffenList(demoData)) {
  throw new Error("Die Demo-Datei enthält ungültige Termine.");
}

const demoDate = demoData[0];

if (!demoDate) {
  throw new Error("Für diesen Test wird ein Beispieltermin benötigt.");
}

describe("Datumsprüfung eingelesener Spieletreffen", () => {
  it.each([
    { date: "2026-02-28", expected: true },
    { date: "2028-02-29", expected: true },
    { date: "2026-02-29", expected: false },
    { date: "2026-02-31", expected: false },
    { date: "2026-04-31", expected: false },
    { date: "2026-13-01", expected: false },
    { date: "2026-2-03", expected: false },
    { date: null, expected: false },
  ])("prüft das Datum $date", ({ date, expected }) => {
    const candidate = [{ ...demoDate, date }];

    expect(isSpieletreffenList(candidate)).toBe(expected);
  });
});
