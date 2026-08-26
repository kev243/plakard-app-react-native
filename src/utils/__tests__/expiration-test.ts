import {
  getDateKey,
  getDaysUntil,
  parseDateKey,
} from "@/utils/expiration";

describe("expiration dates", () => {
  test("parse une date SQLite dans le fuseau local", () => {
    const date = parseDateKey("2028-02-29");

    expect(date.getFullYear()).toBe(2028);
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(29);
    expect(getDateKey(date)).toBe("2028-02-29");
  });

  test("calcule les jours sans dépendre de l'heure courante", () => {
    const from = new Date(2026, 7, 25, 23, 45);

    expect(getDaysUntil("2026-08-26", from)).toBe(1);
    expect(getDaysUntil("2026-08-25", from)).toBe(0);
    expect(getDaysUntil("2026-08-24", from)).toBe(-1);
  });

  test("reste correct lors d'un changement d'heure", () => {
    const from = new Date(2026, 2, 7, 12);

    expect(getDaysUntil(new Date(2026, 2, 9, 12), from)).toBe(2);
  });
});
