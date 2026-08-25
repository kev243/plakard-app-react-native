import { Pressable, ScrollView, StyleSheet } from "react-native";
import { AppText } from "../shared/AppText";
import { useTheme } from "@/context/ThemeContext";

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

type Props = {
  activeTab: FilterTab;
  onChange: (tab: FilterTab) => void;
};

export default function FilterTabs({ activeTab, onChange }: Props) {
  const { colors } = useTheme();

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
            onPress={() => onChange(tab)}
            style={({ pressed }) => [
              styles.button,
              isActive
                ? [styles.activeButton, { backgroundColor: colors.selected }]
                : [styles.inactiveButton, { backgroundColor: colors.surface }],
              pressed && styles.pressedButton,
            ]}
          >
            <AppText
              weight="semiBold"
              style={[
                isActive ? styles.activeText : styles.inactiveText,
                { color: isActive ? colors.selectedText : colors.textSecondary },
              ]}
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
  },
  inactiveButton: {
  },
  activeText: {
    fontSize: 13,
  },
  inactiveText: {
    fontSize: 13,
  },
  pressedButton: {
    opacity: 0.8,
  },
});
