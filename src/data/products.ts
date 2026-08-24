export interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  quantity: number;
  storage: "Fridge" | "Freezer" | "Pantry" | "Autre";
  daysLeft: number;
  category: string;
}

export const FOOD_ITEMS: FoodItem[] = [
  { id: 1, emoji: "🥛", name: "Oat Milk", quantity: 3, storage: "Fridge", daysLeft: 2, category: "Dairy" },
  { id: 2, emoji: "🫐", name: "Blueberries", quantity: 1, storage: "Fridge", daysLeft: 4, category: "Fruit" },
  { id: 3, emoji: "🥑", name: "Avocados", quantity: 2, storage: "Pantry", daysLeft: 6, category: "Vegetable" },
  { id: 4, emoji: "🧀", name: "Parmesan Block", quantity: 1, storage: "Fridge", daysLeft: 18, category: "Dairy" },
  { id: 5, emoji: "🍗", name: "Chicken Breast", quantity: 4, storage: "Freezer", daysLeft: 1, category: "Meat" },
  { id: 6, emoji: "🥚", name: "Free Range Eggs", quantity: 12, storage: "Fridge", daysLeft: 10, category: "Dairy" },
  { id: 7, emoji: "🫙", name: "Greek Yogurt", quantity: 2, storage: "Fridge", daysLeft: 3, category: "Dairy" },
  { id: 8, emoji: "🥦", name: "Broccoli", quantity: 1, storage: "Fridge", daysLeft: 5, category: "Vegetable" },
];

export const storageLabels: Record<FoodItem["storage"], string> = {
  Fridge: "Réfrigérateur",
  Freezer: "Congélateur",
  Pantry: "Garde-manger",
  Autre: "Autre",
};

export const categoryLabels: Record<string, string> = {
  Dairy: "Produits laitiers",
  Fruit: "Fruits",
  Vegetable: "Légumes",
  Meat: "Viandes",
};

export function getProductById(id: string | number) {
  return FOOD_ITEMS.find((item) => item.id === Number(id));
}
