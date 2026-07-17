import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export function ConnectionStatus() {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (online) return null;
  return <div className="offline-banner" role="status"><WifiOff /> Du bist offline. Lokale Daten bleiben sichtbar.</div>;
}
