import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  MessageCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePlayDates } from "../../hooks/usePlayDates";
import { QuickAction } from "../molecules/quickAction";
import { PlayDateGrid } from "../organisms/playDateGrid";
import { PrivacyNote } from "../molecules/privacyNote";
import type { playDate } from "../../domain/playdates";
import { downloadCalendar, googleCalendarUrl } from "../../utils/calendar";

// Die Dashboard-Page setzt mehrere kleinere Atomic-Bausteine zur fertigen Übersicht zusammen.
export function DashboardPage({ showAll = false }: { showAll?: boolean }) {
  const { dates, save } = usePlayDates();
  const [toast, setToast] = useState("");
  const sorted = useMemo(
    () => [...dates].sort((a, b) => a.date.localeCompare(b.date)),
    [dates],
  );
  // Kleine Rückmeldung unten im Bildschirm. Nach drei Sekunden räumen wir sie wieder weg.
  const announce = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };
  const remove = (id: number) => {
    if (confirm("Möchtest du dieses PlayDate wirklich löschen?"))
      save(dates.filter((d) => d.id !== id));
  };
  const invite = (date: playDate) => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`Einladung zu „${date.title}“ am ${date.date} um ${date.time} Uhr.`)}`,
      "_blank",
      "noopener,noreferrer",
    );
    announce("WhatsApp-Einladung geöffnet");
  };
  return (
    <div className="page-wrap">
      {!showAll && (
        <>
          <section className="card bg-base-100 border border-base-300 welcome-card" aria-labelledby="welcome-title">
            <div>
              <p className="eyebrow">Deine private Übersicht</p>
              <h1 id="welcome-title">
                Hallo <span aria-hidden="true">👋</span>
              </h1>
              <p>Bereit für ein bisschen Kinderlachen und neue Erinnerungen?</p>
            </div>
            <Link to="/new" className="btn btn-primary primary-button">
              <Plus />
              PlayDate planen
            </Link>
            <div className="sun-doodle" aria-hidden="true">
              <Sparkles />
            </div>
          </section>
          <section className="quick-grid" aria-label="Schnellaktionen">
            <QuickAction
              icon={CalendarDays}
              tone="blue"
              title="Kalender exportieren"
              description="Alle PlayDates als Kalenderdatei laden"
              onClick={() => {
                downloadCalendar(sorted);
                announce("Kalenderdatei wurde erstellt");
              }}
            />
            <QuickAction
              icon={MessageCircle}
              tone="green"
              title="Mit WhatsApp teilen"
              description="Familien unkompliziert einladen"
              onClick={() =>
                window.open(
                  "https://wa.me/?text=Komm%20zu%20PlayDate!",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            />
          </section>
        </>
      )}
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {showAll ? "Gemeinsame Zeit" : "Was als Nächstes kommt"}
          </p>
          <h2>{showAll ? "Alle PlayDates" : "Deine PlayDates"}</h2>
        </div>
        {showAll ? (
          <Link to="/new" className="btn btn-primary primary-button new-playdate-button">
            <Plus />
            Neues PlayDate
          </Link>
        ) : (
          <Link to="/playdates">
            Alle ansehen <ChevronRight />
          </Link>
        )}
      </div>
      <PlayDateGrid
        dates={showAll ? sorted : sorted.slice(0, 3)}
        onDelete={remove}
        onInvite={invite}
        onCalendar={(date) =>
          window.open(googleCalendarUrl(date), "_blank", "noopener,noreferrer")
        }
      />
      <PrivacyNote />
      <div className="toast" role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
