import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { PhotosPage } from "../components/pages/photosPage";
import { PrivacyPage } from "../components/pages/privacyPage";

describe("automatisierte A11Y-Basisprüfung", () => {
  it.each([
    ["Datenschutzseite", PrivacyPage],
    ["Fotoseite", PhotosPage],
  ])("findet auf der %s keine automatisch erkennbaren Verstöße", async (_, Page) => {
    const { container } = render(<main><Page /></main>);

    const result = await axe.run(container, {
      // jsdom berechnet keine echten Farben. Kontraste testen wir deshalb separat rechnerisch.
      rules: { "color-contrast": { enabled: false } },
    });

    expect(result.violations).toEqual([]);
  });
});
