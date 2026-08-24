import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

type KeyboardScreenProps = {
  children: React.ReactNode;
};

export function KeyboardScreen({ children }: KeyboardScreenProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
