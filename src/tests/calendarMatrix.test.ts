import { describe, expect, it } from "vitest";
import type { spieletreffen } from "../domain/spieletreffen";
import {
  buildCalendarDays,
  formatCalendarMonth,
  getInitialCalendarMonth,
  shiftCalendarMonth,
} from "../utils/calendarMatrix";

const date: spieletreffen = {
  id: 1,
  title: "Abenteuer im Stadtpark",
  children: ["Mila"],
  friends: ["Noah"],
  date: "2026-07-18",
  time: "15:00",
  location: "Volkspark",
  bring: "Picknickdecke",
  status: "Bestätigt",
  color: "mint",
};

describe("Kalenderansicht", () => {
  it("baut sechs vollständige Wochen und startet an einem Montag", () => {
    const days = buildCalendarDays(
      new Date(2026, 6, 1, 12),
      [date],
      [],
      new Date(2026, 6, 17, 12),
    );

    expect(days).toHaveLength(42);
    expect(days[0].date.getDay()).toBe(1);
    expect(days.at(-1)?.date.getDay()).toBe(0);
  });

  it("ordnet ein Spieletreffen dem richtigen Tag zu", () => {
    const days = buildCalendarDays(new Date(2026, 6, 1, 12), [date]);
    const eventDay = days.find((day) => day.dateKey === date.date);

    expect(eventDay?.events).toEqual([date]);
  });

  it("zeigt einen Geburtstag jedes Jahr am passenden Tag", () => {
    const days = buildCalendarDays(new Date(2026, 6, 1, 12), [], [{
      id: "birthday-1",
      childName: "Lina",
      familyName: "Familie Demo",
      birthday: "07-22",
      own: false,
    }]);

    expect(days.find((day) => day.dateKey === "2026-07-22")?.birthdays[0]?.childName).toBe("Lina");
  });

  it("öffnet zuerst den nächsten anstehenden Termin", () => {
    const month = getInitialCalendarMonth([date], new Date(2026, 5, 2, 12));

    expect(formatCalendarMonth(month)).toBe("Juli 2026");
  });

  it("wechselt auch über einen Jahreswechsel sauber weiter", () => {
    const nextMonth = shiftCalendarMonth(new Date(2026, 11, 1, 12), 1);

    expect(nextMonth.getFullYear()).toBe(2027);
    expect(nextMonth.getMonth()).toBe(0);
  });
});
