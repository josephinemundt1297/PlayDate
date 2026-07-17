import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import type { playDate } from "../../domain/playdates";
import {
  buildCalendarDays,
  formatCalendarMonth,
  getInitialCalendarMonth,
  shiftCalendarMonth,
  toLocalDateKey,
} from "../../utils/calendarGrid";
import { PlayDateDetailsDialog } from "./playDateDetailsDialog";

const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export function PlayDateCalendar({
  dates,
  onEdit,
  initialMonth,
}: {
  dates: playDate[];
  onEdit: (id: number) => void;
  initialMonth?: Date;
}) {
  const [month, setMonth] = useState(() =>
    initialMonth ?? getInitialCalendarMonth(dates),
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    dates[0]?.date ?? toLocalDateKey(new Date()),
  );
  const [selectedEvent, setSelectedEvent] = useState<playDate | null>(null);
  const days = useMemo(() => buildCalendarDays(month, dates), [dates, month]);
  const selectedEvents = dates.filter((date) => date.date === selectedDate);
  const selectedLabel = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${selectedDate}T12:00:00`));

  const changeMonth = (step: number) => {
    const nextMonth = shiftCalendarMonth(month, step);
    setMonth(nextMonth);
    setSelectedDate(toLocalDateKey(nextMonth));
  };

  return (
    <section className="calendar-card card bg-base-100" aria-labelledby="calendar-title">
      <div className="calendar-toolbar">
        <div>
          <p className="eyebrow">Monatsübersicht</p>
          <h1 id="calendar-title">{formatCalendarMonth(month)}</h1>
        </div>
        <div className="calendar-controls" aria-label="Monat wechseln">
          <button
            className="btn btn-square btn-ghost"
            aria-label="Vorheriger Monat"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft />
          </button>
          <button
            className="btn btn-square btn-ghost"
            aria-label="Nächster Monat"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="calendar-scroll">
        <table className="calendar-grid">
          <caption className="sr-only">PlayDates im {formatCalendarMonth(month)}</caption>
          <thead>
            <tr>{weekDays.map((day) => <th key={day} scope="col">{day}</th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }, (_, week) => (
              <tr key={week}>
                {days.slice(week * 7, week * 7 + 7).map((day) => (
                  <td
                    key={day.dateKey}
                    className={`${day.isCurrentMonth ? "" : "outside-month"} ${day.isToday ? "today" : ""}`}
                  >
                    <div className={selectedDate === day.dateKey ? "selected" : ""}>
                      <button
                        className="calendar-day-button"
                        aria-label={`${day.date.toLocaleDateString("de-DE")}, ${day.events.length} PlayDates`}
                        aria-pressed={selectedDate === day.dateKey}
                        onClick={() => setSelectedDate(day.dateKey)}
                      >
                        <span className="calendar-day-number">{day.date.getDate()}</span>
                      </button>
                      <span className="calendar-events">
                        {day.events.map((event) => (
                          <button
                            className={`calendar-event ${event.status === "Bestätigt" ? "confirmed" : "pending"}`}
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            aria-label={`${event.title} um ${event.time} Uhr vergrößern`}
                          >
                            <span className="calendar-event-time">{event.time}</span>
                            <span>{event.title}</span>
                          </button>
                        ))}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="calendar-day-details" aria-live="polite">
        <h2>{selectedLabel}</h2>
        {selectedEvents.length ? (
          selectedEvents.map((event) => (
            <button className="calendar-detail" key={event.id} onClick={() => setSelectedEvent(event)}>
              <span>
                <strong>{event.title}</strong>
                <small><Clock /> {event.time} Uhr</small>
                <small><MapPin /> {event.location}</small>
              </span>
              <span className={`badge ${event.status === "Bestätigt" ? "badge-success" : "badge-warning"}`}>
                {event.status}
              </span>
            </button>
          ))
        ) : (
          <p>An diesem Tag ist noch kein PlayDate geplant.</p>
        )}
      </div>
      <PlayDateDetailsDialog
        date={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onEdit={onEdit}
      />
    </section>
  );
}
