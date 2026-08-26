import { alertOptionDays, AlertPreference } from "@/data/product-options";
import { parseDateKey } from "@/utils/expiration";

type NotificationScheduleInput = {
  alertPreference: AlertPreference;
  expirationDate: string;
};

export function getNotificationDate(
  product: NotificationScheduleInput,
  now = new Date(),
) {
  const date = parseDateKey(product.expirationDate);
  date.setHours(9, 0, 0, 0);
  date.setDate(date.getDate() - alertOptionDays[product.alertPreference]);
  return date.getTime() > now.getTime() ? date : null;
}
