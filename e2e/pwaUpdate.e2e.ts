import { expect, test } from "@playwright/test";

test("Service Worker wird registriert und nutzt den aktuellen Cache", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Playwright WebKit unterstützt Service Worker in dieser Testumgebung nicht zuverlässig.");
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    const cacheKeys = await caches.keys();
    return { scope: registration.scope, cacheKeys };
  });
  expect(result.scope).toContain("127.0.0.1:4173");
  expect(result.cacheKeys).toContain("playDate-v4");
  expect(result.cacheKeys.filter((key) => key.startsWith("playDate-v"))).toEqual(["playDate-v4"]);
});
