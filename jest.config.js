const { defaults } = require('jest-config');

module.exports = {
  // ...defaults,
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**/*test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};

