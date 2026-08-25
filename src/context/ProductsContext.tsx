import { createProduct, deleteProduct, getProducts, updateProduct as updateStoredProduct } from "@/database/product-repository";
import { FoodItem, NewFoodItem } from "@/data/products";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ProductsContextValue = {
  products: FoodItem[];
  isLoading: boolean;
  addProduct: (product: NewFoodItem) => Promise<FoodItem>;
  removeProduct: (id: number) => Promise<void>;
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
    const created = await createProduct(db, product);
    setProducts((current) => [...current, created].sort((a, b) => a.expirationDate.localeCompare(b.expirationDate)));
    return created;
  }, [db]);

  const removeProduct = useCallback(async (id: number) => {
    await deleteProduct(db, id);
    setProducts((current) => current.filter((product) => product.id !== id));
  }, [db]);

  const updateProduct = useCallback(async (product: FoodItem) => {
    const updated = await updateStoredProduct(db, product);
    setProducts((current) => current
      .map((item) => (item.id === updated.id ? updated : item))
      .sort((a, b) => a.expirationDate.localeCompare(b.expirationDate)));
  }, [db]);

  const value = useMemo(
    () => ({
      products, isLoading, addProduct, removeProduct, updateProduct,
    }),
    [addProduct, isLoading, products, removeProduct, updateProduct],
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
