import { describe, expect, it } from "vitest";
import { collectLocalData, removeLocalData } from "./privacyData";

describe("lokale Datenschutzfunktionen", () => {
  it("exportiert nur die PlayDate-Daten des gewählten Trainingskontos", () => {
    localStorage.setItem("playDate.family.user-1", JSON.stringify({ familyName: "Demo" }));
    localStorage.setItem("playDate.family.user-2", JSON.stringify({ familyName: "Fremd" }));

    const exported = collectLocalData("user-1");

    expect(exported.family).toEqual({ familyName: "Demo" });
    expect(JSON.stringify(exported)).not.toContain("Fremd");
  });

  it("löscht lokale Familiendaten, Geburtstage und PlayDates gemeinsam", () => {
    ["family", "sharedBirthdays", "connections", "playDates"].forEach((area) =>
      localStorage.setItem(`playDate.${area}.user-1`, "[]"),
    );

    removeLocalData("user-1");

    expect(Object.keys(localStorage)).toEqual([]);
  });
});
