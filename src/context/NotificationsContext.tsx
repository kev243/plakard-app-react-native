import { useProducts } from "@/context/ProductsContext";
import {
  configureNotifications,
  scheduleProductNotification,
} from "@/services/notifications";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import Storage from "expo-sqlite/kv-store";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AppState, Linking } from "react-native";

type NotificationPermission = "granted" | "denied" | "undetermined";

type NotificationsContextValue = {
  permission: NotificationPermission;
  onboardingReady: boolean;
  onboardingSeen: boolean;
  markOnboardingSeen: () => Promise<void>;
  openNotificationSettings: () => Promise<void>;
  refreshPermission: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
};

const ONBOARDING_KEY = "notification_onboarding_seen";
const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

export function NotificationsProvider({ children }: PropsWithChildren) {
  const { products, isLoading, setNotificationId } = useProducts();
  const [permission, setPermission] =
    useState<NotificationPermission>("undetermined");
  const [onboardingSeen, setOnboardingSeen] = useState(false);
  const [onboardingReady, setOnboardingReady] = useState(false);
  const scheduling = useRef(new Set<number>());

  const refreshPermission = useCallback(async () => {
    const result = await Notifications.getPermissionsAsync();
    setPermission(
      result.granted
        ? "granted"
        : result.status === "denied"
          ? "denied"
          : "undetermined",
    );
  }, []);

  useEffect(() => {
    void configureNotifications();
    void Notifications.getPermissionsAsync().then((result) => {
      setPermission(toNotificationPermission(result));
    });
    void Storage.getItem(ONBOARDING_KEY).then((value) => {
      setOnboardingSeen(value === "true");
      setOnboardingReady(true);
    });

    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        if (state === "active") void refreshPermission();
      },
    );
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) =>
        redirectFromNotification(response.notification),
      );
    const lastResponse = Notifications.getLastNotificationResponse();
    if (lastResponse?.notification) {
      redirectFromNotification(lastResponse.notification);
      Notifications.clearLastNotificationResponse();
    }

    return () => {
      appStateSubscription.remove();
      responseSubscription.remove();
    };
  }, [refreshPermission]);

  useEffect(() => {
    if (permission !== "granted" || isLoading) return;
    for (const product of products) {
      if (product.notificationId || scheduling.current.has(product.id))
        continue;
      scheduling.current.add(product.id);
      void scheduleProductNotification(product)
        .then((notificationId) => {
          if (notificationId)
            return setNotificationId(product.id, notificationId);
        })
        .finally(() => scheduling.current.delete(product.id));
    }
  }, [isLoading, permission, products, setNotificationId]);

  const requestPermission = useCallback(async () => {
    await configureNotifications();
    const result = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: false, allowSound: true },
    });
    const granted = result.granted;
    setPermission(granted ? "granted" : "denied");
    return granted;
  }, []);

  const markOnboardingSeen = useCallback(async () => {
    setOnboardingSeen(true);
    await Storage.setItem(ONBOARDING_KEY, "true");
  }, []);

  const value = useMemo(
    () => ({
      permission,
      onboardingReady,
      onboardingSeen,
      markOnboardingSeen,
      openNotificationSettings: Linking.openSettings,
      refreshPermission,
      requestPermission,
    }),
    [
      markOnboardingSeen,
      onboardingReady,
      onboardingSeen,
      permission,
      refreshPermission,
      requestPermission,
    ],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

function redirectFromNotification(notification: Notifications.Notification) {
  const productId = notification.request.content.data?.productId;
  if (typeof productId === "number" || typeof productId === "string") {
    router.push({
      pathname: "/product/[id]",
      params: { id: String(productId) },
    });
  }
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context)
    throw new Error(
      "useNotifications doit être utilisé dans NotificationsProvider",
    );
  return context;
}

function toNotificationPermission(
  result: Notifications.NotificationPermissionsStatus,
): NotificationPermission {
  return result.granted
    ? "granted"
    : result.status === "denied"
      ? "denied"
      : "undetermined";
}
