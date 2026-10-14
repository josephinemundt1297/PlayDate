import { CakeSlice, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import type { spieletreffen } from "../../domain/spieletreffen";
import {
  buildCalendarDays,
  formatCalendarMonth,
  getInitialCalendarMonth,
  shiftCalendarMonth,
  toLocalDateKey,
  type calendarBirthday,
} from "../../utils/calendarMatrix";
import { SpieletreffenDetailsDialog } from "./spieletreffenDetailsDialog";

const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export function SpieletreffenCalendar({
  dates,
  birthdays = [],
  onEdit,
  initialMonth,
}: {
  dates: spieletreffen[];
  birthdays?: calendarBirthday[];
  onEdit: (id: number) => void;
  initialMonth?: Date;
}) {
  // `month` steuert nur den sichtbaren Monat. Der ausgewählte Tag wird getrennt gespeichert,
  // damit ein Klick im Raster den Tagesbereich aktualisiert, ohne den Monat zu verlieren.
  const [month, setMonth] = useState(() =>
    initialMonth ?? getInitialCalendarMonth(dates),
  );
  const [selectedDate, setSelectedDate] = useState(() => {
    if (dates[0]) return dates[0].date;
    if (birthdays[0]) {
      const year = (initialMonth ?? new Date()).getFullYear();
      return `${year}-${birthdays[0].birthday.slice(-5)}`;
    }
    return toLocalDateKey(new Date());
  });
  const [selectedEvent, setSelectedEvent] = useState<spieletreffen | null>(null);
  // Das Raster wird nur neu gebaut, wenn sich Monat, Termine oder Geburtstage ändern.
  const days = useMemo(
    () => buildCalendarDays(month, dates, birthdays),
    [dates, birthdays, month],
  );
  const selectedEvents = dates.filter((date) => date.date === selectedDate);
  const selectedBirthdays = birthdays.filter((birthday) =>
    // Geburtstage wiederholen sich. Deshalb vergleichen wir nur MM-TT und nie das Geburtsjahr.
    birthday.birthday.endsWith(selectedDate.slice(5)),
  );
  const selectedLabel = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${selectedDate}T12:00:00`));

  const changeMonth = (step: number) => {
    // step ist -1 oder +1. Die Hilfsfunktion kümmert sich auch sauber um den Jahreswechsel.
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
        <table className="calendar-table">
          <caption className="sr-only">Spieletreffen im {formatCalendarMonth(month)}</caption>
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
                        aria-label={`${day.date.toLocaleDateString("de-DE")}, ${day.events.length} Spieletreffen, ${day.birthdays.length} Geburtstage`}
                        aria-pressed={selectedDate === day.dateKey}
                        onClick={() => setSelectedDate(day.dateKey)}
                      >
                        <span className="calendar-day-number">{day.date.getDate()}</span>
                      </button>
                      <span className="calendar-events">
                        {day.birthdays.map((birthday) => (
                          <span className="calendar-birthday" key={`birthday-${birthday.id}`}>
                            <CakeSlice aria-hidden="true" />
                            <span>{birthday.childName}</span>
                          </span>
                        ))}
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
        {selectedBirthdays.map((birthday) => (
          <div className="calendar-birthday-detail" key={`detail-${birthday.id}`}>
            <CakeSlice aria-hidden="true" />
            <span>
              <strong>Geburtstag von {birthday.childName}</strong>
              <small>{birthday.own ? "Eigenes Kind" : birthday.familyName}</small>
            </span>
          </div>
        ))}
        {selectedEvents.map((event) => (
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
          ))}
        {!selectedEvents.length && !selectedBirthdays.length && (
          <p>An diesem Tag ist noch kein Spieletreffen geplant.</p>
        )}
      </div>
      <SpieletreffenDetailsDialog
        date={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onEdit={onEdit}
      />
    </section>
  );
}
