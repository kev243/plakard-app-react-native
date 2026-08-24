import { useProducts } from "@/context/ProductsContext";
import { storageLabels } from "@/data/products";
import { formatRemainingTime } from "@/utils/expiration";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export default function CardProduct() {
  const { products } = useProducts();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const isUrgent = item.daysLeft <= 3;
        const remainingTime = formatRemainingTime(item.daysLeft);

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
              pressed && styles.pressedCard,
            ]}
          >
            <View style={styles.emojiContainer}>
              <AppText style={styles.emoji}>{item.emoji}</AppText>
            </View>

            <View style={styles.details}>
              <AppText weight="bold" style={styles.name}>
                {item.name}
              </AppText>
              <AppText style={styles.meta}>
                {item.quantity} {item.quantity > 1 ? "unités" : "unité"} •{" "}
                {storageLabels[item.storage]}
              </AppText>
            </View>

            <View style={[styles.expiry, isUrgent && styles.urgentExpiry]}>
              <AppText
                weight="extraBold"
                style={[styles.days, isUrgent && styles.urgentDays]}
              >
                {remainingTime.value}
              </AppText>
              <AppText
                style={[styles.expiryLabel, isUrgent && styles.urgentDays]}
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
    backgroundColor: "#FEFEFE",
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
    backgroundColor: "#fbf9ee",
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
    color: "#777777",
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
  urgentExpiry: {
    backgroundColor: "#fde9e6",
  },
  days: {
    color: "#00975d",
    fontSize: 18,
  },
  urgentDays: {
    color: "#d94c3d",
  },
  expiryLabel: {
    color: "#00975d",
    fontSize: 10,
    marginTop: 1,
  },
});
