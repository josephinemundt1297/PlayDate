import type { ReactNode } from "react";
import { PlayfulLoader } from "../atoms/playfulLoader";

export function SpieletreffenDataState({
  loading,
  error,
  onRetry,
  children,
}: {
  loading: boolean;
  error: string;
  onRetry: () => void;
  children: ReactNode;
}) {
  if (loading) {
    return <PlayfulLoader label="Spieletreffen werden geladen …" />;
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <p role="alert">{error}</p>
        <button className="btn btn-outline" type="button" onClick={onRetry}>
          Erneut versuchen
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
