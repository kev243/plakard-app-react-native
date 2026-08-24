import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { AppText } from "../shared/AppText";
import { FormCard, SectionTitle } from "./FormCard";
import { categories, StorageLocation, storageOptions } from "./options";

type ProductNameCardProps = {
  category: string;
  name: string;
  onChangeName: (name: string) => void;
};

export function ProductNameCard({
  category,
  name,
  onChangeName,
}: ProductNameCardProps) {
  const icon = categories.find((item) => item.name === category)?.icon ?? "❓";

  return (
    <FormCard style={styles.nameCard}>
      <SectionTitle>NOM DU PRODUIT</SectionTitle>
      <View style={styles.productRow}>
        <AppText style={styles.productIcon}>{icon}</AppText>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          placeholder="Nom du produit"
          placeholderTextColor="#9A9EA1"
          returnKeyType="done"
          style={styles.nameInput}
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
  return (
    <FormCard style={styles.quantityCard}>
      <SectionTitle>QUANTITÉ</SectionTitle>
      <View style={styles.quantityRow}>
        <AppText style={styles.quantityPrompt}>Combien d’unités?</AppText>
        <View style={styles.stepper}>
          <Pressable
            accessibilityLabel="Diminuer la quantité"
            hitSlop={8}
            onPress={() => onChangeQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={22} color="#11181E" />
          </Pressable>
          <AppText weight="extraBold" style={styles.quantityValue}>
            {quantity}
          </AppText>
          <Pressable
            accessibilityLabel="Augmenter la quantité"
            hitSlop={8}
            onPress={() => onChangeQuantity(quantity + 1)}
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
  return (
    <FormCard>
      <SectionTitle>LIEU DE STOCKAGE</SectionTitle>
      <View style={styles.storageRow}>
        {storageOptions.map((option) => {
          const selected = storage === option.name;
          return (
            <Pressable
              key={option.name}
              onPress={() => onChangeStorage(option.name)}
              style={[styles.storageOption, selected && styles.storageSelected]}
            >
              <AppText style={styles.storageIcon}>{option.icon}</AppText>
              <AppText
                weight="bold"
                numberOfLines={1}
                style={
                  selected ? styles.storageSelectedText : styles.storageText
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
    color: "#11181E",
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
    color: "#787D80",
    fontSize: 17,
    lineHeight: 23,
    maxWidth: 110,
  },
  stepper: {
    alignItems: "center",
    backgroundColor: "#FBF9EE",
    borderRadius: 22,
    flexDirection: "row",
    height: 52,
    justifyContent: "space-around",
    width: 146,
  },
  quantityValue: { color: "#11181E", fontSize: 21 },
  storageRow: {
    backgroundColor: "#FBF9EE",
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
  storageSelected: { backgroundColor: "#11181E" },
  storageIcon: { fontSize: 13 },
  storageText: { color: "#929595", fontSize: 13 },
  storageSelectedText: { color: "#FEFEFE", fontSize: 13 },
});
