export function getTimeToFrokost() {
  const now = new Date();
  const target = getTargetDate(now);

  let diff = target - now;

  let hours = Math.floor(diff / 1000 / 60 / 60);

  const dd = Math.floor(hours / 24);
  const hh = hours % 24;

  diff -= hours * 1000 * 60 * 60;
  const mm = Math.floor(diff / 1000 / 60);

  let formatted = "";
  if (dd > 0) formatted += `${dd} ${dd > 1 ? "dage " : "dag "}`;

  if (hh > 0) formatted += `${hh} ${hh > 1 ? "timer" : "time"}`;

  if (hh > 0 && mm > 0) formatted += ` og `;

  if (mm > 0) formatted += `${mm} ${mm > 1 ? "minutter" : "minut"}`;

  if (hh === 0 && mm === 0) {
    formatted = "NU";
  }

  if (hh === 0 && mm < 5) formatted += "!!!!";

  return {
    dd: dd,
    hh: hh,
    mm: mm,
    formatted: formatted,
  };
}

function getTargetDate(now) {
  const target = new Date(now.getTime());
  target.setHours(11);
  target.setMinutes(17);

  // If its friday, but it haven't been frokost yet, return target.
  // Otherwise go to next if-statement, which will return today + 3 days(for next monday)
  if (now.getDay() === 5 && target > now) {
    return target;
  }

  // 5 = friday, 6 = saturday, 0 = sunday. Adds the appropiate time for the next week day
  if ([0, 5, 6].includes(now.getDay())) {
    const timeTillNextMonday = (1 - now.getDay() + 7) % 7; // 1 is monday
    target.setDate(target.getDate() + timeTillNextMonday);
    return target;
  }

  // Frokost is over, add one day to calculate next frokost time
  if (now > target) {
    target.setDate(target.getDate() + 1);
    return target;
  }

  return target;
}
