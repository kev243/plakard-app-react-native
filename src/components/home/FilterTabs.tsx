import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { AppText } from "../shared/AppText";

export type FilterTab =
  | "Tous"
  | "Urgent"
  | "Réfrigérateur"
  | "Congélateur"
  | "Garde-manger"
  | "Autre";

const filterTabs: FilterTab[] = [
  "Tous",
  "Urgent",
  "Réfrigérateur",
  "Congélateur",
  "Garde-manger",
  "Autre",
];

export default function FilterTabs() {
  const [activeTab, setActiveTab] = useState<FilterTab>("Tous");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      style={styles.scrollView}
      contentContainerStyle={styles.content}
    >
      {filterTabs.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <Pressable
            key={tab}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => setActiveTab(tab)}
            style={({ pressed }) => [
              styles.button,
              isActive ? styles.activeButton : styles.inactiveButton,
              pressed && styles.pressedButton,
            ]}
          >
            <AppText
              weight="semiBold"
              style={isActive ? styles.activeText : styles.inactiveText}
            >
              {tab}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
  content: {
    gap: 6,
    paddingVertical: 6,
    paddingRight: 24,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    flexShrink: 0,
  },
  activeButton: {
    backgroundColor: "#11181E",
  },
  inactiveButton: {
    backgroundColor: "rgba(17,24,30,0.07)",
  },
  activeText: {
    color: "#FEFEFE",
    fontSize: 13,
  },
  inactiveText: {
    color: "rgba(17,24,30,0.6)",
    fontSize: 13,
  },
  pressedButton: {
    opacity: 0.8,
  },
});
