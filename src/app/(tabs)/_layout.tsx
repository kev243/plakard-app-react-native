import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/context/NotificationsContext";
import { useEffect, useRef } from "react";

export default function TabLayout() {
  const { colors } = useTheme();
  const { onboardingReady, onboardingSeen } = useNotifications();
  const openedOnboarding = useRef(false);

  useEffect(() => {
    if (onboardingReady && !onboardingSeen && !openedOnboarding.current) {
      openedOnboarding.current = true;
      router.push("/notification-onboarding");
    }
  }, [onboardingReady, onboardingSeen]);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="calendar-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="settings-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
