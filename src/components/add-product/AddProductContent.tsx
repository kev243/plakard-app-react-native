import { AlertPreferenceCard } from "@/components/add-product/AlertPreferenceCard";
import { CategoryCard } from "@/components/add-product/CategoryCard";
import { ExpirationDateCard } from "@/components/add-product/ExpirationDateCard";
import {
  ProductNameCard,
  QuantityCard,
  StorageCard,
} from "@/components/add-product/ProductDetailsCards";
import { useProductForm } from "@/components/add-product/hooks/useProductForm";
import { AppText } from "@/components/shared/AppText";
import { Container } from "@/components/shared/Container";
import { KeyboardScreen } from "@/components/shared/keyboard-screen";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export function AddProductContent() {
  const { colors } = useTheme();
  const {
    availableAlertOptions,
    effectiveAlertPreference,
    form,
    handleCancel,
    handleSubmit,
    isEditing,
    submitDisabled,
    updateField,
  } = useProductForm();

  return (
    <Container>
      <KeyboardScreen>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={handleCancel}
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
            category={form.category}
            name={form.name}
            onChangeName={(name) => updateField("name", name)}
          />
          <QuantityCard
            quantity={form.quantity}
            onChangeQuantity={(quantity) => updateField("quantity", quantity)}
          />
          <StorageCard
            storage={form.storage}
            onChangeStorage={(storage) => updateField("storage", storage)}
          />
          <CategoryCard
            category={form.category}
            onChange={(category) => updateField("category", category)}
          />
          <ExpirationDateCard
            value={form.expirationDate}
            onChange={(expirationDate) =>
              updateField("expirationDate", expirationDate)
            }
          />
          <AlertPreferenceCard
            value={effectiveAlertPreference}
            availableOptions={[...availableAlertOptions]}
            onChange={(alertPreference) =>
              updateField("alertPreference", alertPreference)
            }
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
