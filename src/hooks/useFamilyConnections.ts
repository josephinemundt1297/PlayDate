import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { createLocalRepository } from "../data/localRepository";
import {
  createFamilyInvitation,
  invitationError,
  type familyConnection,
  type familyInvitation,
  type familyProfile,
} from "../domain/family";

const connectionKey = (userId: string) => `spielZeit.connections.${userId}`;
const invitationKey = "spielZeit.trainingInvitations";

type legacyConnection = Omit<familyConnection, "children"> & {
  childName: string;
  birthday: string;
};

export function readFamilyConnections(userId: string): familyConnection[] {
  const stored = createLocalRepository<Array<familyConnection | legacyConnection>>({
    key: connectionKey(userId),
    fallback: [],
  }).read();
  // So funktionieren auch Verbindungen weiter, die vor der Mehrkind-Funktion gespeichert wurden.
  return stored.map((connection) =>
    "children" in connection
      ? connection
      : {
          id: connection.id,
          familyName: connection.familyName,
          children: [{ name: connection.childName, birthday: connection.birthday }],
          status: connection.status,
        },
  );
}

export function useFamilyConnections() {
  const { user } = useUser();
  if (!user) throw new Error("Anmeldung erforderlich");

  const repository = createLocalRepository<familyConnection[]>({
    key: connectionKey(user.id),
    fallback: [],
  });
  const [connections, setConnections] = useState(() => readFamilyConnections(user.id));
  const [activeInvitation, setActiveInvitation] = useState<familyInvitation | null>(null);
  const [connectionMessage, setConnectionMessage] = useState("");
  const save = (next: familyConnection[]) => {
    // Erst aktualisieren wir die Seite, dann merken wir uns denselben Stand im Browser.
    setConnections(next);
    repository.write(next);
  };

  const invitationRepository = createLocalRepository<familyInvitation[]>({
    key: invitationKey,
    fallback: [],
  });

  const generateInvitation = (profile: familyProfile) => {
    // Abgelaufene Codes brauchen wir nicht mitzuschleppen. Das hält den lokalen Speicher klein.
    const invitation = createFamilyInvitation(profile, user.id);
    const now = new Date();
    const usableInvitations = invitationRepository
      .read()
      .filter((item) => new Date(item.expiresAt) > now);
    invitationRepository.write([...usableInvitations, invitation]);
    setActiveInvitation(invitation);
    setConnectionMessage("Der Trainingscode ist 24 Stunden gültig und kann einmal verwendet werden.");
  };

  const redeemInvitation = (enteredToken: string) => {
    // Großschreibung vermeidet Frust, wenn jemand den Code klein eintippt.
    const token = enteredToken.trim().toUpperCase();
    const invitations = invitationRepository.read();
    const invitation = invitations.find((item) => item.token === token);
    const error = invitationError(invitation);
    if (error || !invitation) {
      setConnectionMessage(error);
      return false;
    }

    // Ein gültiger Code übernimmt nur die Daten, die beim Erstellen freigegeben wurden.
    save([
      ...connections,
      {
        id: crypto.randomUUID(),
        familyName: invitation.familyName,
        children: invitation.children,
        status: "Verbunden",
        invitationCode: invitation.token,
      },
    ]);
    invitationRepository.write(
      invitations.map((item) =>
        item.token === invitation.token ? { ...item, redeemed: true } : item,
      ),
    );
    setConnectionMessage(`${invitation.familyName} wurde lokal als verbunden gespeichert.`);
    return true;
  };

  return {
    connections,
    save,
    activeInvitation,
    connectionMessage,
    generateInvitation,
    redeemInvitation,
  };
}
