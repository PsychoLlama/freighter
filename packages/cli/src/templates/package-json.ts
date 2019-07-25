const stringify = <T>(json: T) => JSON.stringify(json, null, 2) + '\n';

interface PackageVariables {
  projectName: string;
  versions: {
    freighterScripts: string;
    eslintConfig: string;
  };
}

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
    workspaces: ['packages/*'],
    devDependencies: {
      // $FlowFixMe
      '@babel/cli': __VERSIONS__['@babel/cli'],
      // $FlowFixMe
      '@babel/core': __VERSIONS__['@babel/core'],
      '@freighter/scripts': versions.freighterScripts,
      'eslint-config-freighter-repo': versions.eslintConfig,
      // $FlowFixMe
      'eslint-config-prettier': __VERSIONS__['eslint-config-prettier'],
      // $FlowFixMe
      'eslint-plugin-flowtype': __VERSIONS__['eslint-plugin-flowtype'],
      // $FlowFixMe
      'eslint-plugin-prettier': __VERSIONS__['eslint-plugin-prettier'],
      // $FlowFixMe
      'flow-typed': __VERSIONS__['flow-typed'],
      // $FlowFixMe
      husky: __VERSIONS__.husky,
      // $FlowFixMe
      lerna: __VERSIONS__.lerna,
      // $FlowFixMe
      'lint-staged': __VERSIONS__['lint-staged'],
      // $FlowFixMe
      'flow-bin': __VERSIONS__['flow-bin'],
      // $FlowFixMe
      typescript: __VERSIONS__['typescript'],
    },
  });
