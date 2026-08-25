import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { FormCard, SectionTitle } from "./FormCard";
import { alertOptions, AlertPreference } from "./options";

type Props = {
  value: AlertPreference;
  availableOptions: AlertPreference[];
  onChange: (preference: AlertPreference) => void;
};

export function AlertPreferenceCard({ value, availableOptions, onChange }: Props) {
  return (
    <FormCard>
      <View style={styles.titleRow}>
        <AppText style={styles.bell}>🔔</AppText>
        <SectionTitle>PRÉFÉRENCE D’ALERTE</SectionTitle>
      </View>
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
              style={[styles.row, index > 0 && styles.divider]}
            >
              <AppText style={[
                selected ? styles.selectedText : styles.text,
                disabled && styles.disabledText,
              ]}>
                {option}
              </AppText>
              <View style={[
                styles.radio,
                selected && !disabled && styles.radioSelected,
                disabled && styles.disabledRadio,
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
  bell: { fontSize: 18 },
  list: { marginTop: 18 },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 62,
    paddingHorizontal: 4,
  },
  divider: { borderTopColor: "#ECEDEB", borderTopWidth: 1 },
  text: { color: "#7F8385", fontSize: 17 },
  selectedText: { color: "#11181E", fontSize: 17 },
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
