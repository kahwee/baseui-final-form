/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import ButtonGroup from './index';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';

export default {
  title: 'ButtonGroup',
};

export const RadioMode = () => (
  <Form
    onSubmit={action('submit')}
    initialValues={{fruit: 'apple'}}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="fruit"
          component={ButtonGroup}
          caption="Please select some fruits"
          label="My favorite fruit"
          mode="radio"
          $size="compact"
          options={options}
          help="You can choose one or more favorite fruits"
        />

        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
);

RadioMode.story = {
  name: 'Radio mode',
};

export const CheckboxMode = () => (
  <Form
    onSubmit={action('submit')}
    initialValues={{fruits: ['apple', 'pineapple']}}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="fruits"
          component={ButtonGroup}
          caption="Please select some fruits"
          label="My favorite fruit"
          mode="checkbox"
          options={options}
          $size="compact"
          help="You can choose one or more favorite fruits"
        />

        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
);

CheckboxMode.story = {
  name: 'Checkbox mode',
};
