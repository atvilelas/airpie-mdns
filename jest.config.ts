const config = {
  roots: ['<rootDir>/src'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
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
