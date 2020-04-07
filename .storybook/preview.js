import {addDecorator,addParameters} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import withBaseui from '../src/with-baseui';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addDecorator(withInfo);
addDecorator(withBaseui);
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});