import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  addSpieletreffenComment,
  cancelSpieletreffen,
  isSpieletreffenList,
} from "../domain/spieletreffen";

const demoFile = readFileSync(
  `${process.cwd()}/public/demoSpieletreffen.json`,
  "utf8",
);

const demoData: unknown = JSON.parse(demoFile);

if (!isSpieletreffenList(demoData)) {
  throw new Error("Die Demo-Datei enthält ungültige Termine.");
}

const initialSpieletreffen = demoData;

describe("Spieletreffen-Zustandsänderungen", () => {
  it("deaktiviert Erinnerungen bei einer Absage und behält einen Verlauf", () => {
    const cancelled = cancelSpieletreffen(initialSpieletreffen[0]!);

    expect(cancelled.status).toBe("Abgesagt");
    expect(cancelled.reminder).toBe("Keine");
    expect(cancelled.emailReminder).toBe(false);
    expect(cancelled.activity?.at(-1)?.message).toBe("Spieletreffen abgesagt");
  });

  it("ergänzt einen Kommentar ohne bestehende Daten zu überschreiben", () => {
    const updated = addSpieletreffenComment(
      initialSpieletreffen[0]!,
      "Wir bringen Obst mit.",
    );

    expect(updated.comments?.at(-1)?.text).toBe("Wir bringen Obst mit.");
    expect(updated.activity?.at(-1)?.message).toBe("Kommentar ergänzt");
  });
});
