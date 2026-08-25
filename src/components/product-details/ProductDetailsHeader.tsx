import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { useTheme } from "@/context/ThemeContext";

export function ProductDetailsHeader({ onBack }: { onBack: () => void }) {
  const { colors } = useTheme();
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityLabel="Retour"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onBack}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={25} color={colors.text} />
      </Pressable>
      <AppText weight="extraBold" style={[styles.title, { color: colors.text }]}>
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
    flex: 1,
    fontSize: 21,
    textAlign: "center",
  },
  spacer: {
    width: 56,
  },
});
