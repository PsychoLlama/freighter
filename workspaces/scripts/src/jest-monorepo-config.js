// @flow
module.exports = {
  testMatch: ['src/**/__tests__/*.test.js'],
  coverageDirectory: '<rootDir>/coverage',
  projects: ['<rootDir>/workspaces/*'],
  coverageReporters: ['html'],
  rootDir: process.cwd(),
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      functions: 100,
      branches: 100,
      lines: 100,
    },
  },
};
