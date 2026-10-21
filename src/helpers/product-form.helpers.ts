import {
  alertOptionDays,
  alertOptions,
  type AlertPreference,
  categories,
  type Category,
  type StorageLocation,
  toFoodCategory,
  toFoodStorage,
  toFormCategory,
  toFormStorage,
} from "@/data/product-options";
import type { FoodItem, NewFoodItem } from "@/data/products";
import { getDateKey, getDaysUntil, parseDateKey } from "@/utils/expiration";

export type ProductFormValues = {
  name: string;
  quantity: number;
  storage: StorageLocation;
  category: Category;
  expirationDate: Date;
  alertPreference: AlertPreference;
};

export type ProductFormValidationError = {
  title: string;
  message: string;
};

function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

export function createInitialProductForm(
  product?: FoodItem,
): ProductFormValues {
  return {
    name: product?.name ?? "",
    quantity: product?.quantity ?? 1,
    storage: toFormStorage(product?.storage ?? "Fridge"),
    category: toFormCategory(product?.category ?? "Dairy"),
    expirationDate: product
      ? parseDateKey(product.expirationDate)
      : getTomorrow(),
    alertPreference: product?.alertPreference ?? "2 jours avant",
  };
}

export function getAvailableAlertOptions(expirationDate: Date) {
  const daysUntilExpiration = getDaysUntil(expirationDate);

  return alertOptions.filter(
    (option) =>
      daysUntilExpiration > 0 &&
      alertOptionDays[option] < daysUntilExpiration,
  );
}

export function getEffectiveAlertPreference(
  alertPreference: AlertPreference,
  availableAlertOptions: readonly AlertPreference[],
) {
  return availableAlertOptions.includes(alertPreference)
    ? alertPreference
    : (availableAlertOptions[0] ?? "Le jour même");
}

export function hasProductFormChanged(
  form: ProductFormValues,
  product: FoodItem | undefined,
  effectiveAlertPreference: AlertPreference,
) {
  if (!product) return true;

  return (
    form.name.trim() !== product.name ||
    form.quantity !== product.quantity ||
    toFoodStorage(form.storage) !== product.storage ||
    toFoodCategory(form.category) !== product.category ||
    getDateKey(form.expirationDate) !== product.expirationDate ||
    effectiveAlertPreference !== product.alertPreference
  );
}

export function validateProductForm(
  form: ProductFormValues,
): ProductFormValidationError | null {
  if (!form.name.trim()) {
    return {
      title: "Information manquante",
      message: "Ajoute le nom du produit.",
    };
  }

  if (getDaysUntil(form.expirationDate) <= 0) {
    return {
      title: "Date invalide",
      message: "Choisis une date d’expiration dans le futur.",
    };
  }

  return null;
}

export function toProductPayload(
  form: ProductFormValues,
  effectiveAlertPreference: AlertPreference,
  fallbackEmoji = "🌿",
): NewFoodItem {
  const categoryOption = categories.find(
    (item) => item.name === form.category,
  );

  return {
    category: toFoodCategory(form.category),
    expirationDate: getDateKey(form.expirationDate),
    alertPreference: effectiveAlertPreference,
    emoji: categoryOption?.icon ?? fallbackEmoji,
    name: form.name.trim(),
    quantity: form.quantity,
    storage: toFoodStorage(form.storage),
  };
}
