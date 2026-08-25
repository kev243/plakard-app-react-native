import { AppText } from "@/components/shared/AppText";
import { Container } from "@/components/shared/Container";
import { ThemePreference, useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

const options: Array<{ value: ThemePreference; label: string; description: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { value: "system", label: "Automatique", description: "Suit le réglage du téléphone", icon: "phone-portrait-outline" },
  { value: "light", label: "Clair", description: "Toujours utiliser le thème clair", icon: "sunny-outline" },
  { value: "dark", label: "Sombre", description: "Toujours utiliser le thème sombre", icon: "moon-outline" },
];

export default function SettingsScreen() {
  const { colors, preference, setPreference } = useTheme();
  return (
    <Container>
      <View style={styles.header}>
        <AppText weight="extraBold" style={styles.title}>Réglages</AppText>
        <AppText style={[styles.subtitle, { color: colors.textSecondary }]}>Personnalise ton expérience Plakard</AppText>
      </View>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <AppText weight="bold" style={[styles.sectionTitle, { color: colors.textMuted }]}>APPARENCE</AppText>
        {options.map((option, index) => {
          const selected = preference === option.value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => void setPreference(option.value)}
              style={[styles.row, index > 0 && { borderTopColor: colors.border, borderTopWidth: 1 }]}
            >
              <View style={[styles.iconBox, { backgroundColor: colors.surface }]}>
                <Ionicons name={option.icon} size={22} color={selected ? colors.primary : colors.textSecondary} />
              </View>
              <View style={styles.details}>
                <AppText weight="bold" style={styles.label}>{option.label}</AppText>
                <AppText style={[styles.description, { color: colors.textSecondary }]}>{option.description}</AppText>
              </View>
              <Ionicons name={selected ? "checkmark-circle" : "ellipse-outline"} size={27} color={selected ? colors.primary : colors.textMuted} />
            </Pressable>
          );
        })}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: { paddingBottom: 20, paddingTop: 8 },
  title: { fontSize: 25 },
  subtitle: { fontSize: 14, marginTop: 4 },
  card: { borderRadius: 24, padding: 20 },
  sectionTitle: { fontSize: 13, letterSpacing: 0.6 },
  row: { alignItems: "center", flexDirection: "row", minHeight: 76 },
  iconBox: { alignItems: "center", borderRadius: 12, height: 44, justifyContent: "center", width: 44 },
  details: { flex: 1, marginLeft: 13 },
  label: { fontSize: 16 },
  description: { fontSize: 12, marginTop: 2 },
});
