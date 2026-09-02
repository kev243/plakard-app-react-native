import { AppText } from "@/components/shared/AppText";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, View } from "react-native";

const products = [
  {
    emoji: "🍗",
    label: "restant",
    meta: "1 unité • Frigo",
    name: "Poulet",
    status: "critical",
    value: "1 j",
  },
  {
    emoji: "🫐",
    label: "restants",
    meta: "2 unités • Frigo",
    name: "Myrtilles",
    status: "warning",
    value: "4 j",
  },
  {
    emoji: "🥛",
    label: "restants",
    meta: "1 unité • Frigo",
    name: "Lait d’avoine",
    status: "fresh",
    value: "18 j",
  },
] as const;

export function ProductsVisual() {
  return (
    <View style={styles.container}>
      {products.map((product) => (
        <DemoProductCard key={product.name} {...product} />
      ))}
    </View>
  );
}

function DemoProductCard({
  emoji,
  label,
  meta,
  name,
  status,
  value,
}: (typeof products)[number]) {
  const { colors } = useTheme();
  const statusColors =
    status === "critical"
      ? { background: "#FDE9E6", text: "#D94C3D" }
      : status === "warning"
        ? { background: "#FFF4D6", text: "#C58A00" }
        : { background: "#E7F5ED", text: "#00975D" };
  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={[styles.emoji, { backgroundColor: colors.surface }]}>
        <AppText style={styles.emojiText}>{emoji}</AppText>
      </View>
      <View style={styles.details}>
        <AppText weight="bold" style={styles.name}>
          {name}
        </AppText>
        <AppText style={[styles.meta, { color: colors.textSecondary }]}>
          {meta}
        </AppText>
      </View>
      <View
        style={[styles.expiry, { backgroundColor: statusColors.background }]}
      >
        <AppText
          weight="extraBold"
          style={[styles.value, { color: statusColors.text }]}
        >
          {value}
        </AppText>
        <AppText style={[styles.label, { color: statusColors.text }]}>
          {label}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  card: {
    alignItems: "center",
    borderRadius: 16,
    elevation: 3,
    flexDirection: "row",
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    width: "96%",
  },
  emoji: {
    alignItems: "center",
    borderRadius: 11,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  emojiText: {
    fontSize: 25,
  },
  details: {
    flex: 1,
    marginLeft: 11,
  },
  name: {
    fontSize: 14,
  },
  meta: {
    fontSize: 10,
    marginTop: 3,
  },
  expiry: {
    alignItems: "center",
    borderRadius: 9,
    minWidth: 55,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  value: {
    fontSize: 16,
  },
  label: {
    fontSize: 9,
    marginTop: 1,
  },
});
