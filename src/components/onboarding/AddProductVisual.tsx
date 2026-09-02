import { AppText } from "@/components/shared/AppText";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export function AddProductVisual() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.header}>
          <View style={[styles.emoji, { backgroundColor: colors.surface }]}>
            <AppText style={styles.emojiText}>🥛</AppText>
          </View>
          <View style={styles.copy}>
            <AppText weight="bold" style={styles.name}>
              Lait d’avoine
            </AppText>
            <AppText style={[styles.meta, { color: colors.textSecondary }]}>
              2 unités
            </AppText>
          </View>
          <View style={[styles.check, { backgroundColor: colors.primary }]}>
            <Ionicons name="checkmark" size={20} color="#FEFEFE" />
          </View>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <AppText
          weight="bold"
          style={[styles.label, { color: colors.textMuted }]}
        >
          LIEU DE STOCKAGE
        </AppText>
        <View style={styles.storageRow}>
          <StorageChip emoji="🧊" label="Frigo" selected />
          <StorageChip emoji="❄️" label="Congélateur" />
          <StorageChip emoji="🏠" label="Placard" />
        </View>
        <View style={[styles.dateRow, { backgroundColor: colors.surface }]}>
          <Ionicons name="calendar-outline" size={21} color={colors.primary} />
          <AppText weight="bold" style={styles.dateText}>
            Expire le 18 sept.
          </AppText>
        </View>
      </View>
    </View>
  );
}

function StorageChip({
  emoji,
  label,
  selected = false,
}: {
  emoji: string;
  label: string;
  selected?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.storageChip,
        { backgroundColor: selected ? colors.selected : colors.surface },
      ]}
    >
      <AppText style={styles.storageEmoji}>{emoji}</AppText>
      <AppText
        weight="bold"
        style={[
          styles.storageLabel,
          { color: selected ? colors.selectedText : colors.textSecondary },
        ]}
      >
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  card: {
    borderRadius: 24,
    elevation: 3,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    width: "94%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  emoji: {
    alignItems: "center",
    borderRadius: 13,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  emojiText: {
    fontSize: 27,
  },
  copy: {
    flex: 1,
    marginLeft: 13,
  },
  name: {
    fontSize: 17,
  },
  meta: {
    fontSize: 12,
    marginTop: 2,
  },
  check: {
    alignItems: "center",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  divider: {
    height: 1,
    marginVertical: 17,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.7,
  },
  storageRow: {
    flexDirection: "row",
    gap: 7,
    marginTop: 10,
  },
  storageChip: {
    alignItems: "center",
    borderRadius: 12,
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  storageEmoji: {
    fontSize: 18,
  },
  storageLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  dateRow: {
    alignItems: "center",
    borderRadius: 13,
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    padding: 13,
  },
  dateText: {
    fontSize: 13,
  },
});
