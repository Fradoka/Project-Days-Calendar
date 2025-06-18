import fs from "fs";
import days from "./days.json" assert { type: "json" };
import { calculateDateForRule } from "./date-logic.js";
import { fetchDescription } from "./api.js";
function formatDateToICS(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
function generateUID() {
  return `phone-${Math.floor(Math.random() * 100000)}-${Math.floor(
    Math.random() * 100000
  )}-days-calendar`;
}
async function generateICS() {
  let ics = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//MgPhone//Days Calendar//EN
METHOD:PUBLISH
X-PUBLISHED-TTL:PT1H
`;
  for (let year = 2020; year <= 2030; year++) {
    for (const day of days) {
      const monthIndex = new Date(`${day.monthName} 1, ${year}`).getMonth();
      const rule = { ordinal: day.occurence, day: day.dayName };
      const date = calculateDateForRule(rule, year, monthIndex);
      let descriptionText = await fetchDescription(day.descriptionURL);
      descriptionText = descriptionText.replace(/\r?\n/g, "\\n");
      const event = {
        uid: generateUID(),
        startDate: date,
        summary: `${day.name} (${year})`,
        description: descriptionText,
      };
      ics += `BEGIN:VEVENT
UID:${event.uid}
SUMMARY:${event.summary}
DTSTAMP:${formatDateToICS(new Date())}T000000Z
DTSTART;VALUE=DATE:${formatDateToICS(event.startDate)}
DESCRIPTION:${event.description}
END:VEVENT
`;
    }
  }
  ics += `END:VCALENDAR`;
  fs.writeFileSync("generate-ical.ics", ics.replace(/\n/g, "\r\n"));
  console.log("generate-ical.ics file has been generated successfully.");
}

generateICS().catch(console.error);
