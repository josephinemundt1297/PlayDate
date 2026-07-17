import { useState, type SyntheticEvent } from "react";
import { Ban, Check, Link2, Trash2 } from "lucide-react";
import { useFamilyConnections } from "../../hooks/useFamilyConnections";

export function FamilyConnections() {
  const { connections, save } = useFamilyConnections();
  const [familyName, setFamilyName] = useState("");
  const [childName, setChildName] = useState("");
  const [birthday, setBirthday] = useState("");

  const addConnection = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!familyName.trim() || !childName.trim()) return;

    save([
      ...connections,
      {
        id: crypto.randomUUID(),
        familyName: familyName.trim(),
        childName: childName.trim(),
        birthday,
        status: "Ausstehend",
      },
    ]);
    setFamilyName("");
    setChildName("");
    setBirthday("");
  };

  const changeStatus = (id: string, status: "Verbunden" | "Blockiert") =>
    save(connections.map((item) => (item.id === id ? { ...item, status } : item)));

  return (
    <section className="family-connections" aria-labelledby="connections-title">
      <p className="eyebrow">Lokale React-Simulation</p>
      <h2 id="connections-title">Bekannte Familie verbinden</h2>
      <p className="page-lead">
        Hier übst du Verbindungszustände nur in deinem Browser. Es wird keine echte
        Anfrage verschickt.
      </p>
      <form className="card bg-base-100 connection-form" onSubmit={addConnection}>
        <label>Familienname<input className="input input-bordered" required value={familyName} onChange={(event) => setFamilyName(event.target.value)} /></label>
        <label>Kind<input className="input input-bordered" required value={childName} onChange={(event) => setChildName(event.target.value)} /></label>
        <label>Freigegebener Geburtstag<input className="input input-bordered" type="date" value={birthday} onChange={(event) => setBirthday(event.target.value)} /></label>
        <button className="btn btn-primary" type="submit"><Link2 /> Anfrage simulieren</button>
      </form>
      {connections.length === 0 ? (
        <p className="empty-connection">Noch keine Demo-Verbindungen angelegt.</p>
      ) : (
        <ul className="connection-list">
          {connections.map((connection) => (
            <li className="card bg-base-100" key={connection.id}>
              <div><strong>{connection.familyName}</strong><span>{connection.childName} · {connection.status}</span></div>
              <div className="connection-actions">
                {connection.status === "Ausstehend" && <button className="btn btn-success btn-sm" type="button" onClick={() => changeStatus(connection.id, "Verbunden")}><Check /> Annehmen</button>}
                {connection.status !== "Blockiert" && <button className="btn btn-outline btn-sm" type="button" onClick={() => changeStatus(connection.id, "Blockiert")}><Ban /> Blockieren</button>}
                <button className="btn btn-ghost btn-sm" type="button" aria-label={`${connection.familyName} entfernen`} onClick={() => save(connections.filter((item) => item.id !== connection.id))}><Trash2 /> Entfernen</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
