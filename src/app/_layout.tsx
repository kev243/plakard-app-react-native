import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { ProductsProvider } from "@/context/ProductsContext";
import { migrateDatabase } from "@/database/migrations";
import { SQLiteProvider } from "expo-sqlite";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { AppErrorFallback } from "@/components/shared/AppErrorFallback";

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

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <SQLiteProvider databaseName="plakard.db" onInit={migrateDatabase}>
          <ProductsProvider>
            <NotificationsProvider>
              <Stack initialRouteName="(tabs)">
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="add-product"
                  options={{ presentation: "fullScreenModal", headerShown: false }}
                />
                <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
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
          </ProductsProvider>
        </SQLiteProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
