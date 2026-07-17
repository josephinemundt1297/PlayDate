import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const appCss = readFileSync(`${process.cwd()}/src/app.css`, "utf8");
const indexHtml = readFileSync(`${process.cwd()}/index.html`, "utf8");

describe("Responsive Layout", () => {
  it("aktiviert das kompakte Layout schon auf Tablets", () => {
    expect(appCss).toContain("@media (max-width: 1024px)");
    expect(appCss).not.toContain("@media (max-width: 760px)");
  });

  it("lässt mobile Navigationseinträge schrumpfen", () => {
    const mobileLinkRule = appCss.match(/\.bottom-nav a \{[\s\S]*?\n  \}/)?.[0];

    expect(mobileLinkRule).toContain("min-width: 0");
    expect(mobileLinkRule).toContain("overflow: hidden");
  });

  it("setzt den Erstellen-Button in die mittlere von fünf Spalten", () => {
    expect(appCss).toMatch(
      /\.bottom-nav \{[\s\S]*?grid-template-columns: repeat\(5, 1fr\)/,
    );
  });

  it("stapelt breite Kalenderaktionen auf sehr schmalen Geräten", () => {
    expect(appCss).toContain("@media (max-width: 380px)");
    expect(appCss).toMatch(
      /@media \(max-width: 380px\)[\s\S]*\.calendar-page-actions \{[\s\S]*flex-direction: column/,
    );
  });

  it("erzwingt keine feste Mindestbreite für den Seitenkörper", () => {
    const indexCss = readFileSync(`${process.cwd()}/src/index.css`, "utf8");
    expect(indexCss).toContain("body {");
    expect(indexCss).toContain("min-width: 0");
    expect(indexCss).not.toContain("min-width: 320px");
  });

  it("blendet den Datenschutzlink im kompakten Layout nicht aus", () => {
    expect(appCss).not.toMatch(/\.privacy-note a \{\s*display: none/);
  });

  it("enthält die notwendige Viewport-Angabe", () => {
    expect(indexHtml).toContain(
      'name="viewport" content="width=device-width, initial-scale=1.0"',
    );
  });
});
