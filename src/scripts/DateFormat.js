const monthNames = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  da: [
    "Januar",
    "Februar",
    "Marts",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "December",
  ],
};
const dayNames = {
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  da: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
};

export function formatDate(date, locale) {
  try {
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth();
    const dayOfWeek = date.getDay();

    if (locale === "en") {
      return `${dayNames[locale][dayOfWeek]}, ${day}${getOrdinalSuffix(
        day
      )} of ${monthNames[locale][month]}`;
    } else if (locale === "da") {
      return `${dayNames[locale][dayOfWeek]} d. ${day}. ${monthNames[locale][month]}`;
    }
    throw new Error("Unsupported locale: " + locale);
  } catch (error) {
    console.error(error);
    return date;
  }
}

function getOrdinalSuffix(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
