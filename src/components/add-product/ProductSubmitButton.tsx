import { AppText } from "@/components/shared/AppText";
import { Pressable, StyleSheet } from "react-native";

type ProductSubmitButtonProps = {
  disabled: boolean;
  isEditing: boolean;
  onPress: () => void;
};

export default function ProductSubmitButton({
  disabled,
  isEditing,
  onPress,
}: ProductSubmitButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
    >
      <AppText
        weight="bold"
        style={[styles.submitText, disabled && styles.submitTextDisabled]}
      >
        {isEditing
          ? "Enregistrer les modifications"
          : "Ajouter dans mon Plakard"}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    alignItems: "center",
    backgroundColor: "#00975D",
    borderRadius: 16,
    paddingVertical: 16,
  },
  submitButtonDisabled: {
    backgroundColor: "#D6D8D7",
  },
  submitText: {
    color: "#FEFEFE",
    fontSize: 16,
  },
  submitTextDisabled: {
    color: "#9B9E9D",
  },
});
