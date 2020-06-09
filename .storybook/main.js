module.exports = {
  stories: ['../src/**/stories.(js|mdx)'],
  addons: [
    '@storybook/addon-actions/register', 'storybook-readme/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ]
}