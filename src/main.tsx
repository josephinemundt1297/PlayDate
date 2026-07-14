import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./context/themeContext";
import App from "./app";
import "./index.css";
import "./app.css";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Ohne Clerk-Key zeigen wir keine Beispieldaten. So rutscht niemand aus Versehen am Login vorbei.
function MissingConfiguration() {
  return (
    <main className="auth-page">
      <section className="auth-card">
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

// Hier stecken wir die großen Bausteine einmal zusammen: Clerk, Theme und unsere App.
const content = clerkKey ? (
  <ClerkProvider publishableKey={clerkKey}>
    <App />
  </ClerkProvider>
) : (
  <MissingConfiguration />
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>{content}</ThemeProvider>
  </StrictMode>,
);

// Der Service Worker macht PlayDate installierbar und hält wichtige Dateien offline bereit.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("/sw.js"),
  );
}
