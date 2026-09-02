import { AddProductVisual } from "@/components/onboarding/AddProductVisual";
import { NotificationsVisual } from "@/components/onboarding/NotificationsVisual";
import { ProductsVisual } from "@/components/onboarding/ProductsVisual";
import { WelcomeVisual } from "@/components/onboarding/WelcomeVisual";
import { StyleSheet, View } from "react-native";

export type OnboardingVisualName =
  | "welcome"
  | "add"
  | "products"
  | "notifications";

const visuals = {
  welcome: WelcomeVisual,
  add: AddProductVisual,
  products: ProductsVisual,
  notifications: NotificationsVisual,
};

export function OnboardingVisual({
  compact,
  name,
}: {
  compact: boolean;
  name: OnboardingVisualName;
}) {
  const Visual = visuals[name];
  return (
    <View style={[styles.visual, compact && styles.compactVisual]}>
      <Visual />
    </View>
  );
}

const styles = StyleSheet.create({
  visual: {
    height: 330,
    width: "100%",
  },
  compactVisual: {
    height: 280,
    transform: [{ scale: 0.9 }],
  },
});
