export type RemainingTime = {
  label: string;
  value: string;
};

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
