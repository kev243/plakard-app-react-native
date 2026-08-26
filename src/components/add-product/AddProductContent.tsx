import { AlertPreferenceCard } from "@/components/add-product/AlertPreferenceCard";
import { CategoryCard } from "@/components/add-product/CategoryCard";
import { ExpirationDateCard } from "@/components/add-product/ExpirationDateCard";
import {
  alertOptionDays,
  alertOptions,
  AlertPreference,
  categories,
  Category,
  StorageLocation,
  toFoodCategory,
  toFoodStorage,
  toFormCategory,
  toFormStorage,
} from "@/data/product-options";
import {
  ProductNameCard,
  QuantityCard,
  StorageCard,
} from "@/components/add-product/ProductDetailsCards";
import { AppText } from "@/components/shared/AppText";
import { Container } from "@/components/shared/Container";
import { KeyboardScreen } from "@/components/shared/keyboard-screen";
import { useProducts } from "@/context/ProductsContext";
import { getDateKey, getDaysUntil, parseDateKey } from "@/utils/expiration";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

export function AddProductContent() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { products, addProduct, updateProduct } = useProducts();
  const product = products.find((item) => item.id === Number(id));
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [quantity, setQuantity] = useState(product?.quantity ?? 1);
  const [storage, setStorage] = useState<StorageLocation>(() =>
    toFormStorage(product?.storage ?? "Fridge"),
  );
  const [category, setCategory] = useState<Category>(() =>
    toFormCategory(product?.category ?? "Dairy"),
  );
  const [expirationDate, setExpirationDate] = useState(() =>
    product ? parseDateKey(product.expirationDate) : getTomorrow(),
  );
  const [alertPreference, setAlertPreference] = useState<AlertPreference>(
    product?.alertPreference ?? "2 jours avant",
  );
  const daysUntilExpiration = getDaysUntil(expirationDate);
  const availableAlertOptions = useMemo(
    () =>
      alertOptions.filter(
        (option) =>
          daysUntilExpiration > 0 &&
          alertOptionDays[option] < daysUntilExpiration,
      ),
    [daysUntilExpiration],
  );
  const effectiveAlertPreference = availableAlertOptions.includes(alertPreference)
    ? alertPreference
    : availableAlertOptions[0] ?? "Le jour même";

  const hasChanges = useMemo(() => {
    if (!product) return true;

    return (
      name.trim() !== product.name ||
      quantity !== product.quantity ||
      toFoodStorage(storage) !== product.storage ||
      toFoodCategory(category) !== product.category ||
      getDateKey(expirationDate) !== product.expirationDate ||
      effectiveAlertPreference !== product.alertPreference
    );
  }, [
    category,
    effectiveAlertPreference,
    expirationDate,
    name,
    product,
    quantity,
    storage,
  ]);

  const submitDisabled = isEditing && !hasChanges;

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Information manquante", "Ajoute le nom du produit.");
      return;
    }

    if (daysUntilExpiration <= 0) {
      Alert.alert(
        "Date invalide",
        "Choisis une date d’expiration dans le futur.",
      );
      return;
    }

    if (product) {
      const categoryOption = categories.find((item) => item.name === category);

      await updateProduct({
        ...product,
        category: toFoodCategory(category),
        expirationDate: getDateKey(expirationDate),
        alertPreference: effectiveAlertPreference,
        emoji: categoryOption?.icon ?? product.emoji,
        name: name.trim(),
        quantity,
        storage: toFoodStorage(storage),
      });

      Alert.alert(
        "Modifications enregistrées",
        `${name.trim()} a été mis à jour.`,
        [{ text: "OK", onPress: () => router.back() }],
      );
      return;
    }

    const categoryOption = categories.find((item) => item.name === category);
    await addProduct({
      category: toFoodCategory(category),
      expirationDate: getDateKey(expirationDate),
      alertPreference: effectiveAlertPreference,
      emoji: categoryOption?.icon ?? "🌿",
      name: name.trim(),
      quantity,
      storage: toFoodStorage(storage),
    });
    Alert.alert(
      "Produit ajouté",
      `${name.trim()} a été ajouté à ton Plakard.`,
      [{ text: "OK", onPress: () => router.back() }],
    );
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
            style={[styles.title, { color: colors.text }]}
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
          <QuantityCard quantity={quantity} onChangeQuantity={setQuantity} />
          <StorageCard storage={storage} onChangeStorage={setStorage} />
          <CategoryCard category={category} onChange={setCategory} />
          <ExpirationDateCard
            value={expirationDate}
            onChange={setExpirationDate}
          />
          <AlertPreferenceCard
            value={effectiveAlertPreference}
            availableOptions={[...availableAlertOptions]}
            onChange={setAlertPreference}
          />

          <Pressable
            accessibilityState={{ disabled: submitDisabled }}
            disabled={submitDisabled}
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              submitDisabled && styles.submitButtonDisabled,
            ]}
          >
            <AppText
              weight="bold"
              style={[
                styles.submitText,
                submitDisabled && styles.submitTextDisabled,
              ]}
            >
              {isEditing
                ? "Enregistrer les modifications"
                : "Ajouter dans mon Plakard"}
            </AppText>
          </Pressable>
        </ScrollView>
      </KeyboardScreen>
    </Container>
  );
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
  submitButtonDisabled: { backgroundColor: "#D6D8D7" },
  submitText: { color: "#FEFEFE", fontSize: 16 },
  submitTextDisabled: { color: "#9B9E9D" },
});
