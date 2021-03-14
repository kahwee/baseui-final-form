// @noflow
const projectConfig = require('../.babelrc.js')
const { BABEL_ENV } = process.env;
const modules = !(BABEL_ENV === 'es' || BABEL_ENV === 'modules') && 'commonjs';

projectConfig.plugins = projectConfig.plugins.map((plugin) => {
  if (
    [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
    ].includes(plugin)
  ) {
    return [plugin, { loose: true }]
  }
  return plugin
})

module.exports = projectConfig