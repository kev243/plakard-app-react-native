import { useAppOnboarding } from "@/context/AppOnboardingContext";
import { useNotifications } from "@/context/NotificationsContext";
import { useProducts } from "@/context/ProductsContext";
import { usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export function SplashScreenController() {
  const { onboardingReady: appOnboardingReady } = useAppOnboarding();
  const { onboardingReady: notificationOnboardingReady } = useNotifications();
  const { isLoading: productsLoading } = useProducts();
  const pathname = usePathname();

  const applicationReady =
    appOnboardingReady && notificationOnboardingReady && !productsLoading;
  const initialRedirectCompleted = pathname !== "/";

  useEffect(() => {
    if (applicationReady && initialRedirectCompleted) {
      SplashScreen.hide();
    }
  }, [applicationReady, initialRedirectCompleted]);

  return null;
}
