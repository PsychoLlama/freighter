/* eslint-env node */
module.exports = {
  overrides: [
    {
      files: '**/__tests__/*.{js,ts}{x,}',
      env: { jest: true, node: true },
    },
  ],

  // TODO: once eslint/issues/10643 has been resolved,
  // move all plugin/config dependencies into this package.
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: require.resolve('babel-eslint'),
  env: { es6: true },
  parserOptions: {
    sourceType: 'module',
  },
};
