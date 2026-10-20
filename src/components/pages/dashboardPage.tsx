import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  MessageCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSpieletreffen } from "../../hooks/useSpieletreffen";
import { QuickAction } from "../molecules/quickAction";
import { SpieletreffenFlex } from "../organisms/spieletreffenFlex";
import { PrivacyNote } from "../molecules/privacyNote";
import {
  addSpieletreffenComment,
  cancelSpieletreffen,
  type spieletreffen,
} from "../../domain/spieletreffen";
import { googleCalendarUrl } from "../../utils/calendar";
import { SpieletreffenDataState } from "../molecules/spieletreffenDataState";

// Die Dashboard-Page setzt mehrere kleinere Atomic-Bausteine zur fertigen Übersicht zusammen.
export function DashboardPage({ showAll = false }: { showAll?: boolean }) {
  const { dates, save, loading, error, retry } = useSpieletreffen();
  const navigate = useNavigate();
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
    const selected = dates.find((date) => date.id === id);
    if (!selected) return;

    if (selected.status === "Bestätigt") {
      if (
        !confirm(
          "Bestätigtes Spieletreffen wirklich absagen? Der Termin bleibt im Verlauf sichtbar.",
        )
      )
        return;
      save(
        dates.map((date) =>
          date.id === id ? cancelSpieletreffen(date) : date,
        ),
      );
      announce("Spieletreffen wurde abgesagt");
      return;
    }

    if (confirm("Möchtest du diese offene Anfrage wirklich löschen?"))
      save(dates.filter((date) => date.id !== id));
  };
  const invite = (date: spieletreffen) => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`Einladung zu „${date.title}“ am ${date.date} um ${date.time} Uhr.`)}`,
      "_blank",
      "noopener,noreferrer",
    );
    announce("WhatsApp-Einladung geöffnet");
  };
  const addComment = (id: number, text: string) => {
    save(
      dates.map((date) =>
        date.id === id ? addSpieletreffenComment(date, text) : date,
      ),
    );
    announce("Kommentar lokal gespeichert");
  };
  return (
    <div className="page-wrap">
      {!showAll && (
        <>
          <section
            className="card bg-base-100 border border-base-300 welcome-card"
            aria-labelledby="welcome-title"
          >
            <div>
              <p className="eyebrow">Deine private Übersicht</p>
              <h1 id="welcome-title">
                Hallo <span aria-hidden="true">👋</span>
              </h1>
              <p>Bereit für ein bisschen Kinderlachen und neue Erinnerungen?</p>
            </div>
            <Link to="/new" className="btn btn-primary primary-button">
              <Plus />
              Spieletreffen planen
            </Link>
            <div className="sun-doodle" aria-hidden="true">
              <Sparkles />
            </div>
          </section>
          <section className="quick-flex" aria-label="Schnellaktionen">
            <QuickAction
              icon={CalendarDays}
              tone="blue"
              title="Kalender ansehen"
              description="Alle Spieletreffen in der Monatsansicht öffnen"
              onClick={() => navigate({ to: "/calendar" })}
            />
            <QuickAction
              icon={MessageCircle}
              tone="green"
              title="Mit WhatsApp teilen"
              description="Familien unkompliziert einladen"
              onClick={() =>
                window.open(
                  "https://wa.me/?text=Komm%20zu%20SpielZeit!",
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
          <h2>{showAll ? "Alle Spieletreffen" : "Deine Spieletreffen"}</h2>
        </div>
        {showAll ? (
          <Link
            to="/new"
            className="btn btn-primary primary-button new-spieletreffen-button"
          >
            <Plus />
            Neues Spieletreffen
          </Link>
        ) : (
          <Link to="/spieletreffen">
            Alle ansehen <ChevronRight />
          </Link>
        )}
      </div>
      <SpieletreffenDataState loading={loading} error={error} onRetry={retry}>
        <SpieletreffenFlex
          dates={showAll ? sorted : sorted.slice(0, 3)}
          onDelete={remove}
          onInvite={invite}
          onCalendar={(date) =>
            window.open(
              googleCalendarUrl(date),
              "_blank",
              "noopener,noreferrer",
            )
          }
          onComment={addComment}
        />
      </SpieletreffenDataState>
      <PrivacyNote />
      <div className="toast" role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
