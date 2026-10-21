import { useProducts } from "@/context/ProductsContext";
import type { ProductFormValues } from "@/helpers/product-form.helpers";
import {
  createInitialProductForm,
  getAvailableAlertOptions,
  getEffectiveAlertPreference,
  hasProductFormChanged,
  toProductPayload,
  validateProductForm,
} from "@/helpers/product-form.helpers";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";

export function useProductForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { products, addProduct, updateProduct } = useProducts();
  const product = products.find((item) => item.id === Number(id));
  const initializedProductId = useRef(product?.id);
  const [form, setForm] = useState<ProductFormValues>(() =>
    createInitialProductForm(product),
  );

  useEffect(() => {
    if (!product || initializedProductId.current === product.id) return;

    setForm(createInitialProductForm(product));
    initializedProductId.current = product.id;
  }, [product]);

  const availableAlertOptions = useMemo(
    () => getAvailableAlertOptions(form.expirationDate),
    [form.expirationDate],
  );
  const effectiveAlertPreference = getEffectiveAlertPreference(
    form.alertPreference,
    availableAlertOptions,
  );
  const hasChanges = useMemo(
    () =>
      hasProductFormChanged(form, product, effectiveAlertPreference),
    [effectiveAlertPreference, form, product],
  );
  const isEditing = Boolean(product);
  const submitDisabled = isEditing && !hasChanges;

  const updateField = useCallback(
    <Field extends keyof ProductFormValues>(
      field: Field,
      value: ProductFormValues[Field],
    ) => {
      setForm((current) => ({
        ...current,
        [field]: value,
      }));
    },
    [],
  );

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
        `${form.name.trim()} a été mis à jour.`,
        [{ text: "OK", onPress: () => router.back() }],
      );
      return;
    }

    await addProduct(productPayload);
    Alert.alert(
      "Produit ajouté",
      `${form.name.trim()} a été ajouté à ton Plakard.`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return {
    availableAlertOptions,
    effectiveAlertPreference,
    form,
    handleCancel: router.back,
    handleSubmit,
    isEditing,
    submitDisabled,
    updateField,
  };
}
