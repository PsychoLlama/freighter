/* eslint-env node */
const pkg = require('./package.json');

module.exports = {
  projects: pkg.workspaces,
};
