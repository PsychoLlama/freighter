module.exports = {
  extends: [
    'freighter-repo',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: require.resolve('@typescript-eslint/parser'),
  overrides: [
    {
      files: '**/__tests__/*.{js,ts}{x,}',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
