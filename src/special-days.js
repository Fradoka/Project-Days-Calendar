import days from './days.json'; 
import { calculateDateForRule } from './date-logic.js';

export function getSpecialDaysForMonth(year, month) {
  // Get month name (e.g., 'October') from number
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month];

  // Filter commemorative days for this month
  const daysForMonth = days.filter(day => day.monthName === monthName);

  // Map each day to an object with calculated date
  return daysForMonth.map(day => {
    const rule = {
      ordinal: day.occurence,
      day: day.dayName
    };

    const date = calculateDateForRule(rule, year, month);

    return {
      name: day.name,
      date,
      descriptionURL: day.descriptionURL
    };
  });
}