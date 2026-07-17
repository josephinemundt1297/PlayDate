import type { playDate } from "../domain/playdates";

export type calendarDay = {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: playDate[];
};

const pad = (value: number) => String(value).padStart(2, "0");

// Wir bauen den Schlüssel selbst, damit die Zeitzone keinen Tag verschiebt.
export const toLocalDateKey = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export function buildCalendarDays(
  month: Date,
  dates: playDate[],
  today = new Date(),
): calendarDay[] {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1, 12);
  // JavaScript startet bei Sonntag. Für uns ist Montag der erste Wochentag.
  const daysBeforeMonth = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - daysBeforeMonth);
  const todayKey = toLocalDateKey(today);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const dateKey = toLocalDateKey(date);

    return {
      date,
      dateKey,
      isCurrentMonth: date.getMonth() === month.getMonth(),
      isToday: dateKey === todayKey,
      events: dates.filter((playDate) => playDate.date === dateKey),
    };
  });
}

export const shiftCalendarMonth = (month: Date, step: number) =>
  new Date(month.getFullYear(), month.getMonth() + step, 1, 12);

export const formatCalendarMonth = (month: Date) =>
  new Intl.DateTimeFormat("de-DE", {
    month: "long",
    year: "numeric",
  }).format(month);

export function getInitialCalendarMonth(dates: playDate[], today = new Date()) {
  const todayKey = toLocalDateKey(today);
  const firstUpcoming = [...dates]
    .sort((a, b) => a.date.localeCompare(b.date))
    .find((date) => date.date >= todayKey);
  const dateValue = firstUpcoming?.date ?? dates[0]?.date;

  if (!dateValue) return new Date(today.getFullYear(), today.getMonth(), 1, 12);
  const [year, month] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, 1, 12);
}
