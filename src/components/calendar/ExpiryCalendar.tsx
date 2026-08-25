import { FoodItem } from "@/data/products";
import { getDateKey, getDaysUntil, getExpirationStatus } from "@/utils/expiration";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

const weekDays = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

type Props = {
  month: Date;
  products: FoodItem[];
  selectedDate: Date;
  onChangeMonth: (offset: number) => void;
  onSelectDate: (date: Date) => void;
};

export function ExpiryCalendar({
  month,
  products,
  selectedDate,
  onChangeMonth,
  onSelectDate,
}: Props) {
  const productDates = useMemo(() => {
    const dates = new Map<string, FoodItem[]>();
    products.forEach((product) => {
      const key = product.expirationDate;
      dates.set(key, [...(dates.get(key) ?? []), product]);
    });
    return dates;
  }, [products]);

  const days = useMemo(() => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const leadingDays = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    return [
      ...Array.from({ length: leadingDays }, () => null),
      ...Array.from({ length: totalDays }, (_, index) => index + 1),
    ];
  }, [month]);

  const monthLabel = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(month);
  const todayKey = getDateKey(new Date());
  const selectedKey = getDateKey(selectedDate);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Mois précédent"
          hitSlop={8}
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButton}
        >
          <Ionicons name="chevron-back" size={22} color="#11181E" />
        </Pressable>
        <AppText weight="extraBold" style={styles.monthLabel}>
          {monthLabel}
        </AppText>
        <Pressable
          accessibilityLabel="Mois suivant"
          hitSlop={8}
          onPress={() => onChangeMonth(1)}
          style={styles.monthButton}
        >
          <Ionicons name="chevron-forward" size={22} color="#11181E" />
        </Pressable>
      </View>

      <View style={styles.grid}>
        {weekDays.map((day) => (
          <View key={day} style={styles.cell}>
            <AppText weight="bold" style={styles.weekDay}>
              {day}
            </AppText>
          </View>
        ))}
        {days.map((day, index) => {
          if (day === null)
            return <View key={`empty-${index}`} style={styles.cell} />;

          const date = new Date(month.getFullYear(), month.getMonth(), day);
          const key = getDateKey(date);
          const dayProducts = productDates.get(key) ?? [];
          const selected = key === selectedKey;
          const today = key === todayKey;
          const statuses = dayProducts.map((product) =>
            getExpirationStatus(getDaysUntil(product.expirationDate)),
          );
          const critical = statuses.some(
            (status) => status === "critical" || status === "expired",
          );
          const warning = statuses.includes("warning");

          return (
            <View key={key} style={styles.cell}>
              <Pressable
                accessibilityLabel={`${day} ${monthLabel}`}
                onPress={() => onSelectDate(date)}
                style={[
                  styles.dayButton,
                  today && styles.today,
                  selected && styles.selectedDay,
                ]}
              >
                <AppText
                  weight={selected ? "bold" : "regular"}
                  style={[styles.dayText, selected && styles.selectedDayText]}
                >
                  {day}
                </AppText>
                {dayProducts.length > 0 && (
                  <View
                    style={[
                      styles.marker,
                      warning && styles.warningMarker,
                      critical && styles.criticalMarker,
                      selected && styles.selectedMarker,
                    ]}
                  />
                )}
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FEFEFE",
    borderRadius: 28,
    elevation: 2,
    padding: 18,
    shadowColor: "#B9B5A8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  monthButton: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  monthLabel: { color: "#11181E", fontSize: 19, textTransform: "capitalize" },
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  cell: {
    alignItems: "center",
    height: 45,
    justifyContent: "center",
    width: "14.2857%",
  },
  weekDay: { color: "#A4A7A8", fontSize: 12 },
  dayButton: {
    alignItems: "center",
    borderRadius: 16,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  today: { backgroundColor: "#EFF8F3" },
  selectedDay: { backgroundColor: "#11181E" },
  dayText: { color: "#11181E", fontSize: 15 },
  selectedDayText: { color: "#FEFEFE" },
  marker: {
    backgroundColor: "#00975D",
    borderRadius: 3,
    bottom: 4,
    height: 5,
    position: "absolute",
    width: 5,
  },
  warningMarker: { backgroundColor: "#C58A00" },
  criticalMarker: { backgroundColor: "#D94C3D" },
  selectedMarker: { backgroundColor: "#FEFEFE" },
});
