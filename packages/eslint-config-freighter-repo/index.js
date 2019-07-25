/* eslint-env node */
module.exports = {
  overrides: [
    {
      files: '**/jest.config.js',
      env: { node: true },
    },
    {
      files: '**/__tests__/*.{js,ts}{x,}',
      env: { jest: true, node: true },
      rules: {
        // It's common to use `any` to test against invalid input.
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],

  // TODO: once eslint/issues/10643 has been resolved,
  // move all plugin/config dependencies into this package.
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],

  parser: require.resolve('@typescript-eslint/parser'),
  env: { es6: true },
  parserOptions: {
    sourceType: 'module',
  },

  // ESLint warnings are rarely worth the cost. They tend to accumulate and
  // become lost in a sea of other warnings. In this config, all warnings are
  // either escalated to errors or just disabled.
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
