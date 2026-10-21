import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  last?: boolean;
};

export default function InfoRow({
  icon,
  label,
  value,
  last = false,
}: InfoRowProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.infoRow,
        { borderBottomColor: colors.border },
        last && styles.lastInfoRow,
      ]}
    >
      <View
        style={[styles.infoIcon, { backgroundColor: colors.surfaceSelected }]}
      >
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <AppText style={[styles.infoLabel, { color: colors.textSecondary }]}>
        {label}
      </AppText>
      <AppText weight="bold" style={styles.infoValue}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
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
  infoLabel: {
    flex: 1,
    fontSize: 14,
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 14,
    maxWidth: "46%",
    textAlign: "right",
  },
});
