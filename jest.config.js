/* eslint-env node */
// @flow
const pkg = require('./package.json');

module.exports = {
  projects: pkg.workspaces,
};
