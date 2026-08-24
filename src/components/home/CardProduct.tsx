import { FlatList, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  quantity: number;
  storage: "Fridge" | "Freezer" | "Pantry" | "Autre";
  daysLeft: number;
  category: string;
}
const FOOD_ITEMS: FoodItem[] = [
  {
    id: 1,
    emoji: "🥛",
    name: "Oat Milk",
    quantity: 3,
    storage: "Fridge",
    daysLeft: 2,
    category: "Dairy",
  },
  {
    id: 2,
    emoji: "🫐",
    name: "Blueberries",
    quantity: 1,
    storage: "Fridge",
    daysLeft: 4,
    category: "Fruit",
  },
  {
    id: 3,
    emoji: "🥑",
    name: "Avocados",
    quantity: 2,
    storage: "Pantry",
    daysLeft: 6,
    category: "Vegetable",
  },
  {
    id: 4,
    emoji: "🧀",
    name: "Parmesan Block",
    quantity: 1,
    storage: "Fridge",
    daysLeft: 18,
    category: "Dairy",
  },
  {
    id: 5,
    emoji: "🍗",
    name: "Chicken Breast",
    quantity: 4,
    storage: "Freezer",
    daysLeft: 1,
    category: "Meat",
  },
  {
    id: 6,
    emoji: "🥚",
    name: "Free Range Eggs",
    quantity: 12,
    storage: "Fridge",
    daysLeft: 10,
    category: "Dairy",
  },
  {
    id: 7,
    emoji: "🫙",
    name: "Greek Yogurt",
    quantity: 2,
    storage: "Fridge",
    daysLeft: 3,
    category: "Dairy",
  },
  {
    id: 8,
    emoji: "🥦",
    name: "Broccoli",
    quantity: 1,
    storage: "Fridge",
    daysLeft: 5,
    category: "Vegetable",
  },
];

const storageLabels: Record<FoodItem["storage"], string> = {
  Fridge: "Réfrigérateur",
  Freezer: "Congélateur",
  Pantry: "Garde-manger",
  Autre: "Autre",
};

export default function CardProduct() {
  return (
    <FlatList
      data={FOOD_ITEMS}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const isUrgent = item.daysLeft <= 3;

        return (
          <View style={styles.card}>
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
                weight="bold"
                style={[styles.days, isUrgent && styles.urgentDays]}
              >
                {item.daysLeft} j
              </AppText>
              <AppText
                style={[styles.expiryLabel, isUrgent && styles.urgentDays]}
              >
                restant{item.daysLeft > 1 ? "s" : ""}
              </AppText>
            </View>
          </View>
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
    alignItems: "flex-end",
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
    fontSize: 14,
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
