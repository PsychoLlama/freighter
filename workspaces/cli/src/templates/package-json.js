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
      '@babel/cli': '7.2.3',
      '@babel/core': '7.3.4',
      '@freighter/scripts': versions.freighterScripts,
      'eslint-config-freighter-repo': versions.eslintConfig,
      'eslint-config-prettier': '4.1.0',
      'eslint-plugin-flowtype': '3.4.2',
      'eslint-plugin-prettier': '3.0.1',
      'flow-typed': '2.5.1',
      husky: '1.3.1',
      lerna: '3.13.1',
      'lint-staged': '8.1.5',
      'flow-bin': '0.85.0',
    },
  });
