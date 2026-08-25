export const themes = {
  light: {
    background: "#FBF9EE",
    card: "#FEFEFE",
    surface: "#F4F2E8",
    surfaceSelected: "#EFF8F3",
    text: "#11181E",
    textSecondary: "#7F8385",
    textMuted: "#9A9EA1",
    border: "#ECEDEB",
    primary: "#00975D",
    selected: "#11181E",
    selectedText: "#FEFEFE",
  },
  dark: {
    background: "#101411",
    card: "#1A201C",
    surface: "#252C27",
    surfaceSelected: "#18372A",
    text: "#F4F6F4",
    textSecondary: "#B0B7B2",
    textMuted: "#89918C",
    border: "#303832",
    primary: "#20B879",
    selected: "#F4F6F4",
    selectedText: "#11181E",
  },
} as const;

export type ColorScheme = keyof typeof themes;
export type ThemeColors = (typeof themes)[ColorScheme];
