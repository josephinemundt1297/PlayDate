import { PlayDateCard } from "../molecules/playDateCard";
import type { playDate } from "../../domain/playdates";
import { CalendarX2 } from "lucide-react";
import { EmptyState } from "../molecules/emptyState";
// Das Grid kümmert sich nur um die Liste. Die einzelne Karte steckt im Molecule darunter.
export function PlayDateGrid({
  dates,
  onDelete,
  onInvite,
  onCalendar,
  onComment,
}: {
  dates: playDate[];
  onDelete: (id: number) => void;
  onInvite: (date: playDate) => void;
  onCalendar: (date: playDate) => void;
  onComment?: (id: number, text: string) => void;
}) {
  return (
    <section className="date-grid" aria-label="Anstehende PlayDates">
      {!dates.length && <EmptyState icon={CalendarX2} title="Noch kein PlayDate geplant">Plane euer erstes Treffen – danach erscheint es genau hier.</EmptyState>}
      {dates.map((date) => (
        <PlayDateCard
          key={date.id}
          date={date}
          onDelete={onDelete}
          onInvite={() => onInvite(date)}
          onCalendar={() => onCalendar(date)}
          onComment={(text) => onComment?.(date.id, text)}
        />
      ))}
    </section>
  );
}
