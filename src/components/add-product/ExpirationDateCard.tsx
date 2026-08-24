import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { FormCard, SectionTitle } from "./FormCard";

const weekDays = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

export function ExpirationDateCard({ value, onChange }: Props) {
  const calendarDays = useMemo(() => {
    const firstDay = new Date(value.getFullYear(), value.getMonth(), 1).getDay();
    const lastDay = new Date(
      value.getFullYear(),
      value.getMonth() + 1,
      0,
    ).getDate();

    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: lastDay }, (_, index) => index + 1),
    ];
  }, [value]);

  const monthLabel = new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "numeric",
  }).format(value);

  const today = new Date();
  const isCurrentMonth =
    value.getFullYear() === today.getFullYear() &&
    value.getMonth() === today.getMonth();

  const changeMonth = (offset: number) => {
    const targetMonth = new Date(
      value.getFullYear(),
      value.getMonth() + offset,
      1,
    );
    const lastDay = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth() + 1,
      0,
    ).getDate();

    onChange(
      new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth(),
        Math.min(value.getDate(), lastDay),
      ),
    );
  };

  const selectDay = (day: number) => {
    onChange(new Date(value.getFullYear(), value.getMonth(), day));
  };

  return (
    <FormCard>
      <View style={styles.header}>
        <SectionTitle>DATE D’EXPIRATION</SectionTitle>
        <View style={styles.navigation}>
          <MonthButton
            direction="back"
            disabled={isCurrentMonth}
            onPress={() => changeMonth(-1)}
          />
          <AppText weight="bold" style={styles.monthLabel}>
            {monthLabel}
          </AppText>
          <MonthButton direction="forward" onPress={() => changeMonth(1)} />
        </View>
      </View>

      <View style={styles.grid}>
        {weekDays.map((day) => (
          <View key={day} style={styles.cell}>
            <AppText weight="bold" style={styles.weekDay}>
              {day}
            </AppText>
          </View>
        ))}
        {calendarDays.map((day, index) => {
          const selected = day === value.getDate();
          return (
            <View key={`${day ?? "empty"}-${index}`} style={styles.cell}>
              {day !== null && (
                <Pressable
                  accessibilityLabel={`Choisir le ${day}`}
                  onPress={() => selectDay(day)}
                  style={[styles.dayButton, selected && styles.selectedDay]}
                >
                  <AppText
                    weight={selected ? "bold" : "regular"}
                    style={selected ? styles.selectedDayText : styles.dayText}
                  >
                    {day}
                  </AppText>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>
    </FormCard>
  );
}

type MonthButtonProps = {
  direction: "back" | "forward";
  disabled?: boolean;
  onPress: () => void;
};

function MonthButton({ direction, disabled = false, onPress }: MonthButtonProps) {
  return (
    <Pressable
      accessibilityLabel={direction === "back" ? "Mois précédent" : "Mois suivant"}
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={8}
      onPress={onPress}
      style={styles.monthButton}
    >
      <Ionicons
        name={`chevron-${direction}`}
        size={18}
        color={disabled ? "#C9CBCC" : "#00975D"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigation: { alignItems: "center", flexDirection: "row", gap: 4 },
  monthButton: {
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    width: 26,
  },
  monthLabel: { color: "#00975D", fontSize: 15, textTransform: "capitalize" },
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 18 },
  cell: {
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
});
