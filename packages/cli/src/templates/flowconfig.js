// @flow
type TemplateVariables = {
  name: string,
};

export default ({ name }: TemplateVariables) =>
  `
[ignore]
.*/node_modules/.*/test/.*

[libs]
flow-typed

[options]
module.name_mapper='^@${name}\\/\\([a-zA-Z0-9_\\-]+\\)$' -> '<PROJECT_ROOT>/packages/\\1/src/index'
`.slice(1);
