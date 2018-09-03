/* eslint-env node */
// @flow
module.exports = {
  overrides: [
    {
      files: '**/__tests__/*.js',
      env: { jest: true },
    },
    {
      files: '**/flow-typed/npm/**',
      rules: {
        'flowtype/require-valid-file-annotation': 'off',
        'prettier/prettier': 'off',
      },
    },
  ],

  // TODO: once eslint/issues/10643 has been resolved,
  // move all plugin/config dependencies into this package.
  extends: [
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
  ],

  parser: require.resolve('babel-eslint'),
  env: { es6: true },
  parserOptions: {
    sourceType: 'module',
  },

  rules: {
    'flowtype/no-types-missing-file-annotation': 'off',
    'flowtype/space-after-type-colon': 'off',
    'flowtype/require-valid-file-annotation': [
      'error',
      'always',
      { annotationStyle: 'line' },
    ],
  },
};
