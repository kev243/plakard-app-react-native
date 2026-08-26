import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { FormCard, SectionTitle } from "./FormCard";
import { alertOptions, AlertPreference } from "@/data/product-options";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/context/NotificationsContext";
import { router } from "expo-router";

type Props = {
  value: AlertPreference;
  availableOptions: AlertPreference[];
  onChange: (preference: AlertPreference) => void;
};

export function AlertPreferenceCard({ value, availableOptions, onChange }: Props) {
  const { colors } = useTheme();
  const { permission } = useNotifications();
  return (
    <FormCard>
      <View style={styles.titleRow}>
        <AppText style={styles.bell}>🔔</AppText>
        <SectionTitle>PRÉFÉRENCE D’ALERTE</SectionTitle>
      </View>
      {permission !== "granted" && (
        <View style={[styles.permissionNotice, { backgroundColor: colors.surface }]}>
          <Ionicons name="notifications-off-outline" size={20} color={colors.textSecondary} />
          <View style={styles.permissionText}>
            <AppText weight="bold" style={styles.permissionTitle}>Notifications désactivées</AppText>
            <AppText style={[styles.permissionDescription, { color: colors.textSecondary }]}>Ta préférence sera enregistrée, mais aucun rappel ne sera envoyé.</AppText>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/(tabs)/settings")}
            >
          <AppText weight="bold" style={[styles.permissionAction, { color: colors.primary }]}>
                Aller dans les réglages
              </AppText>
            </Pressable>
          </View>
        </View>
      )}
      <View style={styles.list}>
        {alertOptions.map((option, index) => {
          const selected = value === option;
          const disabled = !availableOptions.includes(option);
          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected, disabled }}
              disabled={disabled}
              onPress={() => onChange(option)}
              style={[
                styles.row,
                index > 0 && [styles.divider, { borderTopColor: colors.border }],
              ]}
            >
              <AppText style={[
                selected ? styles.selectedText : styles.text,
                { color: selected ? colors.text : colors.textSecondary },
                disabled && styles.disabledText,
              ]}>
                {option}
              </AppText>
              <View style={[
                styles.radio,
                selected && !disabled && styles.radioSelected,
                disabled && [styles.disabledRadio, { backgroundColor: colors.surface, borderColor: colors.border }],
              ]}>
                {selected && !disabled && (
                  <Ionicons name="checkmark" size={20} color="#FEFEFE" />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </FormCard>
  );
}

const styles = StyleSheet.create({
  titleRow: { alignItems: "center", flexDirection: "row", gap: 10 },
  permissionNotice: { alignItems: "flex-start", borderRadius: 14, flexDirection: "row", gap: 10, marginTop: 16, padding: 13 },
  permissionText: { flex: 1 },
  permissionTitle: { fontSize: 13 },
  permissionDescription: { fontSize: 12, lineHeight: 17, marginTop: 2 },
  permissionAction: { fontSize: 12, marginTop: 7 },
  bell: { fontSize: 18 },
  list: { marginTop: 18 },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 62,
    paddingHorizontal: 4,
  },
  divider: { borderTopWidth: 1 },
  text: { fontSize: 17 },
  selectedText: { fontSize: 17 },
  disabledText: { color: "#C9CBCC" },
  radio: {
    alignItems: "center",
    borderColor: "#D0D2D3",
    borderRadius: 15,
    borderWidth: 2,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  radioSelected: { backgroundColor: "#00975D", borderColor: "#00975D" },
  disabledRadio: { backgroundColor: "#F5F5F3", borderColor: "#E5E6E6" },
});
