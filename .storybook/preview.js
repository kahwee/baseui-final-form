import {addDecorator} from '@storybook/react';
import withBaseui from '../src/with-baseui';
import {themes} from '@storybook/theming';

addDecorator(withBaseui);