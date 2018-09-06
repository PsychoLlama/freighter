// @flow
module.exports = {
  projects: ['workspaces/*'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageThreshold: {
    global: {
      statements: 100,
      functions: 100,
      branches: 100,
      lines: 100,
    },
  },
};
