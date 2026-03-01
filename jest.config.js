/** @type {import('jest').Config} */
const config = {
  testTimeout: 20000,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^types$': '<rootDir>/src/types',
    '^UmamiApiClient$': '<rootDir>/src/UmamiApiClient',
  },
};

module.exports = config;
