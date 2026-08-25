import { useProducts } from "@/context/ProductsContext";
import { getDaysUntil } from "@/utils/expiration";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export default function CardStats() {
  const { products } = useProducts();
  const expiredCount = products.filter(
    (product) => getDaysUntil(product.expirationDate) < 0,
  ).length;
  const freshCount = products.length - expiredCount;

  return (
    <View style={styles.card}>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <AppText weight="extraBold" style={styles.value}>
            {products.length}
          </AppText>
          <AppText style={styles.label}>Total items</AppText>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <AppText
            weight="extraBold"
            style={[styles.value, styles.expiredValue]}
          >
            {expiredCount}
          </AppText>
          <AppText style={styles.label}>Produits expirés</AppText>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <AppText weight="extraBold" style={[styles.value, styles.freshValue]}>
            {freshCount}
          </AppText>
          <AppText style={styles.label}>Produits frais</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FEFEFE",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  value: {
    fontSize: 26,
    color: "#202020",
    lineHeight: 32,
  },
  expiredValue: {
    color: "#d94c3d",
  },
  freshValue: {
    color: "#00975d",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: 44,
    backgroundColor: "#e8e8e8",
  },
});
