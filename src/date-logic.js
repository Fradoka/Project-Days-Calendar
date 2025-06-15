// Helper to convert ordinal string to a number
function ordinalToNumber(ordinal) {
  const map = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    last: -1
  };
  return map[ordinal.toLowerCase()];
}

export function calculateDateForRule(rule, year, month) {
  const ordinal = ordinalToNumber(rule.ordinal);
  const dayName = rule.day.toLowerCase();

  // Map day names to day numbers (Sunday=0, Monday=1, ..., Saturday=6)
  const daysMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };

  const targetDay = daysMap[dayName];
  if (targetDay === undefined || !year || month === undefined) {
    throw new Error('Invalid input');
  }

  // If ordinal is "last", find last occurrence of that day in the month
  if (ordinal === -1) {
    // Find last day of the month
    const lastDate = new Date(year, month + 1, 0);
    // Go backward from the last day to find the target day
    const lastDayOfWeek = lastDate.getDay();
    let diff = lastDayOfWeek - targetDay;
    if (diff < 0) diff += 7;
    return new Date(year, month, lastDate.getDate() - diff);
  }

  // Otherwise, find the first occurrence of the target day in the month
  // Then add (ordinal - 1) weeks to it
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();

  let dayOffset = targetDay - firstDayOfWeek;
  if (dayOffset < 0) dayOffset += 7;

  // Calculate the date of the nth occurrence of the target day
  const date = 1 + dayOffset + 7 * (ordinal - 1);

  // Check if date is valid within month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  if (date > daysInMonth) {
    throw new Error('The specified ordinal day does not exist in this month');
  }

  return new Date(year, month, date);
}