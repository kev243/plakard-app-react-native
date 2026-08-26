import {
  AlertPreference,
  FoodCategory,
  FoodStorage,
} from "@/data/product-options";

export const PRODUCT_NAME_MAX_LENGTH = 80;
export const PRODUCT_QUANTITY_MAX = 999;

export interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  quantity: number;
  storage: FoodStorage;
  expirationDate: string;
  category: FoodCategory;
  alertPreference: AlertPreference;
  notificationId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type NewFoodItem = Omit<
  FoodItem,
  "id" | "createdAt" | "updatedAt" | "notificationId"
> & { notificationId?: string | null };
