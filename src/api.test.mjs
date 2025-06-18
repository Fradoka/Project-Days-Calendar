// test/api.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchDescription } from "./api.js";

test("fetchDescription - returns text when fetch succeeds", async (t) => {
  t.mock.method(global, "fetch", async () => ({
    ok: true,
    text: async () => "Mocked description content",
  }));

  const result = await fetchDescription("https://example.com/success");
  assert.strictEqual(result, "Mocked description content");
});

test("fetchDescription - returns fallback when response is not ok", async (t) => {
  t.mock.method(global, "fetch", async () => ({
    ok: false,
    status: 404,
  }));

  const result = await fetchDescription("https://example.com/fail");
  assert.strictEqual(result, "Description is not available");
});

test("fetchDescription - returns fallback when fetch throws error", async (t) => {
  t.mock.method(global, "fetch", async () => {
    throw new Error("Network error");
  });

  const result = await fetchDescription("https://example.com/error");
  assert.strictEqual(result, "Description is not available");
});
