import { AlertPreferenceCard } from "@/components/add-product/AlertPreferenceCard";
import { CategoryCard } from "@/components/add-product/CategoryCard";
import { ExpirationDateCard } from "@/components/add-product/ExpirationDateCard";
import {
  AlertPreference,
  categories,
  Category,
  StorageLocation,
} from "@/components/add-product/options";
import {
  ProductNameCard,
  QuantityCard,
  StorageCard,
} from "@/components/add-product/ProductDetailsCards";
import { AppText } from "@/components/shared/AppText";
import { Container } from "@/components/shared/Container";
import { KeyboardScreen } from "@/components/shared/keyboard-screen";
import { useProducts } from "@/context/ProductsContext";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AddProduct() {
  return (
    <SafeAreaProvider>
      <AddProductContent />
    </SafeAreaProvider>
  );
}

function AddProductContent() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { products, updateProduct } = useProducts();
  const product = products.find((item) => item.id === Number(id));
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "Yogourt grec");
  const [quantity, setQuantity] = useState(product?.quantity ?? 2);
  const [storage, setStorage] = useState<StorageLocation>(() =>
    getFormStorage(product?.storage),
  );
  const [category, setCategory] = useState<Category>(() =>
    getFormCategory(product?.category),
  );
  const [expirationDate, setExpirationDate] = useState(() =>
    getInitialExpirationDate(product?.daysLeft),
  );
  const [alertPreference, setAlertPreference] =
    useState<AlertPreference>("2 jours avant");

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Information manquante", "Ajoute le nom du produit.");
      return;
    }

    if (product) {
      const categoryOption = categories.find((item) => item.name === category);

      updateProduct({
        ...product,
        category: formCategoryToFoodCategory[category],
        daysLeft: getDaysUntil(expirationDate),
        emoji: categoryOption?.icon ?? product.emoji,
        name: name.trim(),
        quantity,
        storage: formStorageToFoodStorage[storage],
      });

      Alert.alert("Modifications enregistrées", `${name.trim()} a été mis à jour.`, [
        { text: "OK", onPress: () => router.back() },
      ]);
      return;
    }

    Alert.alert("Produit ajouté", `${name.trim()} a été ajouté à ton Plakard.`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <Container>
      <KeyboardScreen>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={() => router.back()}
            style={styles.cancelButton}
          >
            <AppText weight="bold" style={styles.cancelText}>
              Annuler
            </AppText>
          </Pressable>
          <AppText
            weight="extraBold"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.title}
          >
            {isEditing ? "Modifier le produit" : "Ajouter un produit"}
          </AppText>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <ProductNameCard
            category={category}
            name={name}
            onChangeName={setName}
          />
          <QuantityCard
            quantity={quantity}
            onChangeQuantity={setQuantity}
          />
          <StorageCard storage={storage} onChangeStorage={setStorage} />
          <CategoryCard category={category} onChange={setCategory} />
          <ExpirationDateCard
            value={expirationDate}
            onChange={setExpirationDate}
          />
          <AlertPreferenceCard
            value={alertPreference}
            onChange={setAlertPreference}
          />

          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <AppText weight="bold" style={styles.submitText}>
              {isEditing ? "Enregistrer les modifications" : "Ajouter dans mon Plakard"}
            </AppText>
          </Pressable>
        </ScrollView>
      </KeyboardScreen>
    </Container>
  );
}

const formStorageToFoodStorage = {
  Réfrigérateur: "Fridge",
  Congélateur: "Freezer",
  "Garde-manger": "Pantry",
  Autre: "Autre",
} as const;

const formCategoryToFoodCategory: Record<Category, string> = {
  "Produits laitiers": "Dairy",
  Fruits: "Fruit",
  Légumes: "Vegetable",
  Viandes: "Meat",
  Conserves: "Canned",
  Boissons: "Drink",
  Desserts: "Dessert",
  Autre: "Other",
};

function getFormStorage(storage?: string): StorageLocation {
  const mapping: Record<string, StorageLocation> = {
    Fridge: "Réfrigérateur",
    Freezer: "Congélateur",
    Pantry: "Garde-manger",
    Autre: "Autre",
  };
  return mapping[storage ?? ""] ?? "Réfrigérateur";
}

function getFormCategory(category?: string): Category {
  const entry = Object.entries(formCategoryToFoodCategory).find(
    ([, value]) => value === category,
  );
  return (entry?.[0] as Category | undefined) ?? "Produits laitiers";
}

function getInitialExpirationDate(daysLeft = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysLeft);
  return date;
}

function getDaysUntil(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiration = new Date(date);
  expiration.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((expiration.getTime() - today.getTime()) / 86_400_000));
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 62,
    paddingBottom: 16,
    paddingTop: 6,
  },
  cancelButton: {
    justifyContent: "center",
    minHeight: 44,
    width: 72,
    zIndex: 1,
  },
  cancelText: { color: "#95999A", fontSize: 16 },
  title: {
    color: "#11181E",
    flex: 1,
    fontSize: 21,
    textAlign: "center",
  },
  headerSpacer: { width: 72 },
  content: { gap: 16, paddingBottom: 32 },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#00975D",
    borderRadius: 16,
    paddingVertical: 16,
  },
  submitText: { color: "#FEFEFE", fontSize: 16 },
});
