import { getNotificationDate } from "@/services/notification-schedule";

describe("notification schedule", () => {
  test("programme le rappel à 9 h selon la préférence", () => {
    const notificationDate = getNotificationDate(
      { expirationDate: "2026-09-10", alertPreference: "2 jours avant" },
      new Date(2026, 7, 25, 12),
    );

    expect(notificationDate).not.toBeNull();
    expect(notificationDate?.getFullYear()).toBe(2026);
    expect(notificationDate?.getMonth()).toBe(8);
    expect(notificationDate?.getDate()).toBe(8);
    expect(notificationDate?.getHours()).toBe(9);
    expect(notificationDate?.getMinutes()).toBe(0);
  });

  test("gère correctement un rappel qui traverse un changement de mois", () => {
    const notificationDate = getNotificationDate(
      { expirationDate: "2026-09-02", alertPreference: "5 jours avant" },
      new Date(2026, 7, 20, 12),
    );

    expect(notificationDate && {
      year: notificationDate.getFullYear(),
      month: notificationDate.getMonth(),
      day: notificationDate.getDate(),
    }).toEqual({ year: 2026, month: 7, day: 28 });
  });

  test("ne programme pas une date déjà passée", () => {
    expect(
      getNotificationDate(
        { expirationDate: "2026-08-25", alertPreference: "Le jour même" },
        new Date(2026, 7, 25, 9, 1),
      ),
    ).toBeNull();
  });
});
