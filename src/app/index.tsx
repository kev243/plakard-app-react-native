import { useAppOnboarding } from "@/context/AppOnboardingContext";
import { useNotifications } from "@/context/NotificationsContext";
import { useProducts } from "@/context/ProductsContext";
import { Redirect } from "expo-router";

export default function Index() {
  const {
    onboardingReady: appOnboardingReady,
    onboardingSeen: appOnboardingSeen,
  } = useAppOnboarding();
  const {
    onboardingReady: notificationOnboardingReady,
    onboardingSeen: notificationOnboardingSeen,
  } = useNotifications();
  const { isLoading: productsLoading } = useProducts();

  if (!appOnboardingReady || !notificationOnboardingReady || productsLoading) {
    return null;
  }

  if (!appOnboardingSeen) {
    return <Redirect href="/onboarding" />;
  }

  if (!notificationOnboardingSeen) {
    return <Redirect href="/notification-onboarding" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
