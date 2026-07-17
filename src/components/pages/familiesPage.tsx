import { useState, type SyntheticEvent } from "react";
import { Baby, Plus, Save, Trash2 } from "lucide-react";
import { useFamilyProfile } from "../../hooks/useFamilyProfile";
import { newChild, type childProfile } from "../../domain/family";
import { BirthdayOverview } from "../organisms/birthdayOverview";
import { validateFamily, type validationErrors } from "../../utils/validation";
import { FamilyConnections } from "../organisms/familyConnections";
// Hier pflegen Eltern ihr Familienprofil. Die Page speichert nur Daten des eingeloggten Users.
export function FamiliesPage() {
  const { profile, save, sharedBirthdays } = useFamilyProfile();
  const [familyName, setFamilyName] = useState(profile.familyName);
  const [children, setChildren] = useState<childProfile[]>(
    profile.children.length ? profile.children : [newChild()],
  );
  const [caregivers, setCaregivers] = useState<string[]>(
    profile.caregivers?.length ? profile.caregivers : [""],
  );
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<validationErrors>({});
  const updateChild = (id: string, patch: Partial<childProfile>) =>
    setChildren((current) =>
      current.map((child) =>
        child.id === id ? { ...child, ...patch } : child,
      ),
    );
  const submit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const validation = validateFamily(familyName, children);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    const next = {
      familyName: familyName.trim(),
      children: children
        .filter((child) => child.name.trim())
        .map((child) => ({ ...child, name: child.name.trim() })),
      caregivers: caregivers.map((name) => name.trim()).filter(Boolean),
    };
    save(next);
    setChildren(next.children.length ? next.children : [newChild()]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  return (
    <div className="families-page">
      <p className="eyebrow">Dein geschütztes Familienprofil</p>
      <h1>Meine Familie</h1>
      <p className="page-lead">
        Hinterlege deine Kinder und ihre Geburtstage einmal. Freigegebene
        Geburtstage können verbundene Familien sehen – das vollständige
        Geburtsdatum bleibt privat.
      </p>
      <form noValidate className="card bg-base-100 border border-base-300 family-form" onSubmit={submit}>
        {Object.keys(errors).length > 0 && <div className="alert alert-error validation-summary" role="alert"><strong>Bitte prüfe dein Familienprofil.</strong><span>{Object.values(errors)[0]}</span></div>}
        <label>
          Familienname
          <input
            className="input input-bordered w-full"
            required
            maxLength={80}
            aria-invalid={Boolean(errors.familyName)}
            value={familyName}
            onChange={(event) => setFamilyName(event.target.value)}
            placeholder="z. B. Familie Mustermann"
          />
        </label>
        <fieldset>
          <legend>
            <Baby /> Kinder ({children.filter((child) => child.name).length})
          </legend>
          {children.map((child, index) => (
            <div className="card bg-base-200 child-profile" key={child.id}>
              <div className="child-row">
                <label htmlFor={`child-${child.id}`}>
                  Vorname Kind {index + 1}
                </label>
                <input
                  className="input input-bordered w-full"
                  id={`child-${child.id}`}
                  required
                  minLength={2}
                  maxLength={60}
                  aria-invalid={Boolean(errors[`child-${child.id}`]) || Boolean(errors.children)}
                  value={child.name}
                  onChange={(event) =>
                    updateChild(child.id, { name: event.target.value })
                  }
                  placeholder="Vorname"
                />
                <button
                  className="btn btn-ghost btn-square"
                  type="button"
                  onClick={() =>
                    setChildren((current) =>
                      current.filter((item) => item.id !== child.id),
                    )
                  }
                  disabled={children.length === 1}
                  aria-label={`${child.name || `Kind ${index + 1}`} entfernen`}
                >
                  <Trash2 />
                </button>
              </div>
              <label className="birthday-field">
                Geburtstag
                <input
                  className="input input-bordered w-full"
                  type="date"
                  max={new Date().toISOString().slice(0, 10)}
                  aria-invalid={Boolean(errors[`birthday-${child.id}`])}
                  value={child.birthday}
                  onChange={(event) =>
                    updateChild(child.id, { birthday: event.target.value })
                  }
                />
              </label>
              <label className="share-birthday">
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  checked={child.shareBirthday}
                  onChange={(event) =>
                    updateChild(child.id, {
                      shareBirthday: event.target.checked,
                    })
                  }
                />{" "}
                Tag und Monat mit verbundenen Familien teilen
              </label>
            </div>
          ))}
          <button
            className="btn btn-outline secondary-button add-child"
            type="button"
            onClick={() => setChildren((current) => [...current, newChild()])}
          >
            <Plus />
            Weiteres Kind
          </button>
        </fieldset>
        <fieldset>
          <legend>Sorgeberechtigte Personen</legend>
          <p className="privacy-caption">
            Diese Liste ist nur eine lokale React-Simulation für ein späteres Familienkonto.
          </p>
          {caregivers.map((caregiver, index) => (
            <div className="caregiver-row" key={`caregiver-${index}`}>
              <label htmlFor={`caregiver-${index}`}>Person {index + 1}</label>
              <input
                id={`caregiver-${index}`}
                maxLength={80}
                value={caregiver}
                onChange={(event) =>
                  setCaregivers((current) =>
                    current.map((name, itemIndex) =>
                      itemIndex === index ? event.target.value : name,
                    ),
                  )
                }
              />
              <button
                className="btn btn-ghost btn-square"
                type="button"
                aria-label={`Person ${index + 1} entfernen`}
                disabled={caregivers.length === 1}
                onClick={() =>
                  setCaregivers((current) =>
                    current.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <button
            className="btn btn-outline add-child"
            type="button"
            onClick={() => setCaregivers((current) => [...current, ""])}
          >
            <Plus /> Weitere Person
          </button>
        </fieldset>
        <button className="btn btn-primary primary-button" type="submit">
          <Save />
          {saved ? "Gespeichert" : "Familie speichern"}
        </button>
      </form>
      <p className="privacy-caption">
        Nur Tag und Monat werden geteilt. Das Geburtsjahr bleibt für andere
        Familien verborgen.
      </p>
      <BirthdayOverview
        profile={{ familyName, children }}
        shared={sharedBirthdays}
      />
      <FamilyConnections />
    </div>
  );
}
