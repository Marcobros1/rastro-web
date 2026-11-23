import { Link } from "react-router-dom";
import type { ListingSummary } from "../../app/types";
import { formatPrice, CATEGORY_LABELS } from "../../app/labels";
import { StatusBadge } from "./StatusBadge";
import { useFavorites } from "../../features/favorites/useFavorites";
import styles from "./ListingCard.module.css";

type ListingCardProps = {
  listing: ListingSummary;
};

export function ListingCard({ listing }: ListingCardProps) {
  const listingId = listing.id ?? listing._id!;
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(listingId);

  return (
    <Link to={`/listings/${listingId}`} className={styles.card}>
      <button
        type="button"
        className={`${styles.favoriteBtn} ${fav ? styles.filled : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(listingId);
        }}
        aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {fav ? "❤️" : "🤍"}
      </button>
      <div className={`${styles.image} ${styles[listing.category as keyof typeof styles]}`}>
        {CATEGORY_LABELS[listing.category]}
      </div>
      <div className={styles.body}>
        <div className={styles.price}>{formatPrice(listing.price)}</div>
        <div className={styles.title}>{listing.title}</div>
        <div className={styles.footer}>
          <span>{listing.city}</span>
          <StatusBadge status={listing.status} />
        </div>
      </div>
    </Link>
  );
}
