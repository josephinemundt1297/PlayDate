import { describe, expect, it } from "vitest";
import { addPlayDateComment, cancelPlayDate, initialPlayDates } from "./playdates";

describe("PlayDate-Zustandsänderungen", () => {
  it("deaktiviert Erinnerungen bei einer Absage und behält einen Verlauf", () => {
    const cancelled = cancelPlayDate(initialPlayDates[0]!);

    expect(cancelled.status).toBe("Abgesagt");
    expect(cancelled.reminder).toBe("Keine");
    expect(cancelled.emailReminder).toBe(false);
    expect(cancelled.activity?.at(-1)?.message).toBe("PlayDate abgesagt");
  });

  it("ergänzt einen Kommentar ohne bestehende Daten zu überschreiben", () => {
    const updated = addPlayDateComment(initialPlayDates[0]!, "Wir bringen Obst mit.");

    expect(updated.comments?.at(-1)?.text).toBe("Wir bringen Obst mit.");
    expect(updated.activity?.at(-1)?.message).toBe("Kommentar ergänzt");
  });
});
