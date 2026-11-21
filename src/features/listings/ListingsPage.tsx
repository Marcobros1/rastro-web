import { useGetListingsQuery } from "../../app/api";
import { Loading } from "../../components/ui/Loading";
import { ListingCard } from "./ListingCard";

export function ListingsPage() {
  const { data: listings, isLoading, error } = useGetListingsQuery({});

  if (isLoading) return <Loading />;
  if (error) return <div className="error">Error al cargar anuncios</div>;
  if (!listings || listings.length === 0) return <div>No hay anuncios</div>;

  return (
    <>
      <h1>Anuncios</h1>
      <div className="grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </>
  );
}
