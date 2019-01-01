// @flow
module.exports = {
  testMatch: ['**/__tests__/*.test.js'],
  coverageReporters: ['html'],
  projects: ['workspaces/*'],
  collectCoverage: true,
  clearMocks: true,
  coverageThreshold: {
    global: {
      statements: 100,
      functions: 100,
      branches: 100,
      lines: 100,
    },
  },
};
