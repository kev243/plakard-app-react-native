import { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 3;

export async function migrateDatabase(db: SQLiteDatabase) {
  await db.execAsync("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");

  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) return;

  if (currentVersion < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        emoji TEXT NOT NULL,
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        storage TEXT NOT NULL,
        category TEXT NOT NULL,
        expiration_date TEXT NOT NULL,
        alert_preference TEXT NOT NULL,
        notification_id TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS products_expiration_date_idx
        ON products (expiration_date);
    `);
  }

  if (currentVersion < 2) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS app_metadata (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
      );
    `);
  }

  if (currentVersion < 3) {
    await db.execAsync(`
      DELETE FROM products
      WHERE id BETWEEN 1 AND 8
        AND created_at = updated_at
        AND name IN (
          'Oat Milk', 'Blueberries', 'Avocados', 'Parmesan Block',
          'Chicken Breast', 'Free Range Eggs', 'Greek Yogurt', 'Broccoli'
        );
      DROP TABLE IF EXISTS app_metadata;
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
