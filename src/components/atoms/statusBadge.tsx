import type { playDate } from "../../domain/playdates";
// Kleiner Status-Baustein, damit „Bestätigt“ überall gleich aussieht.
export function StatusBadge({ status }: Pick<playDate, "status">) {
  const className = status === "Bestätigt"
    ? "badge-success confirmed"
    : status === "Abgesagt"
      ? "badge-error cancelled"
      : "badge-warning";
  return (
    <span
      className={`badge status ${className}`}
    >
      {status}
    </span>
  );
}
