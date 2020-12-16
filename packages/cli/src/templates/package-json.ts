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
      '*.js': ['freighter-scripts lint --fix'],
    },
    eslintConfig: {
      extends: 'freighter-repo',
    },
    jest: {
      preset: '@freighter/scripts',
    },
    prettier: {
      singleQuote: true,
      trailingComma: 'es5',
    },
    workspaces: ['packages/*'],
    devDependencies: {
      '@babel/cli': __VERSIONS__['@babel/cli'],
      '@babel/core': __VERSIONS__['@babel/core'],
      '@freighter/scripts': versions.freighterScripts,
      'eslint-config-freighter-repo': versions.eslintConfig,
      'eslint-config-prettier': __VERSIONS__['eslint-config-prettier'],
      'eslint-plugin-prettier': __VERSIONS__['eslint-plugin-prettier'],
      husky: __VERSIONS__.husky,
      lerna: __VERSIONS__.lerna,
      'lint-staged': __VERSIONS__['lint-staged'],
    },
  });
