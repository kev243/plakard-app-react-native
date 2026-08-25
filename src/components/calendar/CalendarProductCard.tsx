import { FoodItem, storageLabels } from "@/data/products";
import { formatRemainingTime, getDaysUntil, getExpirationStatus } from "@/utils/expiration";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  product: FoodItem;
  onPress: () => void;
};

export function CalendarProductCard({ product, onPress }: Props) {
  const { colors } = useTheme();
  const daysLeft = getDaysUntil(product.expirationDate);
  const status = getExpirationStatus(daysLeft);
  const remaining = formatRemainingTime(daysLeft);

  return (
    <Pressable
      accessibilityLabel={`Voir les détails de ${product.name}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: colors.card }, pressed && styles.pressed]}
    >
      <View style={[styles.emojiContainer, { backgroundColor: colors.surface }]}>
        <AppText style={styles.emoji}>{product.emoji}</AppText>
      </View>
      <View style={styles.details}>
        <AppText weight="bold" style={styles.name}>
          {product.name}
        </AppText>
        <AppText style={[styles.meta, { color: colors.textSecondary }]}>
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
    borderRadius: 13,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  emoji: { fontSize: 28 },
  details: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15 },
  meta: { fontSize: 11, marginTop: 4 },
  expiryDetails: { alignItems: "center", flexDirection: "row", gap: 4 },
  remaining: { color: "#00975D", fontSize: 18 },
  warningText: { color: "#C58A00" },
  criticalText: { color: "#D94C3D" },
});
