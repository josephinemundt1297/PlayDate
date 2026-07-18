import { useState, type SyntheticEvent } from "react";
import { CalendarDays, Check, Plus, Trash2, UsersRound } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import {
  playDatesStorageKey,
  readPlayDates,
} from "../../hooks/usePlayDates";
import { readFamilyProfile } from "../../hooks/useFamilyProfile";
import { readFamilyConnections } from "../../hooks/useFamilyConnections";
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
  // Nur bestätigte Verbindungen tauchen als Kontakt auf. Doppelte Namen zeigen wir nur einmal.
  const contactNames = Array.from(
    new Set(
      readFamilyConnections(user.id)
        .filter((connection) => connection.status === "Verbunden")
        .flatMap((connection) => connection.children.map((child) => child.name)),
    ),
  );
  const existing = dates.find((date) => date.id === editId);
  const [form, setForm] = useState<playDate>(
    existing ?? {
      id: Date.now(),
      title: "",
      children: [],
      friends: [],
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
  // Kontakte und frei eingetragene Namen bleiben getrennt, bis das Formular gespeichert wird.
  const [selectedContacts, setSelectedContacts] = useState<string[]>(
    () => existing?.friends.filter((name) => contactNames.includes(name)) ?? [],
  );
  const [customFriends, setCustomFriends] = useState<string[]>(() => {
    const existingCustom = existing?.friends.filter(
      (name) => !contactNames.includes(name),
    );
    return existingCustom?.length ? existingCustom : [""];
  });
  const [errors, setErrors] = useState<validationErrors>({});
  // Kleine Textfelder landen alle über dieselbe Helferfunktion im Formular-State.
  const update = (key: keyof playDate, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  // Beim Bearbeiten tauschen wir den passenden Eintrag aus, sonst hängen wir einen neuen hinten dran.
  const submit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    // Leere Zusatzfelder fliegen raus. Set verhindert doppelte Namen im fertigen Termin.
    const friends = Array.from(
      new Set([
        ...selectedContacts,
        ...customFriends.map((name) => name.trim()).filter(Boolean),
      ]),
    );
    const candidate = { ...form, friends };
    const validation = validatePlayDate(candidate, family.children.map((child) => child.name), Boolean(existing));
    setErrors(validation);
    if (Object.keys(validation).length) return;
    const cleaned = {
      ...candidate,
      title: form.title.trim(),
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
      <fieldset className="children-choice">
        <legend>Welche Kinder kommen mit?</legend>
        <span className="field-help">Du kannst ein oder mehrere Kinder auswählen.</span>
        {family.children.length ? (
          <div className="children-checklist" aria-invalid={Boolean(errors.children)}>
            {family.children.map((child) => (
              <label className="selection-option" key={child.id}>
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  checked={form.children.includes(child.name)}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      children: event.target.checked
                        ? [...current.children, child.name]
                        : current.children.filter((name) => name !== child.name),
                    }))
                  }
                />
                <span>{child.name}</span>
                <Check className="selection-check" aria-hidden="true" />
              </label>
            ))}
          </div>
        ) : (
          <span className="missing-children">
            Noch keine Kinder hinterlegt.{" "}
            <Link to="/families">Jetzt Familie einrichten</Link>
          </span>
        )}
      </fieldset>
      {/* Kontakte kommen aus bestätigten Familienverbindungen. Freie Namen bleiben trotzdem möglich. */}
      <fieldset className="friends-choice full">
        <legend>Trifft sich mit</legend>
        <span className="field-help">
          Wähle verbundene Kontakte aus oder ergänze eigene Namen.
        </span>
        <div className="contact-picker">
          <strong>Verbundene Kontakte</strong>
          {contactNames.length > 0 ? (
            <div className="contact-options" aria-label="Verbundene Kontakte">
              {contactNames.map((name) => (
                <label className="selection-option" key={name}>
                  <input
                    className="checkbox checkbox-primary"
                    type="checkbox"
                    checked={selectedContacts.includes(name)}
                    onChange={(event) =>
                      setSelectedContacts((current) =>
                        event.target.checked
                          ? [...current, name]
                          : current.filter((item) => item !== name),
                      )
                    }
                  />
                  <UsersRound aria-hidden="true" />
                  <span>{name}</span>
                  <Check className="selection-check" aria-hidden="true" />
                </label>
              ))}
            </div>
          ) : (
            <div className="contact-empty">
              <UsersRound aria-hidden="true" />
              <span>
                Noch keine Kontakte verbunden. Verbinde zuerst eine bekannte
                Familie, dann kannst du ihre freigegebenen Kontakte hier auswählen.
              </span>
              <Link className="btn btn-outline btn-sm" to="/families">
                Kontakte verbinden
              </Link>
            </div>
          )}
        </div>
        <div className="custom-friends">
          {customFriends.map((name, index) => (
            <div className="custom-friend-row" key={`custom-friend-${index}`}>
              <label htmlFor={`custom-friend-${index}`}>
                Eigener Name {index + 1}
              </label>
              <input
                id={`custom-friend-${index}`}
                className="input input-bordered w-full"
                maxLength={60}
                aria-invalid={Boolean(errors.friends)}
                value={name}
                onChange={(event) =>
                  setCustomFriends((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? event.target.value : item,
                    ),
                  )
                }
                placeholder="Vorname"
              />
              <button
                className="btn btn-ghost btn-square"
                type="button"
                aria-label={`Eigenen Namen ${index + 1} entfernen`}
                disabled={customFriends.length === 1}
                onClick={() =>
                  setCustomFriends((current) =>
                    current.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <button
            className="btn btn-outline add-friend"
            type="button"
            onClick={() => setCustomFriends((current) => [...current, ""])}
          >
            <Plus /> Weiteren Namen ergänzen
          </button>
        </div>
      </fieldset>
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
