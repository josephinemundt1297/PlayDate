import { describe, expect, it } from "vitest";
import { collectLocalData, removeLocalData } from "../utils/privacyData";

describe("lokale Datenschutzfunktionen", () => {
  it("exportiert nur die SpielZeit-Daten des gewählten Trainingskontos", () => {
    localStorage.setItem("spielZeit.family.user-1", JSON.stringify({ familyName: "Demo" }));
    localStorage.setItem("spielZeit.family.user-2", JSON.stringify({ familyName: "Fremd" }));
    localStorage.setItem("spielZeit.trainingInvitations", JSON.stringify([
      { token: "PD-USER-0001", createdBy: "user-1" },
      { token: "PD-USER-0002", createdBy: "user-2" },
    ]));

    const exported = collectLocalData("user-1");

    expect(exported.family).toEqual({ familyName: "Demo" });
    expect(exported.trainingInvitations).toHaveLength(1);
    expect(JSON.stringify(exported)).not.toContain("Fremd");
  });

  it("löscht lokale Familiendaten, Geburtstage und Spieletreffen gemeinsam", () => {
    ["family", "sharedBirthdays", "connections", "spieletreffen"].forEach((area) =>
      localStorage.setItem(`spielZeit.${area}.user-1`, "[]"),
    );
    localStorage.setItem("spielZeit.trainingInvitations", JSON.stringify([
      { token: "PD-USER-0001", createdBy: "user-1" },
    ]));

    removeLocalData("user-1");

    expect(Object.keys(localStorage)).toEqual([]);
  });
});
