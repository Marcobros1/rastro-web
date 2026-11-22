import { useGetOffersQuery } from "../../app/api";
import { formatPrice } from "../../app/labels";
import { StatusBadge } from "../listings/StatusBadge";
import styles from "./OfferList.module.css";

type OfferListProps = {
  listingId: string;
};

export function OfferList({ listingId }: OfferListProps) {
  const { data: offers, isLoading } = useGetOffersQuery(listingId);

  if (isLoading) return <div className="loading">Cargando ofertas…</div>;

  return (
    <div className={styles.box}>
      <h2>Ofertas ({offers?.length ?? 0})</h2>
      {!offers || offers.length === 0 ? (
        <p>Todavía no hay ofertas.</p>
      ) : (
        offers.map((offer) => (
          <div key={offer.id} className={styles.offer}>
            <span>{offer.buyer.name}</span>
            <strong>{formatPrice(offer.amount)}</strong>
            <StatusBadge status={offer.status} />
          </div>
        ))
      )}
    </div>
  );
}
