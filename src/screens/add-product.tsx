import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { AppText } from "../components/shared/AppText";
import { Container } from "../components/shared/Container";
import { KeyboardScreen } from "../components/shared/keyboard-screen";

type StorageLocation = "Réfrigérateur" | "Congélateur" | "Garde-manger";

const storageOptions: { name: StorageLocation; label: string; icon: string }[] =
  [
    { name: "Réfrigérateur", label: "Frigo", icon: "🧊" },
    { name: "Congélateur", label: "Congélo", icon: "❄️" },
    { name: "Garde-manger", label: "Placard", icon: "🏠" },
  ];

const categories = [
  { name: "Produits laitiers", label: "Laitiers", icon: "🥛" },
  { name: "Fruits", label: "Fruits", icon: "🍎" },
  { name: "Légumes", label: "Légumes", icon: "🥦" },
  { name: "Viandes", label: "Viandes", icon: "🍗" },
  { name: "Conserves", label: "Conserves", icon: "🥫" },
  { name: "Boissons", label: "Boissons", icon: "🥤" },
  { name: "Desserts", label: "Desserts", icon: "🍰" },
  { name: "Autre", label: "Autre", icon: "🌿" },
] as const;

const alertOptions = [
  "Le jour même",
  "2 jours avant",
  "5 jours avant",
  "1 semaine avant",
] as const;

type Category = (typeof categories)[number]["name"];
export type AlertPref = (typeof alertOptions)[number];

const weekDays = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <AppText weight="bold" style={styles.sectionTitle}>
      {children}
    </AppText>
  );
}

