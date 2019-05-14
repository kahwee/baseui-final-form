/* eslint-env node */
module.exports = {
  extends: [require.resolve('eslint-config-fusion')],
  plugins: ['sort-imports-es6-autofix'],
  rules: {
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    jest: true,
  },
  globals: {
    module: true,
    document: true,
    describe: true,
    expect: true,
    it: true,
    window: true,
    Map: false,
  },
};
