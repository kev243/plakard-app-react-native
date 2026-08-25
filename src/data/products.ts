export interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  quantity: number;
  storage: "Fridge" | "Freezer" | "Pantry" | "Autre";
  expirationDate: string;
  category: string;
  alertPreference: string;
  notificationId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type NewFoodItem = Omit<
  FoodItem,
  "id" | "createdAt" | "updatedAt" | "notificationId"
> & { notificationId?: string | null };

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
