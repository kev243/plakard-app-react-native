import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export function FilterEmptyState() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <AppText style={styles.icon}>🔎</AppText>
      <AppText weight="bold" style={styles.title}>
        Aucun produit trouvé
      </AppText>
      <AppText style={[styles.description, { color: colors.textSecondary }]}>
        Aucun produit ne correspond à ce filtre pour le moment.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 48,
  },
  icon: {
    fontSize: 34,
  },
  title: {
    fontSize: 16,
    marginTop: 12,
  },
  description: {
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
  },
});