export default function AddProduct() {
  const [name, setName] = useState("Yogourt grec");
  const [quantity, setQuantity] = useState(2);
  const [storage, setStorage] = useState<StorageLocation>("Réfrigérateur");
  const [category, setCategory] = useState<Category>("Produits laitiers");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [alertPref, setAlertPref] = useState<AlertPref>("2 jours avant");

  const calendarDays = useMemo(() => {
    const year = expirationDate.getFullYear();
    const month = expirationDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [expirationDate]);

  const monthLabel = new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "numeric",
  }).format(expirationDate);

  const selectDay = (day: number) => {
    setExpirationDate(
      new Date(expirationDate.getFullYear(), expirationDate.getMonth(), day),
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Information manquante", "Ajoute le nom du produit.");
      return;
    }

    Alert.alert(
      "Produit ajouté",
      `${name.trim()} a été ajouté à ton Plakard.`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <Container>
      <KeyboardScreen>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            hitSlop={10}
          >
            <AppText weight="bold" style={styles.cancelText}>
              Annuler
            </AppText>
          </Pressable>
          <AppText weight="extraBold" style={styles.title}>
            Ajouter un produit
          </AppText>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <View style={[styles.card, styles.nameCard]}>
            <SectionTitle>NOM DU PRODUIT</SectionTitle>
            <View style={styles.productRow}>
              <AppText style={styles.productIcon}>🥛</AppText>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Nom du produit"
                placeholderTextColor="#9A9EA1"
                returnKeyType="done"
                style={styles.nameInput}
              />
            </View>
          </View>

          <View style={[styles.card, styles.quantityCard]}>
            <SectionTitle>QUANTITÉ</SectionTitle>
            <View style={styles.quantityRow}>
              <AppText style={styles.quantityPrompt}>Combien d’unités?</AppText>
              <View style={styles.stepper}>
                <Pressable
                  accessibilityLabel="Diminuer la quantité"
                  onPress={() => setQuantity((value) => Math.max(1, value - 1))}
                  hitSlop={8}
                >
                  <Ionicons name="remove" size={22} color="#11181E" />
                </Pressable>
                <AppText weight="extraBold" style={styles.quantityValue}>
                  {quantity}
                </AppText>
                <Pressable
                  accessibilityLabel="Augmenter la quantité"
                  onPress={() => setQuantity((value) => value + 1)}
                  hitSlop={8}
                >
                  <Ionicons name="add" size={23} color="#00975D" />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <SectionTitle>LIEU DE STOCKAGE</SectionTitle>
            <View style={styles.storageRow}>
              {storageOptions.map((option) => {
                const selected = storage === option.name;
                return (
                  <Pressable
                    key={option.name}
                    onPress={() => setStorage(option.name)}
                    style={[
                      styles.storageOption,
                      selected && styles.storageSelected,
                    ]}
                  >
                    <AppText style={styles.storageIcon}>{option.icon}</AppText>
                    <AppText
                      weight="bold"
                      numberOfLines={1}
                      style={
                        selected
                          ? styles.storageSelectedText
                          : styles.storageText
                      }
                    >
                      {option.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.card}>
            <SectionTitle>CATÉGORIE</SectionTitle>
            <View style={styles.categoryGrid}>
              {categories.map((option) => {
                const selected = category === option.name;
                return (
                  <Pressable
                    key={option.name}
                    onPress={() => setCategory(option.name)}
                    style={[
                      styles.categoryOption,
                      selected && styles.categorySelected,
                    ]}
                  >
                    <AppText style={styles.categoryIcon}>{option.icon}</AppText>
                    <AppText
                      weight="bold"
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={
                        selected
                          ? styles.categorySelectedText
                          : styles.categoryText
                      }
                    >
                      {option.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.calendarHeader}>
              <SectionTitle>DATE D’EXPIRATION</SectionTitle>
              <AppText weight="bold" style={styles.monthLabel}>
                {monthLabel}
              </AppText>
            </View>
            <View style={styles.calendarGrid}>
              {weekDays.map((day) => (
                <View key={day} style={styles.calendarCell}>
                  <AppText weight="bold" style={styles.weekDay}>
                    {day}
                  </AppText>
                </View>
              ))}
              {calendarDays.map((day, index) => {
                const selected = day === expirationDate.getDate();
                return (
                  <View
                    key={`${day ?? "empty"}-${index}`}
                    style={styles.calendarCell}
                  >
                    {day !== null && (
                      <Pressable
                        accessibilityLabel={`Choisir le ${day}`}
                        onPress={() => selectDay(day)}
                        style={[
                          styles.dayButton,
                          selected && styles.selectedDay,
                        ]}
                      >
                        <AppText
                          weight={selected ? "bold" : "regular"}
                          style={
                            selected ? styles.selectedDayText : styles.dayText
                          }
                        >
                          {day}
                        </AppText>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.alertTitleRow}>
              <AppText style={styles.bell}>🔔</AppText>
              <SectionTitle>PRÉFÉRENCE D’ALERTE</SectionTitle>
            </View>
            <View style={styles.alertList}>
              {alertOptions.map((option, index) => {
                const selected = alertPref === option;
                return (
                  <Pressable
                    key={option}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                    onPress={() => setAlertPref(option)}
                    style={[styles.alertRow, index > 0 && styles.alertDivider]}
                  >
                    <AppText
                      style={
                        selected ? styles.alertSelectedText : styles.alertText
                      }
                    >
                      {option}
                    </AppText>
                    <View
                      style={[styles.radio, selected && styles.radioSelected]}
                    >
                      {selected && (
                        <Ionicons name="checkmark" size={20} color="#FEFEFE" />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <AppText weight="bold" style={styles.submitText}>
              Ajouter dans mon Plakard
            </AppText>
          </Pressable>
        </ScrollView>
      </KeyboardScreen>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 18,
    paddingTop: 14,
  },
  cancelText: { color: "#95999A", fontSize: 16 },
  title: { color: "#11181E", fontSize: 21 },
  headerSpacer: { width: 58 },
  content: { gap: 16, paddingBottom: 32 },
  card: {
    backgroundColor: "#FEFEFE",
    borderRadius: 28,
    padding: 22,
    shadowColor: "#B9B5A8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 2,
  },
  nameCard: { minHeight: 154 },
  quantityCard: { minHeight: 136 },
  sectionTitle: { color: "#9A9EA1", fontSize: 13, letterSpacing: 0.6 },
  productRow: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
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
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 5,
  },
  storageSelected: { backgroundColor: "#11181E" },
  storageIcon: { fontSize: 13 },
  storageText: { color: "#929595", fontSize: 13 },
  storageSelectedText: { color: "#FEFEFE", fontSize: 13 },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 18,
    rowGap: 10,
  },
  categoryOption: {
    alignItems: "center",
    backgroundColor: "#FBF9EE",
    borderRadius: 18,
    height: 96,
    justifyContent: "center",
    width: "22%",
  },
  categorySelected: {
    backgroundColor: "#EFF8F3",
    borderColor: "#B4DDCB",
    borderWidth: 2,
  },
  categoryIcon: { fontSize: 29, marginBottom: 9 },
  categoryText: { color: "#929595", fontSize: 12, paddingHorizontal: 4 },
  categorySelectedText: {
    color: "#00975D",
    fontSize: 12,
    paddingHorizontal: 4,
  },
  calendarHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthLabel: { color: "#00975D", fontSize: 15, textTransform: "capitalize" },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 18 },
  calendarCell: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: "14.2857%",
  },
  weekDay: { color: "#B1B3B4", fontSize: 12 },
  dayButton: {
    alignItems: "center",
    borderRadius: 14,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  dayText: { color: "#11181E", fontSize: 15 },
  selectedDay: { backgroundColor: "#11181E" },
  selectedDayText: { color: "#FEFEFE", fontSize: 15 },
  alertTitleRow: { alignItems: "center", flexDirection: "row", gap: 10 },
  bell: { fontSize: 18 },
  alertList: { marginTop: 18 },
  alertRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 62,
    paddingHorizontal: 4,
  },
  alertDivider: { borderTopColor: "#ECEDEB", borderTopWidth: 1 },
  alertText: { color: "#7F8385", fontSize: 17 },
  alertSelectedText: { color: "#11181E", fontSize: 17 },
  radio: {
    alignItems: "center",
    borderColor: "#D0D2D3",
    borderRadius: 15,
    borderWidth: 2,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  radioSelected: { backgroundColor: "#00975D", borderColor: "#00975D" },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#00975D",
    borderRadius: 16,
    paddingVertical: 16,
  },
  submitText: { color: "#FEFEFE", fontSize: 16 },
});
