import { AppText } from "@/components/shared/AppText";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export function NotificationsVisual() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={[styles.glow, { backgroundColor: colors.surfaceSelected }]}
      />
      <View style={[styles.icon, { backgroundColor: colors.primary }]}>
        <Ionicons name="notifications" size={52} color="#FEFEFE" />
        <View style={styles.badge}>
          <AppText weight="extraBold" style={styles.badgeText}>
            2
          </AppText>
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.emoji, { backgroundColor: colors.surface }]}>
          <AppText style={styles.emojiText}>🥛</AppText>
        </View>
        <View style={styles.copy}>
          <AppText weight="bold" style={styles.title}>
            Expiration bientôt
          </AppText>
          <AppText style={[styles.body, { color: colors.textSecondary }]}>
            Le lait d’avoine expire dans 2 jours.
          </AppText>
        </View>
        <AppText style={[styles.time, { color: colors.textMuted }]}>
          maintenant
        </AppText>
      </View>
    </View>
  );
}

const shadow = {
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: {
    height: 5,
    width: 0,
  },
  shadowOpacity: 0.09,
  shadowRadius: 12,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  glow: {
    borderRadius: 140,
    height: 280,
    position: "absolute",
    width: 280,
  },
  icon: {
    alignItems: "center",
    borderRadius: 34,
    height: 126,
    justifyContent: "center",
    marginBottom: 58,
    width: 126,
    ...shadow,
  },
  badge: {
    alignItems: "center",
    backgroundColor: "#D94C3D",
    borderColor: "#FEFEFE",
    borderRadius: 17,
    borderWidth: 3,
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: -6,
    top: -7,
    width: 34,
  },
  badgeText: {
    color: "#FEFEFE",
    fontSize: 14,
  },
  card: {
    alignItems: "center",
    borderRadius: 18,
    bottom: 35,
    flexDirection: "row",
    padding: 15,
    position: "absolute",
    width: "96%",
    ...shadow,
  },
  emoji: {
    alignItems: "center",
    borderRadius: 11,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  emojiText: {
    fontSize: 24,
  },
  copy: {
    flex: 1,
    marginLeft: 11,
  },
  title: {
    fontSize: 14,
  },
  body: {
    fontSize: 11,
    marginTop: 2,
  },
  time: {
    alignSelf: "flex-start",
    fontSize: 9,
    marginLeft: 6,
  },
});
