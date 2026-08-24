import { FOOD_ITEMS, FoodItem } from "@/data/products";
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

type ProductsContextValue = {
  products: FoodItem[];
  removeProduct: (id: number) => void;
  updateProduct: (product: FoodItem) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState(FOOD_ITEMS);

  const value = useMemo(
    () => ({
      products,
      removeProduct: (id: number) => {
        setProducts((current) => current.filter((product) => product.id !== id));
      },
      updateProduct: (product: FoodItem) => {
        setProducts((current) =>
          current.map((item) => (item.id === product.id ? product : item)),
        );
      },
    }),
    [products],
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
