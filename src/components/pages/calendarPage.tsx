import { Download, Plus } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useSpieletreffen } from "../../hooks/useSpieletreffen";
import { downloadCalendar } from "../../utils/calendar";
import { SpieletreffenCalendar } from "../organisms/spieletreffenCalendar";
import { useFamilyProfile } from "../../hooks/useFamilyProfile";
import type { calendarBirthday } from "../../utils/calendarMatrix";

// Die Page holt die privaten Termine. Die eigentliche Kalenderdarstellung bleibt im Organism.
export function CalendarPage() {
  const { dates } = useSpieletreffen();
  const { profile, sharedBirthdays } = useFamilyProfile();
  const navigate = useNavigate();
  const sortedDates = useMemo(
    () => [...dates].sort((a, b) => a.date.localeCompare(b.date)),
    [dates],
  );
  // Eigene und freigegebene Geburtstage bekommen dieselbe kleine Kalenderform.
  // `own` hilft der Ansicht später beim verständlichen Beschriften.
  const birthdays: calendarBirthday[] = [
    ...profile.children
      .filter((child) => child.birthday)
      .map((child) => ({
        id: child.id,
        childName: child.name,
        familyName: profile.familyName || "Meine Familie",
        birthday: child.birthday,
        own: true,
      })),
    ...sharedBirthdays.map((birthday) => ({ ...birthday, own: false })),
  ];

  return (
    <div className="page-wrap calendar-page">
      <div className="section-heading calendar-page-heading">
        <div>
          <p className="eyebrow">Alles auf einen Blick</p>
          <h2>Dein SpielZeit-Kalender</h2>
        </div>
        <div className="calendar-page-actions">
          <button className="btn btn-outline" onClick={() => downloadCalendar(sortedDates)}>
            <Download /> Kalenderdatei
          </button>
          <Link to="/new" className="btn btn-primary">
            <Plus /> Spieletreffen planen
          </Link>
        </div>
      </div>
      <SpieletreffenCalendar
        dates={sortedDates}
        birthdays={birthdays}
        onEdit={(id) => navigate({ to: "/edit/$spieletreffenId", params: { spieletreffenId: String(id) } })}
      />
    </div>
  );
}
