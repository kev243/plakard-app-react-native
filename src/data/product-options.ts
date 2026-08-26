export const storageOptions = [
  { name: "Réfrigérateur", value: "Fridge", label: "Frigo", icon: "🧊" },
  { name: "Congélateur", value: "Freezer", label: "Congélo", icon: "❄️" },
  { name: "Garde-manger", value: "Pantry", label: "Placard", icon: "🏠" },
  { name: "Autre", value: "Autre", label: "Autre", icon: "📦" },
] as const;

export const categories = [
  { name: "Produits laitiers", value: "Dairy", label: "Laitiers", icon: "🥛" },
  { name: "Fruits", value: "Fruit", label: "Fruits", icon: "🍎" },
  { name: "Légumes", value: "Vegetable", label: "Légumes", icon: "🥦" },
  { name: "Viandes", value: "Meat", label: "Viandes", icon: "🍗" },
  { name: "Conserves", value: "Canned", label: "Conserves", icon: "🥫" },
  { name: "Boissons", value: "Drink", label: "Boissons", icon: "🥤" },
  { name: "Desserts", value: "Dessert", label: "Desserts", icon: "🍰" },
  { name: "Autre", value: "Autre", label: "Autre", icon: "🌿" },
] as const;

export const alertOptions = [
  "Le jour même",
  "2 jours avant",
  "5 jours avant",
  "1 semaine avant",
] as const;

export type StorageLocation = (typeof storageOptions)[number]["name"];
export type FoodStorage = (typeof storageOptions)[number]["value"];
export type Category = (typeof categories)[number]["name"];
export type FoodCategory = (typeof categories)[number]["value"];
export type AlertPreference = (typeof alertOptions)[number];

export const alertOptionDays: Record<AlertPreference, number> = {
  "Le jour même": 0,
  "2 jours avant": 2,
  "5 jours avant": 5,
  "1 semaine avant": 7,
};

export const storageLabels = Object.fromEntries(
  storageOptions.map(({ name, value }) => [value, name]),
) as Record<FoodStorage, StorageLocation>;

export const categoryLabels = Object.fromEntries(
  categories.map(({ name, value }) => [value, name]),
) as Record<FoodCategory, Category>;

export function toFoodStorage(storage: StorageLocation): FoodStorage {
  return storageOptions.find((option) => option.name === storage)?.value ?? "Fridge";
}

export function toFormStorage(storage: FoodStorage): StorageLocation {
  return storageOptions.find((option) => option.value === storage)?.name ?? "Réfrigérateur";
}

export function toFoodCategory(category: Category): FoodCategory {
  return categories.find((option) => option.name === category)?.value ?? "Dairy";
}

export function toFormCategory(category: FoodCategory): Category {
  return categories.find((option) => option.value === category)?.name ?? "Produits laitiers";
}
