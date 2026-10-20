import { useSpieletreffen } from "../../hooks/useSpieletreffen";
import { SpieletreffenDataState } from "../molecules/spieletreffenDataState";
import { SpieletreffenForm } from "../organisms/spieletreffenForm";

export function SpieletreffenEditorPage({ editId }: { editId?: number }) {
  const { loading, error, retry } = useSpieletreffen();

  return (
    <div className="form-page">
      <div className="form-intro">
        <p className="eyebrow">
          {editId ? "Pläne ändern" : "Vorfreude beginnt hier"}
        </p>
        <h1>
          {editId ? "Spieletreffen bearbeiten" : "Neues Spieletreffen planen"}
        </h1>
        <p>Ein paar Details – und schon kann die Einladung raus.</p>
      </div>
      <SpieletreffenDataState loading={loading} error={error} onRetry={retry}>
        <SpieletreffenForm editId={editId} />
      </SpieletreffenDataState>
    </div>
  );
}
