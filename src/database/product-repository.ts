import { FoodItem, NewFoodItem } from "@/data/products";
import { SQLiteDatabase } from "expo-sqlite";

const PRODUCT_SELECT = `
  SELECT id, name, emoji, quantity, storage, category,
    expiration_date AS expirationDate,
    alert_preference AS alertPreference,
    notification_id AS notificationId,
    created_at AS createdAt,
    updated_at AS updatedAt
  FROM products
`;

export async function getProducts(db: SQLiteDatabase) {
  return db.getAllAsync<FoodItem>(
    `${PRODUCT_SELECT} ORDER BY expiration_date ASC, id ASC`,
  );
}

export async function createProduct(db: SQLiteDatabase, product: NewFoodItem) {
  const now = new Date().toISOString();
  const result = await db.runAsync(
    `INSERT INTO products
      (name, emoji, quantity, storage, category, expiration_date,
       alert_preference, notification_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    product.name,
    product.emoji,
    product.quantity,
    product.storage,
    product.category,
    product.expirationDate,
    product.alertPreference,
    product.notificationId ?? null,
    now,
    now,
  );
  const row = await db.getFirstAsync<FoodItem>(
    `${PRODUCT_SELECT} WHERE id = ?`,
    result.lastInsertRowId,
  );
  if (!row) throw new Error("Le produit ajouté est introuvable.");
  return row;
}

export async function updateProduct(db: SQLiteDatabase, product: FoodItem) {
  const updatedAt = new Date().toISOString();
  await db.runAsync(
    `UPDATE products SET name = ?, emoji = ?, quantity = ?, storage = ?,
      category = ?, expiration_date = ?, alert_preference = ?,
      notification_id = ?, updated_at = ? WHERE id = ?`,
    product.name,
    product.emoji,
    product.quantity,
    product.storage,
    product.category,
    product.expirationDate,
    product.alertPreference,
    product.notificationId,
    updatedAt,
    product.id,
  );
  return { ...product, updatedAt };
}

export async function deleteProduct(db: SQLiteDatabase, id: number) {
  await db.runAsync("DELETE FROM products WHERE id = ?", id);
}

export async function updateProductNotificationId(
  db: SQLiteDatabase,
  id: number,
  notificationId: string | null,
) {
  await db.runAsync(
    "UPDATE products SET notification_id = ?, updated_at = ? WHERE id = ?",
    notificationId,
    new Date().toISOString(),
    id,
  );
}
