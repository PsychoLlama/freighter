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
      test: 'freighter-scripts test',
      lint: 'freighter-scripts lint',
      ci: 'freighter-scripts ci',
      precommit: 'lint-staged',
    },
    'lint-staged': {
      '*.js': ['freighter-scripts lint --fix'],
    },
    workspaces: ['workspaces/*'],
    devDependencies: {
      '@freighter/scripts': 'file:../freighter/workspaces/scripts',
      'eslint-config-freighter-repo':
        'file:../freighter/workspaces/eslint-config-freighter-repo',
      'eslint-config-prettier': '^3.0.1',
      'eslint-plugin-flowtype': '^2.50.0',
      'eslint-plugin-prettier': '^2.6.2',
      'flow-bin': '^0.80.0',
      'flow-typed': '^2.5.1',
      husky: '^0.14.3',
      'lint-staged': '^7.2.2',
      prettier: '^1.14.2',
    },
  });
