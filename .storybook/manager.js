import { create } from '@storybook/theming/create';
import { addons } from '@storybook/addons';

addons.setConfig({
  isFullscreen: false,
  showAddonsPanel: true,
  panelPosition: 'bottom',
  theme: create({
    base: 'light',
    brandTitle: 'baseui-final-form',
    brandUrl: 'https://github.com/kahwee/baseui-final-form',
    gridCellSize: 12,
  }),
});