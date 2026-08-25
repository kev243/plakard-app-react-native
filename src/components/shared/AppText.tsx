import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Text, TextProps } from "react-native";

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
  const { colors } = useTheme();
  return (
    <Text
      {...props}
      style={[{ color: colors.text, fontFamily: fontFamilies[weight] }, style]}
    />
  );
}
