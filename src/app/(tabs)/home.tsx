import CardProduct from "@/components/home/CardProduct";
import CardStats from "@/components/home/CardStats";
import { FilterEmptyState } from "@/components/home/FilterEmptyState";
import FilterTabs, { FilterTab } from "@/components/home/FilterTabs";
import { HomeEmptyState } from "@/components/home/HomeEmptyState";
import HomeHeader from "@/components/home/HomeHeader";
import { Container } from "@/components/shared/Container";
import { useProducts } from "@/context/ProductsContext";
import { useTheme } from "@/context/ThemeContext";
import { FoodItem } from "@/data/products";
import { getDaysUntil, getExpirationStatus } from "@/utils/expiration";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { products, isLoading } = useProducts();
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Tous");
  const isEmpty = !isLoading && products.length === 0;
  const filteredProducts = useMemo(
    () => products.filter((product) => matchesFilter(product, activeFilter)),
    [activeFilter, products],
  );

  return (
    <View style={styles.screen}>
      <Container>
        <HomeHeader />
        <CardStats />
        {isEmpty ? (
          <HomeEmptyState />
        ) : (
          <>
            <FilterTabs activeTab={activeFilter} onChange={setActiveFilter} />
            {filteredProducts.length > 0 ? (
              <CardProduct products={filteredProducts} />
            ) : (
              <FilterEmptyState />
            )}
          </>
        )}
      </Container>
      {!isEmpty && (
        <Pressable
          accessibilityLabel="Ajouter un produit"
          accessibilityRole="button"
          onPress={() => router.push("../add-product")}
          style={[styles.floatingButton, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="add" size={30} color="#FEFEFE" />
        </Pressable>
      )}
    </View>
  );
}

const storageByFilter: Partial<Record<FilterTab, FoodItem["storage"]>> = {
  Réfrigérateur: "Fridge",
  Congélateur: "Freezer",
  "Garde-manger": "Pantry",
  Autre: "Autre",
};

function matchesFilter(product: FoodItem, filter: FilterTab) {
  if (filter === "Tous") return true;
  if (filter === "Urgent") {
    return (
      getExpirationStatus(getDaysUntil(product.expirationDate)) !== "fresh"
    );
  }
  return product.storage === storageByFilter[filter];
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  floatingButton: {
    alignItems: "center",
    borderRadius: 30,
    bottom: 24,
    elevation: 5,
    height: 58,
    justifyContent: "center",
    position: "absolute",
    right: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 58,
  },
});
