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

test.describe("öffentliche Startseite", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  for (const theme of ["light", "dark"]) {
    test(`Startkarte bleibt mittig im ${theme} Mode`, async ({ page }) => {
      await page.goto("/");
      const card = page.locator(".auth-card");
      await expect(card).toBeVisible();
      await page.evaluate((theme) => {
        document.documentElement.dataset.theme = theme;
      }, theme);

      for (const width of [...widths, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        const bounds = await card.boundingBox();
        expect(bounds).not.toBeNull();
        if (!bounds) throw new Error("Die Startkarte ist nicht sichtbar.");

        const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(Math.abs(bounds.x + bounds.width / 2 - viewportWidth / 2)).toBeLessThanOrEqual(1);
      }
    });
  }
});
