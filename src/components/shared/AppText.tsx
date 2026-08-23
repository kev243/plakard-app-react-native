import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  weight?: "regular" | "semiBold" | "bold" | "extraBold";
};

const fontFamilies = {
  regular: "Nunito",
  semiBold: "Nunito-SemiBold",
  bold: "Nunito-Bold",
  extraBold: "Nunito-ExtraBold",
} as const;

export function AppText({ weight = "regular", style, ...props }: AppTextProps) {
  return (
    <Text
      {...props}
      style={[styles.text, { fontFamily: fontFamilies[weight] }, style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#202020",
  },
});