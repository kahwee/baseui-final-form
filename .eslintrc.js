/* eslint-env node */
module.exports = {
  extends: [require.resolve('eslint-config-fusion')],
  env: {
    jest: true,
  },
  globals: {
    document: true,
    describe: true,
    expect: true,
    it: true,
    window: true,
    setTimeout: false,
    Map: false,
  },
};
