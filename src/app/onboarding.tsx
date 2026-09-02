import { OnboardingScreen } from "@/screens/onboarding";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function OnboardingRoute() {
  return (
    <SafeAreaProvider>
      <OnboardingScreen />
    </SafeAreaProvider>
  );
}
