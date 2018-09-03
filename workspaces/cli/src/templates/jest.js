// @flow
const template = `
/* eslint-env node */
// @flow
const pkg = require('./package.json');

module.exports = {
  projects: pkg.workspaces,
};
`.slice(1);

export default () => template;
