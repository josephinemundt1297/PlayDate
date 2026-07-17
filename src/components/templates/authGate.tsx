import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import type { ReactNode } from "react";
import { PlayfulLoader } from "../atoms/playfulLoader";
// Dieses Template ist die Tür zur App: Ausgeloggt gibt's Login, eingeloggt den echten Inhalt.
export function AuthGate({ children }: { children: ReactNode }) {
  return (
    <>
      <ClerkLoading><main className="auth-page"><PlayfulLoader label="Wir bauen euren Spielplatz auf …" /></main></ClerkLoading>
      <ClerkLoaded><SignedOut>
        <main className="auth-page">
          <section className="card bg-base-100 border border-base-300 auth-card" aria-labelledby="auth-title">
            <span className="auth-logo" aria-hidden="true">
              ✦
            </span>
            <p className="eyebrow">Willkommen bei PlayDate</p>
            <h1 id="auth-title">
              Mehr Spielen.
              <br />
              Weniger Organisieren.
            </h1>
            <p>
              PlayDate-Daten sind privat. Melde dich an, um deine Termine zu
              sehen und zu verwalten.
            </p>
            <SignInButton mode="modal">
              <button className="btn btn-primary primary-button">Sicher anmelden</button>
            </SignInButton>
            <small>
              Deine Daten werden nur angemeldeten, berechtigten Personen
              angezeigt.
            </small>
          </section>
        </main>
      </SignedOut>
      <SignedIn>{children}</SignedIn></ClerkLoaded>
    </>
  );
}
