/* eslint-env node */
module.exports = {
  extends: [require.resolve('eslint-config-fusion')],
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
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
