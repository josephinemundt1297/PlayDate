import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

type appErrorBoundaryProps = { children: ReactNode };
type appErrorBoundaryState = { failed: boolean };

export class AppErrorBoundary extends Component<appErrorBoundaryProps, appErrorBoundaryState> {
  state = { failed: false };

  static getDerivedStateFromError(): appErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keine Nutzerdaten loggen: Für den Prototyp reichen technische Fehlerinfos.
    console.error("PlayDate konnte die Ansicht nicht laden", error.name, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="error-page">
        <section className="card bg-base-100 error-card" role="alert">
          <AlertTriangle />
          <h1>Ups, da ist etwas durcheinandergeraten</h1>
          <p>Deine lokalen Daten bleiben erhalten. Lade die Ansicht neu und versuche es noch einmal.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}><RefreshCw /> Neu laden</button>
        </section>
      </main>
    );
  }
}
