import { FormCard, SectionTitle } from "@/components/add-product/FormCard";
import { useTheme } from "@/context/ThemeContext";
import { FoodItem } from "@/data/products";
import {
  formatRemainingTime,
  getDaysUntil,
  getExpirationStatus,
  parseDateKey,
} from "@/utils/expiration";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export default function ProductExpirationCard({
  product,
}: {
  product: FoodItem;
}) {
  const { colors } = useTheme();
  const daysLeft = getDaysUntil(product.expirationDate);
  const status = getExpirationStatus(daysLeft);
  const warning = status === "warning";
  const critical = status === "critical" || status === "expired";
  const remainingTime = formatRemainingTime(daysLeft);
  const date = parseDateKey(product.expirationDate);

  return (
    <FormCard>
      <View style={styles.cardHeader}>
        <SectionTitle>DATE D’EXPIRATION</SectionTitle>
        <Ionicons name="calendar-outline" size={20} color={colors.primary} />
      </View>
      <View style={styles.expirationContent}>
        <View>
          <AppText style={styles.expirationDate}>
            {date.toLocaleDateString("fr-CA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </AppText>
          <AppText style={[styles.expirationHint, { color: colors.textMuted }]}>
            Date prévue
          </AppText>
        </View>
        <View
          style={[
            styles.daysBox,
            warning && styles.warningBackground,
            critical && styles.criticalBackground,
          ]}
        >
          <AppText
            weight="extraBold"
            style={[
              styles.daysValue,
              warning && styles.warningText,
              critical && styles.criticalText,
            ]}
          >
            {remainingTime.value}
          </AppText>
          <AppText
            style={[
              styles.daysLabel,
              warning && styles.warningText,
              critical && styles.criticalText,
            ]}
          >
            {remainingTime.label}
          </AppText>
        </View>
      </View>
    </FormCard>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expirationContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  expirationDate: {
    fontSize: 17,
    textTransform: "capitalize",
  },
  expirationHint: { fontSize: 12, marginTop: 4 },
  daysBox: {
    alignItems: "center",
    backgroundColor: "#E7F5ED",
    borderRadius: 15,
    minWidth: 72,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  daysValue: {
    color: "#00975D",
    fontSize: 17,
  },
  daysLabel: {
    color: "#00975D",
    fontSize: 10,
    marginTop: 1,
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
  warningBackground: {
    backgroundColor: "#FFF4D6",
  },
});
