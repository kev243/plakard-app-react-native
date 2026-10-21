import {
  formatRemainingTime,
  getDateKey,
  getDaysUntil,
  getExpirationStatus,
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

  test("considère un produit passé comme expiré", () => {
    expect(getExpirationStatus(-1)).toBe("expired");
  });

  test("considère aujourd’hui et demain comme critiques", () => {
    expect(getExpirationStatus(0)).toBe("critical");
    expect(getExpirationStatus(1)).toBe("critical");
  });

  test("considère les produits entre 2 et 4 jours comme urgents", () => {
    expect(getExpirationStatus(2)).toBe("warning");
    expect(getExpirationStatus(4)).toBe("warning");
  });

  test("considère un produit à partir de 5 jours comme frais", () => {
    expect(getExpirationStatus(5)).toBe("fresh");
    expect(getExpirationStatus(30)).toBe("fresh");
  });
});

describe("remaining time formatting", () => {
  test("affiche correctement un produit expiré", () => {
    expect(formatRemainingTime(-3)).toEqual({
      value: "Expiré",
      label: "depuis 3 j",
    });
  });

  test("affiche correctement aujourd’hui", () => {
    expect(formatRemainingTime(0)).toEqual({
      value: "0 j",
      label: "aujourd’hui",
    });
  });

  test("gère le singulier et le pluriel des jours", () => {
    expect(formatRemainingTime(1)).toEqual({
      value: "1 j",
      label: "restant",
    });

    expect(formatRemainingTime(4)).toEqual({
      value: "4 j",
      label: "restants",
    });
  });

  test("affiche les longues durées en mois", () => {
    expect(formatRemainingTime(61)).toEqual({
      value: "2 mois",
      label: "restants",
    });
  });

  test("affiche les très longues durées en années", () => {
    expect(formatRemainingTime(730)).toEqual({
      value: "2 ans",
      label: "restants",
    });
  });
});
