import { describe, expect, it } from "vitest";
import { createLocalRepository } from "./localRepository";

describe("lokale Repository-Schicht", () => {
  it("liest und schreibt typisierte Trainingsdaten", () => {
    const repository = createLocalRepository({ key: "test.profile", fallback: { name: "" } });

    repository.write({ name: "Familie Demo" });

    expect(repository.read()).toEqual({ name: "Familie Demo" });
  });

  it("fällt bei beschädigten Browserdaten sicher auf den Startwert zurück", () => {
    localStorage.setItem("test.broken", "kein json");
    const repository = createLocalRepository({ key: "test.broken", fallback: [] as string[] });

    expect(repository.read()).toEqual([]);
  });

  it("übernimmt alte Daten einmal unter den neuen Schlüssel", () => {
    localStorage.setItem("playpal.old", JSON.stringify(["Demo"]));
    const repository = createLocalRepository({
      key: "playDate.new",
      legacyKeys: ["playpal.old"],
      fallback: [] as string[],
    });

    expect(repository.read()).toEqual(["Demo"]);
    expect(localStorage.getItem("playDate.new")).toBe('["Demo"]');
  });
});
