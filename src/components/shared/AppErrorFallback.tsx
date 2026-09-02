import { Ionicons } from "@expo/vector-icons";
import { ErrorBoundaryProps } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function AppErrorFallback({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.iconContainer}>
        <Ionicons name="warning-outline" size={38} color="#00975D" />
      </View>
      <Text style={styles.title}>Plakard n’a pas pu démarrer</Text>
      <Text style={styles.message}>
        Une erreur inattendue est survenue. Tes produits restent enregistrés sur
        cet appareil.
      </Text>
      {__DEV__ && <Text style={styles.debugMessage}>{error.message}</Text>}
      <Pressable
        accessibilityRole="button"
        onPress={() => void retry()}
        style={styles.retryButton}
      >
        <Text style={styles.retryLabel}>Réessayer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: "#FBF9EE",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: "#E5F4EC",
    borderRadius: 28,
    height: 72,
    justifyContent: "center",
    width: 72,
  },
  title: {
    color: "#101411",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 22,
    textAlign: "center",
  },
  message: {
    color: "#737876",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: 330,
    textAlign: "center",
  },
  debugMessage: {
    color: "#A34A40",
    fontSize: 12,
    marginTop: 14,
    maxWidth: 330,
    textAlign: "center",
  },
  retryButton: {
    alignItems: "center",
    backgroundColor: "#00975D",
    borderRadius: 16,
    marginTop: 24,
    minWidth: 180,
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  retryLabel: {
    color: "#FEFEFE",
    fontSize: 16,
    fontWeight: "700",
  },
});
