import { describe, expect, it } from "vitest";
import { createWebsiteShortcut } from "./websiteShortcut";

describe("Website-Verknüpfung", () => {
  it("erstellt eine Windows-kompatible Internet-Verknüpfung", () => {
    expect(createWebsiteShortcut("https://playdate.example/calendar")).toBe(
      "[InternetShortcut]\r\nURL=https://playdate.example/calendar\r\n",
    );
  });
});
