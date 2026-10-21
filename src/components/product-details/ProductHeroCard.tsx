import { FormCard } from "@/components/add-product/FormCard";
import { useTheme } from "@/context/ThemeContext";
import { categoryLabels } from "@/data/product-options";
import { FoodItem } from "@/data/products";
import { getDaysUntil, getExpirationStatus } from "@/utils/expiration";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

function getCategoryLabel(product: FoodItem) {
  return categoryLabels[product.category];
}

export default function ProductHeroCard({ product }: { product: FoodItem }) {
  const { colors } = useTheme();
  const status = getExpirationStatus(getDaysUntil(product.expirationDate));
  const warning = status === "warning";
  const critical = status === "critical" || status === "expired";
  return (
    <FormCard style={styles.heroCard}>
      <View
        style={[styles.emojiContainer, { backgroundColor: colors.surface }]}
      >
        <AppText style={styles.emoji}>{product.emoji}</AppText>
      </View>
      <AppText weight="extraBold" style={styles.productName}>
        {product.name}
      </AppText>
      <AppText
        style={[styles.productCategory, { color: colors.textSecondary }]}
      >
        {getCategoryLabel(product)}
      </AppText>
      <View
        style={[
          styles.statusPill,
          warning && styles.warningBackground,
          critical && styles.criticalBackground,
        ]}
      >
        <View
          style={[
            styles.statusDot,
            warning && styles.warningDot,
            critical && styles.criticalDot,
          ]}
        />
        <AppText
          weight="bold"
          style={[
            styles.statusText,
            warning && styles.warningText,
            critical && styles.criticalText,
          ]}
        >
          {status === "expired"
            ? "Produit expiré"
            : warning || critical
              ? "À consommer bientôt"
              : "Produit frais"}
        </AppText>
      </View>
    </FormCard>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    alignItems: "center",
    paddingVertical: 28,
  },
  emojiContainer: {
    alignItems: "center",
    borderRadius: 28,
    height: 92,
    justifyContent: "center",
    width: 92,
  },
  emoji: { fontSize: 50 },
  productName: {
    fontSize: 24,
    marginTop: 16,
  },
  productCategory: {
    fontSize: 14,
    marginTop: 4,
  },
  statusPill: {
    alignItems: "center",
    backgroundColor: "#E7F5ED",
    borderRadius: 100,
    flexDirection: "row",
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  statusDot: {
    backgroundColor: "#00975D",
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  statusText: {
    color: "#00975D",
    fontSize: 12,
  },
  warningBackground: {
    backgroundColor: "#FFF4D6",
  },
  warningDot: {
    backgroundColor: "#C58A00",
  },
  warningText: {
    color: "#C58A00",
  },
  criticalBackground: {
    backgroundColor: "#FDE9E6",
  },
  criticalDot: {
    backgroundColor: "#D94C3D",
  },
  criticalText: {
    color: "#D94C3D",
  },
});
