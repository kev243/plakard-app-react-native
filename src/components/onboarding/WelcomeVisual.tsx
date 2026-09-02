import { AppText } from "@/components/shared/AppText";
import { useTheme } from "@/context/ThemeContext";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export function WelcomeVisual() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={[styles.glow, { backgroundColor: colors.surfaceSelected }]}
      />
      <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
        <View style={styles.cupboardTop} />
        <View style={styles.cupboardDoors}>
          <View style={styles.cupboardDoor}>
            <View style={styles.leftKnob} />
          </View>
          <View style={styles.cupboardDoor}>
            <View style={styles.rightKnob} />
          </View>
        </View>
        <View style={styles.cupboardFeet}>
          <View style={styles.foot} />
          <View style={styles.foot} />
        </View>
      </View>
      <FloatingEmoji emoji="🥛" style={styles.emojiLeft} />
      <FloatingEmoji emoji="🥦" style={styles.emojiRight} />
      <FloatingEmoji emoji="🍎" style={styles.emojiTop} />
      <FloatingEmoji emoji="🧀" style={styles.emojiBottom} />
    </View>
  );
}

function FloatingEmoji({
  emoji,
  style,
}: {
  emoji: string;
  style: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.floatingEmoji, { backgroundColor: colors.card }, style]}
    >
      <AppText style={styles.floatingEmojiText}>{emoji}</AppText>
    </View>
  );
}

const shadow = {
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: {
    height: 5,
    width: 0,
  },
  shadowOpacity: 0.09,
  shadowRadius: 12,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  glow: {
    borderRadius: 140,
    height: 280,
    position: "absolute",
    width: 280,
  },
  heroIcon: {
    alignItems: "center",
    borderRadius: 38,
    height: 144,
    justifyContent: "center",
    width: 144,
    ...shadow,
  },
  cupboardTop: {
    backgroundColor: "#FEFEFE",
    borderRadius: 6,
    height: 18,
    marginBottom: 5,
    width: 76,
  },
  cupboardDoors: {
    flexDirection: "row",
  },
  cupboardDoor: {
    borderColor: "#FEFEFE",
    borderRadius: 5,
    borderWidth: 4,
    height: 58,
    justifyContent: "center",
    width: 39,
  },
  leftKnob: {
    alignSelf: "flex-end",
    backgroundColor: "#FEFEFE",
    borderRadius: 3,
    height: 6,
    marginRight: 4,
    width: 6,
  },
  rightKnob: {
    alignSelf: "flex-start",
    backgroundColor: "#FEFEFE",
    borderRadius: 3,
    height: 6,
    marginLeft: 4,
    width: 6,
  },
  cupboardFeet: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 66,
  },
  foot: {
    backgroundColor: "#FEFEFE",
    height: 7,
    width: 8,
  },
  floatingEmoji: {
    alignItems: "center",
    borderRadius: 18,
    height: 62,
    justifyContent: "center",
    position: "absolute",
    width: 62,
    ...shadow,
  },
  floatingEmojiText: {
    fontSize: 29,
  },
  emojiLeft: {
    left: 28,
    top: 118,
  },
  emojiRight: {
    right: 24,
    top: 145,
  },
  emojiTop: {
    right: 62,
    top: 34,
  },
  emojiBottom: {
    bottom: 26,
    left: 70,
  },
});
