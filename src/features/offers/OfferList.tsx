import { useGetOffersQuery, useAcceptOfferMutation } from "../../app/api";
import { formatPrice } from "../../app/labels";
import { StatusBadge } from "../listings/StatusBadge";
import styles from "./OfferList.module.css";

type OfferListProps = {
  listingId: string;
  isSeller?: boolean;
};

export function OfferList({ listingId, isSeller = false }: OfferListProps) {
  const { data: rawOffers, isLoading } = useGetOffersQuery(listingId);
  const [updateOffer] = useAcceptOfferMutation();
  const offers = rawOffers?.map((o) => ({ ...o, id: o._id! }));

  async function handleUpdate(offerId: string, status: "ACCEPTED" | "REJECTED") {
    const question =
      status === "ACCEPTED"
        ? "¿Aceptas esta oferta? El anuncio pasará a Reservado."
        : "¿Rechazas esta oferta?";
    if (!window.confirm(question)) return;
    await updateOffer({ id: offerId, status }).unwrap();
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
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.acceptBtn}
                  onClick={() => handleUpdate(offer.id, "ACCEPTED")}
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  className={`danger ${styles.rejectBtn}`}
                  onClick={() => handleUpdate(offer.id, "REJECTED")}
                >
                  Rechazar
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
