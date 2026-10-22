import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
export default function AppTabs() {
  const { colors } = useTheme();
  return (
    <NativeTabs tintColor={colors.primary}>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Accueil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "house",
            selected: "house.fill",
          }}
          md={{
            default: "home",
            selected: "home",
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="calendar">
        <NativeTabs.Trigger.Label>Calendrier</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Réglages</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "gearshape",
            selected: "gearshape.fill",
          }}
          md="settings"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name="add"
        role="search"
        disabled
        accessibilityLabel="Ajouter un produit"
        listeners={{
          tabPress: () => {
            router.push("/add-product");
          },
        }}
      >
        <NativeTabs.Trigger.Label hidden />

        <NativeTabs.Trigger.Icon sf="plus" md="add" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
