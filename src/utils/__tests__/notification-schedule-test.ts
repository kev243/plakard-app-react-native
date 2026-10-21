import { getNotificationDate } from "@/services/notification-schedule";

test("programme correctement une notification une semaine avant", () => {
  const notificationDate = getNotificationDate(
    {
      expirationDate: "2026-11-20",
      alertPreference: "1 semaine avant",
    },
    new Date(2026, 9, 21, 12),
  );

  expect(notificationDate).not.toBeNull();
  expect(notificationDate?.getFullYear()).toBe(2026);
  expect(notificationDate?.getMonth()).toBe(10);
  expect(notificationDate?.getDate()).toBe(13);
  expect(notificationDate?.getHours()).toBe(9);
});
