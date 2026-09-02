import { AppText } from "@/components/shared/AppText";
import { Container } from "@/components/shared/Container";
import { useNotifications } from "@/context/NotificationsContext";
import { ThemePreference, useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const options: {
  value: ThemePreference;
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    value: "system",
    label: "Automatique",
    description: "Suit le réglage du téléphone",
    icon: "phone-portrait-outline",
  },
  {
    value: "light",
    label: "Clair",
    description: "Toujours utiliser le thème clair",
    icon: "sunny-outline",
  },
  {
    value: "dark",
    label: "Sombre",
    description: "Toujours utiliser le thème sombre",
    icon: "moon-outline",
  },
];

const legalLinks: {
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  url: string;
}[] = [
  {
    label: "Politique de confidentialité",
    description: "Comment Plakard protège tes données",
    icon: "shield-checkmark-outline",
    url: "https://plakard-site.vercel.app/confidentialite",
  },
  {
    label: "Conditions d’utilisation",
    description: "Les règles d’utilisation de Plakard",
    icon: "document-text-outline",
    url: "https://plakard-site.vercel.app/conditions",
  },
];

export default function SettingsScreen() {
  const { colors, preference, setPreference } = useTheme();
  const { permission, openNotificationSettings, requestPermission } =
    useNotifications();
  const notificationEnabled = permission === "granted";
  const handleNotificationPress = () =>
    permission === "undetermined"
      ? requestPermission()
      : openNotificationSettings();
  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AppText weight="extraBold" style={styles.title}>
            Réglages
          </AppText>
          <AppText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Personnalise ton expérience Plakard
          </AppText>
        </View>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <AppText
            weight="bold"
            style={[styles.sectionTitle, { color: colors.textMuted }]}
          >
            APPARENCE
          </AppText>
          {options.map((option, index) => {
            const selected = preference === option.value;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                onPress={() => void setPreference(option.value)}
                style={[
                  styles.row,
                  index > 0 && {
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                  },
                ]}
              >
                <View
                  style={[styles.iconBox, { backgroundColor: colors.surface }]}
                >
                  <Ionicons
                    name={option.icon}
                    size={22}
                    color={selected ? colors.primary : colors.textSecondary}
                  />
                </View>
                <View style={styles.details}>
                  <AppText weight="bold" style={styles.label}>
                    {option.label}
                  </AppText>
                  <AppText
                    style={[
                      styles.description,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {option.description}
                  </AppText>
                </View>
                <Ionicons
                  name={selected ? "checkmark-circle" : "ellipse-outline"}
                  size={27}
                  color={selected ? colors.primary : colors.textMuted}
                />
              </Pressable>
            );
          })}
        </View>
        <View
          style={[
            styles.card,
            styles.notificationCard,
            { backgroundColor: colors.card },
          ]}
        >
          <AppText
            weight="bold"
            style={[styles.sectionTitle, { color: colors.textMuted }]}
          >
            NOTIFICATIONS
          </AppText>
          <View style={styles.notificationHeader}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: colors.surfaceSelected },
              ]}
            >
              <Ionicons
                name={
                  notificationEnabled
                    ? "notifications-outline"
                    : "notifications-off-outline"
                }
                size={22}
                color={
                  notificationEnabled ? colors.primary : colors.textSecondary
                }
              />
            </View>
            <View style={styles.details}>
              <AppText weight="bold" style={styles.label}>
                {notificationEnabled
                  ? "Notifications activées"
                  : "Notifications désactivées"}
              </AppText>
              <AppText
                style={[styles.description, { color: colors.textSecondary }]}
              >
                {notificationEnabled
                  ? "Tes rappels d’expiration peuvent être envoyés."
                  : "Active-les pour recevoir tes rappels d’expiration."}
              </AppText>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => void handleNotificationPress()}
            style={[
              styles.notificationButton,
              {
                backgroundColor: notificationEnabled
                  ? colors.surface
                  : colors.primary,
              },
            ]}
          >
            <AppText
              weight="bold"
              style={{ color: notificationEnabled ? colors.text : "#FEFEFE" }}
            >
              {permission === "undetermined"
                ? "Autoriser les notifications"
                : "Ouvrir les réglages système"}
            </AppText>
          </Pressable>
        </View>
        <View
          style={[
            styles.card,
            styles.legalCard,
            { backgroundColor: colors.card },
          ]}
        >
          <AppText
            weight="bold"
            style={[styles.sectionTitle, { color: colors.textMuted }]}
          >
            INFORMATIONS LÉGALES
          </AppText>
          {legalLinks.map((link, index) => (
            <Pressable
              key={link.url}
              accessibilityRole="link"
              accessibilityLabel={`Ouvrir ${link.label}`}
              onPress={() => void Linking.openURL(link.url)}
              style={[
                styles.row,
                index > 0 && {
                  borderTopColor: colors.border,
                  borderTopWidth: 1,
                },
              ]}
            >
              <View
                style={[styles.iconBox, { backgroundColor: colors.surface }]}
              >
                <Ionicons name={link.icon} size={22} color={colors.primary} />
              </View>
              <View style={styles.details}>
                <AppText weight="bold" style={styles.label}>
                  {link.label}
                </AppText>
                <AppText
                  style={[styles.description, { color: colors.textSecondary }]}
                >
                  {link.description}
                </AppText>
              </View>
              <Ionicons
                name="chevron-forward"
                size={21}
                color={colors.textMuted}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    paddingTop: 8,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  title: {
    fontSize: 25,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    borderRadius: 24,
    padding: 20,
  },
  notificationCard: {
    marginTop: 16,
  },
  legalCard: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 13,
    letterSpacing: 0.6,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 76,
  },
  iconBox: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  details: {
    flex: 1,
    marginLeft: 13,
  },
  label: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    marginTop: 2,
  },
  notificationHeader: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 18,
  },
  notificationButton: {
    alignItems: "center",
    borderRadius: 14,
    marginTop: 18,
    paddingVertical: 13,
  },
});
