import { AppText } from "@/components/shared/AppText";
import { Container } from "@/components/shared/Container";
import { useNotifications } from "@/context/NotificationsContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export function NotificationOnboardingScreen() {
  const { colors } = useTheme();
  const { markOnboardingSeen, requestPermission } = useNotifications();

  const finish = async (request: boolean) => {
    if (request) await requestPermission();
    await markOnboardingSeen();
    router.back();
  };

  return (
    <Container>
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.surfaceSelected },
          ]}
        >
          <Ionicons
            name="notifications-outline"
            size={54}
            color={colors.primary}
          />
        </View>
        <AppText weight="extraBold" style={styles.title}>
          Ne laisse plus rien expirer
        </AppText>
        <AppText style={[styles.description, { color: colors.textSecondary }]}>
          Plakard peut te prévenir au bon moment, selon la préférence choisie
          pour chaque produit.
        </AppText>

        <View style={[styles.benefits, { backgroundColor: colors.card }]}>
          <Benefit
            icon="time-outline"
            text="Des rappels au moment que tu choisis"
          />
          <Benefit
            icon="leaf-outline"
            text="Moins de gaspillage dans ton Plakard"
          />
          <Benefit
            icon="shield-checkmark-outline"
            text="Aucune publicité ni notification inutile"
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => void finish(true)}
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
        >
          <AppText weight="bold" style={styles.primaryText}>
            Activer les notifications
          </AppText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => void finish(false)}
          style={styles.secondaryButton}
        >
          <AppText
            weight="bold"
            style={[styles.secondaryText, { color: colors.textSecondary }]}
          >
            Plus tard
          </AppText>
        </Pressable>
      </View>
    </Container>
  );
}

function Benefit({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.benefitRow}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <AppText style={styles.benefitText}>{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 24,
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 42,
    height: 112,
    justifyContent: "center",
    width: 112,
  },
  title: {
    fontSize: 27,
    marginTop: 28,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: 330,
    textAlign: "center",
  },
  benefits: {
    alignSelf: "stretch",
    borderRadius: 22,
    gap: 18,
    marginTop: 30,
    padding: 22,
  },
  benefitRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 13,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
  },
  primaryButton: {
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 16,
    marginTop: 30,
    paddingVertical: 16,
  },
  primaryText: {
    color: "#FEFEFE",
    fontSize: 16,
  },
  secondaryButton: {
    alignItems: "center",
    minHeight: 48,
    paddingVertical: 14,
  },
  secondaryText: {
    fontSize: 15,
  },
});
