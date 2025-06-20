import { calculateDateForRule } from '../src/date-logic.js'; 

describe('calculateDateForRule', () => {

  // Test cases for 'first' occurrence
  test('should correctly calculate the first Monday of January 2025', () => {
    const rule = { ordinal: 'first', day: 'Monday' };
    const year = 2025;
    const month = 0; // January is 0-indexed
    const expectedDate = new Date(2025, 0, 6); // Jan 6, 2025 was the first Monday
    expect(calculateDateForRule(rule, year, month)).toEqual(expectedDate);
  });

  // Test cases for specific ordinal occurrences (second, third, etc.)
  test('should correctly calculate the third Tuesday of October 2024', () => {
    const rule = { ordinal: 'third', day: 'Tuesday' };
    const year = 2024;
    const month = 9; // October is 9-indexed
    const expectedDate = new Date(2024, 9, 15); // Oct 15, 2024 was the third Tuesday
    expect(calculateDateForRule(rule, year, month)).toEqual(expectedDate);
  });

  // Test cases for 'last' occurrence
  test('should correctly calculate the last Friday of November 2024', () => {
    const rule = { ordinal: 'last', day: 'Friday' };
    const year = 2024;
    const month = 10; // November is 10-indexed
    const expectedDate = new Date(2024, 10, 29); // Nov 29, 2024 was the last Friday
    expect(calculateDateForRule(rule, year, month)).toEqual(expectedDate);
  });

  // Test cases for invalid scenarios/error handling
  test('should throw an error if the specified ordinal day does not exist in the month', () => {
    const rule = { ordinal: 'fifth', day: 'Saturday' };
    const year = 2025;
    const month = 1; // February 2025 (28 days)
    // There is no fifth Saturday in Feb 2025 (first Sat is Feb 1, 2nd Feb 8, 3rd Feb 15, 4th Feb 22)
    expect(() => calculateDateForRule(rule, year, month)).toThrow('The specified ordinal day does not exist in this month');
  });

  test('should throw an error for invalid day name', () => {
    const rule = { ordinal: 'first', day: 'InvalidDay' };
    const year = 2025;
    const month = 0;
    expect(() => calculateDateForRule(rule, year, month)).toThrow('Invalid input');
  });

});