import {
  alertOptions,
  categories,
  storageOptions,
} from "@/data/product-options";
import {
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_QUANTITY_MAX,
} from "@/data/products";
import { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 4;
const storageValues = toSqlList(storageOptions.map(({ value }) => value));
const categoryValues = toSqlList(categories.map(({ value }) => value));
const alertValues = toSqlList(alertOptions);

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
        name TEXT NOT NULL
          CHECK (length(trim(name)) BETWEEN 1 AND ${PRODUCT_NAME_MAX_LENGTH}),
        emoji TEXT NOT NULL,
        quantity INTEGER NOT NULL
          CHECK (typeof(quantity) = 'integer' AND quantity BETWEEN 1 AND ${PRODUCT_QUANTITY_MAX}),
        storage TEXT NOT NULL CHECK (storage IN (${storageValues})),
        category TEXT NOT NULL CHECK (category IN (${categoryValues})),
        expiration_date TEXT NOT NULL,
        alert_preference TEXT NOT NULL CHECK (alert_preference IN (${alertValues})),
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

  if (currentVersion < 4) {
    await migrateProductsConstraints(db);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

async function migrateProductsConstraints(db: SQLiteDatabase) {
  await db.execAsync("BEGIN IMMEDIATE;");
  try {
    await db.execAsync(`
      CREATE TABLE products_v4 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
          CHECK (length(trim(name)) BETWEEN 1 AND ${PRODUCT_NAME_MAX_LENGTH}),
        emoji TEXT NOT NULL,
        quantity INTEGER NOT NULL
          CHECK (typeof(quantity) = 'integer' AND quantity BETWEEN 1 AND ${PRODUCT_QUANTITY_MAX}),
        storage TEXT NOT NULL CHECK (storage IN (${storageValues})),
        category TEXT NOT NULL CHECK (category IN (${categoryValues})),
        expiration_date TEXT NOT NULL,
        alert_preference TEXT NOT NULL CHECK (alert_preference IN (${alertValues})),
        notification_id TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      INSERT INTO products_v4 (
        id, name, emoji, quantity, storage, category, expiration_date,
        alert_preference, notification_id, created_at, updated_at
      )
      SELECT
        id,
        CASE
          WHEN length(trim(name)) = 0 THEN 'Produit'
          ELSE substr(trim(name), 1, ${PRODUCT_NAME_MAX_LENGTH})
        END,
        emoji,
        CASE
          WHEN CAST(quantity AS INTEGER) < 1 THEN 1
          WHEN CAST(quantity AS INTEGER) > ${PRODUCT_QUANTITY_MAX} THEN ${PRODUCT_QUANTITY_MAX}
          ELSE CAST(quantity AS INTEGER)
        END,
        CASE WHEN storage IN (${storageValues}) THEN storage ELSE 'Autre' END,
        CASE WHEN category IN (${categoryValues}) THEN category ELSE 'Autre' END,
        expiration_date,
        CASE
          WHEN alert_preference IN (${alertValues}) THEN alert_preference
          ELSE 'Le jour même'
        END,
        notification_id,
        created_at,
        updated_at
      FROM products;

      DROP TABLE products;
      ALTER TABLE products_v4 RENAME TO products;
      CREATE INDEX products_expiration_date_idx ON products (expiration_date);
    `);
    await db.execAsync("COMMIT;");
  } catch (error) {
    await db.execAsync("ROLLBACK;").catch(() => undefined);
    throw error;
  }
}

function toSqlList(values: readonly string[]) {
  return values.map((value) => `'${value.replaceAll("'", "''")}'`).join(", ");
}
