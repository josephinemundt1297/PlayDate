import { describe, expect, it } from "vitest";
import { createLocalRepository } from "../data/localRepository";

describe("lokale Repository-Schicht", () => {
  it("liest und schreibt typisierte Trainingsdaten", () => {
    const repository = createLocalRepository({
      key: "test.profile",
      fallback: { name: "" },
    });

    repository.write({ name: "Familie Demo" });

    expect(repository.read()).toEqual({ name: "Familie Demo" });
  });

  it("fällt bei beschädigten Browserdaten sicher auf den Startwert zurück", () => {
    localStorage.setItem("test.broken", "kein json");
    const repository = createLocalRepository({
      key: "test.broken",
      fallback: [] as string[],
    });

    expect(repository.read()).toEqual([]);
  });

  it("übernimmt alte Daten einmal unter den neuen Schlüssel", () => {
    localStorage.setItem("spielZeit.alt", JSON.stringify(["Demo"]));
    const repository = createLocalRepository({
      key: "spielZeit.new",
      legacyKeys: ["spielZeit.alt"],
      fallback: [] as string[],
    });

    expect(repository.read()).toEqual(["Demo"]);
    expect(localStorage.getItem("spielZeit.new")).toBe('["Demo"]');
  });
  it("gibt bei aktivierter Fehlerprüfung kaputtes JSON als Fehler weiter", () => {
    localStorage.setItem("test.invalid", "kein JSON");

    const repository = createLocalRepository({
      key: "test.invalid",
      fallback: [],
      rejectInvalidJson: true,
    });

    expect(() => repository.read()).toThrow();
    expect(localStorage.getItem("test.invalid")).toBe("kein JSON");
  });
});
