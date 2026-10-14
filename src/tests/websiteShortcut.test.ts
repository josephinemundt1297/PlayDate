import { describe, expect, it } from "vitest";
import { createWebsiteShortcut } from "../utils/websiteShortcut";

describe("Website-Verknüpfung", () => {
  it("erstellt eine Windows-kompatible Internet-Verknüpfung", () => {
    expect(createWebsiteShortcut("https://spielzeit.netlify.app/calendar")).toBe(
      "[InternetShortcut]\r\nURL=https://spielzeit.netlify.app/calendar\r\n",
    );
  });
});
