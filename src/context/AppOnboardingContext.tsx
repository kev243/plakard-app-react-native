import Storage from "expo-sqlite/kv-store";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AppOnboardingContextValue = {
  onboardingReady: boolean;
  onboardingSeen: boolean;
  markOnboardingSeen: () => Promise<void>;
};

const ONBOARDING_KEY = "app_onboarding_seen";
const AppOnboardingContext = createContext<AppOnboardingContextValue | null>(
  null,
);

export function AppOnboardingProvider({ children }: PropsWithChildren) {
  const [onboardingSeen, setOnboardingSeen] = useState(false);
  const [onboardingReady, setOnboardingReady] = useState(false);

  useEffect(() => {
    void Storage.getItem(ONBOARDING_KEY).then((value) => {
      setOnboardingSeen(value === "true");
      setOnboardingReady(true);
    });
  }, []);

  const markOnboardingSeen = useCallback(async () => {
    setOnboardingSeen(true);
    await Storage.setItem(ONBOARDING_KEY, "true");
  }, []);

  const value = useMemo(
    () => ({ onboardingReady, onboardingSeen, markOnboardingSeen }),
    [markOnboardingSeen, onboardingReady, onboardingSeen],
  );

  return (
    <AppOnboardingContext.Provider value={value}>
      {children}
    </AppOnboardingContext.Provider>
  );
}

export function useAppOnboarding() {
  const context = useContext(AppOnboardingContext);
  if (!context) {
    throw new Error(
      "useAppOnboarding doit être utilisé dans AppOnboardingProvider",
    );
  }
  return context;
}
