// @flow
const template = `
[ignore]
.*/dist/.*

[libs]
flow-typed
`.slice(1);

export default () => template;
