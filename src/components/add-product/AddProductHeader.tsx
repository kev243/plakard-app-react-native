import { AppText } from "@/components/shared/AppText";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleSheet, View } from "react-native";

type AddProductHeaderProps = {
  isEditing: boolean;
  onCancel: () => void;
};

export default function AddProductHeader({
  isEditing,
  onCancel,
}: AddProductHeaderProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        hitSlop={10}
        onPress={onCancel}
        style={styles.cancelButton}
      >
        <AppText weight="bold" style={styles.cancelText}>
          Annuler
        </AppText>
      </Pressable>
      <AppText
        weight="extraBold"
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[styles.title, { color: colors.text }]}
      >
        {isEditing ? "Modifier le produit" : "Ajouter un produit"}
      </AppText>
      <View style={styles.headerSpacer} />
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
  cancelButton: {
    justifyContent: "center",
    minHeight: 44,
    width: 72,
    zIndex: 1,
  },
  cancelText: {
    color: "#95999A",
    fontSize: 16,
  },
  title: {
    flex: 1,
    fontSize: 21,
    textAlign: "center",
  },
  headerSpacer: { width: 72 },
});
