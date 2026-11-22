import { Link, useParams } from "react-router-dom";
import { useGetListingQuery } from "../../app/api";
import { formatPrice, CATEGORY_LABELS } from "../../app/labels";
import { StatusBadge } from "./StatusBadge";
import { OfferList } from "../offers/OfferList";
import { OfferForm } from "../offers/OfferForm";
import { SellerPanel } from "./SellerPanel";
import { useCurrentUser } from "../../features/users/CurrentUserContext";
import styles from "./ListingDetailPage.module.css";

export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useCurrentUser();
  const { data: listing, isLoading, error } = useGetListingQuery(id ?? "", {
    skip: !id,
  });

  if (!id) return <div>Ese anuncio no existe. <Link to="/">Volver</Link></div>;
  if (isLoading) return <div className="loading">Cargando…</div>;
  if (error || !listing)
    return <div>Ese anuncio no existe. <Link to="/">Volver</Link></div>;

  const isSeller = listing.seller.id === user.id;

  return (
    <>
      <Link to="/">← Volver a los anuncios</Link>
      <div className={styles.layout}>
        <article className={styles.main}>
          <h1>{listing.title}</h1>
          <StatusBadge status={listing.status} />
          <div className={styles.price}>{formatPrice(listing.price)}</div>
          <p>{listing.description}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Categoría</dt>
              <dd>{CATEGORY_LABELS[listing.category]}</dd>
            </div>
            <div>
              <dt>Ciudad</dt>
              <dd>{listing.city}</dd>
            </div>
            <div>
              <dt>Vendedor</dt>
              <dd>{listing.seller.name}</dd>
            </div>
            <div>
              <dt>Visitas</dt>
              <dd>{listing.views}</dd>
            </div>
          </dl>
        </article>
        <aside className={styles.side}>
          {isSeller ? (
            <SellerPanel listing={listing} />
          ) : listing.status === "AVAILABLE" ? (
            <>
              <OfferForm listingId={listing.id} />
              <OfferList listingId={listing.id} />
            </>
          ) : (
            <p className="loading">Este anuncio ya no admite ofertas.</p>
          )}
        </aside>
      </div>
    </>
  );
}
