// @flow
const stringify = json => JSON.stringify(json, null, 2) + '\n';

type PackageVariables = {
  name: string,
};

export default ({ name }: PackageVariables) =>
  stringify({
    name,
    version: '0.1.0',
    private: true,
    main: null,
    description: 'TODO',
    repository: 'TODO',
    license: 'TODO',
    scripts: {
      test: 'jest',
      lint: `eslint 'workspaces/*/src/**/*.js'`,
      precommit: 'lint-staged',
    },
    'lint-staged': {
      '*.js': ['eslint --fix'],
    },
    workspaces: ['workspaces/*'],
    devDependencies: {
      eslint: '^5.5.0',
      'eslint-config-prettier': '^3.0.1',
      'eslint-plugin-flowtype': '^2.50.0',
      'eslint-plugin-prettier': '^2.6.2',
      'flow-bin': '^0.80.0',
      'flow-typed': '^2.5.1',
      husky: '^0.14.3',
      jest: '^23.5.0',
      'lint-staged': '^7.2.2',
      prettier: '^1.14.2',
    },
  });
