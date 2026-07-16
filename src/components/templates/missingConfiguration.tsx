// Ohne Clerk-Key bleiben private Bereiche zu. Diese Seite erklärt nur, was zur Einrichtung fehlt.
export function MissingConfiguration() {
  return (
    <main className="auth-page">
      <section className="card bg-base-100 border border-base-300 auth-card">
        <span className="auth-logo">!</span>
        <p className="eyebrow">Einrichtung erforderlich</p>
        <h1>Login noch nicht konfiguriert</h1>
        <p>
          PlayDate-Daten bleiben gesperrt, bis ein gültiger Clerk Publishable
          Key hinterlegt ist.
        </p>
        <code>VITE_CLERK_PUBLISHABLE_KEY</code>
      </section>
    </main>
  );
}
