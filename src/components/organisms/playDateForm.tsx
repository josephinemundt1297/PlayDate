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
import { initialPlayDates } from "../../domain/playdates";
import { createLocalRepository } from "../../data/localRepository";
import { validatePlayDate, type validationErrors } from "../../utils/validation";

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
      reminder: "24 Stunden vorher",
      emailReminder: false,
      bringOwner: "Gemeinsam",
      activity: [],
      comments: [],
    },
  );
  const [errors, setErrors] = useState<validationErrors>({});
  const update = (key: keyof playDate, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  // Beim Bearbeiten tauschen wir den passenden Eintrag aus, sonst hängen wir einen neuen hinten dran.
  const submit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const validation = validatePlayDate(form, family.children.map((child) => child.name), Boolean(existing));
    setErrors(validation);
    if (Object.keys(validation).length) return;
    const cleaned = {
      ...form,
      title: form.title.trim(),
      friend: form.friend.trim(),
      location: form.location.trim(),
      bring: form.bring.trim(),
      activity: [
        ...(form.activity ?? []),
        {
          id: crypto.randomUUID(),
          message: existing ? "PlayDate bearbeitet" : "PlayDate erstellt",
          createdAt: new Date().toISOString(),
        },
      ],
    };
    const next = existing
      ? dates.map((date) => (date.id === existing.id ? cleaned : date))
      : [...dates, cleaned];
    createLocalRepository({
      key: playDatesStorageKey(user.id),
      fallback: initialPlayDates,
    }).write(next);
    navigate({ to: "/" });
  };
  return (
    <form noValidate onSubmit={submit} className="card bg-base-100 border border-base-300 playdate-form">
      {Object.keys(errors).length > 0 && <div className="alert alert-error validation-summary full" role="alert"><strong>Bitte prüfe deine Angaben.</strong><span>{Object.values(errors)[0]}</span></div>}
      <label className="full">
        Titel<span>Wie soll euer Treffen heißen?</span>
        <input
          className="input input-bordered w-full"
          required
          maxLength={80}
          aria-invalid={Boolean(errors.title)}
          value={form.title}
          onChange={(event) => update("title", event.target.value)}
          placeholder="z. B. Abenteuer im Stadtpark"
        />
      </label>
      <label>
        Zuständig für Mitbringsel
        <select
          className="select select-bordered w-full"
          value={form.bringOwner ?? "Gemeinsam"}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              bringOwner: event.target.value as playDate["bringOwner"],
            }))
          }
        >
          <option>Wir</option>
          <option>Andere Familie</option>
          <option>Gemeinsam</option>
        </select>
      </label>
      <label>
        Dein Kind
        {family.children.length ? (
          <select
            className="select select-bordered w-full"
            required
            aria-invalid={Boolean(errors.child)}
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
          maxLength={60}
          aria-invalid={Boolean(errors.friend)}
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
          min={existing ? undefined : new Date().toISOString().slice(0, 10)}
          aria-invalid={Boolean(errors.date)}
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
          aria-invalid={Boolean(errors.time)}
          value={form.time}
          onChange={(event) => update("time", event.target.value)}
        />
      </label>
      <label className="full">
        Treffpunkt
        <input
          className="input input-bordered w-full"
          required
          maxLength={160}
          aria-invalid={Boolean(errors.location)}
          value={form.location}
          onChange={(event) => update("location", event.target.value)}
          placeholder="Adresse oder Lieblingsplatz"
        />
      </label>
      <label className="full">
        Wer bringt was mit?
        <textarea
          className="textarea textarea-bordered w-full"
          maxLength={500}
          aria-invalid={Boolean(errors.bring)}
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
            checked={form.reminder === "24 Stunden vorher"}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                reminder: event.target.checked ? "24 Stunden vorher" : "Keine",
              }))
            }
          />{" "}
          24 Stunden vorher erinnern
        </label>
        <label className="check-row">
          <input
            className="checkbox checkbox-primary"
            type="checkbox"
            checked={Boolean(form.emailReminder)}
            onChange={(event) =>
              setForm((current) => ({ ...current, emailReminder: event.target.checked }))
            }
          /> Auch
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
