import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export function HomeEmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppText style={styles.icon}>☹️</AppText>
      </View>
      <AppText weight="extraBold" style={styles.title}>
        Ton Plakard est vide
      </AppText>
      <AppText style={styles.description}>
        Ajoute ton premier produit pour suivre sa date d’expiration et éviter le
        gaspillage.
      </AppText>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/add-product")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressedButton,
        ]}
      >
        <AppText weight="bold" style={styles.buttonText}>
          Ajouter un produit
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    borderRadius: 24,
    marginTop: 18,
    paddingHorizontal: 28,
    paddingVertical: 34,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: "#FBF9EE",
    borderRadius: 30,
    height: 88,
    justifyContent: "center",
    width: 88,
  },
  icon: { fontSize: 45 },
  title: { color: "#11181E", fontSize: 20, marginTop: 18 },
  description: {
    color: "#7F8385",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#00975D",
    borderRadius: 16,
    marginTop: 22,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  pressedButton: { opacity: 0.82 },
  buttonText: { color: "#FEFEFE", fontSize: 15 },
});
