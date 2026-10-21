import { ProductActions } from "@/components/product-details/ProductActions";
import { ProductDetailsHeader } from "@/components/product-details/ProductDetailsHeader";
import ProductExpirationCard from "@/components/product-details/ProductExpirationCard";
import ProductHeroCard from "@/components/product-details/ProductHeroCard";
import ProductInformationCard from "@/components/product-details/ProductInformationCard";
import ProductNotFound from "@/components/product-details/ProductNotFound";
import ProductReminderCard from "@/components/product-details/ProductReminderCard";
import { Container } from "@/components/shared/Container";
import { useProducts } from "@/context/ProductsContext";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, StyleSheet } from "react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, removeProduct } = useProducts();
  const product = products.find((item) => item.id === Number(id));

  const handleDelete = () => {
    if (!product) return;

    Alert.alert(
      "Supprimer ce produit?",
      `${product.name} sera retiré de ton Plakard.`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            await removeProduct(product.id);
            router.back();
          },
        },
      ],
    );
  };

  const handleEdit = () => {
    if (product) {
      router.push({ pathname: "/add-product", params: { id: product.id } });
    }
  };

  return (
    <Container>
      <ProductDetailsHeader onBack={() => router.back()} />
      {!product ? (
        <ProductNotFound />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <ProductHeroCard product={product} />
          <ProductInformationCard product={product} />
          <ProductExpirationCard product={product} />
          <ProductReminderCard product={product} />
          <ProductActions onEdit={handleEdit} onDelete={handleDelete} />
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 32 },
});
