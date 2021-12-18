
require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
};