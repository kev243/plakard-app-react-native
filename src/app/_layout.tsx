import { AppErrorFallback } from "@/components/shared/AppErrorFallback";
import { SplashScreenController } from "@/components/shared/SplashScreenController";
import { AppOnboardingProvider } from "@/context/AppOnboardingContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { migrateDatabase } from "@/database/migrations";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 550, fade: true });

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <AppErrorFallback {...props} />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito: Nunito_400Regular,
    "Nunito-SemiBold": Nunito_600SemiBold,
    "Nunito-Bold": Nunito_700Bold,
    "Nunito-ExtraBold": Nunito_800ExtraBold,
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <SQLiteProvider databaseName="plakard.db" onInit={migrateDatabase}>
          <ProductsProvider>
            <AppOnboardingProvider>
              <NotificationsProvider>
                <SplashScreenController />
                <Stack initialRouteName="(tabs)">
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="add-product"
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="product/[id]"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="onboarding"
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                      gestureEnabled: false,
                    }}
                  />
                  <Stack.Screen
                    name="notification-onboarding"
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                      gestureEnabled: false,
                    }}
                  />
                </Stack>
              </NotificationsProvider>
            </AppOnboardingProvider>
          </ProductsProvider>
        </SQLiteProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
