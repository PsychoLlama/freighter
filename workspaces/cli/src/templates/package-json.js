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
    description: 'TODO',
    repository: 'TODO',
    license: 'TODO',
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
      '@freighter/scripts': versions.freighterScripts,
      'eslint-config-freighter-repo': versions.eslintConfig,
      'eslint-config-prettier': '3.1.0',
      'eslint-plugin-flowtype': '3.2.0',
      'eslint-plugin-prettier': '3.0.0',
      'flow-typed': '2.5.1',
      husky: '1.1.3',
      lerna: '3.4.3',
      'lint-staged': '8.0.4',
    },
  });
