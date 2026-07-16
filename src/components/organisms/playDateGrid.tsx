import { PlayDateCard } from "../molecules/playDateCard";
import type { playDate } from "../../domain/playdates";
// Das Grid kümmert sich nur um die Liste. Die einzelne Karte steckt im Molecule darunter.
export function PlayDateGrid({
  dates,
  onDelete,
  onInvite,
  onCalendar,
}: {
  dates: playDate[];
  onDelete: (id: number) => void;
  onInvite: (date: playDate) => void;
  onCalendar: (date: playDate) => void;
}) {
  return (
    <section className="date-grid" aria-label="Anstehende PlayDates">
      {dates.map((date) => (
        <PlayDateCard
          key={date.id}
          date={date}
          onDelete={onDelete}
          onInvite={() => onInvite(date)}
          onCalendar={() => onCalendar(date)}
        />
      ))}
    </section>
  );
}
