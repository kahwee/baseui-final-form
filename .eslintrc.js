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
      pragma: 'React', // Pragma to use, default to "React"
      version: '16.6.1',
      flowVersion: '0.86', // Flow version
    },
  },
  env: {
    jest: true,
  },
  globals: {
    document: true,
    describe: true,
    expect: true,
    it: true,
    window: true,
    Map: false,
  },
};
