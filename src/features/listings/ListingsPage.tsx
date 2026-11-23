import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import type { ListingFilters as Filters } from "../../app/types";
import { useGetListingsQuery } from "../../app/api";
import { Loading } from "../../components/ui/Loading";
import { ListingCard } from "./ListingCard";
import { ListingFilters } from "./ListingFilters";
import { useFavorites } from "../../features/favorites/useFavorites";

export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters: Filters = Object.fromEntries(searchParams);
  const { data: listings, isLoading, error } = useGetListingsQuery(filters);
  const { favorites } = useFavorites();
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  function changeFilter(name: keyof Filters, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(name, value);
    } else {
      next.delete(name);
    }
    setSearchParams(next);
  }

  let visibleListings = listings ?? [];
  if (onlyFavorites) {
    visibleListings = visibleListings.filter((l) => favorites.includes(l.id));
  }

  if (isLoading) return <Loading />;
  if (error) return <div className="error">Error al cargar anuncios</div>;
  if (visibleListings.length === 0) return <div>No hay anuncios con esos filtros.</div>;

  return (
    <>
      <h1>Anuncios</h1>
      <ListingFilters filters={filters} onChange={changeFilter} />
      <label className="favorite-filter">
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(e) => setOnlyFavorites(e.target.checked)}
        />
        <span>Solo favoritos</span>
      </label>
      <div className="grid">
        {visibleListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </>
  );
}
