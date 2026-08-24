export const storageOptions = [
  { name: "Réfrigérateur", label: "Frigo", icon: "🧊" },
  { name: "Congélateur", label: "Congélo", icon: "❄️" },
  { name: "Garde-manger", label: "Placard", icon: "🏠" },
  { name: "Autre", label: "Autre", icon: "📦" },
] as const;

export const categories = [
  { name: "Produits laitiers", label: "Laitiers", icon: "🥛" },
  { name: "Fruits", label: "Fruits", icon: "🍎" },
  { name: "Légumes", label: "Légumes", icon: "🥦" },
  { name: "Viandes", label: "Viandes", icon: "🍗" },
  { name: "Conserves", label: "Conserves", icon: "🥫" },
  { name: "Boissons", label: "Boissons", icon: "🥤" },
  { name: "Desserts", label: "Desserts", icon: "🍰" },
  { name: "Autre", label: "Autre", icon: "🌿" },
] as const;

export const alertOptions = [
  "Le jour même",
  "2 jours avant",
  "5 jours avant",
  "1 semaine avant",
] as const;

export type StorageLocation = (typeof storageOptions)[number]["name"];
export type Category = (typeof categories)[number]["name"];
export type AlertPreference = (typeof alertOptions)[number];
