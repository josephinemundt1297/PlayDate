import { useEffect, useState } from "react";
import { downloadWebsiteShortcut } from "../utils/websiteShortcut";

interface installPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Der Browser schickt dieses Event, sobald die PWA installiert werden darf.
// Wir merken es uns, damit unser eigener Button den Dialog später öffnen kann.
export function useInstallApp() {
  const [prompt, setPrompt] = useState<installPromptEvent | null>(null);
  const [installed, setInstalled] = useState(
    matchMedia("(display-mode: standalone)").matches,
  );
  useEffect(() => {
    const ready = (event: Event) => {
      event.preventDefault();
      setPrompt(event as installPromptEvent);
    };
    const done = () => {
      setInstalled(true);
      setPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", ready);
    window.addEventListener("appinstalled", done);
    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
      window.removeEventListener("appinstalled", done);
    };
  }, []);
  const install = async () => {
    // Gibt es keinen PWA-Dialog, bekommt der Nutzer trotzdem einen funktionierenden Website-Link.
    if (!prompt) {
      const appUrl = new URL(import.meta.env.BASE_URL, window.location.origin);
      downloadWebsiteShortcut(appUrl.href);
      return true;
    }
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "accepted") setPrompt(null);
    return choice.outcome === "accepted";
  };
  return { canInstall: Boolean(prompt), installed, install };
}
