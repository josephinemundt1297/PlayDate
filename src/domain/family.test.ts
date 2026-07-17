import { describe, expect, it } from "vitest";
import { birthdaysFromConnections, type familyConnection } from "./family";

describe("lokale Familienverbindungen", () => {
  it("zeigt Geburtstage ausschließlich bei angenommenen Verbindungen", () => {
    const connections: familyConnection[] = [
      { id: "1", familyName: "Demo", childName: "Lina", birthday: "2020-05-03", status: "Verbunden" },
      { id: "2", familyName: "Offen", childName: "Noah", birthday: "2021-06-04", status: "Ausstehend" },
    ];

    expect(birthdaysFromConnections(connections)).toEqual([
      { id: "1", familyName: "Demo", childName: "Lina", birthday: "2020-05-03" },
    ]);
  });
});
