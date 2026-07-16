import {
  CalendarPlus,
  Clock3,
  Edit3,
  Gift,
  MapPin,
  Send,
  Trash2,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { playDate } from "../../domain/playdates";
import { StatusBadge } from "../atoms/statusBadge";

// Eine Karte zeigt genau ein PlayDate und reicht Klicks an die übergeordnete Page zurück.
export function PlayDateCard({
  date,
  onDelete,
  onInvite,
  onCalendar,
}: {
  date: playDate;
  onDelete: (id: number) => void;
  onInvite: () => void;
  onCalendar: () => void;
}) {
  // 12 Uhr verhindert, dass Zeitzonen das Datum aus Versehen auf den Vortag schieben.
  const value = new Date(`${date.date}T12:00:00`);
  const weekday = new Intl.DateTimeFormat("de-DE", { weekday: "short" })
    .format(value)
    .replace(/\.$/, "");
  const day = new Intl.DateTimeFormat("de-DE", { day: "2-digit" }).format(
    value,
  );
  const month = new Intl.DateTimeFormat("de-DE", { month: "short" })
    .format(value)
    .replace(/\.$/, "");
  return (
    <article
      className={`card bg-base-100 border border-base-300 date-card ${date.color}`}
    >
      <div className="card-top">
        <StatusBadge status={date.status} />
        <div className="card-actions">
          <button
            className="btn btn-ghost btn-sm btn-square"
            onClick={onCalendar}
            aria-label={`${date.title} zu Google Kalender hinzufügen`}
          >
            <CalendarPlus />
          </button>
          <Link
            className="btn btn-ghost btn-sm btn-square"
            to="/edit/$playDateId"
            params={{ playDateId: String(date.id) }}
            aria-label={`${date.title} bearbeiten`}
          >
            <Edit3 />
          </Link>
          <button
            className="btn btn-ghost btn-sm btn-square"
            onClick={() => onDelete(date.id)}
            aria-label={`${date.title} löschen`}
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <div className="date-badge">
        <strong>{day}.</strong>
        <span>{month}</span>
      </div>
      <h3>{date.title}</h3>
      <p>
        <Users /> {date.child} & {date.friend}
      </p>
      <p>
        <Clock3 /> {weekday}, {date.time} Uhr
      </p>
      <p>
        <MapPin /> {date.location}
      </p>
      <p>
        <Gift /> {date.bring}
      </p>
      <button
        className="btn btn-outline btn-primary invite-button"
        onClick={onInvite}
      >
        <Send /> Einladung teilen
      </button>
    </article>
  );
}
