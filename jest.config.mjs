// jest.config.mjs
export default {
  testEnvironment: 'node',
  transform: {},
  // Explicitly tell Jest which files to consider as tests
  testMatch: [
    '**/tests/**/*.mjs', // For tests directly in the 'tests' folder
    '**/src/**/*.test.mjs' // For test files (e.g., common.test.mjs, api.test.mjs) inside the 'src' folder
  ],
};