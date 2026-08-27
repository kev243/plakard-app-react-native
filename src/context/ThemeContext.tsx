import { ColorScheme, themes } from "@/theme/colors";
import Storage from "expo-sqlite/kv-store";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type ThemePreference = "system" | "light" | "dark";

type ThemeContextValue = {
  colors: (typeof themes)[ColorScheme];
  colorScheme: ColorScheme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => Promise<void>;
};

const STORAGE_KEY = "theme_preference";
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>("system");

  useEffect(() => {
    void Storage.getItem(STORAGE_KEY).then((storedPreference) => {
      if (
        storedPreference === "system" ||
        storedPreference === "light" ||
        storedPreference === "dark"
      ) {
        setPreferenceState(storedPreference);
      }
    });
  }, []);

  const colorScheme: ColorScheme =
    preference === "system"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : preference;
  const colors = themes[colorScheme];

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors.background]);

  const setPreference = useCallback(async (nextPreference: ThemePreference) => {
    setPreferenceState(nextPreference);
    await Storage.setItem(STORAGE_KEY, nextPreference);
  }, []);

  const value = useMemo(
    () => ({ colors, colorScheme, preference, setPreference }),
    [colors, colorScheme, preference, setPreference],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme doit être utilisé dans ThemeProvider");
  return context;
}
