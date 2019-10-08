/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button/index';
import {Field, Form} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import CheckboxGroup from './index';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';

storiesOf('CheckboxGroup', module).add('Basic', () => (
  <Form
    onSubmit={action('submit')}
    initialValues={{fruits: ['apple', 'pineapple']}}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="fruits"
          component={CheckboxGroup}
          caption="Please select some fruits"
          label="My favorite fruit"
          options={options}
          help="You can choose one or more favorite fruits"
        />

        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
));
