import {configure, addDecorator} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import withBaseui from '../src/with-baseui';

// automatically import all files named stories.js
const req = require.context('../src', true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
addDecorator(withInfo);
addDecorator(withBaseui);
// global -- module
configure(loadStories, module);
