import { getSpecialDaysForMonth } from "../src/special-days.js";
import { jest } from '@jest/globals';

// Mock the global fetch function to simulate reading your JSON data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(
      // IMPORTANT: Replace this with a simplified version of your actual days.json content
      // Example structure (adjust based on your real data):
      [
    {
        "name": "Ada Lovelace Day",
        "monthName": "October",
        "dayName": "Tuesday",
        "occurence": "second",
        "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/ada.txt"
    },
    {
        "name": "International Binturong Day",
        "monthName": "May",
        "dayName": "Saturday",
        "occurence": "second",
        "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/binturongs.txt"
    },
    {
        "name": "International Vulture Awareness Day",
        "monthName": "September",
        "dayName": "Saturday",
        "occurence": "first",
        "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/vultures.txt"
    },
    {
        "name": "International Red Panda Day",
        "monthName": "September",
        "dayName": "Saturday",
        "occurence": "third",
        "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/red-pandas.txt"
    },
    {
        "name": "World Lemur Day",
        "monthName": "October",
        "dayName": "Friday",
        "occurence": "last",
        "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/lemurs.txt"
    }
]),
  })
);

describe("getSpecialDaysForMonth", () => {
  test('should return special days for October with calculated dates', async () => {
    const result = await getSpecialDaysForMonth(2025, 9);

    expect(result.length).toBe(2); // Check count first
    expect(result[0].name).toBe('Ada Lovelace Day');
    expect(result[0].date.getFullYear()).toBe(2025);
    expect(result[0].date.getMonth()).toBe(9); // October
    expect(result[0].date.getDate()).toBe(14); // Second Tuesday
    expect(result[0].descriptionURL).toBe('https://codeyourfuture.github.io/The-Piscine/days/ada.txt');

    expect(result[1].name).toBe('World Lemur Day');
    expect(result[1].date.getFullYear()).toBe(2025);
    expect(result[1].date.getMonth()).toBe(9); // October
    expect(result[1].date.getDate()).toBe(31); // Last Friday
    expect(result[1].descriptionURL).toBe('https://codeyourfuture.github.io/The-Piscine/days/lemurs.txt');
  });
});