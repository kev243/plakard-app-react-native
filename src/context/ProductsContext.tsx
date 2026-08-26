import { createProduct, deleteProduct, getProducts, updateProduct as updateStoredProduct, updateProductNotificationId } from "@/database/product-repository";
import { FoodItem, NewFoodItem } from "@/data/products";
import { cancelProductNotification, scheduleProductNotification } from "@/services/notifications";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ProductsContextValue = {
  products: FoodItem[];
  isLoading: boolean;
  addProduct: (product: NewFoodItem) => Promise<FoodItem>;
  removeProduct: (id: number) => Promise<void>;
  setNotificationId: (id: number, notificationId: string | null) => Promise<void>;
  updateProduct: (product: FoodItem) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: PropsWithChildren) {
  const db = useSQLiteContext();
  const [products, setProducts] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const storedProducts = await getProducts(db);
        if (active) setProducts(storedProducts);
      } catch (error) {
        if (active) {
          console.error("Impossible de charger les produits SQLite", error);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, [db]);

  const addProduct = useCallback(async (product: NewFoodItem) => {
    let created = await createProduct(db, product);
    const notificationId = await scheduleProductNotification(created).catch((error) => {
      console.warn("Le rappel n’a pas pu être programmé", error);
      return null;
    });
    if (notificationId) {
      created = await updateStoredProduct(db, { ...created, notificationId });
    }
    setProducts((current) => [...current, created].sort((a, b) => a.expirationDate.localeCompare(b.expirationDate)));
    return created;
  }, [db]);

  const removeProduct = useCallback(async (id: number) => {
    const product = products.find((item) => item.id === id);
    await cancelProductNotification(product?.notificationId ?? null);
    await deleteProduct(db, id);
    setProducts((current) => current.filter((product) => product.id !== id));
  }, [db, products]);

  const updateProduct = useCallback(async (product: FoodItem) => {
    await cancelProductNotification(product.notificationId);
    const candidate = { ...product, notificationId: null };
    const notificationId = await scheduleProductNotification(candidate).catch((error) => {
      console.warn("Le rappel n’a pas pu être reprogrammé", error);
      return null;
    });
    const updated = await updateStoredProduct(db, { ...candidate, notificationId });
    setProducts((current) => current
      .map((item) => (item.id === updated.id ? updated : item))
      .sort((a, b) => a.expirationDate.localeCompare(b.expirationDate)));
  }, [db]);

  const setNotificationId = useCallback(async (id: number, notificationId: string | null) => {
    await updateProductNotificationId(db, id, notificationId);
    setProducts((current) => current.map((product) =>
      product.id === id ? { ...product, notificationId } : product,
    ));
  }, [db]);

  const value = useMemo(
    () => ({
      products, isLoading, addProduct, removeProduct, setNotificationId, updateProduct,
    }),
    [addProduct, isLoading, products, removeProduct, setNotificationId, updateProduct],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts doit être utilisé dans ProductsProvider");
  }

  return context;
}
