import { fetchDescription } from "../src/api.js";
import { jest } from '@jest/globals';

// This will run after each test in this file to restore the original fetch
afterEach(() => {
  jest.restoreAllMocks(); // Restores original implementations of mocked functions
});

test("fetchDescription - returns text when fetch succeeds", async () => {
  jest.spyOn(global, "fetch").mockImplementation (async () => ({
    ok: true,
    text: async () => "Mocked description content",
  }));

  const result = await fetchDescription("https://example.com/success");
  expect(result).toBe("Mocked description content");
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test("fetchDescription - returns fallback when response is not ok", async () => {
  jest.spyOn(global, "fetch").mockImplementation(async () => ({
    ok: false,
    status: 404,
  }));

  const result = await fetchDescription("https://example.com/fail");
  expect(result).toBe("Description is not available");
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test("fetchDescription - returns fallback when fetch throws error", async () => {
  jest.spyOn(global, "fetch").mockImplementation(async () => {
    throw new Error("Network error");
  });

  const result = await fetchDescription("https://example.com/error");
  expect(result).toBe("Description is not available");
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
