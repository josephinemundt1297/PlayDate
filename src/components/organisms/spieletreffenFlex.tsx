import { SpieletreffenCard } from "../molecules/spieletreffenCard";
import type { spieletreffen } from "../../domain/spieletreffen";
import { CalendarX2 } from "lucide-react";
import { EmptyState } from "../molecules/emptyState";
// Die Flex-Übersicht kümmert sich nur um die Liste. Die einzelne Karte steckt im Molecule darunter.
export function SpieletreffenFlex({
  dates,
  onDelete,
  onInvite,
  onCalendar,
  onComment,
}: {
  dates: spieletreffen[];
  onDelete: (id: number) => void;
  onInvite: (date: spieletreffen) => void;
  onCalendar: (date: spieletreffen) => void;
  onComment?: (id: number, text: string) => void;
}) {
  return (
    <section className="date-flex" aria-label="Anstehende Spieletreffen">
      {!dates.length && <EmptyState icon={CalendarX2} title="Noch kein Spieletreffen geplant">Plane euer erstes Treffen – danach erscheint es genau hier.</EmptyState>}
      {dates.map((date) => (
        <SpieletreffenCard
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
