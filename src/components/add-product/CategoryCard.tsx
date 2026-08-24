import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { FormCard, SectionTitle } from "./FormCard";
import { categories, Category } from "./options";

type Props = {
  category: Category;
  onChange: (category: Category) => void;
};

export function CategoryCard({ category, onChange }: Props) {
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
              style={[styles.option, selected && styles.selected]}
            >
              <AppText style={styles.icon}>{option.icon}</AppText>
              <AppText
                weight="bold"
                numberOfLines={1}
                adjustsFontSizeToFit
                style={selected ? styles.selectedText : styles.text}
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
    backgroundColor: "#FBF9EE",
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
  text: { color: "#929595", fontSize: 12, paddingHorizontal: 4 },
  selectedText: { color: "#00975D", fontSize: 12, paddingHorizontal: 4 },
});
