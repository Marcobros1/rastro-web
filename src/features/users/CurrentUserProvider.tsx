import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { USERS } from "./users";

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  // Al arrancar: el último usuario elegido o, si no hay, el primero.
  // La función de dentro solo se ejecuta la primera vez
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") ?? USERS[0].id);

  // Guarda userId en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  // Busca en USERS el usuario con ese id (si no está, USERS[0])
  const user = USERS.find((u) => u.id === userId) ?? USERS[0];

  return (
    <CurrentUserContext.Provider value={{ user, changeUser: setUserId }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
