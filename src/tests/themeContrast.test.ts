import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexCss = readFileSync(`${process.cwd()}/src/index.css`, "utf8");
const appCss = readFileSync(`${process.cwd()}/src/app.css`, "utf8");

const luminance = (hex: string) => {
  const colors = hex
    .match(/\w\w/g)!
    .map((color) => Number.parseInt(color, 16) / 255)
    .map((color) =>
      color <= 0.04045 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4,
    );
  return colors[0] * 0.2126 + colors[1] * 0.7152 + colors[2] * 0.0722;
};

const contrast = (first: string, second: string) => {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

describe("Theme-Kontraste", () => {
  it.each([
    ["light", "#365f82", "#ffffff"],
    ["dark", "#4f789e", "#ffffff"],
  ])("hält den primären Button im %s Theme lesbar", (_, background, text) => {
    expect(contrast(background, text)).toBeGreaterThanOrEqual(4.5);
  });

  it("schützt primäre Links im Seitenkopf vor der allgemeinen Linkfarbe", () => {
    expect(appCss).toContain(".section-heading a.btn-primary");
    expect(appCss).toContain("color: var(--color-primary-content)");
    expect(indexCss).toContain("--color-primary-content: #ffffff");
  });

  it("schützt den Bearbeiten-Button im Kalenderdialog vor unlesbarer Textfarbe", () => {
    expect(appCss).toMatch(
      /\.playdate-dialog \.btn-primary \{[\s\S]*?background: var\(--color-primary\);[\s\S]*?color: var\(--color-primary-content\);/,
    );
  });

  it("macht ausgewählte Kinder und Kontakte als aktive Karte sichtbar", () => {
    expect(appCss).toMatch(
      /\.selection-option:has\(input:checked\) \{[\s\S]*?border-color: var\(--color-primary\);[\s\S]*?background:/,
    );
    expect(appCss).not.toContain(".selection-check");
  });

  it("hält Auswahl-Checkboxen kompakt statt sie wie Textfelder aufzublasen", () => {
    expect(appCss).toMatch(
      /\.playdate-form \.selection-option input\[type="checkbox"\] \{[\s\S]*?min-height: 1\.25rem;[\s\S]*?padding: 0;/,
    );
  });

  it("lässt Hilfetexte und Auswahlbezeichnungen in gut lesbarer Größe", () => {
    expect(appCss).toMatch(
      /\.field-help \{[\s\S]*?font-size: 1rem;[\s\S]*?line-height: 1\.5;/,
    );
    expect(appCss).toMatch(
      /\.selection-option \{[\s\S]*?font-size: 1rem;[\s\S]*?line-height: 1\.4;/,
    );
    expect(appCss).not.toContain(".playdate-form label span {");
  });

  it("hält das Plus in der mobilen Navigation auch auf der aktiven Route lesbar", () => {
    expect(appCss).toMatch(
      /\.bottom-nav a\.new-mobile,[\s\S]*?\.bottom-nav a\.new-mobile\.active \{[\s\S]*?background: var\(--color-primary\);[\s\S]*?color: var\(--color-primary-content\);/,
    );
    expect(appCss).toMatch(
      /\.bottom-nav a\.new-mobile svg \{[\s\S]*?stroke: currentColor;/,
    );
  });
});
