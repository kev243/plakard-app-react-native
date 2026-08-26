import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { FormCard, SectionTitle } from "./FormCard";
import { useTheme } from "@/context/ThemeContext";

const weekDays = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

export function ExpirationDateCard({ value, onChange }: Props) {
  const { colors } = useTheme();
  const [displayedMonth, setDisplayedMonth] = useState(
    () => new Date(value.getFullYear(), value.getMonth(), 1),
  );

  const calendarDays = useMemo(() => {
    const firstDay = displayedMonth.getDay();
    const lastDay = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() + 1,
      0,
    ).getDate();

    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: lastDay }, (_, index) => index + 1),
    ];
  }, [displayedMonth]);

  const monthLabel = new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "numeric",
  }).format(displayedMonth);

  const today = new Date();
  const isCurrentMonth =
    displayedMonth.getFullYear() === today.getFullYear() &&
    displayedMonth.getMonth() === today.getMonth();

  const changeMonth = (offset: number) => {
    setDisplayedMonth(
      new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth() + offset,
        1,
      ),
    );
  };

  const selectDay = (day: number) => {
    onChange(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), day),
    );
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
          <AppText weight="bold" style={[styles.monthLabel, { color: colors.primary }]}>
            {monthLabel}
          </AppText>
          <MonthButton direction="forward" onPress={() => changeMonth(1)} />
        </View>
      </View>

      <View style={styles.grid}>
        {weekDays.map((day) => (
          <View key={day} style={styles.cell}>
            <AppText weight="bold" style={[styles.weekDay, { color: colors.textMuted }]}>
              {day}
            </AppText>
          </View>
        ))}
        {calendarDays.map((day, index) => {
          const date = day === null
            ? null
            : new Date(
                displayedMonth.getFullYear(),
                displayedMonth.getMonth(),
                day,
              );
          const unavailable = date ? !isFutureDate(date) : false;
          const selected =
            date !== null &&
            date.getFullYear() === value.getFullYear() &&
            date.getMonth() === value.getMonth() &&
            date.getDate() === value.getDate();
          return (
            <View key={`${day ?? "empty"}-${index}`} style={styles.cell}>
              {day !== null && (
                <Pressable
                  accessibilityLabel={`Choisir le ${day}`}
                  accessibilityState={{ disabled: unavailable, selected }}
                  disabled={unavailable}
                  onPress={() => selectDay(day)}
                  style={[
                    styles.dayButton,
                    unavailable && styles.unavailableDay,
                    selected && [styles.selectedDay, { backgroundColor: colors.selected }],
                  ]}
                >
                  <AppText
                    weight={selected ? "bold" : "regular"}
                    style={[
                      styles.dayText,
                      { color: colors.text },
                      unavailable && [styles.unavailableDayText, { color: colors.textMuted }],
                      selected && [styles.selectedDayText, { color: colors.selectedText }],
                    ]}
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

function isFutureDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const candidate = new Date(date);
  candidate.setHours(0, 0, 0, 0);
  return candidate.getTime() > today.getTime();
}

type MonthButtonProps = {
  direction: "back" | "forward";
  disabled?: boolean;
  onPress: () => void;
};

function MonthButton({ direction, disabled = false, onPress }: MonthButtonProps) {
  const { colors } = useTheme();
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
        color={disabled ? colors.textMuted : colors.primary}
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
  monthLabel: { fontSize: 15, textTransform: "capitalize" },
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 18 },
  cell: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: "14.2857%",
  },
  weekDay: { fontSize: 12 },
  dayButton: {
    alignItems: "center",
    borderRadius: 14,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  dayText: { fontSize: 15 },
  unavailableDay: { opacity: 0.45 },
  unavailableDayText: {},
  selectedDay: {},
  selectedDayText: { fontSize: 15 },
});
