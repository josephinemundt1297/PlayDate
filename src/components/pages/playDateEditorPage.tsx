import { PlayDateForm } from "../organisms/playDateForm";
// Die Page liefert Überschrift und Layout, das eigentliche Formular bleibt wiederverwendbar.
export function PlayDateEditorPage({ editId }: { editId?: number }) {
  return (
    <div className="form-page">
      <div className="form-intro">
        <p className="eyebrow">
          {editId ? "Pläne ändern" : "Vorfreude beginnt hier"}
        </p>
        <h1>{editId ? "PlayDate bearbeiten" : "Neues PlayDate planen"}</h1>
        <p>Ein paar Details – und schon kann die Einladung raus.</p>
      </div>
      <PlayDateForm editId={editId} />
    </div>
  );
}
