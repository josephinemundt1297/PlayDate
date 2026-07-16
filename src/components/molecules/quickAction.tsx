import { ChevronRight, type LucideIcon } from "lucide-react";
// Eine Schnellaktion kombiniert Icon, Text und Klickverhalten zu einem kleinen wiederverwendbaren Paket.
export function QuickAction({
  icon: Icon,
  tone,
  title,
  description,
  onClick,
}: {
  icon: LucideIcon;
  tone: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button className="btn quick-action" onClick={onClick}>
      <span className={`quick-icon ${tone}`}>
        <Icon />
      </span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <ChevronRight />
    </button>
  );
}
