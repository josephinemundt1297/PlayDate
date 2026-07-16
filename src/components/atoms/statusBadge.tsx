import type { playDate } from "../../domain/playdates";
// Kleiner Status-Baustein, damit „Bestätigt“ überall gleich aussieht.
export function StatusBadge({ status }: Pick<playDate, "status">) {
  return (
    <span
      className={`badge status ${status === "Bestätigt" ? "badge-success confirmed" : "badge-warning"}`}
    >
      {status}
    </span>
  );
}
