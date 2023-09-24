const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig);

/**
 * NOTE: Next.js does not allow to override transformIgnorePatterns in customJestConfig
 * https://stackoverflow.com/questions/71427330/nextjs-jest-transform-transformignorepatterns-not-working-with-esm-modules
 * Same is applied here: https://stackoverflow.com/questions/70916761/next-js-and-jest-syntaxerror-cannot-use-import-statement-outside-a-module
 */
module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: ["<rootDir>/node_modules/!.pnpm"],
});
