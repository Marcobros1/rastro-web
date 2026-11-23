import { useGetOffersQuery, useAcceptOfferMutation } from "../../app/api";
import { formatPrice } from "../../app/labels";
import { StatusBadge } from "../listings/StatusBadge";
import styles from "./OfferList.module.css";

type OfferListProps = {
  listingId: string;
  isSeller?: boolean;
};

export function OfferList({ listingId, isSeller = false }: OfferListProps) {
  const { data: offers, isLoading } = useGetOffersQuery(listingId);
  const [acceptOffer] = useAcceptOfferMutation();

  async function handleAccept(offerId: string) {
    if (!window.confirm("¿Aceptas esta oferta? El anuncio pasará a Reservado.")) {
      return;
    }
    try {
      await acceptOffer({ id: offerId, status: "ACCEPTED" }).unwrap();
    } catch (_e) {
      // El error se muestra en la consola del navegador si es necesario
    }
  }

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
            {isSeller && offer.status === "PENDING" && (
              <button
                type="button"
                className={styles.acceptBtn}
                onClick={() => handleAccept(offer.id)}
              >
                Aceptar
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
