import { FoodItem } from "@/data/products";
import { getNotificationDate } from "@/services/notification-schedule";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const CHANNEL_ID = "expiration-reminders";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function configureNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Rappels d’expiration",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#00975D",
    });
  }
}

export async function hasNotificationPermission() {
  const permissions = await Notifications.getPermissionsAsync();
  return permissions.granted;
}

export async function scheduleProductNotification(product: FoodItem) {
  const notificationDate = getNotificationDate(product);
  if (!notificationDate || !(await hasNotificationPermission())) return null;

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Produit bientôt expiré ⏳",
      body: `${product.name} arrive à sa date d’expiration.`,
      sound: "default",
      data: {
        productId: product.id,
        url: `/product/${product.id}`,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: notificationDate,
      channelId: CHANNEL_ID,
    },
  });
}

export async function cancelProductNotification(notificationId: string | null) {
  if (!notificationId) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.warn("Impossible d’annuler la notification", error);
  }
}

export { getNotificationDate } from "@/services/notification-schedule";
