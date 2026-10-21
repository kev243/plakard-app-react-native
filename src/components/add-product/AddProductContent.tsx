import { AlertPreferenceCard } from "@/components/add-product/AlertPreferenceCard";
import { CategoryCard } from "@/components/add-product/CategoryCard";
import { ExpirationDateCard } from "@/components/add-product/ExpirationDateCard";
import {
  ProductNameCard,
  QuantityCard,
  StorageCard,
} from "@/components/add-product/ProductDetailsCards";
import { useProductForm } from "@/components/add-product/hooks/useProductForm";
import { Container } from "@/components/shared/Container";
import { KeyboardScreen } from "@/components/shared/keyboard-screen";
import { ScrollView, StyleSheet } from "react-native";
import AddProductHeader from "./AddProductHeader";
import ProductSubmitButton from "./ProductSubmitButton";

export function AddProductContent() {
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
        <AddProductHeader isEditing={isEditing} onCancel={handleCancel} />
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

          <ProductSubmitButton
            disabled={submitDisabled}
            isEditing={isEditing}
            onPress={handleSubmit}
          />
        </ScrollView>
      </KeyboardScreen>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 32 },
});
