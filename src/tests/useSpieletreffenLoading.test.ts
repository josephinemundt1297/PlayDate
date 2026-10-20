import { readFileSync } from "node:fs";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isSpieletreffenList } from "../domain/spieletreffen";
import {
  spieletreffenStorageKey,
  useSpieletreffen,
} from "../hooks/useSpieletreffen";

vi.mock("@clerk/clerk-react", () => ({
  useUser: () => ({ user: { id: "user-demo" } }),
}));

const demoData: unknown = JSON.parse(
  readFileSync(`${process.cwd()}/public/demoSpieletreffen.json`, "utf8"),
);

const key = spieletreffenStorageKey("user-demo");
const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("asynchrones Laden der Spieletreffen", () => {
  it("verwendet gültige Daten aus der tatsächlichen Demo-Datei", () => {
    expect(isSpieletreffenList(demoData)).toBe(true);
  });

  it("zeigt während einer offenen Anfrage den Ladezustand und bricht beim Verlassen ab", () => {
    fetchMock.mockImplementation(() => new Promise<Response>(() => {}));

    const { result, unmount } = renderHook(() => useSpieletreffen());

    expect(result.current.loading).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/demoSpieletreffen.json",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );

    const signal = fetchMock.mock.calls[0]?.[1]?.signal;
    unmount();

    expect(signal?.aborted).toBe(true);
    expect(localStorage.getItem(key)).toBeNull();
  });

  it("lädt und speichert die Beispieltermine beim ersten Aufruf", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify(demoData)));

    const { result } = renderHook(() => useSpieletreffen());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("");
    expect(result.current.dates).toEqual(demoData);
    expect(JSON.parse(localStorage.getItem(key) ?? "null")).toEqual(demoData);
  });

  it("verwendet vorhandene Termine ohne erneuten Abruf", async () => {
    localStorage.setItem(key, JSON.stringify(demoData));

    const { result } = renderHook(() => useSpieletreffen());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("");
    expect(result.current.dates).toEqual(demoData);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("behält eine bewusst gespeicherte leere Liste", async () => {
    localStorage.setItem(key, "[]");

    const { result } = renderHook(() => useSpieletreffen());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("");
    expect(result.current.dates).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("akzeptiert eine leere JSON-Antwort als erfolgreichen Leerzustand", async () => {
    fetchMock.mockResolvedValue(new Response("[]"));

    const { result } = renderHook(() => useSpieletreffen());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("");
    expect(result.current.dates).toEqual([]);
    expect(localStorage.getItem(key)).toBe("[]");
  });

  it.each(["HTTP", "Netzwerk", "JSON", "Datensatz"])(
    "behandelt einen Fehler vom Typ %s ohne ungültige Daten zu speichern",
    async (mode) => {
      if (mode === "HTTP") {
        fetchMock.mockResolvedValue(new Response("", { status: 503 }));
      } else if (mode === "Netzwerk") {
        fetchMock.mockRejectedValue(new TypeError("Demo-Netzwerkfehler"));
      } else if (mode === "JSON") {
        fetchMock.mockResolvedValue(new Response("kein JSON"));
      } else {
        fetchMock.mockResolvedValue(new Response("[{}]"));
      }

      const { result } = renderHook(() => useSpieletreffen());

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toContain("nicht geladen");
      expect(result.current.dates).toEqual([]);
      expect(localStorage.getItem(key)).toBeNull();
    },
  );

  it("lädt nach einem Fehler mit erneutem Versuch erfolgreich", async () => {
    fetchMock
      .mockRejectedValueOnce(new TypeError("Demo-Netzwerkfehler"))
      .mockResolvedValueOnce(new Response(JSON.stringify(demoData)));

    const { result } = renderHook(() => useSpieletreffen());

    await waitFor(() => expect(result.current.error).not.toBe(""));

    act(() => result.current.retry());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("");
      expect(result.current.dates).toEqual(demoData);
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("meldet fehlerhafte gespeicherte Einträge ohne sie zu überschreiben", async () => {
    localStorage.setItem(key, "[null]");

    const { result } = renderHook(() => useSpieletreffen());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).not.toBe("");
    expect(localStorage.getItem(key)).toBe("[null]");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
