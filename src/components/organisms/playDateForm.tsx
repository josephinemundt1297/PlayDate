import { useState, type SyntheticEvent } from "react";
import { CalendarDays, Check } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import {
  playDatesStorageKey,
  readPlayDates,
} from "../../hooks/usePlayDates";
import { readFamilyProfile } from "../../hooks/useFamilyProfile";
import type { playDate } from "../../domain/playdates";

// Das Formular kann beides: einen neuen Termin anlegen oder einen vorhandenen bearbeiten.
export function PlayDateForm({ editId }: { editId?: number }) {
  const navigate = useNavigate();
  const { user } = useUser();
  if (!user) throw new Error("Anmeldung erforderlich");
  const dates = readPlayDates(user.id);
  const family = readFamilyProfile(user.id);
  const existing = dates.find((date) => date.id === editId);
  const [form, setForm] = useState<playDate>(
    existing ?? {
      id: Date.now(),
      title: "",
      child: "",
      friend: "",
      date: "",
      time: "",
      location: "",
      bring: "",
      status: "Ausstehend",
      color: "mint",
    },
  );
  const update = (key: keyof playDate, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  // Beim Bearbeiten tauschen wir den passenden Eintrag aus, sonst hängen wir einen neuen hinten dran.
  const submit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const next = existing
      ? dates.map((date) => (date.id === existing.id ? form : date))
      : [...dates, form];
    localStorage.setItem(playDatesStorageKey(user.id), JSON.stringify(next));
    navigate({ to: "/" });
  };
  return (
    <form onSubmit={submit} className="card bg-base-100 border border-base-300 playdate-form">
      <label className="full">
        Titel<span>Wie soll euer Treffen heißen?</span>
        <input
          className="input input-bordered w-full"
          required
          value={form.title}
          onChange={(event) => update("title", event.target.value)}
          placeholder="z. B. Abenteuer im Stadtpark"
        />
      </label>
      <label>
        Dein Kind
        {family.children.length ? (
          <select
            className="select select-bordered w-full"
            required
            value={form.child}
            onChange={(event) => update("child", event.target.value)}
          >
            <option value="" disabled>
              Kind auswählen
            </option>
            {existing?.child &&
              !family.children.some(
                (child) => child.name === existing.child,
              ) && <option value={existing.child}>{existing.child}</option>}
            {family.children.map((child) => (
              <option key={child.id} value={child.name}>
                {child.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="missing-children">
            Noch keine Kinder hinterlegt.{" "}
            <Link to="/families">Jetzt Familie einrichten</Link>
          </span>
        )}
      </label>
      <label>
        Trifft sich mit
        <input
          className="input input-bordered w-full"
          required
          value={form.friend}
          onChange={(event) => update("friend", event.target.value)}
          placeholder="Vorname"
        />
      </label>
      <label>
        Datum
        <input
          className="input input-bordered w-full"
          required
          type="date"
          value={form.date}
          onChange={(event) => update("date", event.target.value)}
        />
      </label>
      <label>
        Uhrzeit
        <input
          className="input input-bordered w-full"
          required
          type="time"
          value={form.time}
          onChange={(event) => update("time", event.target.value)}
        />
      </label>
      <label className="full">
        Treffpunkt
        <input
          className="input input-bordered w-full"
          required
          value={form.location}
          onChange={(event) => update("location", event.target.value)}
          placeholder="Adresse oder Lieblingsplatz"
        />
      </label>
      <label className="full">
        Wer bringt was mit?
        <textarea
          className="textarea textarea-bordered w-full"
          value={form.bring}
          onChange={(event) => update("bring", event.target.value)}
          placeholder="Snacks, Getränke, Spielsachen …"
        />
      </label>
      <fieldset className="full">
        <legend>Erinnerung</legend>
        <label className="check-row">
          <input
            className="checkbox checkbox-primary"
            type="checkbox"
            defaultChecked
          />{" "}
          24 Stunden vorher erinnern
        </label>
        <label className="check-row">
          <input className="checkbox checkbox-primary" type="checkbox" /> Auch
          per E-Mail erinnern
        </label>
      </fieldset>
      <div className="consent full">
        <Check />
        <p>
          <strong>Privat geteilt</strong>
          <br />
          Details, Kommentare und Fotos sehen ausschließlich eingeladene
          Familien.
        </p>
      </div>
      <div className="form-actions full">
        <Link to="/" className="btn btn-outline secondary-button">
          Abbrechen
        </Link>
        <button
          className="btn btn-primary primary-button"
          type="submit"
          disabled={!family.children.length}
        >
          <CalendarDays />
          {existing ? "Änderungen speichern" : "PlayDate erstellen"}
        </button>
      </div>
    </form>
  );
}
