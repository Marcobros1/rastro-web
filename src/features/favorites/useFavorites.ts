import { useState, useCallback } from "react";

const STORAGE_KEY = "rastro-favoritos";

type UseFavoritesReturn = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

/**
 * Hook que gestiona los ids de anuncios favoritos en localStorage.
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignorar si localStorage no está disponible
      }
      return next;
    });
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}
