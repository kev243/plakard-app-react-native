import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppText } from "../shared/AppText";

type FormCardProps = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function FormCard({ children, style }: FormCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: PropsWithChildren) {
  return (
    <AppText weight="bold" style={styles.title}>
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FEFEFE",
    borderRadius: 28,
    elevation: 2,
    padding: 22,
    shadowColor: "#B9B5A8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  title: {
    color: "#9A9EA1",
    fontSize: 13,
    letterSpacing: 0.6,
  },
});
