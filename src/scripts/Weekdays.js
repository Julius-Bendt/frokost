export function getDaysToSalary() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Get the last day of the month
  let lastDate = new Date(year, month + 1, 0);

  let weekendSubtract = 0;

  // Sunday
  if (lastDate.getDay() === 0) weekendSubtract = 2;

  // Saturday
  if (lastDate.getDay() === 6) weekendSubtract = 1;

  return lastDate.getDate() - today.getDate() - weekendSubtract;
}

export const days = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
];
