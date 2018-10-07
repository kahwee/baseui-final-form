/* eslint-env node */
module.exports = {
  extends: [require.resolve('eslint-config-fusion')],
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: '16.0',
      flowVersion: '0.81', // Flow version
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
