import { STATUS_LABELS } from "../../app/labels";
import styles from "./StatusBadge.module.css";

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status as keyof typeof styles]}`}>
      {STATUS_LABELS[status as keyof typeof STATUS_LABELS]}
    </span>
  );
}
