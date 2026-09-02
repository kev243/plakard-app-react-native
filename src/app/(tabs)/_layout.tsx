import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendrier",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="calendar-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Réglages",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="settings-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
