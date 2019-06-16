// @flow
const stringify = json => JSON.stringify(json, null, 2) + '\n';

type PackageVariables = {
  projectName: string,
  versions: {
    freighterScripts: string,
    eslintConfig: string,
  },
};

export default ({ projectName, versions }: PackageVariables) =>
  stringify({
    name: projectName,
    version: '0.1.0',
    private: true,
    repository: 'TODO',
    scripts: {
      test: 'freighter-scripts test',
      lint: 'freighter-scripts lint',
      ci: 'freighter-scripts ci',
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
      },
    },
    'lint-staged': {
      '*.js': ['freighter-scripts lint --fix', 'git add'],
    },
    workspaces: ['workspaces/*'],
    devDependencies: {
      '@babel/cli': '7.4.4',
      '@babel/core': '7.4.5',
      '@freighter/scripts': versions.freighterScripts,
      'eslint-config-freighter-repo': versions.eslintConfig,
      'eslint-config-prettier': '5.0.0',
      'eslint-plugin-flowtype': '3.10.3',
      'eslint-plugin-prettier': '3.1.0',
      'flow-typed': '2.5.2',
      husky: '2.4.1',
      lerna: '3.15.0',
      'lint-staged': '8.2.1',
      'flow-bin': '0.85.0',
    },
  });
