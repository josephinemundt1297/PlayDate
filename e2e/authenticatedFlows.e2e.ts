import { expect, test } from "@playwright/test";

test.describe("angemeldete Kernabläufe", () => {
  test.skip(!process.env.E2E_STORAGE_STATE, "Benötigt einen zuvor gespeicherten Clerk-Login über E2E_STORAGE_STATE.");

  test("Familie einrichten und PlayDate anlegen", async ({ page }) => {
    await page.goto("/families");
    await page.getByLabel("Familienname").fill("E2E Familie");
    const child = page.getByLabel("Vorname Kind 1");
    await child.fill("Mila");
    await page.getByRole("button", { name: /Familie speichern/ }).click();
    await expect(page.getByRole("button", { name: /Gespeichert/ })).toBeVisible();

    await page.goto("/new");
    await page.getByLabel(/Titel/).fill("E2E Spielplatz");
    await page.getByLabel("Dein Kind").selectOption("Mila");
    await page.getByLabel("Trifft sich mit").fill("Noah");
    await page.getByLabel("Datum").fill("2027-08-20");
    await page.getByLabel("Uhrzeit").fill("15:00");
    await page.getByLabel("Treffpunkt").fill("Stadtpark");
    await page.getByRole("button", { name: "PlayDate erstellen" }).click();
    await expect(page.getByText("E2E Spielplatz")).toBeVisible();
  });
});
