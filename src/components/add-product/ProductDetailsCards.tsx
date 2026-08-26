import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { AppText } from "../shared/AppText";
import { FormCard, SectionTitle } from "./FormCard";
import {
  categories,
  Category,
  StorageLocation,
  storageOptions,
} from "@/data/product-options";
import { PRODUCT_NAME_MAX_LENGTH, PRODUCT_QUANTITY_MAX } from "@/data/products";
import { useTheme } from "@/context/ThemeContext";

type ProductNameCardProps = {
  category: Category;
  name: string;
  onChangeName: (name: string) => void;
};

export function ProductNameCard({
  category,
  name,
  onChangeName,
}: ProductNameCardProps) {
  const { colors } = useTheme();
  const icon = categories.find((item) => item.name === category)?.icon ?? "❓";

  return (
    <FormCard style={styles.nameCard}>
      <SectionTitle>NOM DU PRODUIT</SectionTitle>
      <View style={styles.productRow}>
        <AppText style={styles.productIcon}>{icon}</AppText>
        <TextInput
          maxLength={PRODUCT_NAME_MAX_LENGTH}
          value={name}
          onChangeText={onChangeName}
          placeholder="Nom du produit"
          placeholderTextColor={colors.textMuted}
          returnKeyType="done"
          style={[styles.nameInput, { color: colors.text }]}
        />
      </View>
    </FormCard>
  );
}

type QuantityCardProps = {
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
};

export function QuantityCard({
  quantity,
  onChangeQuantity,
}: QuantityCardProps) {
  const { colors } = useTheme();
  return (
    <FormCard style={styles.quantityCard}>
      <SectionTitle>QUANTITÉ</SectionTitle>
      <View style={styles.quantityRow}>
        <AppText style={[styles.quantityPrompt, { color: colors.textSecondary }]}>Combien d’unités?</AppText>
        <View style={[styles.stepper, { backgroundColor: colors.surface }]}>
          <Pressable
            accessibilityLabel="Diminuer la quantité"
            hitSlop={8}
            onPress={() => onChangeQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={22} color={colors.text} />
          </Pressable>
          <AppText weight="extraBold" style={[styles.quantityValue, { color: colors.text }]}>
            {quantity}
          </AppText>
          <Pressable
            accessibilityLabel="Augmenter la quantité"
            accessibilityState={{ disabled: quantity >= PRODUCT_QUANTITY_MAX }}
            disabled={quantity >= PRODUCT_QUANTITY_MAX}
            hitSlop={8}
            onPress={() => onChangeQuantity(Math.min(PRODUCT_QUANTITY_MAX, quantity + 1))}
          >
            <Ionicons name="add" size={23} color="#00975D" />
          </Pressable>
        </View>
      </View>
    </FormCard>
  );
}

type StorageCardProps = {
  storage: StorageLocation;
  onChangeStorage: (storage: StorageLocation) => void;
};

export function StorageCard({ storage, onChangeStorage }: StorageCardProps) {
  const { colors } = useTheme();
  return (
    <FormCard>
      <SectionTitle>LIEU DE STOCKAGE</SectionTitle>
      <View style={[styles.storageRow, { backgroundColor: colors.surface }]}>
        {storageOptions.map((option) => {
          const selected = storage === option.name;
          return (
            <Pressable
              key={option.name}
              onPress={() => onChangeStorage(option.name)}
              style={[
                styles.storageOption,
                selected && [styles.storageSelected, { backgroundColor: colors.selected }],
              ]}
            >
              <AppText style={styles.storageIcon}>{option.icon}</AppText>
              <AppText
                weight="bold"
                numberOfLines={1}
                style={
                  [
                    selected ? styles.storageSelectedText : styles.storageText,
                    { color: selected ? colors.selectedText : colors.textSecondary },
                  ]
                }
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
  nameCard: { minHeight: 154 },
  quantityCard: { minHeight: 136 },
  productRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 16,
    paddingTop: 20,
  },
  productIcon: { fontSize: 27 },
  nameInput: {
    flex: 1,
    fontFamily: "Nunito-Bold",
    fontSize: 21,
    paddingVertical: 8,
  },
  quantityRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  quantityPrompt: {
    fontSize: 17,
    lineHeight: 23,
    maxWidth: 110,
  },
  stepper: {
    alignItems: "center",
    borderRadius: 22,
    flexDirection: "row",
    height: 52,
    justifyContent: "space-around",
    width: 146,
  },
  quantityValue: { fontSize: 21 },
  storageRow: {
    borderRadius: 19,
    flexDirection: "row",
    marginTop: 16,
    padding: 5,
  },
  storageOption: {
    alignItems: "center",
    borderRadius: 15,
    flex: 1,
    gap: 4,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  storageSelected: {},
  storageIcon: { fontSize: 13 },
  storageText: { fontSize: 13 },
  storageSelectedText: { fontSize: 13 },
});
