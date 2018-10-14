/* eslint-env node */
// @flow

import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import {Button} from 'baseui/button';
import withBaseui from '../with-baseui';
import Select from './index';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';

storiesOf('Select', module)
  .addDecorator(withBaseui)
  .add('Single', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruit: 'pineapple'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
          <Field
            name="fruit"
            component={Select}
            caption="Please select a fruit"
            label="My fruits"
            options={options}
          />
        </form>
      )}
    />
  ))
  .add('Multiple', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruits: ['pineapple', 'apple']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
          <Field
            name="fruits"
            component={Select}
            caption="Please select multiple fruits"
            label="My fruits"
            options={options}
            multiple
          />
        </form>
      )}
    />
  ));
