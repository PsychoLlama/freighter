// @flow
const template = `
yarn-error.log
node_modules/
.DS_Store
dist/
`.slice(1);

export default () => template;
