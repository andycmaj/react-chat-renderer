/* eslint-disable @typescript-eslint/no-var-requires */
const { jsWithTs } = require('ts-jest/presets');

module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
  coveragePathIgnorePatterns: [
    'lib',
    '@types',
    '/node_modules/',
    '.*\\.d\\.ts',
  ],
  testEnvironment: 'node',
  testRegex:
    'src.*(/(test|__tests__)/(?![_.]).*|(\\.|/)(test|spec))\\.[jt]sx?$',
  transform: { ...jsWithTs.transform },
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here
      // babelConfig: true,
      // tsConfig: 'tsconfig.json',
    },
  },
};
