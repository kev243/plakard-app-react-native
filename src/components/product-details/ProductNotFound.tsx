import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export function ProductNotFound() {
  return (
    <View style={styles.container}>
      <AppText style={styles.icon}>📦</AppText>
      <AppText weight="bold" style={styles.title}>
        Produit introuvable
      </AppText>
      <AppText style={styles.text}>
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
    color: "#11181E",
    fontSize: 21,
    marginTop: 16,
  },
  text: {
    color: "#7F8385",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
});
