import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { useTheme } from "@/context/ThemeContext";

export function ProductNotFound() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <AppText style={styles.icon}>📦</AppText>
      <AppText weight="bold" style={styles.title}>
        Produit introuvable
      </AppText>
      <AppText style={[styles.text, { color: colors.textSecondary }]}>
        Ce produit n’existe plus dans ton Plakard.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  icon: {
    fontSize: 54,
  },
  title: {
    fontSize: 21,
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
});
