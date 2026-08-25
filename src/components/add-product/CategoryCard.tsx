import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { FormCard, SectionTitle } from "./FormCard";
import { categories, Category } from "./options";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  category: Category;
  onChange: (category: Category) => void;
};

export function CategoryCard({ category, onChange }: Props) {
  const { colors } = useTheme();
  return (
    <FormCard>
      <SectionTitle>CATÉGORIE</SectionTitle>
      <View style={styles.grid}>
        {categories.map((option) => {
          const selected = category === option.name;
          return (
            <Pressable
              key={option.name}
              onPress={() => onChange(option.name)}
              style={[
                styles.option,
                { backgroundColor: colors.surface },
                selected && [styles.selected, { backgroundColor: colors.surfaceSelected }],
              ]}
            >
              <AppText style={styles.icon}>{option.icon}</AppText>
              <AppText
                weight="bold"
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  selected ? styles.selectedText : styles.text,
                  { color: selected ? colors.primary : colors.textSecondary },
                ]}
              >
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </FormCard>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 18,
    rowGap: 10,
  },
  option: {
    alignItems: "center",
    borderRadius: 18,
    height: 96,
    justifyContent: "center",
    width: "22%",
  },
  selected: {
    backgroundColor: "#EFF8F3",
    borderColor: "#B4DDCB",
    borderWidth: 2,
  },
  icon: { fontSize: 29, marginBottom: 9 },
  text: { fontSize: 12, paddingHorizontal: 4 },
  selectedText: { fontSize: 12, paddingHorizontal: 4 },
});
