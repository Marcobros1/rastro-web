import { Link } from "react-router-dom";
import type { ListingSummary } from "../../app/types";
import { formatPrice, CATEGORY_LABELS } from "../../app/labels";
import { StatusBadge } from "./StatusBadge";
import styles from "./ListingCard.module.css";

type ListingCardProps = {
  listing: ListingSummary;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link to={`/listings/${listing.id}`} className={styles.card}>
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
