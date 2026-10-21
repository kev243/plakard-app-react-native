import { AlertPreferenceCard } from "@/components/add-product/AlertPreferenceCard";
import { CategoryCard } from "@/components/add-product/CategoryCard";
import { ExpirationDateCard } from "@/components/add-product/ExpirationDateCard";
import {
  ProductNameCard,
  QuantityCard,
  StorageCard,
} from "@/components/add-product/ProductDetailsCards";
import { AppText } from "@/components/shared/AppText";
import { Container } from "@/components/shared/Container";
import { KeyboardScreen } from "@/components/shared/keyboard-screen";
import { useProducts } from "@/context/ProductsContext";
import { useTheme } from "@/context/ThemeContext";
import {
  AlertPreference,
  Category,
  StorageLocation,
} from "@/data/product-options";
import {
  createInitialProductForm,
  getAvailableAlertOptions,
  getEffectiveAlertPreference,
  hasProductFormChanged,
  toProductPayload,
  validateProductForm,
} from "@/helpers/product-form.helpers";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

export function AddProductContent() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { products, addProduct, updateProduct } = useProducts();
  const product = products.find((item) => item.id === Number(id));
  const isEditing = Boolean(product);
  const initialForm = createInitialProductForm(product);

  const [name, setName] = useState(initialForm.name);
  const [quantity, setQuantity] = useState(initialForm.quantity);
  const [storage, setStorage] = useState<StorageLocation>(initialForm.storage);
  const [category, setCategory] = useState<Category>(initialForm.category);
  const [expirationDate, setExpirationDate] = useState(
    initialForm.expirationDate,
  );
  const [alertPreference, setAlertPreference] = useState<AlertPreference>(
    initialForm.alertPreference,
  );
  const availableAlertOptions = useMemo(
    () => getAvailableAlertOptions(expirationDate),
    [expirationDate],
  );
  const effectiveAlertPreference = getEffectiveAlertPreference(
    alertPreference,
    availableAlertOptions,
  );

  const form = useMemo(
    () => ({
      name,
      quantity,
      storage,
      category,
      expirationDate,
      alertPreference,
    }),
    [alertPreference, category, expirationDate, name, quantity, storage],
  );

  const hasChanges = useMemo(
    () =>
      hasProductFormChanged(form, product, effectiveAlertPreference),
    [effectiveAlertPreference, form, product],
  );

  const submitDisabled = isEditing && !hasChanges;

  const handleSubmit = async () => {
    const validationError = validateProductForm(form);
    if (validationError) {
      Alert.alert(validationError.title, validationError.message);
      return;
    }

    const productPayload = toProductPayload(
      form,
      effectiveAlertPreference,
      product?.emoji,
    );

    if (product) {
      await updateProduct({
        ...product,
        ...productPayload,
      });

      Alert.alert(
        "Modifications enregistrées",
        `${name.trim()} a été mis à jour.`,
        [{ text: "OK", onPress: () => router.back() }],
      );
      return;
    }

    await addProduct(productPayload);
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
