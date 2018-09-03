// @flow
import loadRepoPackage from './load-repo-package';
const pkg = loadRepoPackage();

module.exports = {
  projects: pkg.workspaces,
};
