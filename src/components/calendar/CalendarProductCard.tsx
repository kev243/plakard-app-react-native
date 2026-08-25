import { FoodItem, storageLabels } from "@/data/products";
import { formatRemainingTime, getDaysUntil, getExpirationStatus } from "@/utils/expiration";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

type Props = {
  product: FoodItem;
  onPress: () => void;
};

export function CalendarProductCard({ product, onPress }: Props) {
  const daysLeft = getDaysUntil(product.expirationDate);
  const status = getExpirationStatus(daysLeft);
  const remaining = formatRemainingTime(daysLeft);

  return (
    <Pressable
      accessibilityLabel={`Voir les détails de ${product.name}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.emojiContainer}>
        <AppText style={styles.emoji}>{product.emoji}</AppText>
      </View>
      <View style={styles.details}>
        <AppText weight="bold" style={styles.name}>
          {product.name}
        </AppText>
        <AppText style={styles.meta}>
          {product.quantity} {product.quantity > 1 ? "unités" : "unité"} •{" "}
          {storageLabels[product.storage]}
        </AppText>
      </View>
      <View style={styles.expiryDetails}>
        <AppText
          weight="bold"
          style={[
            styles.remaining,
            status === "warning" && styles.warningText,
            (status === "critical" || status === "expired") && styles.criticalText,
          ]}
        >
          {remaining.value}
        </AppText>
        <Ionicons name="chevron-forward" size={18} color="#9A9EA1" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    borderRadius: 18,
    elevation: 2,
    flexDirection: "row",
    minHeight: 82,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  emojiContainer: {
    alignItems: "center",
    backgroundColor: "#FBF9EE",
    borderRadius: 13,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  emoji: { fontSize: 28 },
  details: { flex: 1, marginLeft: 12 },
  name: { color: "#11181E", fontSize: 15 },
  meta: { color: "#7F8385", fontSize: 11, marginTop: 4 },
  expiryDetails: { alignItems: "center", flexDirection: "row", gap: 4 },
  remaining: { color: "#00975D", fontSize: 18 },
  warningText: { color: "#C58A00" },
  criticalText: { color: "#D94C3D" },
});
