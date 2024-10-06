const translations = {
  en: {
    day: "day",
    days: "days",
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutes: "minutes",
    and: "and",
    now: "NOW",
  },
  da: {
    day: "dag",
    days: "dage",
    hour: "time",
    hours: "timer",
    minute: "minut",
    minutes: "minutter",
    and: "og",
    now: "NU",
  },
};

export function getTimeToFrokost(locale = "da") {
  const now = new Date();
  const target = getTargetDate(now);
  const diff = target.getTime() - now.getTime();
  const dd = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hh = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mm = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const t = translations[locale];
  let formatted = "";
  if (dd > 0) formatted += `${dd} ${dd > 1 ? t.days : t.day} `;
  if (hh > 0) formatted += `${hh} ${hh > 1 ? t.hours : t.hour}`;
  if (hh > 0 && mm > 0) formatted += ` ${t.and} `;
  if (mm > 0) formatted += `${mm} ${mm > 1 ? t.minutes : t.minute}`;
  if (hh === 0 && mm === 0) {
    formatted = t.now;
  }
  if (hh === 0 && mm < 5) formatted += "!!!!";
  return { dd, hh, mm, formatted: formatted.trim() };
}

function getTargetDate(now) {
  const target = new Date(now);
  target.setHours(11, 17, 0, 0); // Set to 11:17:00.000
  // If it's Friday and before frokost time, return target
  if (now.getDay() === 5 && target > now) {
    return target;
  }
  // If it's Friday (after frokost), Saturday, or Sunday, set to next Monday
  if ([5, 6, 0].includes(now.getDay())) {
    const daysUntilMonday = (8 - now.getDay()) % 7;
    target.setDate(target.getDate() + daysUntilMonday);
    return target;
  }
  // If frokost time has passed for today, set to tomorrow
  if (now > target) {
    target.setDate(target.getDate() + 1);
  }
  return target;
}
