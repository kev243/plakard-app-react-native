import { FormCard, SectionTitle } from "@/components/add-product/FormCard";
import { useTheme } from "@/context/ThemeContext";
import { FoodItem } from "@/data/products";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export default function ProductReminderCard({
  product,
}: {
  product: FoodItem;
}) {
  const { colors } = useTheme();
  return (
    <FormCard>
      <View style={styles.reminderRow}>
        <View
          style={[styles.reminderIcon, { backgroundColor: colors.surface }]}
        >
          <AppText style={styles.bell}>🔔</AppText>
        </View>
        <View style={styles.reminderDetails}>
          <SectionTitle>RAPPEL</SectionTitle>
          <AppText weight="bold" style={styles.reminderValue}>
            {product.alertPreference}
          </AppText>
        </View>
        <Ionicons name="checkmark-circle" size={27} color={colors.primary} />
      </View>
    </FormCard>
  );
}

const styles = StyleSheet.create({
  reminderRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  reminderIcon: {
    alignItems: "center",
    borderRadius: 13,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  bell: { fontSize: 22 },
  reminderDetails: {
    flex: 1,
    marginLeft: 13,
  },
  reminderValue: {
    fontSize: 16,
    marginTop: 5,
  },
});
