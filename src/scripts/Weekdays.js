export function getDaysToSalary() {
  const now = new Date();
  const lastDayOfMonth = now.getDate();
  const lastDayOfWeek = now.getDay();
  let lastWeekday = lastDayOfMonth;

  if (lastDayOfWeek === 6) {
    // If the last day is a Saturday, subtract 1 day to get Friday
    lastWeekday--;
  } else if (lastDayOfWeek === 0) {
    // If the last day is a Sunday, subtract 2 days to get Friday
    lastWeekday -= 2;
  }

  return lastWeekday;
}

export const days = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
];
