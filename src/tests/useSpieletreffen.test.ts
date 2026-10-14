import { describe, expect, it } from "vitest";
import { spieletreffenStorageKey, readSpieletreffen } from "../hooks/useSpieletreffen";

describe("SpielZeit-Datenmigration", () => {
  it("übernimmt ein altes einzelnes Kind in die neue Kinderliste", () => {
    localStorage.setItem(
      spieletreffenStorageKey("user-1"),
      JSON.stringify([{
        id: 1,
        title: "Demo",
        child: "Mila",
        friend: "Noah",
        date: "2026-08-20",
        time: "15:00",
        location: "Park",
        bring: "",
        status: "Ausstehend",
        color: "mint",
      }]),
    );

    expect(readSpieletreffen("user-1")[0]?.children).toEqual(["Mila"]);
    expect(readSpieletreffen("user-1")[0]?.friends).toEqual(["Noah"]);
  });
});
