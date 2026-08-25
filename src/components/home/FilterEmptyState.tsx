import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export function FilterEmptyState() {
  return (
    <View style={styles.container}>
      <AppText style={styles.icon}>🔎</AppText>
      <AppText weight="bold" style={styles.title}>
        Aucun produit trouvé
      </AppText>
      <AppText style={styles.description}>
        Aucun produit ne correspond à ce filtre pour le moment.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingHorizontal: 28, paddingTop: 48 },
  icon: { fontSize: 34 },
  title: { color: "#11181E", fontSize: 16, marginTop: 12 },
  description: {
    color: "#7F8385",
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
  },
});
