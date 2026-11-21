import { useSearchParams } from "react-router-dom";
import type { ListingFilters as Filters } from "../../app/types";
import { useGetListingsQuery } from "../../app/api";
import { Loading } from "../../components/ui/Loading";
import { ListingCard } from "./ListingCard";
import { ListingFilters } from "./ListingFilters";

export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters: Filters = Object.fromEntries(searchParams);
  const { data: listings, isLoading, error } = useGetListingsQuery(filters);

  function changeFilter(name: keyof Filters, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(name, value);
    } else {
      next.delete(name);
    }
    setSearchParams(next);
  }

  if (isLoading) return <Loading />;
  if (error) return <div className="error">Error al cargar anuncios</div>;
  if (!listings || listings.length === 0) return <div>No hay anuncios con esos filtros.</div>;

  return (
    <>
      <h1>Anuncios</h1>
      <ListingFilters filters={filters} onChange={changeFilter} />
      <div className="grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </>
  );
}
