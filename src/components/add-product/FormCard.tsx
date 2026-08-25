import { PropsWithChildren } from "react";
import { useTheme } from "@/context/ThemeContext";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppText } from "../shared/AppText";

type FormCardProps = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function FormCard({ children, style }: FormCardProps) {
  const { colors } = useTheme();
  return <View style={[styles.card, { backgroundColor: colors.card }, style]}>{children}</View>;
}

export function SectionTitle({ children }: PropsWithChildren) {
  const { colors } = useTheme();
  return (
    <AppText weight="bold" style={[styles.title, { color: colors.textMuted }]}>
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    elevation: 2,
    padding: 22,
    shadowColor: "#B9B5A8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  title: {
    fontSize: 13,
    letterSpacing: 0.6,
  },
});
