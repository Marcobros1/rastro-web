import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useCurrentUser } from "../users/CurrentUserContext";

// Una clave por usuario: cada persona tiene sus propios favoritos
const KEY_PREFIX = "rastro-favoritos:";

// Avisa a todos los componentes que usan el hook cuando cambian los favoritos
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function parseFavorites(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Favoritos del usuario actual, guardados en localStorage.
 * Cambiar de usuario en el desplegable cambia también la lista de favoritos.
 */
export function useFavorites() {
  const { user } = useCurrentUser();
  const key = KEY_PREFIX + user.id;

  // Se lee el texto crudo (un string es comparable y evita bucles de render)
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? "[]",
    () => "[]"
  );
  const favorites = useMemo(() => parseFavorites(raw), [raw]);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(
    (id: string) => {
      const next = favorites.includes(id)
        ? favorites.filter((f) => f !== id)
        : [...favorites, id];
      localStorage.setItem(key, JSON.stringify(next));
      listeners.forEach((listener) => listener());
    },
    [favorites, key]
  );

  return { favorites, isFavorite, toggleFavorite };
}
