import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { AppText } from "../shared/AppText";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  onDelete: () => void;
  onEdit: () => void;
};

export function ProductActions({ onDelete, onEdit }: Props) {
  return (
    <>
      <ActionButton
        icon="pencil-outline"
        label="Modifier le produit"
        onPress={onEdit}
      />
      <ActionButton
        destructive
        icon="trash-outline"
        label="Supprimer le produit"
        onPress={onDelete}
      />
    </>
  );
}

type ActionButtonProps = {
  destructive?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

function ActionButton({
  destructive = false,
  icon,
  label,
  onPress,
}: ActionButtonProps) {
  const { colors } = useTheme();
  const color = destructive ? "#D94C3D" : colors.selectedText;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        destructive
          ? styles.deleteButton
          : [styles.editButton, { backgroundColor: colors.selected }],
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={icon} size={20} color={color} />
      <AppText
        weight="bold"
        style={[
          styles.text,
          { color: destructive ? "#D94C3D" : colors.selectedText },
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    minHeight: 54,
  },
  editButton: {},
  deleteButton: { borderColor: "#F1C5BF", borderWidth: 1 },
  text: { fontSize: 15 },
  deleteText: { color: "#D94C3D" },
  pressed: { opacity: 0.7 },
});
