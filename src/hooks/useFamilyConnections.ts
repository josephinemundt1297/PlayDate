import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { createLocalRepository } from "../data/localRepository";
import type { familyConnection } from "../domain/family";

const connectionKey = (userId: string) => `playDate.connections.${userId}`;

export function readFamilyConnections(userId: string): familyConnection[] {
  return createLocalRepository<familyConnection[]>({
    key: connectionKey(userId),
    fallback: [],
  }).read();
}

export function useFamilyConnections() {
  const { user } = useUser();
  if (!user) throw new Error("Anmeldung erforderlich");

  const repository = createLocalRepository<familyConnection[]>({
    key: connectionKey(user.id),
    fallback: [],
  });
  const [connections, setConnections] = useState(repository.read);
  const save = (next: familyConnection[]) => {
    setConnections(next);
    repository.write(next);
  };

  return { connections, save };
}
