import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export function ProductDetailsHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityLabel="Retour"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onBack}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={25} color="#11181E" />
      </Pressable>
      <AppText weight="extraBold" style={styles.title}>
        Détails du produit
      </AppText>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 62,
    paddingBottom: 16,
    paddingTop: 6,
  },
  backButton: {
    alignItems: "flex-start",
    height: 44,
    justifyContent: "center",
    width: 56,
  },
  title: {
    color: "#11181E",
    flex: 1,
    fontSize: 21,
    textAlign: "center",
  },
  spacer: {
    width: 56,
  },
});
