import { SpieletreffenForm } from "../organisms/spieletreffenForm";
// Die Page liefert Überschrift und Layout, das eigentliche Formular bleibt wiederverwendbar.
export function SpieletreffenEditorPage({ editId }: { editId?: number }) {
  return (
    <div className="form-page">
      <div className="form-intro">
        <p className="eyebrow">
          {editId ? "Pläne ändern" : "Vorfreude beginnt hier"}
        </p>
        <h1>{editId ? "Spieletreffen bearbeiten" : "Neues Spieletreffen planen"}</h1>
        <p>Ein paar Details – und schon kann die Einladung raus.</p>
      </div>
      <SpieletreffenForm editId={editId} />
    </div>
  );
}
