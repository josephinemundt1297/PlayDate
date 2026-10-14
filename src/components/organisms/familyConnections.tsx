import { useState, type SyntheticEvent } from "react";
import { Ban, Check, Copy, KeyRound, Link2, Trash2 } from "lucide-react";
import { useFamilyConnections } from "../../hooks/useFamilyConnections";
import { useFamilyProfile } from "../../hooks/useFamilyProfile";

export function FamilyConnections() {
  const {
    connections,
    save,
    activeInvitation,
    connectionMessage,
    generateInvitation,
    redeemInvitation,
  } = useFamilyConnections();
  const { profile } = useFamilyProfile();
  const [token, setToken] = useState("");

  const connect = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (redeemInvitation(token)) setToken("");
  };

  const copyToken = () => {
    if (!activeInvitation) return;
    navigator.clipboard.writeText(activeInvitation.token).catch(() => {
      // Kopieren kann der Browser ablehnen. Der Code bleibt deshalb immer sichtbar.
    });
  };

  const changeStatus = (id: string, status: "Verbunden" | "Blockiert") =>
    save(connections.map((item) => (item.id === id ? { ...item, status } : item)));

  return (
    <section className="family-connections" aria-labelledby="connections-title">
      <p className="eyebrow">Lokale React-Simulation</p>
      <h2 id="connections-title">Bekannte Familie verbinden</h2>
      <p className="page-lead">
        Teile einen einmaligen Trainingscode mit einer Familie, die du bereits kennst.
        In dieser Übung funktioniert er nur zwischen Konten im selben Browser.
      </p>
      <div className="connection-token-flex">
        <section className="card bg-base-100 connection-token-card">
          <KeyRound />
          <div>
            <h3>Familie einladen</h3>
            <p>Erzeuge einen Code, der nach 24 Stunden abläuft und nur einmal nutzbar ist.</p>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            disabled={!profile.familyName || !profile.children.length}
            onClick={() => generateInvitation(profile)}
          >
            Code erzeugen
          </button>
          {activeInvitation && (
            <div className="invitation-code">
              <code>{activeInvitation.token}</code>
              <button className="btn btn-outline btn-square" type="button" onClick={copyToken} aria-label="Trainingscode kopieren">
                <Copy />
              </button>
            </div>
          )}
        </section>
        <form className="card bg-base-100 connection-token-card" onSubmit={connect}>
          <Link2 />
          <div>
            <h3>Code eingeben</h3>
            <p>Du hast einen Code erhalten? Trage ihn hier ein.</p>
          </div>
          <label>
            Trainingscode
            <input
              className="input input-bordered w-full"
              required
              pattern="PD-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="PD-AB12-CD34"
            />
          </label>
          <button className="btn btn-primary" type="submit">Familie verbinden</button>
        </form>
      </div>
      <div className="alert alert-info connection-training-note">
        <KeyRound />
        <span><strong>Nur eine Simulation:</strong> Der zufällige Code enthält keine Familiendaten, wird aber nur lokal geprüft. Echte sichere Einladungen brauchen später ein Backend.</span>
      </div>
      <p className="connection-message" aria-live="polite">{connectionMessage}</p>
      {connections.length === 0 ? (
        <p className="empty-connection">Noch keine Demo-Verbindungen angelegt.</p>
      ) : (
        <ul className="connection-list">
          {connections.map((connection) => (
            <li className="card bg-base-100" key={connection.id}>
              <div><strong>{connection.familyName}</strong><span>{connection.children.map((child) => child.name).join(", ")} · {connection.status}</span></div>
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
