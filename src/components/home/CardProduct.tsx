import { FoodItem, storageLabels } from "@/data/products";
import { formatRemainingTime, getDaysUntil, getExpirationStatus } from "@/utils/expiration";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { useTheme } from "@/context/ThemeContext";

export default function CardProduct({ products }: { products: FoodItem[] }) {
  const { colors } = useTheme();
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const daysLeft = getDaysUntil(item.expirationDate);
        const status = getExpirationStatus(daysLeft);
        const isWarning = status === "warning";
        const isCritical = status === "critical" || status === "expired";
        const remainingTime = formatRemainingTime(daysLeft);

        return (
          <Pressable
            accessibilityLabel={`Voir les détails de ${item.name}`}
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              })
            }
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.card },
              pressed && styles.pressedCard,
            ]}
          >
            <View style={[styles.emojiContainer, { backgroundColor: colors.surface }]}>
              <AppText style={styles.emoji}>{item.emoji}</AppText>
            </View>

            <View style={styles.details}>
              <AppText weight="bold" style={styles.name}>
                {item.name}
              </AppText>
              <AppText style={[styles.meta, { color: colors.textSecondary }]}>
                {item.quantity} {item.quantity > 1 ? "unités" : "unité"} •{" "}
                {storageLabels[item.storage]}
              </AppText>
            </View>

            <View style={[
              styles.expiry,
              isWarning && styles.warningExpiry,
              isCritical && styles.criticalExpiry,
            ]}>
              <AppText
                weight="extraBold"
                style={[
                  styles.days,
                  isWarning && styles.warningText,
                  isCritical && styles.criticalText,
                ]}
              >
                {remainingTime.value}
              </AppText>
              <AppText
                style={[
                  styles.expiryLabel,
                  isWarning && styles.warningText,
                  isCritical && styles.criticalText,
                ]}
              >
                {remainingTime.label}
              </AppText>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  card: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressedCard: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  emojiContainer: {
    alignItems: "center",
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  emoji: {
    fontSize: 28,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
  },
  meta: {
    fontSize: 12,
    marginTop: 4,
  },
  expiry: {
    alignItems: "center",
    backgroundColor: "#e7f5ed",
    borderRadius: 10,
    minWidth: 58,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  warningExpiry: { backgroundColor: "#FFF4D6" },
  criticalExpiry: { backgroundColor: "#FDE9E6" },
  days: {
    color: "#00975d",
    fontSize: 18,
  },
  warningText: { color: "#C58A00" },
  criticalText: { color: "#D94C3D" },
  expiryLabel: {
    color: "#00975d",
    fontSize: 10,
    marginTop: 1,
  },
});
