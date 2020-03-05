/* eslint-disable @typescript-eslint/no-var-requires */
const { jsWithTs } = require('ts-jest/presets');

module.exports = {
  collectCoverageFrom: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  coveragePathIgnorePatterns: [
    'lib',
    '@types',
    '/node_modules/',
    '.*\\.d\\.ts',
  ],
  testEnvironment: 'node',
  testRegex: '.*(/(test|__tests__)/(?![_.]).*|(\\.|/)(test|spec))\\.[jt]sx?$',
  transform: { ...jsWithTs.transform },
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here
      babelConfig: 'babel.config.js',
    },
  },
};
