import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const serviceWorker = readFileSync(`${process.cwd()}/public/sw.js`, "utf8");
const mainSource = readFileSync(`${process.cwd()}/src/main.tsx`, "utf8");

describe("Service-Worker-Sicherheit", () => {
  it("cached nur HTTP-Anfragen der eigenen Website", () => {
    expect(serviceWorker).toContain('url.protocol === "http:"');
    expect(serviceWorker).toContain('url.protocol === "https:"');
    expect(serviceWorker).toContain("url.origin === self.location.origin");
    expect(serviceWorker).toContain('url.pathname.startsWith("/api/")');
  });

  it("respektiert private und nicht speicherbare Antworten", () => {
    expect(serviceWorker).toMatch(/private\|no-store/i);
    expect(serviceWorker).toContain("!forbidsCaching");
  });

  it("fängt Fehler beim Schreiben in den Cache ab", () => {
    expect(serviceWorker).toMatch(/try \{[\s\S]*cache\.put[\s\S]*\} catch \{/);
  });

  it("behandelt Fehler bei der Service-Worker-Registrierung", () => {
    expect(mainSource).toMatch(/serviceWorker\.register\([\s\S]*\.catch\(/);
  });
});
