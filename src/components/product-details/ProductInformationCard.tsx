import { FormCard, SectionTitle } from "@/components/add-product/FormCard";
import { categoryLabels, storageLabels } from "@/data/product-options";
import { FoodItem } from "@/data/products";
import { StyleSheet, View } from "react-native";
import InfoRow from "./InfoRow";

function getCategoryLabel(product: FoodItem) {
  return categoryLabels[product.category];
}

export default function ProductInformationCard({
  product,
}: {
  product: FoodItem;
}) {
  return (
    <FormCard>
      <SectionTitle>INFORMATIONS</SectionTitle>
      <View style={styles.infoList}>
        <InfoRow
          icon="cube-outline"
          label="Quantité"
          value={`${product.quantity} ${product.quantity > 1 ? "unités" : "unité"}`}
        />
        <InfoRow
          icon="home-outline"
          label="Lieu de stockage"
          value={storageLabels[product.storage]}
        />
        <InfoRow
          icon="grid-outline"
          label="Catégorie"
          value={getCategoryLabel(product)}
          last
        />
      </View>
    </FormCard>
  );
}

const styles = StyleSheet.create({
  infoList: { marginTop: 13 },
});
