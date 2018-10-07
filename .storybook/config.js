import {configure} from '@storybook/react';

// automatically import all files named stories.js
const req = require.context('../src', true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
