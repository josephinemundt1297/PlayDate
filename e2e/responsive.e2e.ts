import { expect, test } from "@playwright/test";

const widths = [240, 320, 375, 768, 1024, 1280];

for (const width of widths) {
  test(`kein horizontaler Überlauf bei ${width} Pixeln`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
