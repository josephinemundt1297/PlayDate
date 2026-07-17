import { Clock, Edit3, Gift, MapPin, Users, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { playDate } from "../../domain/playdates";

export function PlayDateDetailsDialog({
  date,
  onClose,
  onEdit,
}: {
  date: playDate | null;
  onClose: () => void;
  onEdit: (id: number) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (date && !dialog.current?.open) dialog.current?.showModal();
    if (!date && dialog.current?.open) dialog.current.close();
  }, [date]);

  return (
    <dialog
      ref={dialog}
      className="modal playdate-dialog"
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby="playdate-dialog-title"
    >
      {date && (
        <div className="modal-box">
          <button
            className="btn btn-ghost btn-square dialog-close"
            onClick={onClose}
            aria-label="PlayDate schließen"
          >
            <X />
          </button>
          <p className="eyebrow">PlayDate im Detail</p>
          <h2 id="playdate-dialog-title">{date.title}</h2>
          <span className={`badge ${date.status === "Bestätigt" ? "badge-success" : "badge-warning"}`}>
            {date.status}
          </span>
          <dl className="playdate-dialog-details">
            <div><dt><Clock /> Termin</dt><dd>{new Date(`${date.date}T12:00:00`).toLocaleDateString("de-DE")} um {date.time} Uhr</dd></div>
            <div><dt><Users /> Kinder</dt><dd>{date.child} und {date.friend}</dd></div>
            <div><dt><MapPin /> Treffpunkt</dt><dd>{date.location}</dd></div>
            <div><dt><Gift /> Mitbringen</dt><dd>{date.bring || "Noch nichts eingetragen"}</dd></div>
          </dl>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={() => onEdit(date.id)}>
              <Edit3 /> PlayDate bearbeiten
            </button>
          </div>
        </div>
      )}
      <form method="dialog" className="modal-backdrop">
        <button aria-label="PlayDate schließen">schließen</button>
      </form>
    </dialog>
  );
}
