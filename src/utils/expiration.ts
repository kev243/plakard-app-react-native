export type RemainingTime = {
  label: string;
  value: string;
};

export type ExpirationStatus = "fresh" | "warning" | "critical" | "expired";

export function getExpirationStatus(daysLeft: number): ExpirationStatus {
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 1) return "critical";
  if (daysLeft < 5) return "warning";
  return "fresh";
}

export function formatRemainingTime(daysLeft: number): RemainingTime {
  if (daysLeft < 0) {
    return { value: "Expiré", label: `depuis ${Math.abs(daysLeft)} j` };
  }

  if (daysLeft === 0) {
    return { value: "0 j", label: "aujourd’hui" };
  }

  if (daysLeft < 30) {
    return {
      value: `${daysLeft} j`,
      label: `restant${daysLeft > 1 ? "s" : ""}`,
    };
  }

  if (daysLeft < 365) {
    const months = Math.max(1, Math.round(daysLeft / 30.44));
    return { value: `${months} mois`, label: "restants" };
  }

  const years = Math.max(1, Math.round(daysLeft / 365.25));
  return {
    value: `${years} an${years > 1 ? "s" : ""}`,
    label: "restants",
  };
}

export function getExpirationDate(daysLeft: number, from = new Date()) {
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysLeft);
  return date;
}

export function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getDaysUntil(date: string | Date, from = new Date()) {
  const today = new Date(from);
  today.setHours(0, 0, 0, 0);
  const expiration = typeof date === "string" ? parseDateKey(date) : new Date(date);
  expiration.setHours(0, 0, 0, 0);
  return Math.round((expiration.getTime() - today.getTime()) / 86_400_000);
}
