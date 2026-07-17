import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const cssFiles = ["src/index.css", "src/app.css"];

describe("skalierbare CSS-Maße", () => {
  it("nutzt Pixel nur für feine Linien und feste Media-Query-Grenzen", () => {
    const unexpectedPixelLines = cssFiles.flatMap((file) =>
      readFileSync(file, "utf8")
        .split("\n")
        .map((line, index) => ({ file, line, lineNumber: index + 1 }))
        .filter(({ line }) => {
          if (line.includes("@media")) return false;

          const pixelValues = [...line.matchAll(/(-?\d+(?:\.\d+)?)px/g)];
          return pixelValues.some((match) => Math.abs(Number(match[1])) !== 1);
        }),
    );

    // rem wächst mit der gewählten Schriftgröße. 1px bleibt nur für feine Linien erlaubt.
    expect(unexpectedPixelLines).toEqual([]);
  });
});
