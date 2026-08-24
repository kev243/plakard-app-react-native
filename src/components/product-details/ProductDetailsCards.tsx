import { FormCard, SectionTitle } from "@/components/add-product/FormCard";
import { categoryLabels, FoodItem, storageLabels } from "@/data/products";
import { formatRemainingTime } from "@/utils/expiration";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export function ProductHeroCard({ product }: { product: FoodItem }) {
  const urgent = product.daysLeft <= 3;
  return (
    <FormCard style={styles.heroCard}>
      <View style={styles.emojiContainer}>
        <AppText style={styles.emoji}>{product.emoji}</AppText>
      </View>
      <AppText weight="extraBold" style={styles.productName}>
        {product.name}
      </AppText>
      <AppText style={styles.productCategory}>
        {getCategoryLabel(product)}
      </AppText>
      <View style={[styles.statusPill, urgent && styles.urgentBackground]}>
        <View style={[styles.statusDot, urgent && styles.urgentDot]} />
        <AppText
          weight="bold"
          style={[styles.statusText, urgent && styles.urgentText]}
        >
          {urgent ? "À consommer bientôt" : "Produit frais"}
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
  const urgent = product.daysLeft <= 3;
  const remainingTime = formatRemainingTime(product.daysLeft);
  const date = new Date();
  date.setDate(date.getDate() + product.daysLeft);

  return (
    <FormCard>
      <View style={styles.cardHeader}>
        <SectionTitle>DATE D’EXPIRATION</SectionTitle>
        <Ionicons name="calendar-outline" size={20} color="#00975D" />
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
          <AppText style={styles.expirationHint}>Date prévue</AppText>
        </View>
        <View style={[styles.daysBox, urgent && styles.urgentBackground]}>
          <AppText
            weight="extraBold"
            style={[styles.daysValue, urgent && styles.urgentText]}
          >
            {remainingTime.value}
          </AppText>
          <AppText style={[styles.daysLabel, urgent && styles.urgentText]}>
            {remainingTime.label}
          </AppText>
        </View>
      </View>
    </FormCard>
  );
}

export function ProductReminderCard() {
  return (
    <FormCard>
      <View style={styles.reminderRow}>
        <View style={styles.reminderIcon}>
          <AppText style={styles.bell}>🔔</AppText>
        </View>
        <View style={styles.reminderDetails}>
          <SectionTitle>RAPPEL</SectionTitle>
          <AppText weight="bold" style={styles.reminderValue}>
            2 jours avant
          </AppText>
        </View>
        <Ionicons name="checkmark-circle" size={27} color="#00975D" />
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
  return (
    <View style={[styles.infoRow, last && styles.lastInfoRow]}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={20} color="#00975D" />
      </View>
      <AppText style={styles.infoLabel}>{label}</AppText>
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
    backgroundColor: "#FBF9EE",
    borderRadius: 28,
    height: 92,
    justifyContent: "center",
    width: 92,
  },
  emoji: { fontSize: 50 },
  productName: { color: "#11181E", fontSize: 24, marginTop: 16 },
  productCategory: { color: "#85898B", fontSize: 14, marginTop: 4 },
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
  urgentBackground: { backgroundColor: "#FDE9E6" },
  urgentDot: { backgroundColor: "#D94C3D" },
  urgentText: { color: "#D94C3D" },
  infoList: { marginTop: 13 },
  infoRow: {
    alignItems: "center",
    borderBottomColor: "#ECEDEB",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 62,
  },
  lastInfoRow: { borderBottomWidth: 0 },
  infoIcon: {
    alignItems: "center",
    backgroundColor: "#EFF8F3",
    borderRadius: 11,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  infoLabel: { color: "#7F8385", flex: 1, fontSize: 14, marginLeft: 12 },
  infoValue: {
    color: "#11181E",
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
    color: "#11181E",
    fontSize: 17,
    textTransform: "capitalize",
  },
  expirationHint: { color: "#999C9E", fontSize: 12, marginTop: 4 },
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
    backgroundColor: "#FBF9EE",
    borderRadius: 13,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  bell: { fontSize: 22 },
  reminderDetails: { flex: 1, marginLeft: 13 },
  reminderValue: { color: "#11181E", fontSize: 16, marginTop: 5 },
});
