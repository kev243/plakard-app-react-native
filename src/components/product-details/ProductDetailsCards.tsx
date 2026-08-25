import { FormCard, SectionTitle } from "@/components/add-product/FormCard";
import { categoryLabels, FoodItem, storageLabels } from "@/data/products";
import { formatRemainingTime, getDaysUntil, getExpirationStatus, parseDateKey } from "@/utils/expiration";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { useTheme } from "@/context/ThemeContext";

export function ProductHeroCard({ product }: { product: FoodItem }) {
  const { colors } = useTheme();
  const status = getExpirationStatus(getDaysUntil(product.expirationDate));
  const warning = status === "warning";
  const critical = status === "critical" || status === "expired";
  return (
    <FormCard style={styles.heroCard}>
      <View style={[styles.emojiContainer, { backgroundColor: colors.surface }]}>
        <AppText style={styles.emoji}>{product.emoji}</AppText>
      </View>
      <AppText weight="extraBold" style={styles.productName}>
        {product.name}
      </AppText>
      <AppText style={[styles.productCategory, { color: colors.textSecondary }]}>
        {getCategoryLabel(product)}
      </AppText>
      <View style={[
        styles.statusPill,
        warning && styles.warningBackground,
        critical && styles.criticalBackground,
      ]}>
        <View style={[
          styles.statusDot,
          warning && styles.warningDot,
          critical && styles.criticalDot,
        ]} />
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

export function ProductInformationCard({ product }: { product: FoodItem }) {
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

export function ProductExpirationCard({ product }: { product: FoodItem }) {
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
          <AppText style={[styles.expirationHint, { color: colors.textMuted }]}>Date prévue</AppText>
        </View>
        <View style={[
          styles.daysBox,
          warning && styles.warningBackground,
          critical && styles.criticalBackground,
        ]}>
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
          <AppText style={[
            styles.daysLabel,
            warning && styles.warningText,
            critical && styles.criticalText,
          ]}>
            {remainingTime.label}
          </AppText>
        </View>
      </View>
    </FormCard>
  );
}

export function ProductReminderCard({ product }: { product: FoodItem }) {
  const { colors } = useTheme();
  return (
    <FormCard>
      <View style={styles.reminderRow}>
        <View style={[styles.reminderIcon, { backgroundColor: colors.surface }]}>
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

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  last?: boolean;
};

function InfoRow({ icon, label, value, last = false }: InfoRowProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.infoRow, { borderBottomColor: colors.border }, last && styles.lastInfoRow]}>
      <View style={[styles.infoIcon, { backgroundColor: colors.surfaceSelected }]}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <AppText style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</AppText>
      <AppText weight="bold" style={styles.infoValue}>
        {value}
      </AppText>
    </View>
  );
}

function getCategoryLabel(product: FoodItem) {
  return categoryLabels[product.category] ?? product.category;
}

const styles = StyleSheet.create({
  heroCard: { alignItems: "center", paddingVertical: 28 },
  emojiContainer: {
    alignItems: "center",
    borderRadius: 28,
    height: 92,
    justifyContent: "center",
    width: 92,
  },
  emoji: { fontSize: 50 },
  productName: { fontSize: 24, marginTop: 16 },
  productCategory: { fontSize: 14, marginTop: 4 },
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
  statusText: { color: "#00975D", fontSize: 12 },
  warningBackground: { backgroundColor: "#FFF4D6" },
  warningDot: { backgroundColor: "#C58A00" },
  warningText: { color: "#C58A00" },
  criticalBackground: { backgroundColor: "#FDE9E6" },
  criticalDot: { backgroundColor: "#D94C3D" },
  criticalText: { color: "#D94C3D" },
  infoList: { marginTop: 13 },
  infoRow: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 62,
  },
  lastInfoRow: { borderBottomWidth: 0 },
  infoIcon: {
    alignItems: "center",
    borderRadius: 11,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  infoLabel: { flex: 1, fontSize: 14, marginLeft: 12 },
  infoValue: {
    fontSize: 14,
    maxWidth: "46%",
    textAlign: "right",
  },
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
  daysLabel: { color: "#00975D", fontSize: 10, marginTop: 1 },
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
  reminderDetails: { flex: 1, marginLeft: 13 },
  reminderValue: { fontSize: 16, marginTop: 5 },
});
