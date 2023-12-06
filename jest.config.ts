const config = {
  roots: ['<rootDir>/src'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
      },
    ],
    [
      'jest-html-reporters',
      {
        publicPath: './test-report-md',
        filename: 'index.html',
      },
    ],
  ],
  verbose: true,
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }],
  },
  testPathIgnorePatterns: ['./lib'],
  transformIgnorePatterns: ['node_modules'],
};

export default config;
